"use client"
import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  PhoneIcon as WhatsApp,
  Menu,
  X,
  Send,
  Instagram,
  Facebook,
  Linkedin,
  Twitter,
  Check,
  Package,
  Truck,
  Globe,
  Award,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  type ChatMessage = {
    type: string
    message: string
    showOptions?: boolean
  }

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { type: "bot", message: "Hello! Welcome to TRS Bharat Global Solutions. How can I help you today?" },
  ])
  const [currentMessage, setCurrentMessage] = useState("")
   
  // Contact form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  // Add this ref after the existing state declarations
  const messagesEndRef = useRef<HTMLDivElement>(null)
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
    setIsMobileMenuOpen(false) // Close mobile menu after clicking
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
  // Predefined Q&A for the chatbot
  const chatbotQA = [
    {
      question: "What are your lead times?",
      answer: `We are committed to timely delivery and transparent communication for all export orders.

Standard Lead Time:
- Processing & Packing: 6–11 business days  
- Dispatch & Shipping: 16–21 days (depending on destination port and logistics)  
- Total Lead Time: 22–30 days from order confirmation

Urgent/Express Orders:
- Available on request (subject to additional charges and product readiness)

Note: Lead times may vary based on order volume, seasonal demand, and shipping conditions. We provide a confirmed dispatch date upon final order confirmation.`,
    },
//     {
//       question: "What about international orders?",
//       answer: `International Orders:

// - Minimum Order: 1 full container load (FCL)  
//   - 20 ft Container: ~10–12 tons (for heavy goods like rice)  
//   - 40 ft Container: ~24–25 tons (for bulk volume)

// Mixed Product Orders:
// - Allowed if total order meets minimum container load (e.g., 10 tons total)

// Trial Orders / Samples:
// - Small quantities (100–500 kg) available for new clients (paid samples + shipping)

// Why MOQ Matters:
// - Ensures cost-effective shipping  
// - Helps maintain product quality and packaging standards`,
//     },
//     {
//       question: "What is your shipping policy?",
//       answer: `Shipping Policy

// We ensure safe and timely delivery of your goods through trusted and efficient logistics partners.

// Available Shipping Methods:
// - Sea Freight – Most cost-effective for bulk shipments (20–45 days transit time)
// - Air Freight – Fast delivery for urgent or smaller consignments (5–10 days)

// Packaging:
// - Export-standard packaging to prevent moisture, damage, and contamination
// - Custom labeling and palletizing available upon request

// Shipping Terms (Incoterms):
// - We support FOB, CIF, CFR, and DDP based on customer preference
// - Door-to-door delivery available on request

// Export Documentation Provided:
// - Commercial Invoice & Packing List  
// - Certificate of Origin  
// - Phytosanitary Certificate (if applicable)  
// - Bill of Lading / Airway Bill  
// - Other certificates as per destination country requirement

// We aim to ensure a smooth and transparent shipping experience for all international clients.`,
//     },
    {
      question: "What products do you offer?",
      answer: `We specialize in exporting premium quality agricultural products from India, including:

1. Rice - Various premium varieties including Basmati, Ponni, IR-20 , Matta , Sambha , Kolam Rice and organic options
All our products meet international quality standards and are sourced from certified farms across India.`,
    },
    {
      question: "How can I place an order?",
      answer: `To place an order with TRS Bharat Global Solutions:

1. Contact us via email at info@trsbharatexports.com or call us at +91 90250 71760, +91 89390 38352
2. Specify your product requirements, quantity, and delivery location
3. We'll provide a detailed quotation including pricing and shipping options
4. Upon agreement, we'll send an official order confirmation
5. Payment is processed as per our payment policy
6. Order processing begins after payment confirmation

Our team will guide you through each step of the process to ensure a smooth experience.`,
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

  const handleSendMessage = (message = currentMessage) => {
    if (message.trim()) {
      setChatMessages([...chatMessages, { type: "user", message }])

      // Check if the message matches any predefined questions
      const matchedQA = chatbotQA.find(
        (qa) =>
          qa.question.toLowerCase() === message.toLowerCase() ||
          message.toLowerCase().includes(qa.question.toLowerCase()),
      )

      setTimeout(() => {
        if (matchedQA) {
          setChatMessages((prev) => [...prev, { type: "bot", message: matchedQA.answer }])
        } else {
          setChatMessages((prev) => [
            ...prev,
            {
              type: "bot",
              message:
                "Thank you for your message. Our team will get back to you shortly with detailed information about our products and services.",
            },
          ])
        }

        // Add predefined questions again after answering
        setTimeout(() => {
          setChatMessages((prev) => [
            ...prev,
            {
              type: "bot",
              message: "Is there anything else you'd like to know?",
              showOptions: true,
            },
          ])
        }, 1000)
      }, 1000)

      setCurrentMessage("")
    }
  }

  // Show predefined questions when chatbot opens
  useEffect(() => {
    if (isChatOpen && chatMessages.length === 1) {
      setTimeout(() => {
        setChatMessages([
          ...chatMessages,
          {
            type: "bot",
            message: "Here are some frequently asked questions you might be interested in:",
            showOptions: true,
          },
        ])
      }, 500)
    }
  }, [isChatOpen])

  // Add this useEffect after the existing useEffects
  useEffect(() => {
    if (isChatOpen) {
      // Disable body scroll when chatbot is open
      document.body.style.overflow = "hidden"
    } else {
      // Re-enable body scroll when chatbot is closed
      document.body.style.overflow = "unset"
    }

    // Cleanup function to ensure scroll is re-enabled
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isChatOpen])

  // Add this useEffect to handle auto-scrolling
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [chatMessages])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-amber-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900 to-blue-800 text-white shadow-lg sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo Space */}
            <div className="flex items-center space-x-3">
              {/* Updated Logo */}
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

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-6">
              <button onClick={() => scrollToSection("home")} className="hover:text-amber-300 transition-colors">
                Home
              </button>
              <button onClick={() => scrollToSection("about")} className="hover:text-amber-300 transition-colors">
                About us
              </button>
              <button onClick={() => scrollToSection("products")} className="hover:text-amber-300 transition-colors">
                Product
              </button>
              {/* <a
                href="/flowers"
                className="hover:text-amber-300 transition-colors font-semibold text-amber-300"
              >
                Flower Varieties
              </a>
              <button onClick={() => scrollToSection("moq")} className="hover:text-amber-300 transition-colors">
                MOQ
              </button>
              <button onClick={() => scrollToSection("shipping")} className="hover:text-amber-300 transition-colors">
                Shipping
              </button> */}
              <button onClick={() => scrollToSection("quality")} className="hover:text-amber-300 transition-colors">
                Quality Policy
              </button>
              <a href="/certifications" className="hover:text-amber-300 transition-colors">
                Certifications
              </a>
              {/* <button onClick={() => scrollToSection("payment")} className="hover:text-amber-300 transition-colors">
                Payment
              </button> */}
              <button onClick={() => scrollToSection("contact")} className="hover:text-amber-300 transition-colors">
                Contact
              </button>
              <a href="/blog" className="hover:text-amber-300 transition-colors">
                Blog
              </a>
            </nav>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-white hover:bg-blue-800"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 border-t border-blue-700 pt-4">
              <div className="flex flex-col space-y-2">
                <button
                  onClick={() => scrollToSection("home")}
                  className="hover:text-amber-300 transition-colors py-2 text-left"
                >
                  Home
                </button>
                <button
                  onClick={() => scrollToSection("about")}
                  className="hover:text-amber-300 transition-colors py-2 text-left"
                >
                  About us
                </button>
                <button
                  onClick={() => scrollToSection("products")}
                  className="hover:text-amber-300 transition-colors py-2 text-left"
                >
                  Product
                </button>
                {/* <a
                  href="/flowers"
                  className="hover:text-amber-300 transition-colors py-2 text-left block font-semibold text-amber-300"
                >
                  Flower Varieties
                </a>
                <button
                  onClick={() => scrollToSection("moq")}
                  className="hover:text-amber-300 transition-colors py-2 text-left"
                >
                  MOQ
                </button>
                <button
                  onClick={() => scrollToSection("shipping")}
                  className="hover:text-amber-300 transition-colors py-2 text-left"
                >
                  Shipping
                </button> */}
                <button
                  onClick={() => scrollToSection("quality")}
                  className="hover:text-amber-300 transition-colors py-2 text-left"
                >
                  Quality Policy
                </button>
                <a
                  href="/certifications"
                  className="hover:text-amber-300 transition-colors py-2 text-left"
                >
                  Certifications
                </a>
                {/* <button
                  onClick={() => scrollToSection("payment")}
                  className="hover:text-amber-300 transition-colors py-2 text-left"
                >
                  Payment
                </button> */}
                <button
                  onClick={() => scrollToSection("contact")}
                  className="hover:text-amber-300 transition-colors py-2 text-left"
                >
                  Contact
                </button>
                <a
                  href="/blog"
                  className="hover:text-amber-300 transition-colors py-2 text-left"
                >
                  Blog
                </a>
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      {/* Hero Section with Animated Video Background */}
      {/* Hero Section */}
      <section id="home" className="py-16 px-4 bg-gradient-to-br from-blue-50 to-white">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-blue-900">Premium </span>
                <span className="text-amber-600">Global</span>
                <br />
                <span className="text-blue-900">Solutions</span>
              </h2>

              <p className="text-blue-700 text-lg leading-relaxed">
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
                  className="bg-blue-900 hover:bg-blue-800 text-white px-8 py-3 text-lg"
                  onClick={() => scrollToSection("products")}
                >
                  Explore Products
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-amber-600 text-amber-700 hover:bg-amber-50 px-8 py-3 text-lg font-medium bg-transparent"
                  onClick={() => scrollToSection("contact")}
                >
                  Contact Us
                </Button>
              </div>
            </div>

            {/* Right Image */}
            <div className="flex justify-center">
              <div className="w-full max-w-lg">
                <img
                  src="/assets/logo-trs.jpeg"
                  alt="Global Shipping and Export Services"
                  className="w-full h-auto rounded-lg shadow-xl object-cover"
                />
              </div>
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
              quality fresh flowers ,rice, coconut, and cashew nuts products to global markets.
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
            <h3 className="text-4xl sm:text-5xl font-bold mb-6">
              Watch Our <span className="text-amber-400">Journey</span>
            </h3>
            <p className="text-blue-100 text-xl max-w-4xl mx-auto leading-relaxed">
              Experience the excellence of TRS Bharat Global Solutions through our comprehensive video showcase. From
              farm to global markets, witness our commitment to quality and innovation.
            </p>
          </div>

          {/* Main Featured Video */}
          <div className="mb-16">
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
                </div>
              </div>
            </div>
          </div>

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
      <footer className="bg-blue-900 text-white py-8 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
{/*               <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center">
                <span className="text-blue-900 font-bold">T</span> */}
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <img
                  src="/assets/logo-trs.jpeg"
                  alt="TRS Bharat Global Solutions Logo"
                  className="w-6 h-6 object-contain"
                />
              </div>
              <span className="text-xl font-bold">TRS Bharat Global Solutions</span>
            </div>
          </div>
          <div className="border-t border-blue-800 pt-6 text-center">
            <p className="text-blue-200 mb-2">Premium Export Solutions • Connecting India to the World</p>
            <p className="text-blue-300 text-sm">© 2025 TRS Bharat Global Solutions. All rights reserved.</p>
            <div className="mt-6 flex justify-center items-center space-x-4">
              <a
                href="https://www.instagram.com/trsbharatexports/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="bg-gradient-to-br from-amber-400 to-amber-600 p-2.5 rounded-full hover:opacity-90 hover:scale-110 transition-all"
              >
                <Instagram className="w-5 h-5 text-blue-900" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61590417239122"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="bg-gradient-to-br from-amber-400 to-amber-600 p-2.5 rounded-full hover:opacity-90 hover:scale-110 transition-all"
              >
                <Facebook className="w-5 h-5 text-blue-900" />
              </a>
              <a
                href="https://www.linkedin.com/in/trs-bharat-global-solutions?utm"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="bg-gradient-to-br from-amber-400 to-amber-600 p-2.5 rounded-full hover:opacity-90 hover:scale-110 transition-all"
              >
                <Linkedin className="w-5 h-5 text-blue-900" />
              </a>
              <a
                href="https://x.com/TRSBharatExport"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="bg-gradient-to-br from-amber-400 to-amber-600 p-2.5 rounded-full hover:opacity-90 hover:scale-110 transition-all"
              >
                <Twitter className="w-5 h-5 text-blue-900" />
              </a>
            </div>
            <div className="mt-4 flex flex-col md:flex-row justify-center items-center space-y-3 md:space-y-0 md:space-x-8">
              <div className="flex items-center space-x-2">
                <p className="text-amber-300 text-base font-medium">Developed By</p>
                <p className="text-white text-base font-semibold">BKB Incorporation</p>
                <a
                  href="https://www.instagram.com/bkb_incorporation/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-br from-amber-400 to-amber-600 p-1.5 rounded-full hover:opacity-90 transition-opacity"
                >
                  <Instagram className="w-4 h-4 text-blue-900" />
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <p className="text-amber-300 text-base font-medium">In Association with</p>
                <p className="text-white text-base font-semibold">Brandspark</p>
                <a
                  href="https://www.instagram.com/brandsparksm/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-br from-amber-400 to-amber-600 p-1.5 rounded-full hover:opacity-90 transition-opacity"
                >
                  <Instagram className="w-4 h-4 text-blue-900" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

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

        {/* Chat Button */}
        {!isChatOpen && (
          <Button
            onClick={() => setIsChatOpen(true)}
            className="rounded-full w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-blue-900 to-blue-800 hover:from-blue-800 hover:to-blue-700 shadow-lg p-0"
          >
            <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
          </Button>
        )}
      </div>

      {/* Chatbot Card - Properly Fixed */}
      {isChatOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-end p-4 pointer-events-none">
          <Card className="w-full max-w-sm sm:max-w-md lg:max-w-lg h-[80vh] max-h-[600px] shadow-2xl border-blue-200 pointer-events-auto mb-16 sm:mb-20">
            <CardHeader className="bg-gradient-to-r from-blue-900 to-blue-800 text-white rounded-t-lg p-3 sm:p-4 flex-shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <MessageCircle className="w-4 h-4 text-blue-900" />
                  </div>
                  <div>
                    <CardTitle className="text-base sm:text-lg">TRS Support</CardTitle>
                    <p className="text-blue-200 text-xs sm:text-sm">Online now</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsChatOpen(false)}
                  className="text-white hover:bg-blue-800 p-1 rounded-full"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="p-0 flex flex-col h-full">
              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 bg-gray-50">
                {chatMessages.map((msg, index) => (
                  <div key={index} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[85%] p-2 sm:p-3 rounded-lg text-sm shadow-sm ${
                        msg.type === "user"
                          ? "bg-blue-900 text-white rounded-br-none"
                          : "bg-white text-blue-900 border border-blue-100 rounded-bl-none"
                      }`}
                    >
                      <p className="whitespace-pre-line break-words leading-relaxed">{msg.message}</p>

                      {msg.showOptions && (
                        <div className="mt-3 space-y-2">
                          {chatbotQA.map((qa, idx) => (
                            <Button
                              key={idx}
                              variant="outline"
                              size="sm"
                              onClick={() => handleSendMessage(qa.question)}
                              className="text-xs w-full justify-start text-left bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-900 p-2 h-auto min-h-[2rem] rounded-md transition-colors"
                            >
                              <span className="break-words">{qa.question}</span>
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {/* Invisible div to scroll to */}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-3 sm:p-4 border-t border-gray-200 bg-white flex-shrink-0">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Type your message..."
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    className="flex-1 border-blue-200 focus:border-amber-500 text-sm rounded-full px-4"
                  />
                  <Button
                    onClick={() => handleSendMessage()}
                    size="sm"
                    className="bg-blue-900 hover:bg-blue-800 px-3 rounded-full shadow-md"
                    disabled={!currentMessage.trim()}
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">Powered by TRS Bharat Global Solutions</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
