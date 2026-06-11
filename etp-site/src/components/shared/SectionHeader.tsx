"use client"

import { motion } from "framer-motion"

interface SectionHeaderProps {
  eyebrow?: string
  title: string
  subtitle?: string
  centered?: boolean
  light?: boolean
}

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  centered = false,
  light = false,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={centered ? "text-center" : ""}
    >
      {eyebrow && (
        <div className={`inline-flex items-center gap-2 mb-4 ${centered ? "justify-center w-full" : ""}`}>
          <div className="w-8 h-0.5 bg-[#c41e3a]" />
          <span className="text-[#c41e3a] text-xs font-bold uppercase tracking-[3px]">{eyebrow}</span>
          <div className="w-8 h-0.5 bg-[#c41e3a]" />
        </div>
      )}
      <h2 className={`text-3xl md:text-4xl lg:text-5xl font-black leading-tight mb-4 ${
        light ? "text-white" : "text-[#1e2d5a]"
      }`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-lg leading-relaxed max-w-2xl ${
          centered ? "mx-auto" : ""
        } ${light ? "text-gray-300" : "text-gray-500"}`}>
          {subtitle}
        </p>
      )}
      <div className={`mt-5 section-line ${centered ? "mx-auto" : ""}`} />
    </motion.div>
  )
}
