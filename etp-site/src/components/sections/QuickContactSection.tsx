"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send, Phone, Mail, CheckCircle } from "lucide-react"
import { COMPANY } from "@/lib/utils"

export default function QuickContactSection() {
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
    <section className="py-24 bg-[#f8f9fa] grid-pattern" id="contact-rapide">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-8 h-0.5 bg-[#c41e3a]" />
              <span className="text-[#c41e3a] text-xs font-bold uppercase tracking-[3px]">Contact rapide</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-[#1e2d5a] mb-4 leading-tight">
              Un projet ? Parlons-en
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed mb-10">
              Décrivez votre projet en quelques mots. Nous vous rappelons sous 24h avec une première estimation.
            </p>

            {/* Contact cards */}
            <div className="space-y-4">
              <a
                href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:border-[#c41e3a] hover:shadow-md transition-all group"
              >
                <div className="w-12 h-12 bg-[#c41e3a] rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Phone size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-0.5">Téléphone fixe</p>
                  <p className="text-[#1e2d5a] font-bold text-lg">{COMPANY.phone}</p>
                </div>
              </a>
              <a
                href={`tel:${COMPANY.mobile.replace(/\s/g, "")}`}
                className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:border-[#c41e3a] hover:shadow-md transition-all group"
              >
                <div className="w-12 h-12 bg-[#1e2d5a] rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Phone size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-0.5">Mobile</p>
                  <p className="text-[#1e2d5a] font-bold text-lg">{COMPANY.mobile}</p>
                </div>
              </a>
              <a
                href={`mailto:${COMPANY.email}`}
                className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:border-[#c41e3a] hover:shadow-md transition-all group"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-[#c41e3a] to-[#9b1528] rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Mail size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-0.5">Email</p>
                  <p className="text-[#1e2d5a] font-bold">{COMPANY.email}</p>
                </div>
              </a>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100"
          >
            {sent ? (
              <div className="text-center py-10">
                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-5">
                  <CheckCircle size={40} className="text-green-500" />
                </div>
                <h3 className="text-xl font-bold text-[#1e2d5a] mb-2">Message envoyé !</h3>
                <p className="text-gray-500">Nous vous recontactons sous 24h ouvrées.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="text-xl font-bold text-[#1e2d5a] mb-6">Envoyez-nous un message</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">Nom *</label>
                    <input type="text" required placeholder="Dupont" className="form-input" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">Prénom *</label>
                    <input type="text" required placeholder="Jean" className="form-input" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">Téléphone *</label>
                  <input type="tel" required placeholder="06 XX XX XX XX" className="form-input" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">Email</label>
                  <input type="email" placeholder="votre@email.fr" className="form-input" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">Type de travaux *</label>
                  <select required className="form-input">
                    <option value="">Sélectionner...</option>
                    <option>Terrassement</option>
                    <option>VRD</option>
                    <option>Assainissement</option>
                    <option>Voirie</option>
                    <option>Démolition</option>
                    <option>Aménagement extérieur</option>
                    <option>Autre</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">Votre projet</label>
                  <textarea
                    rows={4}
                    placeholder="Décrivez brièvement votre projet..."
                    className="form-input resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full flex items-center justify-center gap-2 py-4 rounded-xl"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      Envoyer le message
                      <Send size={16} />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
