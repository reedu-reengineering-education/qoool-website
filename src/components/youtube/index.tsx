"use client"

import LiteYouTubeEmbed, { LiteYouTubeProps } from "react-lite-youtube-embed"
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css"

export default function Youtube(
  props: LiteYouTubeProps & React.RefAttributes<HTMLIFrameElement>
) {
  return <LiteYouTubeEmbed noCookie adNetwork={false} {...props} />
}
