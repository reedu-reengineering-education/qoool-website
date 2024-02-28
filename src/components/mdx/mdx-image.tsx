import { cn } from "@/lib/utils"
import Image, { ImageProps } from "next/image"

export function MdxImage(props: ImageProps) {
  return (
    <Image
      placeholder="blur"
      {...props}
      alt={props.alt}
      className={cn("rounded-md", props.className)}
    />
  )
}
