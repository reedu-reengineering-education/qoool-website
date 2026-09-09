"use client"

import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export interface H5PPlayerLabels {
  start: string
  loading: string
  error: string
}

interface H5PPlayerProps {
  /** Path to the extracted H5P folder inside `public`, e.g. `/h5p/neuronales-feuern` */
  h5pJsonPath: string
  title: string
  description?: string
  labels: H5PPlayerLabels
}

/**
 * The player writes the shared `window.H5PIntegration` object on every init, so
 * players mounted on the same page have to be set up one after another.
 */
let initQueue: Promise<unknown> = Promise.resolve()

function enqueueInit(init: () => Promise<unknown>) {
  const next = initQueue.then(init, init)
  initQueue = next.catch(() => undefined)
  return next
}

export default function H5PPlayer({
  h5pJsonPath,
  title,
  description,
  labels,
}: H5PPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  // The courses preload their branch media, so nothing is fetched until the
  // visitor actually starts one.
  const [started, setStarted] = useState(false)
  const [ready, setReady] = useState(false)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const element = containerRef.current
    if (!started || !element) return

    let cancelled = false
    setFailed(false)
    setReady(false)

    enqueueInit(async () => {
      if (cancelled) return
      // Imported lazily so the player bundle never runs during the static export.
      const { H5P } = await import("h5p-standalone")
      if (cancelled) return
      await new H5P(element, {
        h5pJsonPath,
        // all three packages ship the same libraries, deduplicated into one folder
        librariesPath: "/h5p/libraries",
        frameJs: "/h5p-standalone/frame.bundle.js",
        frameCss: "/h5p-standalone/styles/h5p.css",
        frame: true,
        copyright: true,
        icon: true,
        fullScreen: true,
      })
      if (!cancelled) setReady(true)
    }).catch((error) => {
      if (cancelled) return
      console.error(`Failed to load H5P content ${h5pJsonPath}`, error)
      setFailed(true)
    })

    return () => {
      cancelled = true
      element.innerHTML = ""
    }
  }, [h5pJsonPath, started])

  return (
    <div>
      {!started && (
        <div className="flex flex-col items-start gap-4 p-4 pt-0">
          {description && <p>{description}</p>}
          <Button size={"sm"} onClick={() => setStarted(true)}>
            <Play className="h-4 mr-2" />
            {labels.start}
          </Button>
        </div>
      )}
      {started && !ready && !failed && (
        <p className="p-4 pt-0">{labels.loading}</p>
      )}
      {failed && <p className="p-4 pt-0">{labels.error}</p>}
      <div ref={containerRef} aria-label={title} />
    </div>
  )
}
