import Navbar from "@/components/layout/navbar"

export default function SubLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <div>
        <Navbar sticky />
        {children}
      </div>
    </>
  )
}
