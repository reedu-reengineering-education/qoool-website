"use client"

import { format, parseISO } from "date-fns"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function PostCard<T>(
  post: T & {
    image: string
    date: string
    title: string
    url: string
  }
) {
  const pathname = usePathname()

  const lng = pathname.split("/")[1]
  return (
    <div className="mb-8">
      <h2 className="mb-1 text-xl">
        <Link
          href={"/" + lng + post.url}
          className="text-foreground hover:underline"
        >
          {post.title}
        </Link>
      </h2>
      <time
        dateTime={post.date}
        className="mb-2 block text-xs text-muted-foreground"
      >
        {format(parseISO(post.date), "LLLL d, yyyy")}
      </time>
    </div>
  )
}
