import PostCard from "@/components/posts/post-card"
import { allActivities } from "contentlayer/generated"
import { compareDesc } from "date-fns"

export default function Page() {
  const activities = allActivities.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  )

  return (
    <>
      {activities.map((activity, idx) => (
        <PostCard key={idx} {...activity} />
      ))}
    </>
  )
}
