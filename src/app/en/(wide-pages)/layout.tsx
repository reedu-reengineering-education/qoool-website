import Navbar from "@/components/layout/navbar"

export default function WideLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4">{children}</div>
    </>
  )
}
