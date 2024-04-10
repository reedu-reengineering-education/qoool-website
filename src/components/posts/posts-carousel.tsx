import { compareDesc, format, parseISO } from "date-fns"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { i18n } from "../pages/home/i18n"
import { Card, CardContent } from "../ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel"
import H1 from "../ui/typography/H1"

interface PostsCarouselProps<T> {
  posts: T[]
  href: string
  title: string
}

export default function PostsCarousel<T>({
  posts,
  href,
  title,
}: PostsCarouselProps<
  T & {
    image: string
    date: string
    title: string
    url: string
  }
>) {
  const pathname = usePathname()

  const lng = pathname.split("/")[1] as keyof typeof i18n

  return (
    <Card className="mt-16 p-16 w-full lg:flex lg:gap-8 lg:items-end">
      <Link href={`/${lng}/${href}`}>
        <H1 className="border-none font-medium">{title}</H1>
      </Link>
      <Carousel
        opts={{
          align: "start",
        }}
        className="flex-1 md:mx-10"
      >
        <CarouselContent>
          {posts
            .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
            .map((post, index) => (
              <CarouselItem
                key={post.title}
                className="md:basis-1/2 lg:basis-full xl:basis-1/2 2xl:basis-1/3"
              >
                <Link className="p-1" href={`/${lng}${post.url}`}>
                  <Card className="overflow-hidden">
                    <div className="w-full h-48 bg-background relative">
                      <Image
                        src={post.image.split("./").at(-1)!}
                        alt={post.title}
                        fill
                        className="object-top object-cover"
                      />
                    </div>
                    <CardContent className="grid gap-2 p-6">
                      <span className="text-3xl font-semibold overflow-ellipsis overflow-hidden">
                        {post.title}
                      </span>
                      <time
                        dateTime={post.date}
                        className="mb-1 text-xs text-muted-foreground"
                      >
                        {format(parseISO(post.date), "LLLL d, yyyy")}
                      </time>
                    </CardContent>
                  </Card>
                </Link>
              </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </Card>
  )
}
