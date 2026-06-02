"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

const faqs = [
  {
    question: "What is Non-Basmati Rice?",
    answer:
      "Non-Basmati rice refers to rice varieties grown in India that are not aromatic Basmati. These include medium and short-grain varieties widely used for daily consumption across Asia, Africa, and the Middle East.",
  },
  {
    question: "Which types of Non-Basmati Rice do you export?",
    answer:
      "We export popular Indian varieties such as Sona Masoori, IR-64, PR-11/PR-14, Ponni, Swarna, and 100% Broken Rice based on buyer requirements.",
  },
  {
    question: "From which regions in India is your rice sourced?",
    answer:
      "Our rice is sourced from leading paddy belts such as Tamil Nadu, Andhra Pradesh, Telangana, Chhattisgarh, Odisha, Punjab, Haryana, and West Bengal.",
  },
  {
    question: "What are the common specifications for non-basmati you offer?",
    answer:
      "Typical specifications include: Moisture 12–14%; Broken 5%, 10%, 25%, 100%; Sortex Cleaned; Well milled and polished; Crop: Latest harvest.",
  },
  {
    question: "Is your rice Sortex cleaned?",
    answer:
      "Yes, all rice is processed through advanced Sortex machines to ensure uniform grain quality and removal of impurities.",
  },
  {
    question: "What packaging options do you provide?",
    answer:
      "We offer 5 kg, 10 kg, 25 kg, 50 kg PP bags, BOPP laminated bags, and custom private-label packaging. Also, Jute bags are available.",
  },
  {
    question: "Do you provide private labeling?",
    answer:
      "Yes, we support private labeling with customized bag design and branding as per buyer requirements.",
  },
  {
    question: "What certifications do you provide with the shipment?",
    answer:
      "We provide: Phytosanitary Certificate, Fumigation Certificate, Certificate of Origin, SGS/Intertek inspection (if required), and Health Certificate (if required).",
  },
  {
    question: "What is the minimum order quantity (MOQ)?",
    answer:
      "MOQ is typically 1 x 20 ft container, but trial orders can be discussed.",
  },
  {
    question: "What is the container loading capacity?",
    answer:
      "20 ft container: 24–26 MT. 40 ft container: 26–28 MT (depending on packing).",
  },
  {
    question: "What are your payment terms?",
    answer:
      "We accept: Advance Payment (T/T) — 100% before shipment (commonly for small or first-time orders); 50% Advance + 50% Before Shipment (recommended for new clients); Letter of Credit (L/C) — Irrevocable L/C at sight for large-volume orders.",
  },
  {
    question: "How do you ensure quality before shipment?",
    answer:
      "Every lot undergoes pre-shipment quality checks, moisture testing, and sortex verification before container stuffing.",
  },
  {
    question: "What is the shelf life of Non-Basmati rice?",
    answer: "Properly stored rice has a shelf life of 12–24 months.",
  },
  {
    question: "Is fumigation done before shipment?",
    answer: "Yes, fumigation is mandatory and done as per importing country norms.",
  },
  {
    question: "Can you supply rice as per specific country standards?",
    answer: "Yes, we customize specifications as per African, Gulf, and Asian country import standards.",
  },
  {
    question: "Do you provide samples before order confirmation?",
    answer: "Yes, samples can be couriered for quality approval.",
  },
  {
    question: "What is the average lead time for shipment?",
    answer: "Usually 10–15 days from order confirmation and payment/LC.",
  },
  {
    question: "Do you handle export documentation?",
    answer: "Yes, we handle complete export documentation and customs clearance from India.",
  },
  {
    question: "What makes Indian Non-Basmati rice preferred globally?",
    answer:
      "Indian rice is known for: Consistent grain size, Good cooking quality, Competitive pricing, and Reliable supply.",
  },
  {
    question: "Can you supply 100% broken rice for industrial use?",
    answer:
      "Yes, we export 100% broken rice for breweries, animal feed, and industrial food processing.",
  },
  {
    question: "Do you offer CIF and FOB pricing?",
    answer: "Yes, we quote on FOB, CFR, and CIF basis to all major ports.",
  },
  {
    question: "How is the rice stored before export?",
    answer: "Rice is stored in hygienic, moisture-controlled warehouses to maintain quality.",
  },
  {
    question: "How can a buyer place an order with you?",
    answer:
      "Buyers can contact us with their required specifications, quantity, destination port, and preferred terms. We will share a formal quotation and proceed accordingly.",
  },
  {
    question: "Do you offer customized grain length and broken percentage?",
    answer:
      "Yes, we can customize grain length, broken percentage, polishing level, and color sorting based on buyer specifications.",
  },
  {
    question: "Can you arrange third-party inspection before shipment?",
    answer:
      "Yes, third-party inspections by SGS, Intertek, Bureau Veritas, or buyer-appointed agencies can be arranged.",
  },
  {
    question: "Can you supply rice throughout the year?",
    answer:
      "Yes, we maintain continuous sourcing and stock management to ensure year-round supply.",
  },
  {
    question: "Do you support long-term supply contracts?",
    answer:
      "Yes, we welcome long-term business partnerships and annual supply agreements with international buyers.",
  },
]

export default function FAQPage() {
  return (
    <div suppressHydrationWarning className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <SiteHeader />

      <main className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <Badge className="bg-amber-500 text-white border-0 mb-4 px-3 py-1">FAQ</Badge>
            <h1 className="text-4xl sm:text-5xl font-bold text-blue-900 mb-4">Frequently Asked Questions</h1>
            <p className="text-blue-700 text-lg max-w-3xl mx-auto">
              Find answers about our rice export products, specifications, packaging, shipping, and certifications.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, idx) => (
                <AccordionItem
                  key={idx}
                  value={`faq-${idx}`}
                  className="bg-white rounded-xl border border-blue-100 shadow-sm hover:shadow-md transition-shadow px-5 sm:px-6"
                >
                  <AccordionTrigger className="text-left text-base sm:text-lg font-semibold text-blue-900 hover:text-amber-700 py-5">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed text-sm sm:text-base pb-5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="mt-10 text-center bg-gradient-to-r from-blue-900 to-blue-800 text-white rounded-2xl p-6 sm:p-8 shadow-lg">
              <h4 className="text-2xl font-bold mb-2">Still have questions?</h4>
              <p className="text-blue-100 mb-5">Our export team is ready to help with custom quotes, samples, and product specifications.</p>
              <Button asChild size="lg" className="bg-amber-500 hover:bg-amber-600 text-white">
                <Link href="/">Back to Home</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
