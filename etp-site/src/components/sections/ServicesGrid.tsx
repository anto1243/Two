"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  Mountain,
  Network,
  Waves,
  Car,
  Cable,
  Building2,
  TreePine,
  HardHat,
  ArrowRight,
} from "lucide-react"
import SectionHeader from "@/components/shared/SectionHeader"

const services = [
  {
    icon: Mountain,
    title: "Terrassement",
    description:
      "Déblaiement, remblaiement, nivellement et préparation de terrains. Nous disposons d'un matériel performant pour tous types de sols.",
    color: "#c41e3a",
  },
  {
    icon: Network,
    title: "VRD",
    description:
      "Voirie et Réseaux Divers : pose de canalisations, regards, branchements. Coordination complète des réseaux.",
    color: "#1e2d5a",
  },
  {
    icon: Waves,
    title: "Assainissement",
    description:
      "Réseaux d'assainissement collectif et individuel. Pose de canalisations, stations d'épuration, mise aux normes.",
    color: "#c41e3a",
  },
  {
    icon: Car,
    title: "Voirie",
    description:
      "Création et réhabilitation de routes, parkings, allées. Enrobés, pavés, dallage et marquage au sol.",
    color: "#1e2d5a",
  },
  {
    icon: Cable,
    title: "Réseaux divers",
    description:
      "Pose de réseaux électriques, fibre optique, gaz, eau potable. Gestion complète des fouilles et remblais.",
    color: "#c41e3a",
  },
  {
    icon: Building2,
    title: "Démolition",
    description:
      "Démolition sélective, curage et déconstruction. Évacuation des gravats, désamiantage et dépollution.",
    color: "#1e2d5a",
  },
  {
    icon: TreePine,
    title: "Aménagement extérieur",
    description:
      "Espaces verts, clôtures, portails, pavages, bassins de rétention. Embellissement de vos espaces extérieurs.",
    color: "#c41e3a",
  },
  {
    icon: HardHat,
    title: "Travaux publics",
    description:
      "Maîtrise d'œuvre et exécution de tous travaux de génie civil. Expertise technique pour chantiers complexes.",
    color: "#1e2d5a",
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function ServicesGrid() {
  return (
    <section className="py-24 bg-white grid-pattern relative" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Nos expertises"
          title="Des services complets pour tous vos chantiers"
          subtitle="Du terrassement à l'aménagement extérieur, ETP prend en charge l'intégralité de vos projets de travaux publics en Île-de-France."
          centered
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((service) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.title}
                variants={cardVariants}
                className="group relative bg-white border border-gray-100 rounded-2xl p-6 card-hover shadow-sm cursor-pointer"
              >
                {/* Top accent */}
                <div
                  className="absolute top-0 left-6 right-6 h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: service.color }}
                />

                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                  style={{ background: `${service.color}15` }}
                >
                  <Icon size={24} style={{ color: service.color }} />
                </div>

                <h3 className="text-[#1e2d5a] font-bold text-lg mb-3 group-hover:text-[#c41e3a] transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
                  {service.description}
                </p>

                <div className="mt-5 flex items-center gap-1 text-[#c41e3a] text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  En savoir plus
                  <ArrowRight size={14} />
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        <div className="text-center mt-12">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 bg-[#1e2d5a] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#c41e3a] transition-colors duration-300"
          >
            Tous nos services
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  )
}
