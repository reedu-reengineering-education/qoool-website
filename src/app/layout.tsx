import Footer from "@/components/layout/footer"
import { cn } from "@/lib/utils"
import type { Metadata } from "next"
import { Outfit } from "next/font/google"
import Script from "next/script"
import "./globals.css"

export const metadata: Metadata = {
  title: "QOOOL-Sensing",
  description:
    "Discover the transformative potential of quantum technology with QOOOL. Dive into the world of quantum sensing and explore its applications with our sensor kits and interactive learning materials. Join us in unlocking the power of quantum sensing for education and innovation.",
  keywords:
    "quantum, sensing, education, innovation, sensor, kit, interactive, learning, materials, technology, transformative, potential, world, applications, QOOOL",
}

const font = Outfit({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>⚛</text></svg>"
        />
        {process.env.VERCEL_ENV === "production" && (
          <Script
            async
            src="https://umami.reedu.de/script.js"
            data-website-id="9347bf23-debe-4b95-bc9a-4f6cce9f7fef"
          />
        )}
      </head>
      <body
        className={cn(
          "h-full bg-background relative antialiased flex flex-col overflow-x-hidden",
          font.className
        )}
      >
        <main className="container mx-auto flex-1 pb-12 block">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
