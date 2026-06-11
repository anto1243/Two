"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { MapPin, Calendar, ArrowRight, Phone } from "lucide-react"
import { COMPANY } from "@/lib/utils"

const categories = ["Tous", "Voirie", "Assainissement", "Terrassement", "VRD", "Démolition", "Aménagement"]

const projects = [
  {
    id: 1,
    title: "Réhabilitation voirie communale",
    location: "Villeneuve-le-Roi (94)",
    category: "Voirie",
    year: "2023",
    duration: "3 mois",
    surface: "2,3 km",
    description:
      "Réfection complète de 2,3 km de voirie urbaine incluant la pose de nouvelles bordures en granit, caniveaux, avaloirs et enrobé bitumineux BBSG 0/10. Travaux réalisés en phases pour maintenir la circulation.",
    client: "Mairie de Villeneuve-le-Roi",
    bg: "from-[#1e2d5a] to-[#2a3f7a]",
  },
  {
    id: 2,
    title: "Réseau d'assainissement collectif",
    location: "Orly (94)",
    category: "Assainissement",
    year: "2023",
    duration: "4 mois",
    surface: "800 ml",
    description:
      "Pose de 800 ml de canalisations en béton DN 400 pour réseau EU et 600 ml pour réseau EP. Création de 12 regards de visite et branchements particuliers. Inspection caméra et essais d'étanchéité.",
    client: "Syndicat des Eaux",
    bg: "from-[#c41e3a] to-[#9b1528]",
  },
  {
    id: 3,
    title: "Terrassement zone industrielle",
    location: "Vitry-sur-Seine (94)",
    category: "Terrassement",
    year: "2022",
    duration: "2 mois",
    surface: "15 000 m³",
    description:
      "Décapage de terre végétale sur 2 ha, terrassement de 15 000 m³ en déblai/remblai pour la création d'une zone logistique. Traitement des terres à la chaux et compactage à 95% OPN.",
    client: "Promoteur privé",
    bg: "from-[#374151] to-[#1f2937]",
  },
  {
    id: 4,
    title: "Aménagement parking 200 places",
    location: "Choisy-le-Roi (94)",
    category: "VRD",
    year: "2022",
    duration: "3,5 mois",
    surface: "6 000 m²",
    description:
      "Création d'un parking de 200 places avec fondations, enrobé drainant, éclairage LED, marquage au sol, noues végétalisées et installation de 20 bornes de recharge pour véhicules électriques.",
    client: "Groupe commercial",
    bg: "from-[#1e2d5a] to-[#141e3d]",
  },
  {
    id: 5,
    title: "VRD lotissement résidentiel",
    location: "Maisons-Alfort (94)",
    category: "VRD",
    year: "2023",
    duration: "5 mois",
    surface: "45 lots",
    description:
      "Viabilisation complète d'un lotissement de 45 logements collectifs : réseaux eau potable, assainissement EU/EP, gaz basse pression, électricité BT, télécom et fibre optique. Voiries internes et espaces verts.",
    client: "Promoteur immobilier",
    bg: "from-[#9b1528] to-[#7a0f1e]",
  },
  {
    id: 6,
    title: "Démolition industrielle",
    location: "Créteil (94)",
    category: "Démolition",
    year: "2023",
    duration: "2,5 mois",
    surface: "3 000 m²",
    description:
      "Démolition sélective de 3 000 m² de bâtiments industriels avec tri et valorisation des matériaux (acier, béton, brique). Désamiantage préalable, évacuation des déchets et remise en état du site.",
    client: "Industriel",
    bg: "from-[#374151] to-[#111827]",
  },
  {
    id: 7,
    title: "Aménagement parc paysager",
    location: "Alfortville (94)",
    category: "Aménagement",
    year: "2022",
    duration: "4 mois",
    surface: "8 000 m²",
    description:
      "Aménagement d'un parc urbain de 8 000 m² : chemins en stabilisé, mobilier urbain, plantation d'arbres et arbustes, système d'arrosage automatique, éclairage basse consommation et aires de jeux.",
    client: "Mairie d'Alfortville",
    bg: "from-[#166534] to-[#14532d]",
  },
  {
    id: 8,
    title: "Réfection réseau eau potable",
    location: "Thiais (94)",
    category: "VRD",
    year: "2023",
    duration: "3 mois",
    surface: "1,2 km",
    description:
      "Remplacement de 1,2 km de canalisations fonte par réseau PEHD DN 110 avec renouvellement des branchements particuliers, pose de vannes sectorielles et compteurs télérelevés.",
    client: "Syndicat des Eaux 94",
    bg: "from-[#1e2d5a] to-[#c41e3a]",
  },
  {
    id: 9,
    title: "Terrassement résidence séniors",
    location: "Ivry-sur-Seine (94)",
    category: "Terrassement",
    year: "2022",
    duration: "3 mois",
    surface: "8 000 m³",
    description:
      "Terrassement général et fondations pour résidence de 80 logements seniors. Paroi berlinoise de soutènement, pompage des eaux de fond de fouille, réseaux de drainage et remblais de qualité.",
    client: "Groupe immobilier senior",
    bg: "from-[#7c2d12] to-[#451a03]",
  },
]

export default function RealisationsPage() {
  const [active, setActive] = useState("Tous")

  const filtered = active === "Tous" ? projects : projects.filter((p) => p.category === active)

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#141e3d] to-[#1e2d5a] py-32 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(rgba(196,30,58,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(196,30,58,0.5) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="w-8 h-px bg-[#c41e3a]" />
              <span className="text-[#c41e3a] text-xs font-bold uppercase tracking-[4px]">Portfolio</span>
              <div className="w-8 h-px bg-[#c41e3a]" />
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6">Nos Réalisations</h1>
            <p className="text-gray-300 text-xl max-w-2xl mx-auto">
              {projects.length}+ projets réalisés en Val-de-Marne et Île-de-France
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-10 bg-white border-b border-gray-100 sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                  active === cat
                    ? "bg-[#c41e3a] text-white shadow-lg shadow-red-200"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 bg-[#f8f9fa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="popLayout">
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 card-hover"
                >
                  {/* Visual */}
                  <div className={`bg-gradient-to-br ${project.bg} h-48 relative flex items-end p-6`}>
                    <div className="absolute inset-0 opacity-10"
                      style={{
                        backgroundImage: `linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%)`,
                        backgroundSize: "20px 20px",
                      }}
                    />
                    <div className="relative z-10 flex items-end justify-between w-full">
                      <span className="px-3 py-1 bg-white/20 border border-white/40 rounded-full text-white text-xs font-bold backdrop-blur-sm">
                        {project.category}
                      </span>
                      <span className="text-white/60 text-xs font-medium">{project.duration}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="font-bold text-[#1e2d5a] text-lg mb-2 group-hover:text-[#c41e3a] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-3">
                      {project.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                      <span className="flex items-center gap-1">
                        <MapPin size={11} /> {project.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={11} /> {project.year}
                      </span>
                    </div>
                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-xs text-gray-400">Client : {project.client}</span>
                      <span className="text-xs font-bold text-[#c41e3a]">{project.surface}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-[#1e2d5a] to-[#141e3d]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-white mb-4">Votre projet sera notre prochaine réalisation</h2>
          <p className="text-gray-300 text-lg mb-8">Contactez-nous pour discuter de votre projet</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/devis"
              className="flex items-center justify-center gap-2 bg-[#c41e3a] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#9b1528] transition-colors">
              Demander un devis gratuit
              <ArrowRight size={18} />
            </Link>
            <a href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}
              className="flex items-center justify-center gap-2 border-2 border-white/30 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-colors">
              <Phone size={18} />
              {COMPANY.phone}
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
