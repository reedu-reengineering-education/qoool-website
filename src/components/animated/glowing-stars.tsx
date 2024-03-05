"use client"

import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"

export const GlowingStarsBackgroundCard = ({
  className,
}: {
  className?: string
}) => {
  const [mouseEnter, setMouseEnter] = useState(false)

  return (
    <div
      onMouseEnter={() => {
        setMouseEnter(true)
      }}
      onMouseLeave={() => {
        setMouseEnter(false)
      }}
      className={cn("h-full w-full", className)}
    >
      <div className="flex justify-center items-center w-full h-full">
        <Illustration mouseEnter={mouseEnter} />
      </div>
    </div>
  )
}

export const Illustration = ({ mouseEnter }: { mouseEnter: boolean }) => {
  const stars = 88
  const columns = 11

  const [glowingStars, setGlowingStars] = useState<number[]>([])

  const highlightedStars = useRef<number[]>([])

  useEffect(() => {
    const interval = setInterval(() => {
      highlightedStars.current = Array.from({ length: 5 }, () =>
        Math.floor(Math.random() * stars)
      )
      setGlowingStars([...highlightedStars.current])
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className="h-full p-1 w-full"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: "1px",
      }}
    >
      {[...Array(stars)].map((_, starIdx) => {
        const isGlowing = glowingStars.includes(starIdx)
        const delay = (starIdx % 10) * 0.1
        const staticDelay = starIdx * 0.01
        return (
          <div
            key={`matrix-col-${starIdx}}`}
            className="relative flex items-center justify-center"
          >
            <Star
              isGlowing={mouseEnter ? true : isGlowing}
              delay={mouseEnter ? staticDelay : delay}
            />
            {mouseEnter && <Glow delay={staticDelay} />}
            <AnimatePresence mode="wait">
              {isGlowing && <Glow delay={delay} />}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

const Star = ({ isGlowing, delay }: { isGlowing: boolean; delay: number }) => {
  return (
    <motion.div
      key={delay}
      initial={{
        scale: 1,
      }}
      animate={{
        scale: isGlowing ? [1, 1.2, 2.5, 2.2, 1.5] : 1,
        background: isGlowing ? "#d5232a" : "#ccc",
      }}
      transition={{
        duration: 2,
        ease: "easeInOut",
        delay: delay,
      }}
      className={cn(
        "bg-[#d5232a] h-[1.5px] w-[1.5px] rounded-full relative z-20"
      )}
    />
  )
}

const Glow = ({ delay }: { delay: number }) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        duration: 2,
        ease: "easeInOut",
        delay: delay,
      }}
      exit={{
        opacity: 0,
      }}
      className="absolute  left-1/2 -translate-x-1/2 z-10 h-[4px] w-[4px] rounded-full bg-[#d5232a] blur-[1px] shadow-2xl shadow-[#96b239]"
    />
  )
}

{
  /* colors={["#96b239", "#d5232a", "#96b239"]} */
}
