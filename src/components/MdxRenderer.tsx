"use client"
import { useMDXComponent } from "next-contentlayer2/hooks"
import { useMDXComponents } from "@/mdx-components"

export default function MdxRenderer({ code }: { code: string }) {
  const MDXContent = useMDXComponent(code)
  return <MDXContent components={useMDXComponents({})} />
}
