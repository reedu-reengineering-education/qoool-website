"use client"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function LearnModulesQuizPage() {
  const router = useRouter()

  useEffect(() => {
    router.replace("/en/quantum-interactive/diy/quenching")
  }, [router])

  return null
}
