"use client"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function LearnModulesQuizPage() {
  // replace to /de/quantum-interactive/lernmaterialien
  const router = useRouter()

  useEffect(() => {
    router.replace("/de/quantum-interactive/lernmaterialien")
  }, [router])

  return null
}
