import { use } from "react"
import { allActivities } from "contentlayer/generated"
import { format, parseISO } from "date-fns"
import MdxRenderer from "@/components/MdxRenderer"

// export const generateStaticParams = async () =>
//   allActivities.map((activity) => ({ slug: activity._raw.flattenedPath }))

export const generateMetadata = async (props: {
  params: Promise<{ slug: string }>
}) => {
  const params = await props.params
  const post = allActivities.find(
    (activity) => activity._raw.flattenedPath === `activities/${params.slug}`
  )
  if (!post) throw new Error(`Post not found for slug: ${params.slug}`)
  return { title: post.title }
}

const PostLayout = (props: { params: Promise<{ slug: string }> }) => {
  const params = use(props.params)
  const post = allActivities.find(
    (activity) => activity._raw.flattenedPath === `activities/${params.slug}`
  )
  if (!post) throw new Error(`Post not found for slug: ${params.slug}`)

  return (
    <article className="mx-auto max-w-xl py-8">
      <div className="mb-8 text-center">
        <time
          dateTime={post.date}
          className="mb-1 text-xs text-muted-foreground"
        >
          {format(parseISO(post.date), "LLLL d, yyyy")}
        </time>
        <h1 className="text-3xl font-bold">{post.title}</h1>
      </div>
      <MdxRenderer code={post.body.code} />
    </article>
  )
}

export default PostLayout
