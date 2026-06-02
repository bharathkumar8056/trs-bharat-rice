"use client"
import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Phone,
  Mail,
  MapPin,
  PhoneIcon as WhatsApp,
  Check,
  Package,
  Truck,
  Globe,
  Award,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import emailjs from "@emailjs/browser"
// Custom hook for number animation
const useCountUp = (end: number, duration = 2000, start = 0) => {
  const [count, setCount] = useState(start)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [isVisible])

  useEffect(() => {
    if (!isVisible) return

    let startTime: number
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentCount = Math.floor(easeOutQuart * (end - start) + start)

      setCount(currentCount)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [isVisible, end, duration, start])

  return { count, ref }
}

// Animated Stat Component
const AnimatedStat = ({
  number,
  suffix = "",
  label,
  color,
}: {
  number: number
  suffix?: string
  label: string
  color: string
}) => {
  const { count, ref } = useCountUp(number, 2500)

  return (
    <div className="p-6" ref={ref}>
      <div className={`text-4xl font-bold ${color} mb-2`}>
        {count}
        {suffix}
      </div>
      <p className="text-blue-700">{label}</p>
    </div>
  )
}

export default function HomePage() {

  // Contact form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  // Initialize EmailJS
  useEffect(() => {
    emailjs.init("nfgaFVXE8bbPQ9PAG") // Replace with your EmailJS public key
  }, [])
  // Scroll to section function
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }
// Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Handle form submission
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      // EmailJS configuration
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        from_phone: formData.phone,
        message: formData.message,
        to_email: "info@trsbharatexports.com",
      }

      await emailjs.send(
        "service_jv6yr61", // Replace with your EmailJS service ID
        "template_wsqh95s", // Replace with your EmailJS template ID
        templateParams,
      )

      setSubmitStatus("success")
      setFormData({ name: "", email: "", phone: "", message: "" })
    } catch (error) {
      console.error("Email sending failed:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }
  // Frequently Asked Questions
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

  const products = [
    /* {
      name: "Flowers",
      description: "Beautiful and fresh flowers for every occasion",
      image: "/assets/flowers/rose-cut-flower.jpg",
      features: ["Roses", "Tulips", "Lilies", "Orchids"],
    },
    {
      name: "Coconut",
      description: "Fresh coconuts and coconut products from tropical plantations",
      image: "/assets/Coconut.webp",
      features: ["Fresh Coconuts", "Coconut Oil", "Desiccated Coconut", "Coconut Water"],
    }, */
    {
      name: "Rice",
      description: "High-quality rice varieties sourced from the finest farms across India",
      image: "/assets/Rice.png",
      features: ["Basmati Rice", "JPonni Rice", "IR-20 Rice", "Matta Rice", "Sambha Rice", "Kolam Rice", "Organic Varieties"],
    },
    /* {
      name: "Cashew Nuts",
      description: "Premium cashew nuts processed with international quality standards",
      image: "/assets/Cashew-nuts.jpg",
      features: ["W180 Grade", "W240 Grade", "W320 Grade", "Broken Varieties"],
    }, */
  ]

  return (
    <div suppressHydrationWarning className="min-h-screen bg-gradient-to-br from-blue-50 to-amber-50">
      {/* Header */}
      <SiteHeader />

      {/* Hero Section — Full-width Banner Video with Overlaid Text */}
      <section id="home" className="relative w-full h-[80vh] min-h-[650px] overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="/assets/hero-banner.jpg"
        >
          {/* TODO: replace with final hero banner video path */}
          <source src="/assets/banner-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Dark gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/85 via-blue-900/65 to-blue-900/40" />

        {/* Overlaid Content */}
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="max-w-3xl space-y-6">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-white drop-shadow-lg">
              <span className="text-white">Premium </span>
              <span className="text-amber-400">Global</span>
              <br />
              <span className="text-white">Solutions</span>
            </h2>

            <p className="text-blue-50 text-base sm:text-lg leading-relaxed drop-shadow">
              At TRS Bharat Global Solutions, we are your trusted partner for premium-quality rice. We specialize in connecting the richness of Indian agriculture to global markets with
              a strong focus on quality, consistency, and reliability. Our products are handpicked, processed with
              care, and meet international food-grade certifications. With hassle-free export services, fast
              processing, and secure global delivery, we ensure smooth end-to-end logistics for every order. We
              believe in building long-term trade relationships based on trust, transparency, and performance. Backed
              by secure payment systems and ethical practices, we are committed to excellence in every grain. Choose TRS Bharat — where Indian quality meets global standards.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 text-lg shadow-lg"
                onClick={() => scrollToSection("products")}
              >
                Explore Products
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white bg-white/10 hover:bg-white hover:text-blue-900 px-8 py-3 text-lg font-medium backdrop-blur-sm"
                onClick={() => scrollToSection("contact")}
              >
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Animated Stats Section */}
      {/* <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <AnimatedStat number={18} suffix="+" label="Years of Experience" color="text-blue-900" />
            <AnimatedStat number={50} suffix="+" label="Countries Served" color="text-amber-600" />
            <AnimatedStat number={1000} suffix="+" label="Happy Clients" color="text-blue-900" />
            <AnimatedStat number={99} suffix="%" label="Quality Assurance" color="text-amber-600" />
          </div>
        </div>
      </section> */}

      {/* About Section */}
      <section id="about" className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl sm:text-4xl font-bold text-blue-900 mb-4">About TRS Bharat Global Solutions</h3>
            <p className="text-blue-700 text-lg max-w-3xl mx-auto">
              We are a leading exporter of premium agricultural products from India, committed to delivering the highest
              quality rice varieties to global markets.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-blue-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-blue-900">Quality Assurance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-blue-700">
                  Rigorous quality control processes ensure that every product meets international standards.
                </p>
              </CardContent>
            </Card>

            <Card className="border-blue-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-blue-900">Global Reach</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-blue-700">
                  Serving customers worldwide with reliable shipping and logistics solutions.
                </p>
              </CardContent>
            </Card>

            <Card className="border-blue-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-blue-900">Sustainable Sourcing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-blue-700">
                  Partnering with local farmers to promote sustainable and ethical agricultural practices.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-blue-50 to-amber-50">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="flex flex-col justify-center">
              <h3 className="text-3xl sm:text-4xl font-bold text-blue-900 mb-6">Our Vision</h3>
              <p className="text-blue-700 text-lg leading-relaxed">
                To be a globally trusted leader in exporting premium agricultural products, delivering consistent
                quality and fostering sustainable growth for our partners and communities.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-amber-100 rounded-lg p-8 shadow-lg">
              <h3 className="text-3xl sm:text-4xl font-bold text-blue-900 mb-6">Our Mission</h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <Check className="text-amber-600 mt-1 flex-shrink-0" />
                  <p className="text-blue-700">
                    To provide the highest quality premium rice sourced from certified farms.
                  </p>
                </li>
                <li className="flex items-start space-x-3">
                  <Check className="text-amber-600 mt-1 flex-shrink-0" />
                  <p className="text-blue-700">
                    To ensure customer satisfaction through reliable delivery, transparency, and continuous improvement.
                  </p>
                </li>
                <li className="flex items-start space-x-3">
                  <Check className="text-amber-600 mt-1 flex-shrink-0" />
                  <p className="text-blue-700">
                    To uphold international food safety and quality standards across our entire supply chain.
                  </p>
                </li>
                <li className="flex items-start space-x-3">
                  <Check className="text-amber-600 mt-1 flex-shrink-0" />
                  <p className="text-blue-700">
                    To promote sustainable and ethical business practices that benefit farmers, clients, and the
                    environment.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section with Video */}
      {/* Our Story Section with Company Video */}
      {/* <section className="py-16 px-4 bg-gradient-to-br from-blue-50 to-amber-50">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h3 className="text-3xl sm:text-4xl font-bold text-blue-900 mb-6">Our Story</h3>
              <div className="flex items-center space-x-2 mb-4">
                <Award className="text-amber-600" />
                <p className="text-lg font-semibold text-blue-900">18 Years of Excellence in Rice Export</p>
              </div>
              <p className="text-blue-700 text-lg mb-4">
                TRS Bharat Global Solutions was founded with a vision to connect India's premium agricultural products
                with global markets. With over 18 years of specialized experience in rice sales and export across India
                and internationally, we have established ourselves as a trusted name in the agricultural export
                industry.
              </p>
              <p className="text-blue-700 text-lg mb-4">
                Our journey began with a small team of passionate individuals committed to quality and excellence. Over nearly
                two decades, we have built strong and lasting relationships with farmers and suppliers across India, ensuring
                that we source only the finest rice directly from the fields. This close collaboration allows us to maintain
                strict quality control and meet the highest international standards.
              </p>
              <p className="text-blue-700 text-lg mb-4">
               Expanding beyond grains, we now proudly cultivate and export premium flowers grown in our own dedicated gardens,
               bringing freshness, fragrance, and vibrant quality directly from our farms to global markets.Our extensive
               experience in agricultural exports has given us deep insights into international market requirements, packaging
               standards, and global trade compliance.
              </p>
              <p className="text-blue-700 text-lg">
                Today, we serve clients across multiple continents, providing them with Fresh flowers, rice, coconut, and
                cashew nuts products that meet international standards. We continue to expand our reach while maintaining
                our core values of quality, integrity, and sustainability, backed by our 18 years of proven expertise in
                the field.
              </p>
            </div>
            <div className="order-1 md:order-2 flex justify-center">
              <div className="w-full max-w-md rounded-lg shadow-xl overflow-hidden">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-80 object-cover"
                  poster="/assets/exporters.webp"
                >
                  <source src="https://cdn.pixabay.com/video/2020/03/26/35721-402047070_large.mp4" type="video/mp4" />
                  <source src="https://cdn.pixabay.com/video/2019/07/15/25089-349944261_large.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Agricultural Rice Manufacturing Video Section */}
      <section className="pt-20 pb-8 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl sm:text-5xl font-bold text-blue-900 mb-6">
              From <span className="text-amber-600">Farm to Export</span>
            </h3>
            <p className="text-blue-700 text-lg sm:text-xl max-w-4xl mx-auto leading-relaxed">
              Witness the complete journey of our premium rice from traditional farming methods to modern processing
              facilities, ensuring the highest quality standards for global export.
            </p>
          </div>

          {/* Main Manufacturing Video */}
          <div>
            <div className="max-w-6xl mx-auto">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover"
                  poster="/assets/farm-export.webp"
                >
                  <source src="https://cdn.pixabay.com/video/2019/07/15/25089-349944261_large.mp4" type="video/mp4" />
                  <source src="https://cdn.pixabay.com/video/2020/03/26/35721-402047070_large.mp4" type="video/mp4" />
                </video>
              </div>

              {/* Text content moved below video */}
              <div className="mt-8 text-center">
                <h4 className="text-xl sm:text-3xl font-bold text-blue-900 mb-3">Rice Manufacturing Excellence</h4>
                <p className="text-blue-700 text-sm sm:text-lg mb-4">
                  State-of-the-art processing facilities ensuring premium quality rice for global markets
                </p>
                <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
                  <Badge className="bg-amber-600 text-white px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm">
                    Modern Processing
                  </Badge>
                  <Badge className="bg-blue-600 text-white px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm">
                    Quality Control
                  </Badge>
                  <Badge className="bg-green-600 text-white px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm">
                    Export Ready
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Process Steps */}
          {/* <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12">
            <div className="text-center group">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <span className="text-2xl sm:text-3xl">🌾</span>
              </div>
              <h5 className="text-lg sm:text-xl font-bold text-blue-900 mb-2">Premium Sourcing</h5>
              <p className="text-blue-700 text-sm sm:text-base">
                Carefully selected rice from certified farms across India
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-amber-100 to-amber-200 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <span className="text-2xl sm:text-3xl">⚙️</span>
              </div>
              <h5 className="text-lg sm:text-xl font-bold text-blue-900 mb-2">Modern Processing</h5>
              <p className="text-blue-700 text-sm sm:text-base">
                Advanced machinery ensuring consistent quality and purity
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <span className="text-2xl sm:text-3xl">🔍</span>
              </div>
              <h5 className="text-lg sm:text-xl font-bold text-blue-900 mb-2">Quality Testing</h5>
              <p className="text-blue-700 text-sm sm:text-base">
                Rigorous quality control at every stage of processing
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <span className="text-2xl sm:text-3xl">📦</span>
              </div>
              <h5 className="text-lg sm:text-xl font-bold text-blue-900 mb-2">Export Packaging</h5>
              <p className="text-blue-700 text-sm sm:text-base">International standard packaging for global delivery</p>
            </div>
          </div> */}

          {/* Additional Manufacturing Videos */}
          {/* <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="group">
              <div className="relative rounded-xl overflow-hidden shadow-lg transform transition-transform group-hover:scale-105">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-48 sm:h-64 object-cover"
                  poster="/assets/rice_ind.jpg"
                >
                  <source src="https://cdn.pixabay.com/video/2021/08/10/84471-588465261_large.mp4" type="video/mp4" />
                </video>
              </div>
              <div className="mt-4 text-center">
                <h5 className="text-blue-900 font-bold text-sm sm:text-lg mb-2">Rice Sorting Process</h5>
                <p className="text-blue-700 text-xs sm:text-sm">Advanced sorting technology for premium quality</p>
              </div>
            </div>

            <div className="group">
              <div className="relative rounded-xl overflow-hidden shadow-lg transform transition-transform group-hover:scale-105">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-48 sm:h-64 object-cover"
                  poster="/assets/rice-package.jpg"
                >
                  <source src="https://cdn.pixabay.com/video/2020/03/26/35721-402047070_large.mp4" type="video/mp4" />
                </video>
              </div>
              <div className="mt-4 text-center">
                <h5 className="text-blue-900 font-bold text-sm sm:text-lg mb-2">Packaging Excellence</h5>
                <p className="text-blue-700 text-xs sm:text-sm">Export-grade packaging for global standards</p>
              </div>
            </div>

            <div className="group sm:col-span-2 lg:col-span-1">
              <div className="relative rounded-xl overflow-hidden shadow-lg transform transition-transform group-hover:scale-105">
                <img
                  src="/assets/lab-1.jpg"
                  alt="Quality Control Laboratory"
                  className="w-full h-48 sm:h-64 object-cover"
                />
              </div>
              <div className="mt-4 text-center">
                <h5 className="text-blue-900 font-bold text-sm sm:text-lg mb-2">Quality Laboratory</h5>
                <p className="text-blue-700 text-xs sm:text-sm">Scientific testing for international compliance</p>
              </div>
            </div>
          </div> */}

          {/* Call to Action */}
          {/* <div className="text-center mt-12 sm:mt-16">
            <h4 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-4">
              Experience Our Manufacturing Excellence
            </h4>
            <p className="text-blue-700 text-base sm:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto">
              From traditional farming to modern processing, we ensure every grain meets international quality
              standards.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-blue-900 hover:bg-blue-800 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg shadow-lg"
                onClick={() => scrollToSection("contact")}
              >
                Request Factory Visit
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-blue-900 text-blue-900 hover:bg-blue-50 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg bg-transparent"
                onClick={() => scrollToSection("quality")}
              >
                Quality Standards
              </Button>
            </div>
          </div> */}
        </div>
      </section>

      {/* Our Commitment Section */}
      <section className="pt-8 pb-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl sm:text-4xl font-bold text-blue-900 mb-4">Our Commitment</h3>
            <p className="text-blue-700 text-lg max-w-3xl mx-auto">
              At TRS Bharat Global Solutions, we are committed to excellence in every aspect of our business.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-blue-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-blue-900">Farmer Partnerships</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-blue-700">
                  We work directly with farmers, ensuring fair practices and sustainable agriculture while maintaining
                  premium quality.
                </p>
              </CardContent>
            </Card>

            <Card className="border-blue-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-blue-900">Environmental Responsibility</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-blue-700">
                  We promote eco-friendly practices throughout our supply chain to minimize our environmental footprint.
                </p>
              </CardContent>
            </Card>

            <Card className="border-blue-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-blue-900">Customer Satisfaction</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-blue-700">
                  We prioritize our clients' needs, offering personalized solutions and responsive support at every
                  step.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Dedicated Video Showcase Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-900 to-blue-800 text-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            {/* <h3 className="text-4xl sm:text-5xl font-bold mb-6">
              Watch Our <span className="text-amber-400">Journey</span>
            </h3>
            <p className="text-blue-100 text-xl max-w-4xl mx-auto leading-relaxed">
              Experience the excellence of TRS Bharat Global Solutions through our comprehensive video showcase. From
              farm to global markets, witness our commitment to quality and innovation.
            </p> */}
          </div>

          {/* Main Featured Video */}
          {/* <div className="mb-16">
            <div className="max-w-6xl mx-auto">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-[500px] object-cover"
                  poster="/images/shipping-port.jpg"
                >
                  <source src="/assets/animate_video.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8">
                  <h4 className="text-white text-3xl font-bold mb-3">TRS Bharat Global Solutions</h4>
                  <p className="text-blue-100 text-lg mb-4">
                    Connecting India's Premium Agricultural Products to Global Markets
                  </p>
                  {/* <div className="flex flex-wrap gap-3">
                    <Badge className="bg-amber-600 text-white px-4 py-2 text-sm">18+ Years Experience</Badge>
                    <Badge className="bg-blue-600 text-white px-4 py-2 text-sm">50+ Countries</Badge>
                    <Badge className="bg-green-600 text-white px-4 py-2 text-sm">Premium Quality</Badge>
                  </div> */}
                {/* </div>
              </div>
            </div> */}
          {/* </div> */} 

          {/* Video Grid - Convert to Image Grid */}
          {/* <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="group">
              <div className="relative rounded-xl overflow-hidden shadow-lg mb-4 transform transition-transform group-hover:scale-105">
                <img
                  src="/assets/QA.png"
                  alt="Quality Assurance Process"
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h5 className="text-white font-bold text-lg mb-2">Quality Assurance</h5>
                  <p className="text-blue-100 text-sm">Rigorous testing and quality control processes</p>
                </div>
              </div>
            </div>

            <div className="group">
              <div className="relative rounded-xl overflow-hidden shadow-lg mb-4 transform transition-transform group-hover:scale-105">
                <img
                  src="/assets/package.jpeg"
                  alt="Processing and Packaging"
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h5 className="text-white font-bold text-lg mb-2">Processing & Packaging</h5>
                  <p className="text-blue-100 text-sm">State-of-the-art facilities and export packaging</p>
                </div>
              </div>
            </div>

            <div className="group">
              <div className="relative rounded-xl overflow-hidden shadow-lg mb-4 transform transition-transform group-hover:scale-105">
                <img
                  src="/assets/Global.jpeg"
                  alt="Global Shipping Services"
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h5 className="text-white font-bold text-lg mb-2">Global Shipping</h5>
                  <p className="text-blue-100 text-sm">Worldwide delivery and logistics excellence</p>
                </div>
              </div>
            </div>
          </div> */}

          {/* Agricultural Process Images - Convert to Images */}
          {/* <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="group">
              <div className="relative rounded-xl overflow-hidden shadow-lg transform transition-transform group-hover:scale-105">
                <img
                  src="/assets/agri.jpeg"
                  alt="Farm to Processing Journey"
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h5 className="text-white font-bold text-xl mb-3">Farm to Processing</h5>
                  <p className="text-blue-100 text-base">
                    Witness our journey from premium farms to world-class processing facilities
                  </p>
                </div>
              </div>
            </div>

            <div className="group">
              <div className="relative rounded-xl overflow-hidden shadow-lg transform transition-transform group-hover:scale-105">
                <img
                  src="/assets/export.jpeg"
                  alt="Export Excellence"
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h5 className="text-white font-bold text-xl mb-3">Export Excellence</h5>
                  <p className="text-blue-100 text-base">
                    Our commitment to delivering premium products to global markets
                  </p>
                </div>
              </div>
            </div>
          </div> */}

          {/* Call to Action */}
          <div className="text-center">
            <h4 className="text-3xl font-bold text-white mb-4">Ready to Experience Premium Quality?</h4>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers worldwide who trust TRS Bharat Global Solutions for their premium
              agricultural product needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 text-lg shadow-lg"
                onClick={() => scrollToSection("contact")}
              >
                Get Quote Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 text-lg bg-transparent"
                onClick={() => scrollToSection("products")}
              >
                View Products
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-16 px-4 bg-gradient-to-br from-blue-50 to-amber-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl sm:text-4xl font-bold text-blue-900 mb-4">Our Premium Products</h3>
            <p className="text-blue-700 text-lg">Discover our range of high-quality agricultural products</p>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            {products.map((product, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-xl transition-shadow border-blue-200 w-full sm:w-[22rem] md:w-[24rem]"
              >
                <div className="h-48 bg-gradient-to-br from-blue-100 to-amber-100 flex items-center justify-center">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-blue-900">{product.name}</CardTitle>
                  <CardDescription className="text-blue-700">{product.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {product.features.map((feature, idx) => (
                      <Badge key={idx} variant="secondary" className="bg-amber-100 text-amber-800">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                  {product.name === "Flowers" && (
                    <a href="/flowers" className="block">
                      <Button className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white">
                        View Full Flower Varieties
                      </Button>
                    </a>
                  )}
                  {product.name === "Rice" && (
                    <a href="/rice" className="block">
                      <Button className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white">
                        View All Varieties
                      </Button>
                    </a>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* MOQ Section */}
      {false && (
      <section id="moq" className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl sm:text-4xl font-bold text-blue-900 mb-4">Minimum Order Quantity (MOQ)</h3>
            <p className="text-blue-700 text-lg max-w-3xl mx-auto">
              Understanding our minimum order requirements for efficient and cost-effective shipping.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <Card className="border-blue-200 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <Package className="text-amber-600" />
                    <CardTitle className="text-blue-900">Container Specifications</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-blue-900 mb-2">20 ft Container</h4>
                      <p className="text-blue-700">~10–12 tons (for heavy goods like rice)</p>
                    </div>
                    <div className="p-4 bg-amber-50 rounded-lg">
                      <h4 className="font-semibold text-blue-900 mb-2">40 ft Container</h4>
                      <p className="text-blue-700">~24–25 tons (for bulk volume)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-blue-200 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <Globe className="text-amber-600" />
                    <CardTitle className="text-blue-900">Order Options</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-3">
                      <Check className="text-amber-600 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-blue-900">Mixed Product Orders</p>
                        <p className="text-blue-700 text-sm">
                          Allowed if total order meets minimum container load (e.g., 10 tons total)
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <Check className="text-amber-600 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-blue-900">Trial Orders / Samples</p>
                        <p className="text-blue-700 text-sm">
                          Small quantities (100–500 kg) available for new clients (paid samples + shipping)
                        </p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-amber-50">
              <CardHeader>
                <CardTitle className="text-blue-900 text-center">Why MOQ Matters</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-start space-x-3">
                    <Check className="text-amber-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-blue-900">Cost-Effective Shipping</p>
                      <p className="text-blue-700 text-sm">Ensures economical transportation costs for our clients</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Check className="text-amber-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-blue-900">Quality Standards</p>
                      <p className="text-blue-700 text-sm">
                        Helps maintain product quality and packaging standards throughout transit
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      )}

      {/* Shipment Policies Section */}
      {false && (
      <section id="shipping" className="py-16 px-4 bg-gradient-to-br from-blue-50 to-amber-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl sm:text-4xl font-bold text-blue-900 mb-4">Shipment Policies</h3>
            <p className="text-blue-700 text-lg max-w-3xl mx-auto">
              We ensure safe and timely delivery of your goods through trusted and efficient logistics partners.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <Tabs defaultValue="methods" className="w-full">
{/*               <TabsList className="grid grid-cols-4 mb-8">
                <TabsTrigger value="methods">Shipping Methods</TabsTrigger>
                <TabsTrigger value="packaging">Packaging</TabsTrigger>
                <TabsTrigger value="terms">Shipping Terms</TabsTrigger>
                <TabsTrigger value="documentation">Documentation</TabsTrigger> */}
               <TabsList className="grid grid-cols-2 sm:grid-cols-4 mb-8 w-full">
                <TabsTrigger value="methods" className="text-xs sm:text-sm">
                  Shipping Methods
                </TabsTrigger>
                <TabsTrigger value="packaging" className="text-xs sm:text-sm">
                  Packaging
                </TabsTrigger>
                <TabsTrigger value="terms" className="text-xs sm:text-sm">
                  Shipping Terms
                </TabsTrigger>
                <TabsTrigger value="documentation" className="text-xs sm:text-sm">
                  Documentation
                </TabsTrigger>
              </TabsList>

              <TabsContent value="methods" className="bg-white rounded-lg shadow-lg p-6">
                <h4 className="text-xl font-bold text-blue-900 mb-6">Available Shipping Methods</h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="border-blue-200">
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <Truck className="text-blue-600" />
                        <CardTitle className="text-blue-900">Sea Freight</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-blue-700 mb-2">Most cost-effective for bulk shipments</p>
                      <p className="text-amber-600 font-semibold">Transit Time: 20–45 days</p>
                    </CardContent>
                  </Card>

                  <Card className="border-blue-200">
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <Globe className="text-amber-600" />
                        <CardTitle className="text-blue-900">Air Freight</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-blue-700 mb-2">Fast delivery for urgent or smaller consignments</p>
                      <p className="text-amber-600 font-semibold">Transit Time: 5–10 days</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="packaging" className="bg-white rounded-lg shadow-lg p-6">
                <h4 className="text-xl font-bold text-blue-900 mb-6">Packaging Standards</h4>
                <ul className="space-y-4">
                  <li className="flex items-start space-x-3">
                    <Check className="text-amber-600 mt-1 flex-shrink-0" />
                    <p className="text-blue-700">
                      Export-standard packaging to prevent moisture, damage, and contamination
                    </p>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Check className="text-amber-600 mt-1 flex-shrink-0" />
                    <p className="text-blue-700">Custom labeling and palletizing available upon request</p>
                  </li>
                </ul>
              </TabsContent>

              <TabsContent value="terms" className="bg-white rounded-lg shadow-lg p-6">
                <h4 className="text-xl font-bold text-blue-900 mb-6">Shipping Terms (Incoterms)</h4>
                <ul className="space-y-4">
                  <li className="flex items-start space-x-3">
                    <Check className="text-amber-600 mt-1 flex-shrink-0" />
                    <p className="text-blue-700">
                      We support <span className="font-semibold">FOB, CIF, CFR, and DDP</span> based on customer
                      preference
                    </p>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Check className="text-amber-600 mt-1 flex-shrink-0" />
                    <p className="text-blue-700">Door-to-door delivery available on request</p>
                  </li>
                </ul>
              </TabsContent>

              <TabsContent value="documentation" className="bg-white rounded-lg shadow-lg p-6">
                <h4 className="text-xl font-bold text-blue-900 mb-6">Export Documentation Provided</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-3">
                      <Check className="text-amber-600 mt-1 flex-shrink-0" />
                      <p className="text-blue-700">Commercial Invoice & Packing List</p>
                    </li>
                    <li className="flex items-start space-x-3">
                      <Check className="text-amber-600 mt-1 flex-shrink-0" />
                      <p className="text-blue-700">Certificate of Origin</p>
                    </li>
                    <li className="flex items-start space-x-3">
                      <Check className="text-amber-600 mt-1 flex-shrink-0" />
                      <p className="text-blue-700">Phytosanitary Certificate (if applicable)</p>
                    </li>
                  </ul>
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-3">
                      <Check className="text-amber-600 mt-1 flex-shrink-0" />
                      <p className="text-blue-700">Bill of Lading / Airway Bill</p>
                    </li>
                    <li className="flex items-start space-x-3">
                      <Check className="text-amber-600 mt-1 flex-shrink-0" />
                      <p className="text-blue-700">Other certificates as per destination country requirement</p>
                    </li>
                  </ul>
                </div>
                <p className="text-blue-700 mt-6 text-center font-medium">
                  We aim to ensure a smooth and transparent shipping experience for all international clients.
                </p>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
      )}

      {/* Quality Policy Section */}
      <section id="quality" className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl sm:text-4xl font-bold text-blue-900 mb-4">Quality Policy</h3>
            <p className="text-blue-700 text-lg max-w-3xl mx-auto">
              At TRS Bharat Global Solutions, quality is at the heart of everything we do.
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-amber-50 rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
            <p className="text-blue-700 text-lg mb-6">
              We are dedicated to supplying products that meet the highest standards of safety and excellence by:
            </p>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <Check className="text-amber-600 mt-1 flex-shrink-0" />
                <p className="text-blue-700">Sourcing from certified and trusted suppliers</p>
              </li>
              <li className="flex items-start space-x-3">
                <Check className="text-amber-600 mt-1 flex-shrink-0" />
                <p className="text-blue-700">Conducting rigorous quality checks throughout processing and packaging</p>
              </li>
              <li className="flex items-start space-x-3">
                <Check className="text-amber-600 mt-1 flex-shrink-0" />
                <p className="text-blue-700">Complying fully with international quality and food safety regulations</p>
              </li>
              <li className="flex items-start space-x-3">
                <Check className="text-amber-600 mt-1 flex-shrink-0" />
                <p className="text-blue-700">
                  Offering full traceability with accurate documentation and certifications
                </p>
              </li>
              <li className="flex items-start space-x-3">
                <Check className="text-amber-600 mt-1 flex-shrink-0" />
                <p className="text-blue-700">
                  Continuously improving our processes based on customer feedback and audits
                </p>
              </li>
            </ul>
            <p className="text-blue-700 text-lg mt-6">
              We strive to build lasting relationships based on trust, transparency, and mutual growth.
            </p>
          </div>
        </div>
      </section>

      {/* Payment Policy Section */}
      {false && (
      <section id="payment" className="py-16 px-4 bg-gradient-to-br from-blue-50 to-amber-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl sm:text-4xl font-bold text-blue-900 mb-4">Payment Policy</h3>
            <p className="text-blue-700 text-lg max-w-3xl mx-auto">
              We are committed to transparent and secure payment practices to ensure smooth international trade.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Tabs defaultValue="methods" className="w-full">
             <TabsList className="grid grid-cols-1 sm:grid-cols-3 mb-8 w-full">
                <TabsTrigger value="methods" className="text-xs sm:text-sm">
                  Payment Methods
                </TabsTrigger>
                <TabsTrigger value="currency" className="text-xs sm:text-sm">
                  Currency & Charges
                </TabsTrigger>
                <TabsTrigger value="notes" className="text-xs sm:text-sm">
                  Additional Notes
                </TabsTrigger>
              </TabsList>
              <TabsContent value="methods" className="bg-white rounded-lg shadow-lg p-6">
                <h4 className="text-xl font-bold text-blue-900 mb-4">Accepted Payment Methods</h4>
                <ul className="space-y-4">
                  <li className="flex items-start space-x-3">
                    <Check className="text-amber-600 mt-1 flex-shrink-0" />
                    <p className="text-blue-700">
                      <span className="font-semibold">Advance Payment (T/T):</span> 100% before shipment (commonly for
                      small or first-time orders).
                    </p>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Check className="text-amber-600 mt-1 flex-shrink-0" />
                    <p className="text-blue-700">
                      <span className="font-semibold">50% Advance + 50% Before Shipment:</span> Recommended for new
                      clients.
                    </p>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Check className="text-amber-600 mt-1 flex-shrink-0" />
                    <p className="text-blue-700">
                      <span className="font-semibold">Letter of Credit (L/C):</span> Irrevocable L/C at sight for
                      large-volume orders.
                    </p>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Check className="text-amber-600 mt-1 flex-shrink-0" />
                    <p className="text-blue-700">
                      <span className="font-semibold">Document Against Payment (D/P):</span> Available for trusted,
                      long-term clients.
                    </p>
                  </li>
                </ul>
              </TabsContent>
              <TabsContent value="currency" className="bg-white rounded-lg shadow-lg p-6">
                <h4 className="text-xl font-bold text-blue-900 mb-4">Currency & Charges</h4>
                <ul className="space-y-4">
                  <li className="flex items-start space-x-3">
                    <Check className="text-amber-600 mt-1 flex-shrink-0" />
                    <p className="text-blue-700">
                      Payments must be made in the currency mentioned in the invoice/quotation.
                    </p>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Check className="text-amber-600 mt-1 flex-shrink-0" />
                    <p className="text-blue-700">All bank transfer charges are to be borne by the buyer.</p>
                  </li>
                </ul>
              </TabsContent>
              <TabsContent value="notes" className="bg-white rounded-lg shadow-lg p-6">
                <h4 className="text-xl font-bold text-blue-900 mb-4">Additional Notes</h4>
                <p className="text-blue-700 mb-4">
                  Payment terms may be adjusted based on the buyer's credit history, order volume, and business
                  relationship.
                </p>
                <p className="text-blue-700">
                  For questions or custom terms, please contact our sales team at{" "}
                  <a href="mailto:info@trsbharatexports.com" className="text-amber-600 hover:underline">
                    info@trsbharatexports.com
                  </a>
                  .
                </p>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
      )}

      {/* FAQ Section */}
      <section id="faq" className="py-16 px-4 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <Badge className="bg-amber-500 text-white border-0 mb-4 px-3 py-1">FAQ</Badge>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-900 mb-4">
              Frequently Asked <span className="text-amber-600">Questions</span>
            </h3>
            <p className="text-blue-700 text-lg max-w-3xl mx-auto">
              Everything buyers, importers and trade partners typically ask us about ordering, shipping and quality assurance.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
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
              <p className="text-blue-100 mb-5">Our export team is happy to help with custom quotes, samples and any product-specific questions.</p>
              <Button
                size="lg"
                className="bg-amber-500 hover:bg-amber-600 text-white"
                onClick={() => scrollToSection("contact")}
              >
                Contact Our Team
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl sm:text-4xl font-bold text-blue-900 mb-4">Get In Touch</h3>
            <p className="text-blue-700 text-lg">Ready to start your business with us? Contact our team today.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h4 className="text-2xl font-bold text-blue-900 mb-6">Contact Information</h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="text-amber-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-blue-900">Address</p>
                    <p className="text-blue-700">
                      F2, Plot No:A2, Phase 2 Extn, Sumeru city,
                      <br />
                      IAF Road, Indira Nagar, Selaiyur,
                      <br />
                      Chennai - 600 073, Tamil Nadu, India
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Mail className="text-amber-600 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-blue-900">Email</p>
                    <a href="mailto:info@trsbharatexports.com" className="text-blue-700 hover:text-amber-600">
                      info@trsbharatexports.com
                      <br />
                      support@trsbharatexports.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone className="text-amber-600 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-blue-900">Mobile</p>
                    <div className="text-blue-700">
                      <a href="tel:+919025071760" className="hover:text-amber-600">
                        +91 90250 71760
                      </a>
                      {", "}
                      <a href="tel:+918939038352" className="hover:text-amber-600">
                        +91 89390 38352
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <WhatsApp className="text-amber-600 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-blue-900">WhatsApp Business</p>
                    <a href="https://wa.me/919025071760" className="text-blue-700 hover:text-amber-600">
                      +91 90250 71760
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-2xl font-bold text-blue-900 mb-6">Send us a Message</h4>
{/*               <form className="space-y-4">
                <Input placeholder="Your Name" className="border-blue-200 focus:border-amber-500" />
                <Input placeholder="Your Email" type="email" className="border-blue-200 focus:border-amber-500" />
                <Input placeholder="Subject" className="border-blue-200 focus:border-amber-500" />
                <Textarea placeholder="Your Message" rows={4} className="border-blue-200 focus:border-amber-500" />
                <Button className="w-full bg-blue-900 hover:bg-blue-800 text-white">Send Message</Button> */}
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your Name"
                  className="border-blue-200 focus:border-amber-500"
                  required
                />
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Your Email"
                  className="border-blue-200 focus:border-amber-500"
                  required
                />
                <Input
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Your Phone Number"
                  className="border-blue-200 focus:border-amber-500"
                  required
                />
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Your Message"
                  rows={4}
                  className="border-blue-200 focus:border-amber-500"
                  required
                />
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-900 hover:bg-blue-800 text-white"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>

                {submitStatus === "success" && (
                  <div className="text-green-600 text-center mt-4">
                    Message sent successfully! We'll get back to you soon.
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="text-red-600 text-center mt-4">
                    Failed to send message. Please try again or contact us directly.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <SiteFooter />

      {/* Floating Action Buttons - Fixed Position */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col space-y-3">
        {/* WhatsApp Button */}
        <a
          href="https://wa.me/919025071760"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full w-12 h-12 sm:w-14 sm:h-14 bg-green-500 hover:bg-green-600 shadow-lg flex items-center justify-center transition-all duration-300 transform hover:scale-105"
        >
          <WhatsApp className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
        </a>
      </div>
    </div>
  )
}
