"use client"

import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"
import SectionHeader from "@/components/shared/SectionHeader"

const testimonials = [
  {
    name: "Jean-Pierre Moreau",
    role: "Directeur technique – Mairie de Villeneuve-le-Roi",
    content:
      "ETP a réalisé la réfection complète de notre réseau d'assainissement dans les délais et le budget prévus. Une équipe sérieuse, réactive et professionnelle. Nous faisons appel à eux régulièrement.",
    rating: 5,
  },
  {
    name: "Sophie Durand",
    role: "Promotrice immobilière – SD Patrimoine",
    content:
      "Excellent travail sur la viabilisation de notre lotissement à Maisons-Alfort. La coordination des différents réseaux a été parfaitement maîtrisée. Je recommande sans hésiter.",
    rating: 5,
  },
  {
    name: "Marc Lefevre",
    role: "Particulier – Thiais (94)",
    content:
      "J'ai fait appel à ETP pour le terrassement et l'assainissement de ma maison. Travail soigné, équipe ponctuelle et propre sur le chantier. Devis clair et respecté. Très satisfait.",
    rating: 5,
  },
  {
    name: "Isabelle Renault",
    role: "Responsable travaux – Groupe Renault Immobilier",
    content:
      "Partenaire fiable depuis 3 ans sur nos projets de démolition et terrassement en Île-de-France. Réactivité et qualité d'exécution au rendez-vous à chaque fois.",
    rating: 5,
  },
]

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-[#1e2d5a] to-[#141e3d] relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#c41e3a]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#c41e3a]/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          eyebrow="Témoignages"
          title="Ce que disent nos clients"
          subtitle="Particuliers, entreprises et collectivités nous font confiance pour leurs travaux publics."
          centered
          light
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-7 hover:bg-white/15 transition-colors"
            >
              <Quote size={32} className="text-[#c41e3a] mb-4 opacity-70" />
              <p className="text-gray-200 text-base leading-relaxed mb-6 italic">
                &ldquo;{t.content}&rdquo;
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 bg-gradient-to-br from-[#c41e3a] to-[#9b1528] rounded-full flex items-center justify-center text-white font-bold text-base">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="text-white font-bold text-sm">{t.name}</div>
                    <div className="text-gray-400 text-xs">{t.role}</div>
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={14} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
