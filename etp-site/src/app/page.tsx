import type { Metadata } from "next"
import HeroSection from "@/components/sections/HeroSection"
import ServicesGrid from "@/components/sections/ServicesGrid"
import StatsSection from "@/components/sections/StatsSection"
import RealisationsPreview from "@/components/sections/RealisationsPreview"
import TestimonialsSection from "@/components/sections/TestimonialsSection"
import ZoneSection from "@/components/sections/ZoneSection"
import QuickContactSection from "@/components/sections/QuickContactSection"

export const metadata: Metadata = {
  title: "ETP – Evariste Travaux Publics | Expert Terrassement & VRD en Île-de-France",
  description:
    "Entreprise de travaux publics à Villeneuve-le-Roi (94). Terrassement, VRD, assainissement, voirie, démolition et aménagements extérieurs en Val-de-Marne et Île-de-France. Devis gratuit.",
  keywords: [
    "travaux publics Villeneuve-le-Roi",
    "terrassement 94",
    "entreprise TP Val-de-Marne",
    "assainissement Villeneuve-le-Roi",
    "VRD Île-de-France",
    "travaux de voirie 94",
    "démolition Val-de-Marne",
    "Evariste Travaux Publics",
    "ETP",
  ],
  openGraph: {
    title: "ETP – Evariste Travaux Publics | Expert en Île-de-France",
    description:
      "Expert en travaux publics depuis plus de 15 ans. Terrassement, VRD, assainissement et aménagements extérieurs en Val-de-Marne.",
    type: "website",
    locale: "fr_FR",
  },
}

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <ServicesGrid />
      <StatsSection />
      <RealisationsPreview />
      <TestimonialsSection />
      <ZoneSection />
      <QuickContactSection />
    </main>
  )
}
