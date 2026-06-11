"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Send, Upload, CheckCircle, Phone, Clock, Shield, Star,
} from "lucide-react"
import { COMPANY } from "@/lib/utils"

const travaux = [
  "Terrassement",
  "VRD – Voirie et Réseaux Divers",
  "Assainissement",
  "Voirie",
  "Réseaux divers (électricité, télécom, gaz)",
  "Démolition",
  "Aménagement extérieur",
  "Travaux publics généraux",
  "Plusieurs types de travaux",
  "Autre",
]

const garanties = [
  { icon: CheckCircle, label: "Devis gratuit et sans engagement" },
  { icon: Clock, label: "Réponse sous 24h ouvrées" },
  { icon: Shield, label: "Assurance décennale" },
  { icon: Star, label: "+500 chantiers réalisés" },
]

export default function DevisPage() {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [fileName, setFileName] = useState<string>("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSent(true)
    }, 2000)
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
              <span className="text-[#c41e3a] text-xs font-bold uppercase tracking-[4px]">Gratuit & sans engagement</span>
              <div className="w-8 h-px bg-[#c41e3a]" />
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6">Demande de Devis</h1>
            <p className="text-gray-300 text-xl max-w-2xl mx-auto">
              Décrivez votre projet et recevez une réponse personnalisée sous 24h
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-[#f8f9fa]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left — garanties */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-2xl font-black text-[#1e2d5a] mb-8">Pourquoi choisir ETP ?</h2>
                <div className="space-y-4 mb-10">
                  {garanties.map(({ icon: Icon, label }) => (
                    <div key={label} className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                      <div className="w-10 h-10 bg-[#c41e3a]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon size={18} className="text-[#c41e3a]" />
                      </div>
                      <span className="text-[#1e2d5a] font-medium text-sm">{label}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-gradient-to-br from-[#1e2d5a] to-[#141e3d] rounded-2xl p-6 text-white">
                  <p className="text-sm text-gray-400 mb-1">Préférez-vous nous appeler ?</p>
                  <a
                    href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}
                    className="text-[#c41e3a] font-black text-xl hover:text-red-400 transition-colors block mb-1"
                  >
                    {COMPANY.phone}
                  </a>
                  <a
                    href={`tel:${COMPANY.mobile.replace(/\s/g, "")}`}
                    className="text-[#c41e3a] font-black text-xl hover:text-red-400 transition-colors block"
                  >
                    {COMPANY.mobile}
                  </a>
                  <p className="text-gray-400 text-xs mt-3">Lun–Ven : 7h–18h / Sam : 7h–12h</p>
                </div>
              </motion.div>
            </div>

            {/* Right — form */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-gray-100"
              >
                {sent ? (
                  <div className="text-center py-16">
                    <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle size={48} className="text-green-500" />
                    </div>
                    <h3 className="text-2xl font-black text-[#1e2d5a] mb-3">Demande envoyée !</h3>
                    <p className="text-gray-500 text-lg mb-2">Merci pour votre confiance.</p>
                    <p className="text-gray-400">Notre équipe vous recontacte sous <strong>24h ouvrées</strong>.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-black text-[#1e2d5a] mb-1">Votre projet en détail</h3>
                      <p className="text-gray-400 text-sm">Tous les champs marqués * sont obligatoires</p>
                    </div>

                    {/* Identité */}
                    <div>
                      <h4 className="text-sm font-bold text-[#1e2d5a] uppercase tracking-widest mb-4 flex items-center gap-2">
                        <span className="w-6 h-6 bg-[#c41e3a] rounded-full flex items-center justify-center text-white text-xs">1</span>
                        Vos coordonnées
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Nom *</label>
                          <input type="text" required placeholder="Dupont" className="form-input" />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Prénom *</label>
                          <input type="text" required placeholder="Jean" className="form-input" />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Téléphone *</label>
                          <input type="tel" required placeholder="06 XX XX XX XX" className="form-input" />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Email *</label>
                          <input type="email" required placeholder="jean.dupont@email.fr" className="form-input" />
                        </div>
                      </div>
                    </div>

                    {/* Chantier */}
                    <div>
                      <h4 className="text-sm font-bold text-[#1e2d5a] uppercase tracking-widest mb-4 flex items-center gap-2">
                        <span className="w-6 h-6 bg-[#c41e3a] rounded-full flex items-center justify-center text-white text-xs">2</span>
                        Votre chantier
                      </h4>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Adresse du chantier *</label>
                          <input type="text" required placeholder="15 rue de la Paix, 94290 Villeneuve-le-Roi" className="form-input" />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Type de travaux *</label>
                          <select required className="form-input">
                            <option value="">Sélectionner le type de travaux...</option>
                            {travaux.map((t) => (
                              <option key={t}>{t}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Description du projet *</label>
                          <textarea
                            rows={5}
                            required
                            placeholder="Décrivez votre projet : nature des travaux, superficie approximative, contraintes particulières, délai souhaité..."
                            className="form-input resize-none"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Upload */}
                    <div>
                      <h4 className="text-sm font-bold text-[#1e2d5a] uppercase tracking-widest mb-4 flex items-center gap-2">
                        <span className="w-6 h-6 bg-[#c41e3a] rounded-full flex items-center justify-center text-white text-xs">3</span>
                        Documents (optionnel)
                      </h4>
                      <label className="block border-2 border-dashed border-gray-200 rounded-xl p-8 text-center cursor-pointer hover:border-[#c41e3a] hover:bg-red-50/30 transition-all group">
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*,.pdf,.dwg"
                          multiple
                          onChange={(e) => {
                            const files = e.target.files
                            if (files && files.length > 0) {
                              setFileName(
                                files.length > 1
                                  ? `${files.length} fichiers sélectionnés`
                                  : files[0].name
                              )
                            }
                          }}
                        />
                        <Upload size={32} className="text-gray-300 group-hover:text-[#c41e3a] mx-auto mb-3 transition-colors" />
                        {fileName ? (
                          <p className="text-[#c41e3a] font-semibold text-sm">{fileName}</p>
                        ) : (
                          <>
                            <p className="text-gray-500 text-sm font-medium">Glissez vos fichiers ici ou cliquez</p>
                            <p className="text-gray-400 text-xs mt-1">Photos, plans, PDF — max 10 Mo par fichier</p>
                          </>
                        )}
                      </label>
                    </div>

                    {/* RGPD */}
                    <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                      <input
                        type="checkbox"
                        required
                        id="rgpd"
                        className="w-4 h-4 mt-0.5 accent-[#c41e3a] flex-shrink-0"
                      />
                      <label htmlFor="rgpd" className="text-xs text-gray-500 leading-relaxed cursor-pointer">
                        J&apos;accepte que mes données personnelles soient utilisées par Evariste Travaux Publics pour traiter ma demande de devis, conformément à la{" "}
                        <span className="text-[#c41e3a] underline">politique de confidentialité</span>{" "}
                        et au RGPD. Ces données ne seront pas transmises à des tiers. *
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-primary w-full flex items-center justify-center gap-2 py-4 rounded-xl text-base"
                    >
                      {loading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          Envoyer ma demande de devis
                          <Send size={18} />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
