"use client"

import QooolLogo from "@/assets/images/qoool_logo_trans_background.png"
import { cn } from "@/lib/utils"
import { ArrowLeftIcon } from "lucide-react"
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
        <Image src={QooolLogo} width={150} height={100} alt="Logo" />
      )}

      <LanguageSwitcher currentLng={lng} />
    </nav>
  )
}
