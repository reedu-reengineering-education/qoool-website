"use client"

import { cn } from "@/lib/utils"
import { ArrowLeftIcon } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import LanguageSwitcher from "../language-switcher"
import { Button } from "../ui/button"
import H2 from "../ui/typography/H2"

export default function Navbar({ sticky }: { sticky?: boolean }) {
  const pathname = usePathname()

  const lng = pathname.split("/")[1]

  return (
    <nav
      className={cn(
        "container mx-auto flex w-full items-center justify-between flex-wrap py-6 z-30 relative",
        sticky ? " fixed bg-background inset-x-0 " : ""
      )}
    >
      {!pathname.endsWith(`/${lng}`) ? (
        <Link href={`/${lng}`}>
          <Button variant={"ghost"}>
            <ArrowLeftIcon className="mr-2 h-5" />
            Home
          </Button>
        </Link>
      ) : (
        <H2 className="border-none py-0">QOOOL</H2>
      )}

      <LanguageSwitcher currentLng={lng} />
    </nav>
  )
}
