"use client"

import Navbar from "@/components/layout/navbar"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import H1 from "@/components/ui/typography/H1"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React, { useEffect, useState } from "react"

const tabs = [
  {
    label: "Lern- und Experimentiermaterialien",
    value: "lernmaterialien",
    href: "/de/quantum-interactive/lernmaterialien",
  },
  {
    label: "QOOOL Sensing DIY",
    value: "diy",
    href: "/de/quantum-interactive/diy",
  },
  {
    label: "QOOOL Kit Magneto",
    value: "magneto",
    href: "/de/quantum-interactive/magneto",
  },
]

export default function QuantumInteractiveLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [active, setActive] = useState<string>()

  useEffect(() => {
    const currentTab = tabs.find((tab) => pathname.includes(tab.value))
    if (currentTab) {
      setActive(currentTab.value)
    } else {
      setActive(tabs[0].value) // default to first tab if no match
    }
  }, [pathname])

  return (
    <>
      <H1>Quanten Interaktiv</H1>
      <div className="flex justify-center py-6">
        <div className="rounded-2xl shadow-lg w-full max-w-5xl px-2">
          <Tabs
            value={active}
            onValueChange={(value) => setActive(value)}
            className="w-full"
          >
            <TabsList className="w-full flex flex-col sm:flex-row bg-gradient-to-br from-[#96b239]/80 to-[#96b239]/70 backdrop-blur-3xl text-white rounded-2xl h-fit">
              {tabs.map((tab) => (
                <Link
                  key={tab.value}
                  href={tab.href}
                  className="w-full sm:flex-1 text-center"
                >
                  <TabsTrigger
                    value={tab.value}
                    className={cn(
                      "w-full text-base sm:text-md p-3 sm:p-4 whitespace-pre-wrap"
                    )}
                  >
                    {tab.label}
                  </TabsTrigger>
                </Link>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="max-w-5xl mx-auto">{children}</div>
    </>
  )
}
