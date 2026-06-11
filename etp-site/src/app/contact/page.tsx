"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from "lucide-react"
import { COMPANY } from "@/lib/utils"

const contactInfos = [
  {
    icon: Phone,
    title: "Téléphone fixe",
    value: COMPANY.phone,
    href: `tel:${COMPANY.phone.replace(/\s/g, "")}`,
    sub: "Lun–Ven 7h–18h",
  },
  {
    icon: Phone,
    title: "Mobile",
    value: COMPANY.mobile,
    href: `tel:${COMPANY.mobile.replace(/\s/g, "")}`,
    sub: "Urgences chantier",
  },
  {
    icon: Mail,
    title: "Email",
    value: COMPANY.email,
    href: `mailto:${COMPANY.email}`,
    sub: "Réponse sous 24h",
  },
  {
    icon: MapPin,
    title: "Adresse",
    value: "10 Rue Charles Nungesser",
    sub: "94290 Villeneuve-le-Roi",
    href: "https://maps.google.com/?q=10+Rue+Charles+Nungesser+94290+Villeneuve-le-Roi",
  },
  {
    icon: Clock,
    title: "Horaires",
    value: "Lun – Ven : 7h00 – 18h00",
    sub: "Sam : 7h00 – 12h00",
  },
]

export default function ContactPage() {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSent(true)
    }, 1500)
  }

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
              <span className="text-[#c41e3a] text-xs font-bold uppercase tracking-[4px]">Disponibles pour vous</span>
              <div className="w-8 h-px bg-[#c41e3a]" />
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6">Contactez-nous</h1>
            <p className="text-gray-300 text-xl max-w-2xl mx-auto">
              Notre équipe est disponible du lundi au samedi pour répondre à toutes vos questions
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact section */}
      <section className="py-20 bg-[#f8f9fa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left — infos */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl font-black text-[#1e2d5a] mb-8">Nos coordonnées</h2>

              <div className="space-y-4 mb-10">
                {contactInfos.map(({ icon: Icon, title, value, href, sub }) => (
                  <div key={title} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center gap-4 group hover:border-[#c41e3a] hover:shadow-md transition-all">
                    <div className="w-12 h-12 bg-[#c41e3a]/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#c41e3a] transition-colors">
                      <Icon size={20} className="text-[#c41e3a] group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">{title}</p>
                      {href ? (
                        <a href={href} className="text-[#1e2d5a] font-bold hover:text-[#c41e3a] transition-colors">
                          {value}
                        </a>
                      ) : (
                        <p className="text-[#1e2d5a] font-bold">{value}</p>
                      )}
                      {sub && <p className="text-gray-400 text-xs mt-0.5">{sub}</p>}
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick call buttons */}
              <div className="bg-gradient-to-br from-[#1e2d5a] to-[#141e3d] rounded-2xl p-6">
                <p className="text-white font-bold mb-4">Appel direct</p>
                <div className="space-y-3">
                  <a
                    href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}
                    className="flex items-center gap-3 bg-[#c41e3a] text-white px-5 py-3 rounded-xl font-bold hover:bg-[#9b1528] transition-colors"
                  >
                    <Phone size={18} />
                    Fixe : {COMPANY.phone}
                  </a>
                  <a
                    href={`tel:${COMPANY.mobile.replace(/\s/g, "")}`}
                    className="flex items-center gap-3 bg-white/10 text-white px-5 py-3 rounded-xl font-bold hover:bg-white/20 transition-colors border border-white/20"
                  >
                    <Phone size={18} />
                    Mobile : {COMPANY.mobile}
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Right — form + map */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              {/* Form */}
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                {sent ? (
                  <div className="text-center py-10">
                    <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-5">
                      <CheckCircle size={40} className="text-green-500" />
                    </div>
                    <h3 className="text-xl font-bold text-[#1e2d5a] mb-2">Message envoyé !</h3>
                    <p className="text-gray-500">Nous vous répondons sous 24h ouvrées.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <h3 className="text-xl font-black text-[#1e2d5a]">Envoyez-nous un message</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Nom *</label>
                        <input type="text" required className="form-input" placeholder="Dupont" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Prénom *</label>
                        <input type="text" required className="form-input" placeholder="Jean" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Téléphone *</label>
                      <input type="tel" required className="form-input" placeholder="06 XX XX XX XX" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Email</label>
                      <input type="email" className="form-input" placeholder="jean.dupont@email.fr" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Objet *</label>
                      <select required className="form-input">
                        <option value="">Sélectionner...</option>
                        <option>Demande d&apos;information</option>
                        <option>Demande de devis</option>
                        <option>Suivi de chantier</option>
                        <option>Partenariat</option>
                        <option>Autre</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Message *</label>
                      <textarea rows={4} required className="form-input resize-none" placeholder="Votre message..." />
                    </div>
                    <div className="flex items-start gap-3">
                      <input type="checkbox" required id="cgp" className="w-4 h-4 mt-0.5 accent-[#c41e3a] flex-shrink-0" />
                      <label htmlFor="cgp" className="text-xs text-gray-400 cursor-pointer">
                        J&apos;accepte que mes données soient utilisées pour traiter ma demande (RGPD) *
                      </label>
                    </div>
                    <button type="submit" disabled={loading}
                      className="btn-primary w-full flex items-center justify-center gap-2 py-4 rounded-xl">
                      {loading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>Envoyer le message <Send size={16} /></>
                      )}
                    </button>
                  </form>
                )}
              </div>

              {/* Map */}
              <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2632.4!2d2.4227!3d48.7378!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e671a4e7e0bb7b%3A0x1!2s10+Rue+Charles+Nungesser%2C+94290+Villeneuve-le-Roi!5e0!3m2!1sfr!2sfr!4v1"
                  width="100%"
                  height="280"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="ETP – 10 Rue Charles Nungesser, Villeneuve-le-Roi"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  )
}
