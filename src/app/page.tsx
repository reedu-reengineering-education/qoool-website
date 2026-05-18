import { headers } from "next/headers"
import { redirect } from "next/navigation"

export default async function Page() {
  const language = (await headers()).get("Accept-Language")

  if (language?.includes("de")) {
    redirect("/de")
  }

  redirect("/en")
}
