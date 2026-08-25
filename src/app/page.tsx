"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Page() {
  const router = useRouter()

  useEffect(() => {
    const lang = navigator.language || navigator.languages?.[0] || ""
    router.replace(lang.toLowerCase().startsWith("de") ? "/de" : "/en")
  }, [router])

  return (
    <noscript>
      <meta httpEquiv="refresh" content="0; url=/en" />
    </noscript>
  )
}
