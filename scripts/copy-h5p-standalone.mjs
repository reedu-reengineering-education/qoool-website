// Copies the h5p-standalone player assets (frame.bundle.js, styles, fonts, images)
// into public/ so the static export can serve them alongside the H5P content.
import { cp, rm } from "node:fs/promises"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const source = resolve(root, "node_modules/h5p-standalone/dist")
const target = resolve(root, "public/h5p-standalone")

await rm(target, { recursive: true, force: true })
await cp(source, target, { recursive: true })

console.log(`copied h5p-standalone assets to ${target}`)
