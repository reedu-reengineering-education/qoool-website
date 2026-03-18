"use client"

import { TracingBeam } from "@/components/animated/tracing-beam"
import Navbar from "@/components/layout/navbar"

export default function SubLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto">
        <TracingBeam>{children}</TracingBeam>
      </div>
    </>
  )
}
