import Navbar from "@/components/layout/navbar"

export default function SubLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Navbar />
      <div>{children}</div>
    </>
  )
}
