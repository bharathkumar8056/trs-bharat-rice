import Link from "next/link"
import { Instagram, Facebook, Linkedin, Twitter, Mail, Phone, MapPin } from "lucide-react"

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/#about" },
  // { label: "Quality Policy", href: "/#quality" },
  { label: "Certifications", href: "/certifications" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/#contact" },
]

const productLinks = [
  { label: "All Rice Varieties", href: "/rice" },
  { label: "Basmati Rice", href: "/rice?category=Basmati" },
  { label: "Non-Basmati Rice", href: "/rice?category=Non-Basmati" },
]

export function SiteFooter() {
  return (
    <footer className="bg-blue-900 text-white pt-12 pb-6 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <img src="/assets/logo-trs.jpeg" alt="TRS Bharat Logo" className="w-8 h-8 object-contain" />
              </div>
              <span className="text-lg font-bold">TRS Bharat</span>
            </div>
            <p className="text-blue-200 text-sm leading-relaxed mb-4">
              Premium Export Solutions • Connecting Indian agriculture to global markets with quality and trust.
            </p>
            <div className="flex space-x-2">
              <a href="https://www.instagram.com/trsbharatexports/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                className="bg-gradient-to-br from-amber-400 to-amber-600 p-2 rounded-full hover:opacity-90 hover:scale-110 transition-all">
                <Instagram className="w-4 h-4 text-blue-900" />
              </a>
              <a href="https://www.facebook.com/profile.php?id=61590417239122" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                className="bg-gradient-to-br from-amber-400 to-amber-600 p-2 rounded-full hover:opacity-90 hover:scale-110 transition-all">
                <Facebook className="w-4 h-4 text-blue-900" />
              </a>
              <a href="https://www.linkedin.com/in/trs-bharat-global-solutions?utm" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                className="bg-gradient-to-br from-amber-400 to-amber-600 p-2 rounded-full hover:opacity-90 hover:scale-110 transition-all">
                <Linkedin className="w-4 h-4 text-blue-900" />
              </a>
              <a href="https://x.com/TRSBharatExport" target="_blank" rel="noopener noreferrer" aria-label="Twitter"
                className="bg-gradient-to-br from-amber-400 to-amber-600 p-2 rounded-full hover:opacity-90 hover:scale-110 transition-all">
                <Twitter className="w-4 h-4 text-blue-900" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-amber-400 font-bold mb-4 uppercase text-sm tracking-wide">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-blue-200 hover:text-amber-300 text-sm transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-amber-400 font-bold mb-4 uppercase text-sm tracking-wide">Our Products</h4>
            <ul className="space-y-2">
              {productLinks.map((p) => (
                <li key={p.href}>
                  <Link href={p.href} className="text-blue-200 hover:text-amber-300 text-sm transition-colors">
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-amber-400 font-bold mb-4 uppercase text-sm tracking-wide">Get In Touch</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2 text-blue-200">
                <MapPin className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                <span>F2, Plot A2, Phase 2 Extn, Sumeru City, Selaiyur, Chennai - 600 073, TN, India</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <a href="mailto:info@trsbharatexports.com" className="text-blue-200 hover:text-amber-300 break-all">
                  info@trsbharatexports.com
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <a href="tel:+919025071760" className="text-blue-200 hover:text-amber-300">
                  +91 90250 71760
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="border-t border-blue-800 pt-6 text-center">
          <p className="text-blue-300 text-sm mb-3">© 2025 TRS Bharat Global Solutions. All rights reserved.</p>
          <div className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-6 text-xs">
            <div className="flex items-center space-x-2">
              <span className="text-amber-300">Developed By</span>
              <span className="text-white font-semibold">BKB Incorporation</span>
              <a href="https://www.instagram.com/bkb_incorporation/" target="_blank" rel="noopener noreferrer"
                className="bg-gradient-to-br from-amber-400 to-amber-600 p-1 rounded-full hover:opacity-90 transition-opacity">
                <Instagram className="w-3 h-3 text-blue-900" />
              </a>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-amber-300">In Association with</span>
              <span className="text-white font-semibold">Brandspark</span>
              <a href="https://www.instagram.com/brandsparksm/" target="_blank" rel="noopener noreferrer"
                className="bg-gradient-to-br from-amber-400 to-amber-600 p-1 rounded-full hover:opacity-90 transition-opacity">
                <Instagram className="w-3 h-3 text-blue-900" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
