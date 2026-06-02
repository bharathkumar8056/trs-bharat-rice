"use client"
import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { riceVarieties, basmatiVarieties, nonBasmatiVarieties, type Rice, type RiceCategory } from "@/lib/rice"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

const fallbackImage = (name: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='600' height='400'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0%25' stop-color='%23fef3c7'/><stop offset='100%25' stop-color='%23dbeafe'/></linearGradient></defs><rect fill='url(%23g)' width='600' height='400'/><text x='50%25' y='48%25' font-family='Arial, sans-serif' font-size='28' font-weight='700' fill='%231e3a8a' text-anchor='middle'>${name}</text><text x='50%25' y='60%25' font-family='Arial, sans-serif' font-size='16' fill='%23b45309' text-anchor='middle'>Premium Indian Rice</text></svg>`,
  )}`

function RiceCard({ rice }: { rice: Rice }) {
  return (
    <Link href={`/rice/${rice.slug}`} className="group block">
      <Card className="overflow-hidden border border-blue-100 hover:border-amber-400 hover:shadow-2xl transition-all duration-300 h-full bg-white">
        <div className="relative w-full h-56 bg-gradient-to-br from-amber-50 to-blue-50 overflow-hidden">
          <img
            src={rice.image}
            alt={rice.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={(e) => {
              const img = e.target as HTMLImageElement
              img.src = fallbackImage(rice.name)
            }}
          />
          <Badge className="absolute top-3 left-3 bg-amber-600 text-white border-0 shadow-md">{rice.category}</Badge>
        </div>
        <CardContent className="p-5">
          <h3 className="text-xl font-bold text-blue-900 mb-1 group-hover:text-amber-700 transition-colors">{rice.name}</h3>
          <p className="text-amber-700 text-xs font-medium uppercase tracking-wide mb-3">{rice.tagline}</p>
          <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 mb-4">{rice.shortDescription}</p>
          <div className="flex items-center justify-between pt-3 border-t border-blue-50">
            <span className="text-xs text-blue-600 font-medium">View Details</span>
            <ArrowRight className="w-4 h-4 text-amber-600 group-hover:translate-x-1 transition-transform" />
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

export default function RiceVarietiesPage() {
  const [activeCategory, setActiveCategory] = useState<RiceCategory | "All">("All")

  const displayed =
    activeCategory === "All"
      ? riceVarieties
      : activeCategory === "Basmati"
        ? basmatiVarieties
        : nonBasmatiVarieties

  const categories: Array<RiceCategory | "All"> = ["All", "Basmati", "Non-Basmati"]

  return (
    <div suppressHydrationWarning className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <SiteHeader />

      {/* Banner */}
      <section className="relative w-full h-[260px] sm:h-[340px] lg:h-[420px] overflow-hidden">
        <img
          src="/assets/product-banner.jpg"
          alt="Premium Indian Rice Varieties"
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => {
            const img = e.target as HTMLImageElement
            img.src = fallbackImage("Rice Varieties")
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

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Category Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex flex-wrap gap-2 bg-blue-50 p-1.5 rounded-xl border border-blue-100 shadow-sm">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 sm:px-8 py-2.5 rounded-lg text-sm sm:text-base font-semibold transition-all ${
                  activeCategory === cat
                    ? "bg-gradient-to-r from-blue-900 to-blue-800 text-white shadow-md"
                    : "text-blue-800 hover:bg-white"
                }`}
              >
                {cat}
                <span className="ml-2 text-xs opacity-75">
                  ({cat === "All" ? riceVarieties.length : cat === "Basmati" ? basmatiVarieties.length : nonBasmatiVarieties.length})
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Rice Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayed.map((rice) => (
            <RiceCard key={rice.slug} rice={rice} />
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-blue-900 to-blue-800 text-white rounded-2xl p-8 sm:p-10 text-center shadow-xl">
          <h2 className="text-3xl font-bold mb-4">Interested in Our Rice Varieties?</h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto text-blue-100">
            Contact us for bulk orders, samples, and export inquiries. We deliver premium Indian rice to markets worldwide with full quality assurance.
          </p>
          <Link href="/#contact">
            <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-white">
              Contact Us
            </Button>
          </Link>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
