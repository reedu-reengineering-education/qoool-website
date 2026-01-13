import NextMdx from "@next/mdx"
import { withContentlayer } from "next-contentlayer"

const withMDX = NextMdx({
  extension: /\.mdx?$/,
})

/** @type {import('next').NextConfig} */
const nextConfig = {
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
  swcMinify: true,
}

export default withMDX(withContentlayer(nextConfig))
