import { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.evariste-tp.fr"
  const lastModified = new Date()

  return [
    { url: baseUrl, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/services`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/realisations`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified, changeFrequency: "yearly", priority: 0.7 },
    { url: `${baseUrl}/devis`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/contact`, lastModified, changeFrequency: "yearly", priority: 0.8 },
  ]
}
