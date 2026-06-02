import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShieldCheck } from "lucide-react"
import { BlogImage } from "@/components/blog-image"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

type Certification = {
  code: string
  fullName: string
  authority: string
  image: string
  badgeColor: string
}

const certifications: Certification[] = [
  {
    code: "IEC",
    fullName: "IEC",
    authority: "Import Export Code",
    image: "/assets/certifications/IEC.png",
    badgeColor: "bg-blue-700",
  },
  {
    code: "GST",
    fullName: "GST",
    authority: "Goods & Services Tax Registration",
    image: "/assets/certifications/GST.png",
    badgeColor: "bg-amber-600",
  },
  {
    code: "FSSAI",
    fullName: "FSSAI",
    authority: "Food Safety & Standards Authority of India Licence",
    image: "/assets/certifications/fssai.png",
    badgeColor: "bg-green-700",
  },
]

function CertificationCard({ cert }: { cert: Certification }) {
  return (
    <Card className="overflow-hidden border-blue-200 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col group">
      {/* Rectangular A4-portrait-style container for PDF screenshots */}
      <div className="relative w-full bg-white border-b border-blue-100 overflow-hidden">
        <div className="relative w-full" style={{ aspectRatio: "1 / 1.414" }}>
          <BlogImage
            src={cert.image}
            alt={`${cert.code} certificate`}
            category={cert.code}
            className="absolute inset-0 w-full h-full object-contain p-4 group-hover:scale-[1.02] transition-transform duration-500"
          />
          <div className="absolute top-3 left-3 z-10">
            <Badge className={`${cert.badgeColor} text-white shadow-md`}>{cert.code}</Badge>
          </div>
        </div>
      </div>

      <CardContent className="p-6 flex flex-col flex-1 bg-gradient-to-br from-blue-50 to-amber-50">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-900 mb-1 leading-tight">{cert.fullName}</h2>
        <p className="text-xs text-amber-700 font-semibold uppercase tracking-wide mb-3">{cert.authority}</p>
      </CardContent>
    </Card>
  )
}

export default function CertificationsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <SiteHeader />

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-800 text-white py-16 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-400/40 px-4 py-1.5 rounded-full mb-5">
            <ShieldCheck className="w-4 h-4 text-amber-300" />
            <span className="text-sm font-semibold text-amber-200 uppercase tracking-wide">Verified & Compliant</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Our <span className="text-amber-400">Certifications</span>
          </h1>
          <p className="text-blue-100 text-lg sm:text-xl leading-relaxed">
            TRS Bharat Global Solutions operates under the full regulatory framework that governs Indian
            export, taxation, and food safety — giving our partners the documented trust they need at every
            border, port, and warehouse.
          </p>
        </div>
      </section>

      {/* Certifications grid */}
      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {certifications.map((cert) => (
            <CertificationCard key={cert.code} cert={cert} />
          ))}
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
