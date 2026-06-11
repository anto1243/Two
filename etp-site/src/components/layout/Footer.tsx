import Link from "next/link"
import { Phone, Mail, MapPin, Clock, ChevronRight, ArrowRight } from "lucide-react"
import { COMPANY } from "@/lib/utils"

const services = [
  "Terrassement",
  "VRD",
  "Assainissement",
  "Voirie",
  "Réseaux divers",
  "Démolition",
  "Aménagement extérieur",
  "Travaux publics",
]

const links = [
  { href: "/", label: "Accueil" },
  { href: "/services", label: "Nos Services" },
  { href: "/realisations", label: "Réalisations" },
  { href: "/about", label: "À Propos" },
  { href: "/devis", label: "Demande de devis" },
  { href: "/contact", label: "Contact" },
]

export default function Footer() {
  return (
    <footer className="bg-[#141e3d] text-white">
      {/* Main CTA band */}
      <div className="bg-gradient-to-r from-[#c41e3a] to-[#9b1528] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-black text-white">Besoin d&apos;un devis gratuit ?</h3>
            <p className="text-red-100 mt-1">Notre équipe répond sous 24h ouvrées</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}
              className="flex items-center gap-2 bg-white text-[#c41e3a] px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors"
            >
              <Phone size={18} />
              {COMPANY.phone}
            </a>
            <Link
              href="/devis"
              className="flex items-center gap-2 bg-[#141e3d] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#1e2d5a] transition-colors"
            >
              Devis en ligne
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>

      {/* Footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-[#c41e3a] to-[#9b1528] rounded-xl flex items-center justify-center">
                <span className="text-white font-black text-lg">ETP</span>
              </div>
              <div>
                <div className="font-black text-lg leading-none">Evariste TP</div>
                <div className="text-xs text-[#c41e3a] font-medium tracking-widest uppercase">Travaux Publics</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Expert en travaux publics en Île-de-France depuis plus de 15 ans.
              Terrassement, VRD, assainissement et aménagements extérieurs.
            </p>
            <div className="space-y-3">
              <a
                href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-3 text-sm text-gray-300 hover:text-[#c41e3a] transition-colors group"
              >
                <div className="w-8 h-8 bg-[#1e2d5a] rounded-lg flex items-center justify-center group-hover:bg-[#c41e3a] transition-colors">
                  <Phone size={14} />
                </div>
                {COMPANY.phone}
              </a>
              <a
                href={`tel:${COMPANY.mobile.replace(/\s/g, "")}`}
                className="flex items-center gap-3 text-sm text-gray-300 hover:text-[#c41e3a] transition-colors group"
              >
                <div className="w-8 h-8 bg-[#1e2d5a] rounded-lg flex items-center justify-center group-hover:bg-[#c41e3a] transition-colors">
                  <Phone size={14} />
                </div>
                {COMPANY.mobile}
              </a>
              <a
                href={`mailto:${COMPANY.email}`}
                className="flex items-center gap-3 text-sm text-gray-300 hover:text-[#c41e3a] transition-colors group"
              >
                <div className="w-8 h-8 bg-[#1e2d5a] rounded-lg flex items-center justify-center group-hover:bg-[#c41e3a] transition-colors">
                  <Mail size={14} />
                </div>
                {COMPANY.email}
              </a>
              <div className="flex items-start gap-3 text-sm text-gray-400">
                <div className="w-8 h-8 bg-[#1e2d5a] rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin size={14} />
                </div>
                {COMPANY.address}
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-base mb-6 text-white">Nos Services</h4>
            <ul className="space-y-2">
              {services.map((s) => (
                <li key={s}>
                  <Link
                    href="/services"
                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-[#c41e3a] transition-colors group"
                  >
                    <ChevronRight size={14} className="text-[#c41e3a] opacity-0 group-hover:opacity-100 transition-opacity" />
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-bold text-base mb-6 text-white">Navigation</h4>
            <ul className="space-y-2">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-[#c41e3a] transition-colors group"
                  >
                    <ChevronRight size={14} className="text-[#c41e3a] opacity-0 group-hover:opacity-100 transition-opacity" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Horaires & Zone */}
          <div>
            <h4 className="font-bold text-base mb-6 text-white">Horaires & Zone</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3 text-sm">
                <Clock size={16} className="text-[#c41e3a] mt-0.5 flex-shrink-0" />
                <div className="text-gray-400">
                  <p className="font-medium text-white mb-1">Horaires d&apos;ouverture</p>
                  <p>Lundi – Vendredi</p>
                  <p>7h00 – 18h00</p>
                  <p className="mt-1">Samedi : 7h00 – 12h00</p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <MapPin size={16} className="text-[#c41e3a] mt-0.5 flex-shrink-0" />
                <div className="text-gray-400">
                  <p className="font-medium text-white mb-1">Zone d&apos;intervention</p>
                  <p>Val-de-Marne (94)</p>
                  <p>Île-de-France</p>
                  <p>Départements limitrophes</p>
                </div>
              </div>
              <div className="mt-4 p-4 bg-[#1e2d5a] rounded-xl border border-[#c41e3a]/20">
                <p className="text-xs text-gray-400 mb-1">Urgences & chantiers</p>
                <a
                  href={`tel:${COMPANY.mobile.replace(/\s/g, "")}`}
                  className="text-[#c41e3a] font-bold text-lg hover:text-red-400 transition-colors"
                >
                  {COMPANY.mobile}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#1e2d5a] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Evariste Travaux Publics (ETP) — Tous droits réservés</p>
          <div className="flex gap-6">
            <Link href="/contact" className="hover:text-gray-300 transition-colors">Mentions légales</Link>
            <Link href="/contact" className="hover:text-gray-300 transition-colors">Politique de confidentialité</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
