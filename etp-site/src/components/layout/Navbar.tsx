"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Phone, Menu, X, ChevronRight } from "lucide-react"
import { COMPANY } from "@/lib/utils"

const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/services", label: "Nos Services" },
  { href: "/realisations", label: "Réalisations" },
  { href: "/about", label: "À Propos" },
  { href: "/devis", label: "Devis" },
  { href: "/contact", label: "Contact" },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  return (
    <>
      {/* Top bar */}
      <div className="bg-[#1e2d5a] text-white py-2 px-4 text-sm hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <span className="text-gray-300 text-xs">
            {COMPANY.address}
          </span>
          <div className="flex items-center gap-6">
            <a href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}
              className="flex items-center gap-1.5 hover:text-[#c41e3a] transition-colors">
              <Phone size={12} />
              <span className="text-xs font-medium">{COMPANY.phone}</span>
            </a>
            <a href={`tel:${COMPANY.mobile.replace(/\s/g, "")}`}
              className="flex items-center gap-1.5 hover:text-[#c41e3a] transition-colors">
              <Phone size={12} />
              <span className="text-xs font-medium">{COMPANY.mobile}</span>
            </a>
            <a href={`mailto:${COMPANY.email}`}
              className="text-xs text-gray-300 hover:text-white transition-colors">
              {COMPANY.email}
            </a>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <motion.nav
        initial={false}
        animate={{
          backgroundColor: scrolled ? "rgba(255,255,255,0.98)" : "rgba(255,255,255,0)",
          backdropFilter: scrolled ? "blur(20px)" : "blur(0px)",
          boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.08)" : "none",
        }}
        transition={{ duration: 0.3 }}
        className="sticky top-0 z-50 w-full"
        style={{ position: "sticky" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-[#c41e3a] to-[#9b1528] rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                  <span className="text-white font-black text-lg tracking-tighter">ETP</span>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#1e2d5a] rounded-full"></div>
              </div>
              <div>
                <div className={`font-black text-lg leading-none transition-colors ${
                  scrolled ? "text-[#1e2d5a]" : "text-white"
                }`}>
                  Evariste TP
                </div>
                <div className={`text-xs font-medium tracking-widest uppercase transition-colors ${
                  scrolled ? "text-[#c41e3a]" : "text-[#f8b4be]"
                }`}>
                  Travaux Publics
                </div>
              </div>
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    pathname === link.href
                      ? scrolled
                        ? "text-[#c41e3a] bg-[#c41e3a]/10"
                        : "text-white bg-white/20"
                      : scrolled
                      ? "text-[#1e2d5a] hover:text-[#c41e3a] hover:bg-[#c41e3a]/5"
                      : "text-white/90 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {link.label}
                  {pathname === link.href && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute bottom-0 left-4 right-4 h-0.5 bg-[#c41e3a] rounded-full"
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}
                className={`flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg border transition-all ${
                  scrolled
                    ? "border-[#c41e3a] text-[#c41e3a] hover:bg-[#c41e3a] hover:text-white"
                    : "border-white/60 text-white hover:bg-white hover:text-[#c41e3a]"
                }`}
              >
                <Phone size={14} />
                {COMPANY.phone}
              </a>
              <Link
                href="/devis"
                className="btn-primary text-sm py-2.5 px-5 rounded-lg"
              >
                Devis gratuit
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${
                scrolled ? "text-[#1e2d5a]" : "text-white"
              }`}
              aria-label="Menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-0 z-40 bg-white shadow-2xl pt-24 pb-8 lg:hidden"
          >
            <div className="px-6 space-y-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className={`flex items-center justify-between px-4 py-3.5 rounded-xl text-base font-medium transition-colors ${
                      pathname === link.href
                        ? "bg-[#c41e3a] text-white"
                        : "text-[#1e2d5a] hover:bg-[#c41e3a]/5"
                    }`}
                  >
                    {link.label}
                    <ChevronRight size={16} className="opacity-50" />
                  </Link>
                </motion.div>
              ))}
              <div className="pt-4 space-y-3">
                <a
                  href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}
                  className="flex items-center justify-center gap-2 w-full py-3.5 border-2 border-[#c41e3a] text-[#c41e3a] rounded-xl font-semibold"
                >
                  <Phone size={16} />
                  {COMPANY.phone}
                </a>
                <Link
                  href="/devis"
                  className="btn-primary block text-center w-full py-3.5 rounded-xl"
                >
                  Demander un devis gratuit
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
