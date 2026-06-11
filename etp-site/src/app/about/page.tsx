"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { CheckCircle, Award, Users, Target, Heart, ArrowRight, Phone } from "lucide-react"
import SectionHeader from "@/components/shared/SectionHeader"
import { COMPANY } from "@/lib/utils"

const values = [
  {
    icon: Award,
    title: "Excellence",
    description: "Chaque chantier est réalisé avec le même niveau d'exigence, qu'il s'agisse d'un petit travail de voirie ou d'un grand projet de terrassement.",
  },
  {
    icon: Users,
    title: "Proximité",
    description: "Entreprise à taille humaine, nous privilégions la relation directe avec nos clients. Un interlocuteur unique du devis à la réception des travaux.",
  },
  {
    icon: Target,
    title: "Fiabilité",
    description: "Délais tenus, budgets respectés. Notre réputation est bâtie sur 15 ans de chantiers livrés dans les règles de l'art.",
  },
  {
    icon: Heart,
    title: "Engagement",
    description: "Nous nous engageons sur la qualité de nos travaux avec une garantie décennale et un suivi après livraison de chaque chantier.",
  },
]

const expertises = [
  "Terrassement tous types de sols",
  "VRD et réseaux enterrés",
  "Assainissement EU/EP collectif",
  "Assainissement non collectif",
  "Voirie et enrobés bitumineux",
  "Pavage et dallage",
  "Démolition et désamiantage",
  "Aménagements paysagers",
  "Maîtrise d'œuvre de chantier",
  "Réseaux électriques et télécom",
  "Ouvrages de soutènement",
  "Bassins de rétention",
]

const timeline = [
  { year: "2005", event: "Création d'Evariste Travaux Publics à Villeneuve-le-Roi" },
  { year: "2008", event: "Extension vers les marchés publics avec les collectivités locales" },
  { year: "2012", event: "Développement du pôle assainissement et réseaux enterrés" },
  { year: "2016", event: "Obtention des qualifications QUALIBAT pour les travaux de terrassement" },
  { year: "2019", event: "Démarche RSE et gestion environnementale des chantiers" },
  { year: "2023", event: "Plus de 500 projets réalisés en Île-de-France" },
]

export default function AboutPage() {
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="w-8 h-px bg-[#c41e3a]" />
              <span className="text-[#c41e3a] text-xs font-bold uppercase tracking-[4px]">Notre histoire</span>
              <div className="w-8 h-px bg-[#c41e3a]" />
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6">À Propos d&apos;ETP</h1>
            <p className="text-gray-300 text-xl max-w-2xl">
              Depuis 2005, Evariste Travaux Publics construit sa réputation sur l&apos;excellence technique et la proximité client.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Présentation */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <SectionHeader
                eyebrow="Qui sommes-nous"
                title="Une entreprise familiale au service de votre territoire"
                subtitle="Fondée à Villeneuve-le-Roi en 2005, ETP est une entreprise de travaux publics à taille humaine, reconnue pour son sérieux et la qualité de ses réalisations."
              />
              <div className="mt-8 space-y-5 text-gray-600 leading-relaxed">
                <p>
                  Fort d&apos;une équipe de professionnels qualifiés et d&apos;un parc matériel moderne, Evariste Travaux Publics intervient sur tous types de chantiers : de la maison individuelle aux grandes infrastructures routières.
                </p>
                <p>
                  Notre ancrage local en Val-de-Marne (94) nous permet d&apos;être réactifs et disponibles pour nos clients. Nous intervenons également dans l&apos;ensemble de l&apos;Île-de-France et les départements limitrophes.
                </p>
                <p>
                  Notre approche est simple : comprendre vos besoins, proposer la solution technique la plus adaptée, et livrer dans les délais et le budget convenus. Cette philosophie nous a permis de fidéliser une clientèle variée de particuliers, d&apos;entreprises et de collectivités.
                </p>
              </div>
            </motion.div>

            {/* Stats card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { value: "500+", label: "Projets réalisés", desc: "Depuis 2005" },
                { value: "15+", label: "Années d'expertise", desc: "En travaux publics" },
                { value: "94", label: "Département principal", desc: "Val-de-Marne" },
                { value: "100%", label: "Satisfaction client", desc: "Notre priorité" },
              ].map(({ value, label, desc }) => (
                <div key={label} className="bg-[#f8f9fa] rounded-2xl p-6 text-center border border-gray-100">
                  <div className="text-3xl font-black text-[#c41e3a] mb-1">{value}</div>
                  <div className="font-bold text-[#1e2d5a] text-sm mb-0.5">{label}</div>
                  <div className="text-gray-400 text-xs">{desc}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-[#f8f9fa] grid-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Nos valeurs"
            title="Ce qui nous guide au quotidien"
            centered
          />
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, description }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-7 text-center shadow-sm border border-gray-100 card-hover"
              >
                <div className="w-16 h-16 bg-[#c41e3a]/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <Icon size={28} className="text-[#c41e3a]" />
                </div>
                <h3 className="font-bold text-[#1e2d5a] text-xl mb-3">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeader
                eyebrow="Savoir-faire"
                title="Un large spectre d'expertises techniques"
                subtitle="Nos équipes maîtrisent l'ensemble des corps de métier des travaux publics."
              />
              <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {expertises.map((exp, i) => (
                  <motion.div
                    key={exp}
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-2.5"
                  >
                    <CheckCircle size={15} className="text-[#c41e3a] flex-shrink-0" />
                    <span className="text-gray-600 text-sm">{exp}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div>
              <h3 className="text-xl font-bold text-[#1e2d5a] mb-8">Notre parcours</h3>
              <div className="relative">
                <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gray-200" />
                <div className="space-y-6">
                  {timeline.map(({ year, event }, i) => (
                    <motion.div
                      key={year}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex gap-5 relative pl-14"
                    >
                      <div className="absolute left-0 top-1 w-10 h-10 bg-[#c41e3a] rounded-full flex items-center justify-center z-10">
                        <span className="text-white text-xs font-bold">{year.slice(2)}</span>
                      </div>
                      <div className="pt-1.5">
                        <div className="text-xs font-bold text-[#c41e3a] mb-0.5">{year}</div>
                        <div className="text-gray-600 text-sm leading-relaxed">{event}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-[#c41e3a] to-[#9b1528]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-white mb-4">Travaillons ensemble</h2>
          <p className="text-red-100 text-xl mb-8">Contactez-nous pour votre prochain projet</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/devis"
              className="flex items-center justify-center gap-2 bg-white text-[#c41e3a] px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-colors">
              Demander un devis
              <ArrowRight size={18} />
            </Link>
            <a href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}
              className="flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-colors">
              <Phone size={18} />
              {COMPANY.phone}
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
