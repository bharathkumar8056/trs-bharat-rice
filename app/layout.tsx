// import type { Metadata } from 'next'
// import './globals.css'

// export const metadata: Metadata = {
//   title: 'v0 App',
//   description: 'Created with v0',
//   generator: 'v0.dev',
// }

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode
// }>) {
//   return (
//     <html lang="en">
//       <body>{children}</body>
//     </html>
//   )
// }


import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import type { Metadata } from "next"
import { Playfair_Display, Poppins } from "next/font/google"

// Font setup
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
})

export const metadata: Metadata = {
  title: "TRS Bharat Rice Exports",
  description:
    " Premium Indian Rice for Global Markets",
  icons: {
    icon: "/assets/logo-trs.jpeg",
    shortcut: "/assets/logo-trs.jpeg",
    apple: "/assets/logo-trs.jpeg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${playfair.variable} ${poppins.variable}`}>
      <head>
        <link rel="icon" href="/assets/logo-trs.jpeg" type="image/png" />
        <link rel="shortcut icon" href="/assets/logo-trs.jpeg" type="image/png" />
        <link rel="apple-touch-icon" href="/assets/logo-trs.jpeg" />
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
