"use client"

import H2 from "@/components/ui/typography/H2"
import P from "@/components/ui/typography/P"
import { ExternalLink } from "lucide-react"
import Link from "next/link"

export default function FluoroPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <H2>QOOOL Kit Fluoro – Simulator</H2>
        <P>
          Mit dem QOOOL Blockly Simulator lässt sich das QOOOL Kit Fluoro
          interaktiv programmieren und erkunden. Entwerfe eigene Messprogramme
          per Drag-and-Drop und beobachte, wie das Fluoreszenz-Kit darauf
          reagiert.
        </P>
        <Link
          href="https://blocklysimulator.netlify.app"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-[#96b239] hover:underline mt-1"
        >
          <ExternalLink className="h-4 w-4" />
          Im neuen Tab öffnen
        </Link>
      </div>
      <div
        className="rounded-2xl overflow-hidden border shadow-lg w-full"
        style={{ height: "80vh" }}
      >
        <iframe
          src="https://blocklysimulator.netlify.app"
          className="w-full h-full"
          title="QOOOL Blockly Simulator"
          allow="fullscreen"
        />
      </div>
    </div>
  )
}
