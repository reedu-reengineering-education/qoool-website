import { useMDXComponents } from "@/mdx-components"
import { allNews } from "contentlayer/generated"
import { format, parseISO } from "date-fns"
import { useMDXComponent } from "next-contentlayer/hooks"

// export const generateStaticParams = async () =>
//   allNews.map((news) => ({ slug: news._raw.flattenedPath }))

export const generateMetadata = ({ params }: { params: { slug: string } }) => {
  const post = allNews
    .filter((e) => e.language === "en")
    .find((news) => news._raw.flattenedPath === `news/${params.slug}`)
  if (!post) throw new Error(`Post not found for slug: ${params.slug}`)
  return { title: post.title }
}

const PostLayout = ({ params }: { params: { slug: string } }) => {
  const post = allNews
    .filter((e) => e.language === "en")
    .find((news) => news._raw.flattenedPath === `news/${params.slug}`)
  if (!post) throw new Error(`Post not found for slug: ${params.slug}`)

  const MDXContent = useMDXComponent(post.body.code)

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
      <MDXContent components={useMDXComponents({})} />
    </article>
  )
}

export default PostLayout
