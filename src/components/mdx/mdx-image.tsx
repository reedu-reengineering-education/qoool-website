import { cn } from "@/lib/utils"
import Image, { ImageProps } from "next/image"

export function MdxImage(props: ImageProps) {
  // If src is a data URL, use a plain <img>
  if (typeof props.src === "string" && props.src.startsWith("data:")) {
    return (
      <img
        {...props}
        alt={props.alt}
        className={cn("rounded-md", props.className)}
        style={{ width: "100%", height: "auto", ...props.style }}
      />
    )
  }
  return (
    <Image
      // placeholder="blur"
      {...props}
      alt={props.alt}
      className={cn("rounded-md", props.className)}
    />
  )
}
