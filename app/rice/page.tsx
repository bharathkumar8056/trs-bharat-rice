"use client"
import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import riceByState, { basmati, type Rice } from "@/lib/rice"

const fallbackImage = (name: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='600' height='400'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0%25' stop-color='%23fef3c7'/><stop offset='100%25' stop-color='%23dbeafe'/></linearGradient></defs><rect fill='url(%23g)' width='600' height='400'/><text x='50%25' y='48%25' font-family='Arial, sans-serif' font-size='28' font-weight='700' fill='%231e3a8a' text-anchor='middle'>${name}</text><text x='50%25' y='60%25' font-family='Arial, sans-serif' font-size='16' fill='%23b45309' text-anchor='middle'>Premium Indian Rice</text></svg>`,
  )}`

function RiceCard({ rice }: { rice: Rice }) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border-blue-200">
      <div className="relative w-full h-56 bg-gray-100 overflow-hidden">
        <img
          src={rice.image}
          alt={rice.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            const img = e.target as HTMLImageElement
            img.src = fallbackImage(rice.name)
          }}
        />
      </div>
      <CardHeader>
        <CardTitle className="text-lg text-blue-900">{rice.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-3 leading-relaxed">{rice.description}</p>
        <div className="space-y-1 text-sm">
          {rice.origin && (
            <p className="text-blue-700">
              <span className="font-semibold">Origin:</span> {rice.origin}
            </p>
          )}
          {rice.minOrder && (
            <p className="text-blue-700">
              <span className="font-semibold">Min Order:</span> {rice.minOrder}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default function RiceVarietiesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900 to-blue-800 text-white shadow-lg sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-md">
                <img
                  src="/assets/logo-trs.jpeg"
                  alt="TRS Bharat Global Solutions Logo"
                  className="w-10 h-10 object-contain"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold">TRS Bharat Global Solutions</h1>
                <p className="text-blue-200 text-sm">Premium Export Solutions</p>
              </div>
            </div>
            <Link href="/">
              <Button variant="outline" className="text-black border-white hover:bg-gray-100">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-900 mb-4">Rice Varieties</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore our premium collection of rice varieties sourced from across India. From the aromatic Basmati to
            regional specialties of Tamil Nadu, Kerala, Karnataka, and Andhra Pradesh — each variety meets international
            quality standards.
          </p>
        </div>

        {/* Featured: Basmati */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Badge className="bg-amber-600 text-white px-3 py-1">Featured</Badge>
            <h2 className="text-3xl font-bold text-blue-900">Basmati Rice</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <RiceCard rice={basmati} />
            </div>
            <div className="md:col-span-2 bg-gradient-to-br from-blue-50 to-amber-50 rounded-lg p-6 shadow-sm border border-blue-100">
              <h3 className="text-2xl font-bold text-blue-900 mb-3">The King of Rice</h3>
              <p className="text-blue-700 leading-relaxed mb-4">
                Basmati rice is renowned worldwide for its distinctive aroma, delicate flavor, and long, slender grains
                that elongate further when cooked. Sourced from the foothills of the Himalayas and aged to perfection,
                our Basmati rice is the preferred choice for biryanis, pilafs, and gourmet cuisine across the globe.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="bg-amber-100 text-amber-800">Long Grain</Badge>
                <Badge variant="secondary" className="bg-amber-100 text-amber-800">Aromatic</Badge>
                <Badge variant="secondary" className="bg-amber-100 text-amber-800">Aged Premium</Badge>
                <Badge variant="secondary" className="bg-amber-100 text-amber-800">Export Grade</Badge>
              </div>
            </div>
          </div>
        </section>

        {/* Varieties by State - Sliding Tabs */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-blue-900 mb-2">Regional Varieties</h2>
            <p className="text-blue-700 max-w-2xl mx-auto">
              Browse our state-wise collection of premium Indian rice varieties.
            </p>
          </div>

          <Tabs defaultValue={riceByState[0].state} className="w-full">
            <TabsList className="grid grid-cols-2 sm:grid-cols-4 mb-8 w-full h-auto bg-blue-50 p-1 rounded-lg">
              {riceByState.map((stateBlock) => (
                <TabsTrigger
                  key={stateBlock.state}
                  value={stateBlock.state}
                  className="text-xs sm:text-sm py-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-900 data-[state=active]:to-blue-800 data-[state=active]:text-white"
                >
                  {stateBlock.state}
                </TabsTrigger>
              ))}
            </TabsList>

            {riceByState.map((stateBlock) => (
              <TabsContent
                key={stateBlock.state}
                value={stateBlock.state}
                className="bg-white rounded-lg shadow-sm border border-blue-100 p-6"
              >
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-blue-900 mb-2">{stateBlock.state}</h3>
                  <p className="text-blue-700 max-w-3xl">{stateBlock.description}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {stateBlock.varieties.map((rice) => (
                    <RiceCard key={rice.slug} rice={rice} />
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </section>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Interested in Our Rice Varieties?</h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Contact us for bulk orders, samples, and export inquiries. We deliver premium Indian rice to markets
            worldwide with full quality assurance.
          </p>
          <Link href="/#contact">
            <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-100">
              Contact Us
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
