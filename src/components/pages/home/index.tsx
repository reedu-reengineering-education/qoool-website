"use client"

import { WavyBackground } from "@/components/animated/wavy-background"
import BentoCard from "@/components/bento/bento-card"
import Markdown from "@/components/markdown"
import PostsCarousel from "@/components/posts/posts-carousel"
import H1 from "@/components/ui/typography/H1"
import { allActivities, allNews } from "contentlayer/generated"
import { usePathname } from "next/navigation"
import { i18n } from "./i18n"

export default function Home() {
  const pathname = usePathname()

  const lng = pathname.split("/")[1] as keyof typeof i18n

  return (
    <div className="flex flex-col items-center w-full gap-12">
      <WavyBackground
        className="w-full h-[50vh] md:h-[70vh] flex items-center justify-center p-8 md:p-16"
        backgroundFill="#09090b"
        colors={["#96b239", "#d5232a", "#96b239"]}
      >
        <H1 className="font-semibold lg:text-8xl">{i18n[lng].title}</H1>
      </WavyBackground>
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid auto-rows-[18rem] grid-cols-2 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <BentoCard className="col-span-2 row-span-3 md:row-span-2">
            <div className="absolute top-0 left-0 w-full h-full group-hover:scale-105 transition-all">
              <div className="h-full w-full bg-transparent  bg-grid-white/[0.2] relative flex items-center justify-center">
                <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
              </div>
            </div>
            <div className="absolute top-0 left-0 w-full h-full p-4 md:p-6 bg-background/60">
              <Markdown>{i18n[lng].mission}</Markdown>
            </div>
          </BentoCard>
          {/* <BackgroundGradient
            className="rounded-[22px] w-full h-full p-4 sm:p-10 bg-background overflow-hidden"
            > */}
          <BentoCard
            href={"/vision"}
            animatedBackground="glowing-stars"
            withGradientOutline
          >
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center p-4">
              <h2 className="text-2xl font-bold">{i18n[lng].vision}</h2>
            </div>
            {/* </BackgroundGradient> */}
          </BentoCard>
          <BentoCard
            href={"/world-of-quantum"}
            animatedBackground="beams"
            className="md:row-span-2"
            withGradientOutline
          >
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center p-4">
              <h2 className="text-2xl font-bold">
                {i18n[lng]["world-of-quantum"]}
              </h2>
            </div>
          </BentoCard>
          <BentoCard
            size="large"
            href={"/about"}
            animatedBackground="meteors"
            withGradientOutline
          >
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center p-4">
              <h2 className="text-2xl font-bold">{i18n[lng].about}</h2>
            </div>
          </BentoCard>
        </div>
      </div>
      <PostsCarousel
        posts={allActivities}
        href="activities"
        title={i18n[lng].activities}
      />
      <PostsCarousel posts={allNews} href="news" title={i18n[lng].news} />
    </div>
  )
}
