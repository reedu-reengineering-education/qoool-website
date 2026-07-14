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
          The QOOOL Blockly Simulator lets you interactively program and explore
          the QOOOL Kit Fluoro. Design your own measurement programs using
          drag-and-drop and see how the fluorescence kit responds.
        </P>
        <Link
          href="https://blocklysimulator.netlify.app"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-[#96b239] hover:underline mt-1"
        >
          <ExternalLink className="h-4 w-4" />
          Open the senseBox Blockly Simulator in a new tab and select the
          senseBox MCU-S2
        </Link>
      </div>
      {/* <div
        className="rounded-2xl overflow-hidden border shadow-lg w-full"
        style={{ height: "80vh" }}
      >
        <iframe
          src="https://blocklysimulator.netlify.app"
          className="w-full h-full"
          title="QOOOL Blockly Simulator"
          allow="fullscreen"
        />
      </div> */}
    </div>
  )
}
