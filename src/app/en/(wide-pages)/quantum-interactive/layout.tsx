"use client"

import { TracingBeam } from "@/components/animated/tracing-beam"
import H1 from "@/components/ui/typography/H1"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"

const navGroups = [
  {
    label: "Kits",
    items: [
      {
        label: "QOOOL Sensing DIY",
        value: "diy",
        href: "/en/quantum-interactive/diy",
      },
      {
        label: "QOOOL Kit Fluoro",
        value: "fluoro",
        href: "/en/quantum-interactive/fluoro",
      },
      {
        label: "QOOOL Kit Magneto",
        value: "magneto",
        href: "/en/quantum-interactive/magneto",
      },
    ],
  },
  {
    label: "Materials",
    items: [
      {
        label: "Learning and Experimental Materials",
        value: "lernmaterialien",
        href: "/en/quantum-interactive/lernmaterialien",
      },
    ],
  },
]

const allNavItems = navGroups.flatMap((g) => g.items)

export default function QuantumInteractiveLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <>
      <H1>Quantum Interactive</H1>

      {/* Mobile: horizontal scrollable pill nav */}
      <div className="lg:hidden flex gap-2 overflow-x-auto py-4 pb-6">
        {allNavItems.map((item) => (
          <Link key={item.value} href={item.href} className="shrink-0">
            <div
              className={cn(
                "rounded-xl px-4 py-2 text-sm transition-all border",
                pathname.includes(item.value)
                  ? "bg-[#96b239] text-white font-semibold border-[#96b239]"
                  : "border-[#96b239]/50 text-[#96b239] hover:bg-[#96b239]/10"
              )}
            >
              {item.label}
            </div>
          </Link>
        ))}
      </div>

      {/* Desktop: sidebar left of the TracingBeam */}
      <div className="lg:flex lg:gap-20 py-6">
        <aside className="hidden lg:block w-56 shrink-0 self-start">
          <nav className="rounded-2xl bg-gradient-to-br from-[#96b239]/80 to-[#96b239]/70 p-3 text-white sticky top-6">
            {navGroups.map((group) => (
              <div key={group.label} className="mb-2 last:mb-0">
                <p className="text-xs uppercase font-semibold opacity-60 px-3 py-1 tracking-wider">
                  {group.label}
                </p>
                {group.items.map((item) => (
                  <Link key={item.value} href={item.href}>
                    <div
                      className={cn(
                        "rounded-xl px-3 py-2 text-sm transition-all break-words",
                        pathname.includes(item.value)
                          ? "bg-white/25 font-semibold"
                          : "hover:bg-white/15"
                      )}
                    >
                      {item.label}
                    </div>
                  </Link>
                ))}
              </div>
            ))}
          </nav>
        </aside>

        {/* TracingBeam wraps the content — beam SVG floats left into the gap */}
        <div className="flex-1 min-w-0">
          <TracingBeam>{children}</TracingBeam>
        </div>
      </div>
    </>
  )
}
