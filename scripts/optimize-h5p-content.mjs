/**
 * Shrinks the media inside the extracted H5P packages in `public/h5p`.
 *
 * The courses are authored from phone photos and tablet screenshots, so they
 * ship 6000x4000 JPEGs and multi-megabyte PNGs that are only ever displayed a
 * few hundred pixels wide. Images are resized and re-encoded in place, keeping
 * their format and filename, and the `width`/`height` values that `content.json`
 * records for every image reference are rewritten to match. Oversized videos are
 * re-encoded with ffmpeg; `content.json` stores no dimensions for those.
 *
 * Safe to re-run: files that are already small enough are left untouched.
 */
import { execFile } from "node:child_process"
import { readdir, readFile, stat, writeFile } from "node:fs/promises"
import { dirname, extname, join, relative, resolve } from "node:path"
import { promisify } from "node:util"
import { fileURLToPath } from "node:url"
import sharp from "sharp"

const execFileAsync = promisify(execFile)

const MAX_IMAGE_EDGE = 1920
const MAX_VIDEO_WIDTH = 1920
/** Re-encode an already correctly sized image only if it is still this big. */
const IMAGE_REENCODE_THRESHOLD = 500 * 1024
/** Only keep a re-encode that actually saves something worthwhile. */
const MIN_SAVING = 0.1
/** Images that are already correctly sized need a much bigger win to be rewritten. */
const MIN_RESIZED_SAVING = 0.5
/** Videos above this bitrate get re-encoded. */
const MAX_VIDEO_BITRATE = 2_000_000

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const h5pRoot = join(root, "public/h5p")

const JPEG = new Set([".jpg", ".jpeg"])
const PNG = new Set([".png"])
const VIDEO = new Set([".mp4", ".webm"])

async function walk(dir) {
  const out = []
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) out.push(...(await walk(full)))
    else if (entry.isFile()) out.push(full)
  }
  return out
}

/** Collects every object in `content.json` that references the given media path. */
function collectRefs(node, refs) {
  if (Array.isArray(node)) {
    for (const item of node) collectRefs(item, refs)
  } else if (node && typeof node === "object") {
    if (typeof node.path === "string") {
      const list = refs.get(node.path) ?? []
      list.push(node)
      refs.set(node.path, list)
    }
    for (const value of Object.values(node)) collectRefs(value, refs)
  }
}

async function optimizeImage(file) {
  const extension = extname(file).toLowerCase()
  if (!JPEG.has(extension) && !PNG.has(extension)) return null

  const before = (await stat(file)).size
  const image = sharp(file, { failOn: "none" })
  let width, height
  try {
    ;({ width, height } = await image.metadata())
  } catch {
    // Some packages ship truncated or empty files; leave those alone.
    console.warn(`  skipped unreadable ${relative(h5pRoot, file)}`)
    return null
  }
  if (!width || !height) return null

  const longEdge = Math.max(width, height)
  const resized = longEdge > MAX_IMAGE_EDGE
  if (!resized && before < IMAGE_REENCODE_THRESHOLD) return null

  let pipeline = image.resize({
    width: MAX_IMAGE_EDGE,
    height: MAX_IMAGE_EDGE,
    fit: "inside",
    withoutEnlargement: true,
  })

  let buffer
  if (JPEG.has(extension)) {
    buffer = await pipeline.jpeg({ quality: 80, mozjpeg: true }).toBuffer()
  } else {
    const options = { compressionLevel: 9, effort: 10 }
    const [plain, palette] = await Promise.all([
      pipeline.clone().png(options).toBuffer(),
      pipeline.clone().png({ ...options, palette: true, quality: 90 }).toBuffer(),
    ])
    buffer = palette.length < plain.length ? palette : plain
  }

  const required = resized ? MIN_SAVING : MIN_RESIZED_SAVING
  if (buffer.length > before * (1 - required)) return null
  await writeFile(file, buffer)

  const after = await sharp(buffer).metadata()
  return { before, after: buffer.length, width: after.width, height: after.height }
}

async function probeVideo(file) {
  const { stdout } = await execFileAsync("ffprobe", [
    "-v", "error",
    "-select_streams", "v:0",
    "-show_entries", "stream=width,height,bit_rate",
    "-of", "default=nw=1:nk=0",
    file,
  ])
  return Object.fromEntries(
    stdout.trim().split("\n").map((line) => {
      const [key, value] = line.split("=")
      return [key, Number(value)]
    }),
  )
}

async function optimizeVideo(file) {
  const before = (await stat(file)).size
  const { width, bit_rate: bitrate } = await probeVideo(file)
  if (!(bitrate > MAX_VIDEO_BITRATE) && !(width > MAX_VIDEO_WIDTH)) return null

  const temporary = `${file}.optimized.mp4`
  await execFileAsync("ffmpeg", [
    "-y", "-i", file,
    "-vf", `scale='min(${MAX_VIDEO_WIDTH},iw)':-2`,
    "-c:v", "libx264", "-crf", "24", "-preset", "slow",
    "-c:a", "aac", "-b:a", "128k",
    "-movflags", "+faststart",
    temporary,
  ])

  const after = (await stat(temporary)).size
  if (after > before * (1 - MIN_SAVING)) {
    await execFileAsync("rm", [temporary])
    return null
  }
  await execFileAsync("mv", [temporary, file])
  return { before, after }
}

const megabytes = (bytes) => (bytes / 1048576).toFixed(2).padStart(7)

let totalBefore = 0
let totalAfter = 0

for (const entry of (await readdir(h5pRoot, { withFileTypes: true })).sort()) {
  if (!entry.isDirectory()) continue
  const contentDir = join(h5pRoot, entry.name, "content")
  const contentJson = join(contentDir, "content.json")
  let content
  try {
    content = JSON.parse(await readFile(contentJson, "utf8"))
  } catch {
    continue // not an extracted H5P package (e.g. the shared libraries folder)
  }

  const refs = new Map()
  collectRefs(content, refs)
  let touched = false

  console.log(`\n${entry.name}`)
  for (const file of (await walk(contentDir)).sort()) {
    if (file === contentJson) continue
    const extension = extname(file).toLowerCase()
    const result = VIDEO.has(extension)
      ? await optimizeVideo(file)
      : await optimizeImage(file)
    if (!result) continue

    totalBefore += result.before
    totalAfter += result.after
    const mediaPath = relative(contentDir, file).split("\\").join("/")
    for (const ref of refs.get(mediaPath) ?? []) {
      if (result.width && ref.width !== undefined) ref.width = result.width
      if (result.height && ref.height !== undefined) ref.height = result.height
      touched = true
    }
    console.log(
      `  ${megabytes(result.before)} -> ${megabytes(result.after)} MB  ${mediaPath}`,
    )
  }

  // Always reconcile every recorded dimension with the file on disk, so an
  // interrupted run cannot leave stale sizes behind.
  for (const [mediaPath, list] of refs) {
    const file = join(contentDir, mediaPath)
    let width, height
    try {
      ;({ width, height } = await sharp(file, { failOn: "none" }).metadata())
    } catch {
      continue
    }
    for (const ref of list) {
      if (width && ref.width !== undefined && ref.width !== width) {
        ref.width = width
        touched = true
      }
      if (height && ref.height !== undefined && ref.height !== height) {
        ref.height = height
        touched = true
      }
    }
  }

  if (touched) {
    await writeFile(contentJson, JSON.stringify(content))
    console.log("  updated content.json dimensions")
  }
}

console.log(
  `\ntotal: ${megabytes(totalBefore)} MB -> ${megabytes(totalAfter)} MB`,
)
