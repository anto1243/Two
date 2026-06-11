import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://www.evariste-tp.fr"),
  title: {
    default: "ETP – Evariste Travaux Publics | Villeneuve-le-Roi (94)",
    template: "%s | ETP Evariste Travaux Publics",
  },
  description:
    "Entreprise de travaux publics à Villeneuve-le-Roi (94). Terrassement, VRD, assainissement, voirie, démolition. Intervention en Val-de-Marne et Île-de-France. Devis gratuit.",
  keywords: [
    "travaux publics Villeneuve-le-Roi",
    "terrassement 94",
    "entreprise TP Val-de-Marne",
    "assainissement Île-de-France",
    "VRD Val-de-Marne",
    "voirie 94",
    "ETP travaux publics",
    "Evariste Travaux Publics",
  ],
  authors: [{ name: "Evariste Travaux Publics" }],
  creator: "ETP",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Evariste Travaux Publics",
    title: "ETP – Expert Travaux Publics en Île-de-France",
    description:
      "Terrassement, VRD, assainissement et aménagements extérieurs. Basé à Villeneuve-le-Roi (94), intervenant dans toute l'Île-de-France.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ETP – Evariste Travaux Publics",
    description: "Expert en travaux publics en Val-de-Marne et Île-de-France.",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://www.evariste-tp.fr",
  name: "Evariste Travaux Publics",
  alternateName: "ETP",
  description:
    "Entreprise de travaux publics spécialisée dans le terrassement, VRD, assainissement, voirie et aménagements extérieurs en Île-de-France.",
  url: "https://www.evariste-tp.fr",
  telephone: "+33145977547",
  email: "evaristetp@yahoo.fr",
  address: {
    "@type": "PostalAddress",
    streetAddress: "10 Rue Charles Nungesser",
    addressLocality: "Villeneuve-le-Roi",
    postalCode: "94290",
    addressCountry: "FR",
    addressRegion: "Val-de-Marne",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 48.7378,
    longitude: 2.4227,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "07:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "07:00",
      closes: "12:00",
    },
  ],
  areaServed: {
    "@type": "GeoCircle",
    geoMidpoint: { "@type": "GeoCoordinates", latitude: 48.7378, longitude: 2.4227 },
    geoRadius: "50000",
  },
  priceRange: "€€",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={`${inter.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-white text-gray-900">
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  )
}
