"use client"

import QooolLogo from "@/assets/images/qoool_logo_trans_background.png"
import { cn } from "@/lib/utils"
import { ArrowLeftIcon, Instagram } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import LanguageSwitcher from "../language-switcher"
import { Button } from "../ui/button"

export default function Navbar({ sticky }: { sticky?: boolean }) {
  const pathname = usePathname()

  const lng = pathname.split("/")[1]

  return (
    <nav
      className={cn(
        "mx-auto flex w-full items-center justify-between flex-wrap py-6 z-30 relative",
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
        <Image src={QooolLogo} width={160} height={100} alt="Logo" />
      )}

      <div className="flex items-center gap-2">
        <Link href={`https://www.instagram.com/qoool_sensing/`} target="_blank">
          <Button size="icon" variant="outline">
            <Instagram className="h-6" />
          </Button>
        </Link>
        <LanguageSwitcher currentLng={lng} />
      </div>
    </nav>
  )
}
