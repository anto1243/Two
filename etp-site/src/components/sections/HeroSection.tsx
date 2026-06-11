"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Phone, Shield, Clock, Award, ChevronDown } from "lucide-react"
import { COMPANY } from "@/lib/utils"

const badges = [
  { icon: Shield, label: "Assurance décennale" },
  { icon: Award, label: "+15 ans d'expérience" },
  { icon: Clock, label: "Réponse sous 24h" },
]

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        {/* Industrial pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#141e3d] via-[#1e2d5a] to-[#0d1428]" />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(196,30,58,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(196,30,58,0.5) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
        {/* Radial spotlight */}
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(196,30,58,0.12) 0%, transparent 70%)",
          }}
        />
        {/* Diagonal accent */}
        <div
          className="absolute top-0 right-0 w-1/2 h-full opacity-5"
          style={{
            background: "linear-gradient(135deg, transparent 30%, rgba(196,30,58,0.8) 100%)",
          }}
        />
        {/* Bottom diagonal */}
        <div
          className="absolute bottom-0 left-0 right-0 h-24 bg-white z-10"
          style={{ clipPath: "polygon(0 100%, 100% 0, 100% 100%)" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="h-px w-12 bg-[#c41e3a]" />
              <span className="text-[#c41e3a] text-xs font-bold uppercase tracking-[4px]">
                Villeneuve-le-Roi — Val-de-Marne
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-[1.05] mb-6"
            >
              Votre expert en{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-[#c41e3a]">Travaux</span>
              </span>
              <br />
              <span className="text-[#c41e3a]">Publics</span>
              <br />
              en Île-de-France
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="text-gray-300 text-lg md:text-xl leading-relaxed mb-10 max-w-lg"
            >
              Terrassement, VRD, Assainissement, Voirie et Aménagements extérieurs.
              Des solutions sur mesure pour particuliers, entreprises et collectivités.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <Link
                href="/devis"
                className="group flex items-center justify-center gap-3 bg-gradient-to-r from-[#c41e3a] to-[#9b1528] text-white px-8 py-4 rounded-xl font-bold text-base hover:shadow-2xl hover:shadow-red-900/40 hover:-translate-y-1 transition-all duration-300"
              >
                Demander un devis gratuit
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}
                className="flex items-center justify-center gap-3 border-2 border-white/30 text-white px-8 py-4 rounded-xl font-bold text-base hover:bg-white/10 hover:border-white/60 transition-all duration-300"
              >
                <Phone size={18} />
                {COMPANY.phone}
              </a>
            </motion.div>

            {/* Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.65 }}
              className="flex flex-wrap gap-4"
            >
              {badges.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-lg"
                >
                  <Icon size={14} className="text-[#c41e3a]" />
                  <span className="text-white text-xs font-medium">{label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Stats card */}
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden lg:block"
          >
            <div className="relative">
              {/* Main card */}
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-2xl">
                <div className="grid grid-cols-2 gap-6 mb-6">
                  {[
                    { value: "500+", label: "Projets réalisés" },
                    { value: "15+", label: "Années d'expérience" },
                    { value: "100%", label: "Clients satisfaits" },
                    { value: "94", label: "Département principal" },
                  ].map(({ value, label }) => (
                    <div
                      key={label}
                      className="text-center p-5 bg-white/10 rounded-2xl border border-white/10"
                    >
                      <div className="text-3xl font-black text-[#c41e3a] mb-1">{value}</div>
                      <div className="text-gray-400 text-xs font-medium">{label}</div>
                    </div>
                  ))}
                </div>
                <div className="bg-gradient-to-r from-[#c41e3a]/20 to-transparent border border-[#c41e3a]/30 rounded-2xl p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-[#c41e3a] rounded-xl flex items-center justify-center">
                      <Phone size={18} className="text-white" />
                    </div>
                    <div>
                      <p className="text-white text-xs font-medium">Disponible maintenant</p>
                      <p className="text-gray-400 text-xs">Lun–Ven 7h–18h</p>
                    </div>
                  </div>
                  <a
                    href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}
                    className="block text-center bg-[#c41e3a] text-white font-bold py-3 rounded-xl hover:bg-[#9b1528] transition-colors"
                  >
                    {COMPANY.phone}
                  </a>
                </div>
              </div>

              {/* Floating accent */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#c41e3a] rounded-2xl opacity-20 rotate-12" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white rounded-xl opacity-10 -rotate-6" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-white/40 text-xs tracking-widest uppercase">Découvrir</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown size={20} className="text-white/40" />
        </motion.div>
      </motion.div>
    </section>
  )
}
