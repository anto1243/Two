"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import {
  Mountain, Network, Waves, Car, Cable, Building2, TreePine, HardHat,
  CheckCircle, ArrowRight, Phone,
} from "lucide-react"
import SectionHeader from "@/components/shared/SectionHeader"
import { COMPANY } from "@/lib/utils"

const services = [
  {
    icon: Mountain,
    title: "Terrassement",
    slug: "terrassement",
    description:
      "Le terrassement est la première étape fondamentale de tout projet de construction. ETP maîtrise toutes les techniques de terrassement pour préparer votre terrain dans les meilleures conditions.",
    benefits: [
      "Décapage et déblaiement de terrain",
      "Remblaiement et compactage",
      "Nivellement et planage",
      "Talutage et soutènement",
      "Évacuation des terres excédentaires",
      "Gestion des eaux de ruissellement",
    ],
    color: "#c41e3a",
    bg: "from-[#c41e3a] to-[#9b1528]",
  },
  {
    icon: Network,
    title: "VRD – Voirie et Réseaux Divers",
    slug: "vrd",
    description:
      "La maîtrise des réseaux souterrains et de la voirie est au cœur de notre savoir-faire. Nous coordonnons l'ensemble des interventions pour une livraison clé en main.",
    benefits: [
      "Pose de canalisations eau potable",
      "Réseaux d'eaux pluviales",
      "Branchements individuels et collectifs",
      "Pose de fourreaux et câbles",
      "Création de regards et ouvrages",
      "Coordination multi-réseaux",
    ],
    color: "#1e2d5a",
    bg: "from-[#1e2d5a] to-[#141e3d]",
  },
  {
    icon: Waves,
    title: "Assainissement",
    slug: "assainissement",
    description:
      "La gestion des eaux usées et pluviales est un enjeu environnemental et réglementaire majeur. ETP réalise vos réseaux d'assainissement conformément aux normes en vigueur.",
    benefits: [
      "Réseaux EU séparatifs et unitaires",
      "Assainissement non collectif",
      "Stations de relevage",
      "Bassins de rétention et infiltration",
      "Réhabilitation par chemisage",
      "Inspection caméra et curage",
    ],
    color: "#c41e3a",
    bg: "from-[#c41e3a] to-[#9b1528]",
  },
  {
    icon: Car,
    title: "Voirie",
    slug: "voirie",
    description:
      "La qualité de vos routes, allées et parkings reflète votre image. ETP réalise tous types de travaux de voirie, de la simple réfection à la création complète.",
    benefits: [
      "Création de routes et allées",
      "Réfection d'enrobés bitumineux",
      "Pose de pavés et dalles",
      "Aménagements de parkings",
      "Trottoirs et bordures",
      "Signalisation et marquage au sol",
    ],
    color: "#1e2d5a",
    bg: "from-[#374151] to-[#1f2937]",
  },
  {
    icon: Cable,
    title: "Réseaux divers",
    slug: "reseaux",
    description:
      "ETP intervient sur l'ensemble des réseaux enterrés : électricité, gaz, télécom, fibre optique. Une équipe polyvalente pour une coordination optimale de vos chantiers.",
    benefits: [
      "Fourreaux électrique HTA/BT",
      "Pose de fibres optiques",
      "Réseaux gaz basse pression",
      "Éclairage public",
      "Câbles télécommunications",
      "Gestion des fouilles et remblais",
    ],
    color: "#c41e3a",
    bg: "from-[#c41e3a] to-[#7a0f1e]",
  },
  {
    icon: Building2,
    title: "Démolition",
    slug: "demolition",
    description:
      "La démolition est une phase délicate qui nécessite expertise et rigueur. ETP dispose des compétences et du matériel pour intervenir sur tous types de structures.",
    benefits: [
      "Démolition sélective et complète",
      "Curage et déconstruction",
      "Désamiantage avant travaux",
      "Tri et évacuation des gravats",
      "Dépollution des sols",
      "Remise en état du site",
    ],
    color: "#1e2d5a",
    bg: "from-[#374151] to-[#111827]",
  },
  {
    icon: TreePine,
    title: "Aménagement extérieur",
    slug: "amenagement",
    description:
      "Vos espaces extérieurs sont le prolongement naturel de votre bâtiment. ETP crée des environnements fonctionnels et esthétiques adaptés à vos besoins.",
    benefits: [
      "Espaces verts et plantations",
      "Clôtures, portails et murs",
      "Pavages et dallages décoratifs",
      "Terrasses et chemins d'accès",
      "Bassins et noues végétalisées",
      "Éclairage extérieur",
    ],
    color: "#c41e3a",
    bg: "from-[#1e2d5a] to-[#c41e3a]",
  },
  {
    icon: HardHat,
    title: "Travaux publics généraux",
    slug: "tp-generaux",
    description:
      "Pour tous vos projets de génie civil, ETP assure la maîtrise d'œuvre et l'exécution. Notre expertise couvre l'ensemble des corps de métier du secteur des travaux publics.",
    benefits: [
      "Maîtrise d'œuvre de chantier",
      "Coordination de sous-traitants",
      "Ouvrages d'art et soutènement",
      "Géotechnique et fondations",
      "Travaux en milieu contraint",
      "Reporting et suivi de chantier",
    ],
    color: "#1e2d5a",
    bg: "from-[#1e2d5a] to-[#2a3f7a]",
  },
]

export default function ServicesPage() {
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
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="w-8 h-px bg-[#c41e3a]" />
              <span className="text-[#c41e3a] text-xs font-bold uppercase tracking-[4px]">Nos expertises</span>
              <div className="w-8 h-px bg-[#c41e3a]" />
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6">Nos Services</h1>
            <p className="text-gray-300 text-xl max-w-2xl mx-auto">
              Des solutions complètes pour tous vos projets de travaux publics en Île-de-France
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          {services.map((service, i) => {
            const Icon = service.icon
            const isEven = i % 2 === 0
            return (
              <motion.div
                key={service.slug}
                id={service.slug}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`grid lg:grid-cols-2 gap-16 items-center ${!isEven ? "lg:flex-row-reverse" : ""}`}
              >
                {/* Visual */}
                <div className={isEven ? "lg:order-1" : "lg:order-2"}>
                  <div className={`bg-gradient-to-br ${service.bg} rounded-3xl p-12 relative overflow-hidden aspect-video flex items-center justify-center`}>
                    <div className="absolute inset-0 opacity-10"
                      style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.5) 1px, transparent 0)`,
                        backgroundSize: "24px 24px",
                      }}
                    />
                    <div className="relative z-10 text-center">
                      <div className="w-24 h-24 bg-white/20 rounded-3xl flex items-center justify-center mx-auto mb-4 border border-white/30">
                        <Icon size={48} className="text-white" />
                      </div>
                      <h3 className="text-white text-2xl font-black">{service.title}</h3>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className={isEven ? "lg:order-2" : "lg:order-1"}>
                  <div className="inline-flex items-center gap-2 mb-4">
                    <div className="w-6 h-0.5 bg-[#c41e3a]" />
                    <span className="text-[#c41e3a] text-xs font-bold uppercase tracking-widest">Service {String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-black text-[#1e2d5a] mb-5">{service.title}</h2>
                  <p className="text-gray-500 text-lg leading-relaxed mb-8">{service.description}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                    {service.benefits.map((b) => (
                      <div key={b} className="flex items-start gap-2.5">
                        <CheckCircle size={16} className="text-[#c41e3a] flex-shrink-0 mt-0.5" />
                        <span className="text-gray-600 text-sm">{b}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                      href="/devis"
                      className="inline-flex items-center gap-2 bg-[#c41e3a] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#9b1528] transition-colors"
                    >
                      Demander un devis
                      <ArrowRight size={16} />
                    </Link>
                    <a
                      href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}
                      className="inline-flex items-center gap-2 border-2 border-[#1e2d5a] text-[#1e2d5a] px-6 py-3 rounded-xl font-bold hover:bg-[#1e2d5a] hover:text-white transition-colors"
                    >
                      <Phone size={16} />
                      {COMPANY.phone}
                    </a>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-[#c41e3a] to-[#9b1528]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Votre projet mérite le meilleur</h2>
          <p className="text-red-100 text-xl mb-8">Contactez-nous pour un devis gratuit et sans engagement</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/devis" className="bg-white text-[#c41e3a] px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-colors">
              Demander un devis
            </Link>
            <a href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
              <Phone size={18} />
              {COMPANY.phone}
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
