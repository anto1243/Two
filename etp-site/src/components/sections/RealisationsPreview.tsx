"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, MapPin, Calendar } from "lucide-react"
import SectionHeader from "@/components/shared/SectionHeader"

const realisations = [
  {
    id: 1,
    title: "Réhabilitation voirie communale",
    location: "Villeneuve-le-Roi (94)",
    category: "Voirie",
    year: "2023",
    description: "Réfection complète de 2,3 km de voirie avec pose de bordures, caniveaux et enrobé bitumineux.",
    bg: "from-[#1e2d5a] to-[#2a3f7a]",
  },
  {
    id: 2,
    title: "Réseau d'assainissement",
    location: "Orly (94)",
    category: "Assainissement",
    year: "2023",
    description: "Pose de 800 ml de canalisations DN 400 et création de 12 regards de visite pour réseau EU/EP.",
    bg: "from-[#c41e3a] to-[#9b1528]",
  },
  {
    id: 3,
    title: "Terrassement zone industrielle",
    location: "Vitry-sur-Seine (94)",
    category: "Terrassement",
    year: "2022",
    description: "Décapage et terrassement de 15 000 m³ pour la création d'une zone logistique.",
    bg: "from-[#374151] to-[#1f2937]",
  },
  {
    id: 4,
    title: "Aménagement parking 200 places",
    location: "Choisy-le-Roi (94)",
    category: "VRD",
    year: "2022",
    description: "Création d'un parking avec éclairage, marquage, noues végétalisées et bornes de recharge.",
    bg: "from-[#1e2d5a] to-[#141e3d]",
  },
  {
    id: 5,
    title: "VRD lotissement résidentiel",
    location: "Maisons-Alfort (94)",
    category: "VRD",
    year: "2023",
    description: "Viabilisation complète d'un lotissement de 45 logements : réseaux eau, gaz, électricité, télécom.",
    bg: "from-[#9b1528] to-[#7a0f1e]",
  },
  {
    id: 6,
    title: "Démolition industrielle",
    location: "Créteil (94)",
    category: "Démolition",
    year: "2023",
    description: "Démolition sélective de 3 000 m² de bâtiments industriels avec traitement des déchets.",
    bg: "from-[#374151] to-[#111827]",
  },
]

const categoryColors: Record<string, string> = {
  Voirie: "#c41e3a",
  Assainissement: "#1e2d5a",
  Terrassement: "#374151",
  VRD: "#c41e3a",
  Démolition: "#6b7280",
}

export default function RealisationsPreview() {
  return (
    <section className="py-24 bg-[#f8f9fa]" id="realisations">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <SectionHeader
            eyebrow="Nos réalisations"
            title="Des projets concrets, des résultats visibles"
            subtitle="Découvrez une sélection de nos chantiers réalisés en Val-de-Marne et en Île-de-France."
          />
          <Link
            href="/realisations"
            className="flex-shrink-0 flex items-center gap-2 text-[#c41e3a] font-bold hover:text-[#9b1528] transition-colors"
          >
            Voir toutes les réalisations
            <ArrowRight size={18} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {realisations.map((real, i) => (
            <motion.div
              key={real.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 card-hover"
            >
              {/* Visual header */}
              <div className={`bg-gradient-to-br ${real.bg} h-44 relative flex items-center justify-center p-6`}>
                <div className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%),
                      linear-gradient(-45deg, rgba(255,255,255,0.1) 25%, transparent 25%)`,
                    backgroundSize: "20px 20px",
                  }}
                />
                <div className="relative z-10 text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-3 border border-white/30">
                    <span className="text-white font-black text-xl">{real.id.toString().padStart(2, "0")}</span>
                  </div>
                  <span
                    className="px-3 py-1 rounded-full text-xs font-bold text-white border border-white/40 bg-white/20"
                  >
                    {real.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-bold text-[#1e2d5a] text-lg mb-2 group-hover:text-[#c41e3a] transition-colors">
                  {real.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">
                  {real.description}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <MapPin size={11} />
                    {real.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={11} />
                    {real.year}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
