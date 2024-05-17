import PostCard from "@/components/posts/post-card"
import { allNews } from "contentlayer/generated"
import { compareDesc } from "date-fns"

export default function Page() {
  const news = allNews
    .filter((e) => e.language === "de")
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))

  return (
    <>
      {news.map((news, idx) => (
        <PostCard key={idx} {...news} />
      ))}
    </>
  )
}
