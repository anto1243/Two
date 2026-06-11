"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Trophy, Users, MapPin, CheckCircle } from "lucide-react"

const stats = [
  { icon: Trophy, value: 500, suffix: "+", label: "Projets réalisés", description: "Chantiers livrés avec succès" },
  { icon: Users, value: 15, suffix: "+", label: "Années d'expertise", description: "Au service de l'Île-de-France" },
  { icon: MapPin, value: 50, suffix: "km", label: "Zone d'intervention", description: "Autour de Villeneuve-le-Roi" },
  { icon: CheckCircle, value: 98, suffix: "%", label: "Clients satisfaits", description: "Taux de satisfaction" },
]

function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 1800
    const step = Math.ceil(value / (duration / 16))
    const timer = setInterval(() => {
      start += step
      if (start >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(start)
      }
    }, 16)
    return () => clearInterval(timer)
  }, [inView, value])

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  )
}

export default function StatsSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-[#1e2d5a] to-[#141e3d] relative overflow-hidden">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(196,30,58,0.8) 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map(({ icon: Icon, value, suffix, label, description }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center group"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#c41e3a]/20 border border-[#c41e3a]/30 rounded-2xl mb-5 group-hover:bg-[#c41e3a] transition-colors duration-300">
                <Icon size={28} className="text-[#c41e3a] group-hover:text-white transition-colors" />
              </div>
              <div className="text-4xl md:text-5xl font-black text-white mb-1">
                <CountUp value={value} suffix={suffix} />
              </div>
              <div className="text-white font-bold text-base mb-1">{label}</div>
              <div className="text-gray-400 text-sm">{description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
