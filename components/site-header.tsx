"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronDown } from "lucide-react"

const navLinks: Array<{ label: string; href: string }> = [
  { label: "Home", href: "/" },
  { label: "About us", href: "/#about" },
  { label: "Quality Policy", href: "/#quality" },
  { label: "Certifications", href: "/certifications" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/#contact" },
]

const productLinks = [
  // { label: "Rice Varieties", href: "/rice" },
  { label: "Basmati", href: "/rice?category=Basmati" },
  { label: "Non-Basmati", href: "/rice?category=Non-Basmati" },
]

export function SiteHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isProductsOpen, setIsProductsOpen] = useState(false)

  return (
    <header className="bg-gradient-to-r from-blue-900 to-blue-800 text-white shadow-lg sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
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
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            <Link href="/" className="hover:text-amber-300 transition-colors">
              Home
            </Link>
            <Link href="/#about" className="hover:text-amber-300 transition-colors">
              About us
            </Link>

            {/* Products dropdown */}
            <div className="relative group">
              <button className="flex items-center hover:text-amber-300 transition-colors">
                Products
                <ChevronDown className="w-4 h-4 ml-1 group-hover:rotate-180 transition-transform" />
              </button>
              <div className="absolute left-0 top-full pt-2 w-56 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200">
                <div className="bg-white text-blue-900 rounded-lg shadow-2xl border border-blue-100 overflow-hidden">
                  {productLinks.map((p) => (
                    <Link
                      key={p.href}
                      href={p.href}
                      className="block px-4 py-3 text-sm font-medium hover:bg-amber-50 hover:text-amber-700 border-b border-blue-50 last:border-b-0"
                    >
                      {p.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link href="/#quality" className="hover:text-amber-300 transition-colors">
              Quality Policy
            </Link>
            <Link href="/certifications" className="hover:text-amber-300 transition-colors">
              Certifications
            </Link>
            <Link href="/blog" className="hover:text-amber-300 transition-colors">
              Blog
            </Link>
            <Link href="/faq" className="hover:text-amber-300 transition-colors">
              FAQ
            </Link>
            <Link href="/#contact" className="hover:text-amber-300 transition-colors">
              Contact
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden text-white hover:bg-blue-800"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="lg:hidden mt-4 pb-4 border-t border-blue-700 pt-4">
            <div className="flex flex-col space-y-2">
              {navLinks.slice(0, 2).map((l) => (
                <Link key={l.href} href={l.href} className="hover:text-amber-300 transition-colors py-2">
                  {l.label}
                </Link>
              ))}

              {/* Mobile Products collapsible */}
              <button
                onClick={() => setIsProductsOpen(!isProductsOpen)}
                className="flex items-center justify-between hover:text-amber-300 transition-colors py-2 text-left"
              >
                <span>Products</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isProductsOpen ? "rotate-180" : ""}`} />
              </button>
              {isProductsOpen && (
                <div className="pl-4 flex flex-col space-y-2 border-l-2 border-amber-400">
                  {productLinks.map((p) => (
                    <Link key={p.href} href={p.href} className="text-amber-200 hover:text-amber-300 transition-colors py-1.5 text-sm">
                      {p.label}
                    </Link>
                  ))}
                </div>
              )}

              {navLinks.slice(2).map((l) => (
                <Link key={l.href} href={l.href} className="hover:text-amber-300 transition-colors py-2">
                  {l.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
