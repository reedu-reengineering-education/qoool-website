"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React, { useEffect, useState } from "react"

const tabs = [
  {
    label: "Quenching",
    value: "quenching",
    href: "/de/quantum-interactive/diy/quenching",
  },
  {
    label: "ODMR",
    value: "odmr",
    href: "/de/quantum-interactive/diy/odmr",
  },
  {
    label: "Challenge",
    value: "challenge",
    href: "/de/quantum-interactive/diy/challenge",
  },
]

export default function QuantumInteractiveLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [active, setActive] = useState<string>()

  console.log(pathname)

  useEffect(() => {
    const currentTab = tabs.find((tab) => pathname.includes(tab.value))
    if (currentTab) {
      setActive(currentTab.value)
    } else {
      setActive(tabs[0].value) // default to first tab if no match
    }
  }, [pathname])

  return (
    <div>
      <div className="flex justify-center py-6">
        <div className="rounded-2xl shadow-lg w-full max-w-5xl px-2">
          <Tabs
            value={active}
            onValueChange={(value) => setActive(value)}
            className="w-full"
          >
            <TabsList className="w-full flex h-fit">
              {tabs.map((tab) => (
                <Link
                  key={tab.value}
                  href={tab.href}
                  className="flex-1 text-center"
                >
                  <TabsTrigger
                    value={tab.value}
                    className={cn("w-full text-md")}
                  >
                    {tab.label}
                  </TabsTrigger>
                </Link>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-2 pb-12">{children}</div>
    </div>
  )
}
