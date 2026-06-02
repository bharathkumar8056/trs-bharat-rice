import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Check, ChefHat, MapPin, Package, Sparkles } from "lucide-react"
import { riceVarieties, getRiceBySlug } from "@/lib/rice"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export function generateStaticParams() {
  return riceVarieties.map((r) => ({ slug: r.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const rice = getRiceBySlug(slug)
  if (!rice) return { title: "Rice Not Found" }
  return {
    title: `${rice.name} | TRS Bharat Global Solutions`,
    description: rice.shortDescription,
  }
}

const fallbackImage = (name: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0%25' stop-color='%23fef3c7'/><stop offset='100%25' stop-color='%23dbeafe'/></linearGradient></defs><rect fill='url(%23g)' width='800' height='600'/><text x='50%25' y='50%25' font-family='Arial, sans-serif' font-size='32' font-weight='700' fill='%231e3a8a' text-anchor='middle'>${name}</text></svg>`,
  )}`

export default async function RiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const rice = getRiceBySlug(slug)
  if (!rice) notFound()

  const related = riceVarieties.filter((r) => r.slug !== rice.slug && r.category === rice.category).slice(0, 3)

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <SiteHeader />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-blue-100">
        <div className="container mx-auto px-4 py-3 text-sm text-blue-700">
          <Link href="/" className="hover:text-amber-600">Home</Link>
          <span className="mx-2 text-blue-300">/</span>
          <Link href="/rice" className="hover:text-amber-600">Rice Varieties</Link>
          <span className="mx-2 text-blue-300">/</span>
          <span className="text-blue-900 font-medium">{rice.name}</span>
        </div>
      </div>

      {/* Hero */}
      <section className="container mx-auto px-4 py-10 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          {/* Image */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-amber-50 to-blue-50 aspect-[4/3]">
              <img
                src={rice.image}
                alt={rice.name}
                className="w-full h-full object-cover"
                /* eslint-disable-next-line @next/next/no-img-element */
              />
            </div>
            <Badge className="absolute -top-3 -left-3 bg-amber-600 text-white border-0 shadow-lg px-4 py-2 text-sm">{rice.category}</Badge>
          </div>

          {/* Content */}
          <div>
            <p className="text-amber-700 text-sm font-semibold uppercase tracking-wider mb-2">{rice.tagline}</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-blue-900 mb-4 leading-tight">{rice.name}</h1>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">{rice.shortDescription}</p>

            <div className="flex flex-wrap gap-2 mb-6">
              {rice.features.map((f) => (
                <Badge key={f} variant="secondary" className="bg-amber-50 text-amber-800 border border-amber-200 px-3 py-1">
                  <Sparkles className="w-3 h-3 mr-1" /> {f}
                </Badge>
              ))}
            </div>

            {/* <div className="bg-gradient-to-br from-blue-50 to-amber-50 border border-blue-100 rounded-xl p-5 mb-6">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-blue-600 font-medium">Origin</p>
                    <p className="text-blue-900 font-semibold">{rice.specifications.find((s) => s.label === "Origin")?.value ?? "India"}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Package className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-blue-600 font-medium">Min Order</p>
                    <p className="text-blue-900 font-semibold">{rice.specifications.find((s) => s.label === "Min Order Quantity")?.value ?? "10 MT"}</p>
                  </div>
                </div>
              </div>
            </div> */}

            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/#contact" className="flex-1">
                <Button size="lg" className="w-full bg-blue-900 hover:bg-blue-800 text-white">Request Quote</Button>
              </Link>
              <Link href="/#contact" className="flex-1">
                <Button size="lg" variant="outline" className="w-full border-2 border-amber-600 text-amber-700 hover:bg-amber-50">
                  Request Sample
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="container mx-auto px-4 pb-12">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg border border-blue-100 p-8 sm:p-10">
          <h2 className="text-3xl font-bold text-blue-900 mb-4">About {rice.name}</h2>
          <div className="w-20 h-1 bg-amber-500 rounded-full mb-6" />
          <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">{rice.description}</p>
        </div>
      </section>

      {/* Specifications + Usage */}
      <section className="container mx-auto px-4 pb-12">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-8">
          {/* Specifications */}
          <div className="bg-white rounded-2xl shadow-lg border border-blue-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-900 to-blue-800 px-6 py-4">
              <h2 className="text-2xl font-bold text-white">Specifications</h2>
            </div>
            <div className="p-6">
              <table className="w-full">
                <tbody>
                  {rice.specifications.map((spec, i) => (
                    <tr key={spec.label} className={i % 2 === 0 ? "bg-blue-50/50" : ""}>
                      <td className="py-3 px-4 text-sm text-blue-800 font-semibold border-b border-blue-50">{spec.label}</td>
                      <td className="py-3 px-4 text-sm text-gray-700 border-b border-blue-50">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Usage */}
          <div className="bg-white rounded-2xl shadow-lg border border-blue-100 overflow-hidden">
            <div className="bg-gradient-to-r from-amber-600 to-amber-500 px-6 py-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <ChefHat className="w-6 h-6" /> Culinary Uses
              </h2>
            </div>
            <div className="p-6">
              <ul className="space-y-3">
                {rice.usage.map((u) => (
                  <li key={u} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{u}</span>
                  </li>
                ))}
              </ul>
              {rice.cookingTip && (
                <div className="mt-6 p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r-lg">
                  <p className="text-sm font-bold text-amber-900 mb-1">Chef's Tip</p>
                  <p className="text-sm text-amber-800 leading-relaxed">{rice.cookingTip}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Related Varieties */}
      {related.length > 0 && (
        <section className="container mx-auto px-4 pb-12">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-blue-900 mb-2 text-center">More {rice.category} Varieties</h2>
            <div className="w-20 h-1 bg-amber-500 rounded-full mx-auto mb-8" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((r) => (
                <Link key={r.slug} href={`/rice/${r.slug}`} className="group">
                  <div className="bg-white rounded-xl shadow-md border border-blue-100 overflow-hidden hover:shadow-2xl hover:border-amber-300 transition-all">
                    <div className="h-44 overflow-hidden bg-gradient-to-br from-amber-50 to-blue-50">
                      <img src={r.image} alt={r.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-blue-900 group-hover:text-amber-700 transition-colors">{r.name}</h3>
                      <p className="text-xs text-gray-600 mt-1 line-clamp-2">{r.shortDescription}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="container mx-auto px-4 pb-16">
        <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white rounded-2xl p-8 sm:p-10 text-center shadow-xl max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Ready to Order {rice.name}?</h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto text-blue-100">
            Contact our export team for bulk pricing, samples, packaging options and shipping schedules. We deliver worldwide with full documentation and quality assurance.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/#contact">
              <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-white">Contact Sales Team</Button>
            </Link>
            <Link href="/rice">
              <Button size="lg" variant="outline" className="border-white text-white bg-white/10 hover:bg-white hover:text-blue-900">
                View All Varieties
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
