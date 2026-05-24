"use client"
import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import flowers from "@/lib/flowers"

export default function FlowerVarietiesPage() {
  // using shared `flowers` data from lib/flowers

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900 to-blue-800 text-white shadow-lg sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-md">
                <img
                  src="/assets/trs-logo.jpg"
                  alt="TRS Bharat Global Solutions Logo"
                  className="w-10 h-10 object-contain"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold">TRS Bharat Global Solutions</h1>
                <p className="text-blue-200 text-sm">Premium Export Solutions</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="outline" className="text-black border-white hover:bg-white-800">
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-900 mb-4">Flower Varieties</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our premium collection of fresh flowers sourced from the finest farms across India. Each variety
            is carefully selected and processed to meet international quality standards.
          </p>
        </div>

        {/* Flowers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {flowers.map((flower, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative w-full h-64 bg-gray-200 overflow-hidden">
                <img
                  src={flower.image}
                  alt={flower.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    const img = e.target as HTMLImageElement
                    img.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23e5e7eb' width='400' height='300'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='16' fill='%236b7280' text-anchor='middle' dy='.3em'%3EFlower Image%3C/text%3E%3C/svg%3E"
                  }}
                />
              </div>
              <CardHeader>
                <CardTitle className="text-lg text-blue-900">{flower.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Min Order Quantity:</span> {flower.minOrder}
                  </p>
                </div>
                <Link href={`/flowers/${flower.slug}`}>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white">
                    View Details
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Interested in Our Flowers?</h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Contact us for bulk orders, custom arrangements, and export inquiries. We deliver the freshest flowers to
            markets worldwide.
          </p>
          <Link href="/">
            <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-100">
              Contact Us
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
