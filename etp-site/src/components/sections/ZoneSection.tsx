"use client"

import { motion } from "framer-motion"
import { MapPin, CheckCircle } from "lucide-react"
import SectionHeader from "@/components/shared/SectionHeader"

const zones = [
  "Val-de-Marne (94)",
  "Paris (75)",
  "Seine-et-Marne (77)",
  "Yvelines (78)",
  "Essonne (91)",
  "Hauts-de-Seine (92)",
  "Seine-Saint-Denis (93)",
  "Val-d'Oise (95)",
]

const cities = [
  "Villeneuve-le-Roi", "Orly", "Thiais", "Vitry-sur-Seine",
  "Créteil", "Choisy-le-Roi", "Maisons-Alfort", "Alfortville",
  "Ivry-sur-Seine", "Charenton-le-Pont", "Vincennes", "Nogent-sur-Marne",
]

export default function ZoneSection() {
  return (
    <section className="py-24 bg-white" id="zone">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <SectionHeader
              eyebrow="Zone d'intervention"
              title="Nous intervenons partout en Île-de-France"
              subtitle="Basée à Villeneuve-le-Roi, notre entreprise couvre l'ensemble du Val-de-Marne et tous les départements franciliens."
            />

            <div className="mt-10 space-y-3">
              {zones.map((zone, i) => (
                <motion.div
                  key={zone}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#f8f9fa] transition-colors"
                >
                  <CheckCircle size={18} className="text-[#c41e3a] flex-shrink-0" />
                  <span className="text-[#1e2d5a] font-medium">{zone}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right — map placeholder + cities */}
          <div>
            {/* Map placeholder with iframe */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl overflow-hidden shadow-xl border border-gray-100 mb-8"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10503.654!2d2.4227!3d48.7378!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e671a4e7e0bb7b%3A0x33e5f01b5e39a5f5!2sVilleneuve-le-Roi!5e0!3m2!1sfr!2sfr!4v1"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Carte ETP Villeneuve-le-Roi"
              />
            </motion.div>

            {/* Cities grid */}
            <div>
              <p className="text-sm font-bold text-[#1e2d5a] uppercase tracking-widest mb-4 flex items-center gap-2">
                <MapPin size={14} className="text-[#c41e3a]" />
                Villes principales d&apos;intervention
              </p>
              <div className="flex flex-wrap gap-2">
                {cities.map((city) => (
                  <span
                    key={city}
                    className="px-3 py-1.5 bg-[#f8f9fa] border border-gray-200 rounded-lg text-sm text-gray-600 font-medium hover:bg-[#c41e3a] hover:text-white hover:border-[#c41e3a] transition-colors cursor-default"
                  >
                    {city}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
