"use client"
import { DialogTitle } from "@radix-ui/react-dialog"
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion"
import { Smile } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
} from "../ui/dialog"

export const AnimatedTooltip = ({
  items,
}: {
  items: {
    id: number
    name: string
    designation: string
    image: string
    about: string
  }[]
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const springConfig = { stiffness: 100, damping: 5 }
  const x = useMotionValue(0) // going to set this value on mouse move
  // rotate the tooltip
  const rotate = useSpring(
    useTransform(x, [-100, 100], [-45, 45]),
    springConfig
  )
  // translate the tooltip
  const translateX = useSpring(
    useTransform(x, [-100, 100], [-50, 50]),
    springConfig
  )
  const handleMouseMove = (event: any) => {
    const halfWidth = event.target.offsetWidth / 2
    x.set(event.nativeEvent.offsetX - halfWidth) // set the x value, which is then used in transform and rotate
  }

  return (
    <>
      {items.map((item, idx) => (
        <Dialog key={item.name}>
          <DialogTrigger
            className="-mr-4  relative group"
            onMouseEnter={() => setHoveredIndex(item.id)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <AnimatePresence mode="wait">
              {hoveredIndex === item.id && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.6 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                      type: "spring",
                      stiffness: 260,
                      damping: 10,
                    },
                  }}
                  exit={{ opacity: 0, y: 20, scale: 0.6 }}
                  style={{
                    translateX: translateX,
                    rotate: rotate,
                    whiteSpace: "nowrap",
                  }}
                  className="absolute -top-16 -left-1/2 translate-x-1/2 flex text-xs  flex-col items-center justify-center rounded-md bg-black z-50 shadow-xl px-4 py-2"
                >
                  <div className="absolute inset-x-10 z-30 w-[20%] -bottom-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent h-px " />
                  <div className="absolute left-10 w-[40%] z-30 -bottom-px bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px " />
                  <div className="font-bold text-white relative z-30 text-base">
                    {item.name}
                  </div>
                  <div className="text-white text-xs">{item.designation}</div>
                </motion.div>
              )}
            </AnimatePresence>
            {item.image && (
              <Image
                onMouseMove={handleMouseMove}
                height={100}
                width={100}
                src={item.image}
                alt={item.name}
                className="object-cover bg-muted-foreground !m-0 !p-0 object-top rounded-full h-14 w-14 border-2 group-hover:scale-105 group-hover:z-30 border-white  relative transition duration-500"
              />
            )}
            {!item.image && (
              <div
                onMouseMove={handleMouseMove}
                className="bg-muted rounded-full h-14 w-14 border-2 group-hover:scale-105 group-hover:z-30 border-white relative transition duration-500 flex items-center justify-center"
              >
                <Smile />
              </div>
            )}
          </DialogTrigger>
          <DialogContent>
            <DialogTitle className="font-bold">{item.name}</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              <div>{item.designation}</div>
            </DialogDescription>
            <div>{item.about}</div>
          </DialogContent>
        </Dialog>
      ))}
    </>
  )
}
