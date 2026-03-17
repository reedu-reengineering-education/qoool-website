"use client"

import { TracingBeam } from "@/components/animated/tracing-beam"
import Navbar from "@/components/layout/navbar"
import { usePathname } from "next/navigation"

export default function SubLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()

  if (pathname.includes("quantum-interactive")) {
    return <>{children}</>
  }

  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto">
        <TracingBeam>{children}</TracingBeam>
      </div>
    </>
  )
}
