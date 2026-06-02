"use client"
import type React from "react"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import RiceSearchContent from "./RiceSearchContent"

const fallbackImage = (name: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='600' height='400'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0%25' stop-color='%23fef3c7'/><stop offset='100%25' stop-color='%23dbeafe'/></linearGradient></defs><rect fill='url(%23g)' width='600' height='400'/><text x='50%25' y='48%25' font-family='Arial, sans-serif' font-size='28' font-weight='700' fill='%231e3a8a' text-anchor='middle'>${name}</text><text x='50%25' y='60%25' font-family='Arial, sans-serif' font-size='16' fill='%23b45309' text-anchor='middle'>Premium Indian Rice</text></svg>`,
  )}`

export default function RiceVarietiesPage() {
  const [bannerSrc, setBannerSrc] = useState("/assets/product-banner.jpg")

  return (
    <div suppressHydrationWarning className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <SiteHeader />

      {/* Banner */}
      <section className="relative w-full h-[260px] sm:h-[340px] lg:h-[420px] overflow-hidden">
        <img
          src={bannerSrc}
          alt="Premium Indian Rice Varieties"
          className="absolute inset-0 w-full h-full object-cover"
          onError={() => {
            setBannerSrc(fallbackImage("Rice Varieties"))
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-900/50 to-amber-900/30" />
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
          <Badge className="bg-amber-500 text-white border-0 w-fit mb-4 px-3 py-1">Our Catalog</Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg max-w-3xl leading-tight">
            Premium Indian <span className="text-amber-300">Rice Varieties</span>
          </h1>
          <p className="text-blue-100 text-lg mt-4 max-w-2xl drop-shadow">
            From the aromatic Basmati of the Himalayan foothills to the heritage rices of South India — explore our full export-grade catalog.
          </p>
        </div>
      </section>

      {/* Suspense boundary for search params handling */}
      <RiceSearchContent />

      <SiteFooter />
    </div>
  )
}
