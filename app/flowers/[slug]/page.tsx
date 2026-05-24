import React from "react"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import flowers from "@/lib/flowers"

type Props = {
  params: any
}

export default async function FlowerDetailPage({ params }: Props) {
  const { slug } = await params
  const flower = flowers.find((f) => f.slug === slug)
  if (!flower) return notFound()

  const whatsappNumber = "919025071760"
  const waMessage = encodeURIComponent(
    `Hello, I am interested in ${flower.name}. Please share a quote.`,
  )
  const emailMessage = `Hello, I am interested in ${flower.name}. Please share a quote.`

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="container mx-auto px-4">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/flowers" className="inline-flex items-center gap-2 text-sm text-blue-700">
              <span className="px-3 py-2 bg-white rounded shadow">← Back</span>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-blue-900">{flower.name}</h1>
              <p className="text-gray-600">{flower.description}</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div>
              <img src={flower.image} alt={flower.name} className="w-full rounded-lg shadow-lg object-cover mb-4 h-80" />

              <div className="bg-white border p-4 rounded shadow-sm space-y-3">
                {/* <div className="text-sm text-gray-500">FOB Price</div>
                <div className="text-lg font-semibold text-blue-900">{flower.fobPrice || "US 0.5 $ – 1.5 $"}</div> */}

                <div className="grid grid-cols-2 gap-2 pt-3">
                  <div>
                    <div className="text-xs text-gray-500">Min.Order</div>
                    <div className="font-medium">{flower.minOrder || "500 Kg"}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Supply Ability</div>
                    <div className="font-medium">{flower.supplyAbility || "1000 Kilogram per Day"}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Port</div>
                    <div className="font-medium">{flower.port || "Chennai"}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Payment Terms</div>
                    <div className="font-medium">{flower.paymentTerms || "100% TT in advance"}</div>
                  </div>
                </div>

                <div className="pt-3 space-y-2">
                  <a
                    className="block text-center bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-600 transition-colors"
                    href={`https://wa.me/919025071760?text=${waMessage}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Get Quote (WhatsApp)
                  </a>
                  <a
                    className="block text-center border border-amber-500 text-amber-600 px-4 py-2 rounded hover:bg-amber-50 transition-colors"
                    href={`mailto:trs2025bgs@gmail.com?subject=Quote%20Request:%20${encodeURIComponent(flower.name)}&body=${encodeURIComponent(emailMessage)}`}
                  >
                    Get Quote (Email)
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            {flower.details && (
              <div className="bg-white border p-6 rounded shadow-sm">
                <h3 className="text-xl font-semibold text-blue-900 mb-4">Product Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(flower.details).map(([key, value]) => (
                    <React.Fragment key={key}>
                      <div className="text-sm text-gray-700 font-medium">{key}</div>
                      <div className="text-sm text-gray-900">{value}</div>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-white border p-6 rounded shadow-sm">
              <h3 className="text-xl font-semibold text-blue-900 mb-4">Product Description</h3>
              <p className="text-gray-700">{flower.productDescription || flower.description}</p>
            </div>

            <div className="bg-white border p-6 rounded shadow-sm">
              <h3 className="text-xl font-semibold text-blue-900 mb-4">Packaging & Delivery</h3>
              <p className="text-gray-700">{flower.packagingShipping || "Packaged in ventilated boxes and shipped by air/sea depending on customer choice."}</p>
            </div>

            <div className="bg-white border p-6 rounded shadow-sm">
              <h3 className="text-xl font-semibold text-blue-900 mb-4">Shipping</h3>
              <p className="text-gray-700">Sea freight or air freight available from Chennai Airport.</p>
            </div>

            <div className="bg-white border p-6 rounded shadow-sm">
              <h3 className="text-xl font-semibold text-blue-900 mb-4">During selling</h3>
              <ul className="text-gray-700 space-y-2 list-disc list-inside">
                <li>You can get the most competitive price</li>
                <li>You can get the best quality</li>
                <li>You can get any information about the product anytime anywhere</li>
                <li>You can feel our sincerity</li>
              </ul>
            </div>

            <div className="bg-white border p-6 rounded shadow-sm">
              <h3 className="text-xl font-semibold text-blue-900 mb-4">After sale</h3>
              <ul className="text-gray-700 space-y-2 list-disc list-inside">
                <li>You will get relatively most profit from our product</li>
                <li>You will get more repeat business because of our products</li>
                <li>You will still get our service after selling</li>
                <li>You will get more discount from us next time</li>
                <li>We will be friends and cooperate for long time</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
