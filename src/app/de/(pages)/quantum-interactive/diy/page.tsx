"use client"
import { useRouter } from "next/navigation"

export default function LearnModulesQuizPage() {
  const router = useRouter()
  router.replace("/de/quantum-interactive/diy/quenching")
  return null
}
