import createMdx from "@next/mdx"
import { withContentlayer } from "next-contentlayer"
import rehypePrism from "rehype-prism-plus"
import remarkGfm from "remark-gfm"
import type { NextConfig } from "next"

const withMDX = createMdx({
  extension: /\.(md|mdx)$/,
  options: {
    remarkPlugins: ["remark-gfm"],
    rehypePlugins: ["rehype-prism-plus"],
  },
})

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "reedu.de",
      },
      {
        protocol: "https",
        hostname: "cloud.reedu.de",
      },
    ],
  },
  reactStrictMode: true,
}

export default withMDX(withContentlayer(nextConfig))
