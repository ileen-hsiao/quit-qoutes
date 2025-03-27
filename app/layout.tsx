import "./globals.css"
import type { Metadata } from "next"

export const metadata = {
  title: "Quit Quotes",
  description: "Daily quotes for your health and happiness (:",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-Hant">
      <body>{children}</body>
    </html>
  )
}
