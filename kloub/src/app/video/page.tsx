'use client'
import { useState } from 'react'
import { Topbar } from '@/components/layout/Topbar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Play, Clock, Film, BarChart2 } from 'lucide-react'

const tabs = ['Tous', 'Analyse', 'Tactique', 'Highlights']

const videos = [
  {
    id: 1,
    title: 'France vs Croatie — Analyse tactique complète',
    category: 'Analyse',
    duration: '42:18',
    date: '12 Nov 2024',
    color: 'from-blue-900/40 to-blue-950/60',
    featured: true,
    views: 248,
  },
  {
    id: 2,
    title: 'France vs Italie — Pressing haut & transitions',
    category: 'Tactique',
    duration: '28:05',
    date: '15 Oct 2024',
    color: 'from-violet-900/40 to-violet-950/60',
    featured: false,
    views: 192,
  },
  {
    id: 3,
    title: 'France vs Belgique — Highlights LDN',
    category: 'Highlights',
    duration: '08:44',
    date: '07 Oct 2024',
    color: 'from-emerald-900/40 to-emerald-950/60',
    featured: false,
    views: 415,
  },
  {
    id: 4,
    title: 'France vs Israël — Analyse des phases arrêtées',
    category: 'Analyse',
    duration: '19:22',
    date: '10 Oct 2024',
    color: 'from-amber-900/40 to-amber-950/60',
    featured: false,
    views: 137,
  },
  {
    id: 5,
    title: 'France vs Belgique (retour) — 3-2 décryptage',
    category: 'Analyse',
    duration: '35:50',
    date: '14 Nov 2024',
    color: 'from-rose-900/40 to-rose-950/60',
    featured: false,
    views: 311,
  },
  {
    id: 6,
    title: 'France vs Italie — Top 5 actions',
    category: 'Highlights',
    duration: '05:30',
    date: '17 Nov 2024',
    color: 'from-cyan-900/40 to-cyan-950/60',
    featured: false,
    views: 520,
  },
]

const globalStats = [
  { label: 'Vidéos', value: '24', icon: Film },
  { label: 'Heures analysées', value: '12h', icon: Clock },
  { label: 'Matchs couverts', value: '6', icon: BarChart2 },
]

export default function VideoPage() {
  const [activeTab, setActiveTab] = useState('Tous')

  const filtered = activeTab === 'Tous'
    ? videos
    : videos.filter((v) => v.category === activeTab)

  const featured = videos.find((v) => v.featured)!

  return (
    <div className="min-h-screen bg-[#09090b]">
      <Topbar title="Vidéothèque" subtitle="Analyse vidéo & clips tactiques" />

      <div className="px-8 py-8 space-y-8 max-w-7xl mx-auto">

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {globalStats.map(({ label, value, icon: Icon }) => (
            <Card key={label} className="bg-[#111114] border-white/[0.06]">
              <CardContent className="pt-5 pb-5">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-white/[0.04]">
                    <Icon className="w-4 h-4 text-white/30" />
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-widest text-white/30">{label}</p>
                    <p className="text-2xl font-bold text-white/90 mt-0.5">{value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Featured video */}
        <Card className="bg-[#111114] border-white/[0.06] overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-5">
            <div className={`lg:col-span-3 relative h-64 lg:h-80 bg-gradient-to-br ${featured.color} flex items-center justify-center`}>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <button className="relative z-10 w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-sm hover:bg-white/20 transition-colors cursor-pointer">
                <Play className="w-6 h-6 text-white fill-white ml-1" />
              </button>
              <div className="absolute bottom-4 left-4 right-4 z-10">
                <Badge className="text-[10px] bg-blue-500/20 text-blue-300 border-blue-500/20 mb-2">{featured.category}</Badge>
                <p className="text-xs text-white/50">{featured.duration}</p>
              </div>
            </div>
            <div className="lg:col-span-2 p-6 flex flex-col justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-widest text-white/30 mb-3">Vidéo à la une</p>
                <h2 className="text-lg font-semibold text-white/90 leading-snug mb-3">{featured.title}</h2>
                <p className="text-sm text-white/40 leading-relaxed">
                  Décryptage complet des 90 minutes face à la Croatie : analyse du bloc défensif,
                  transitions offensives et organisation en phases de possession.
                </p>
              </div>
              <div className="mt-6 space-y-4">
                <div className="flex items-center gap-4 text-[11px] text-white/30">
                  <span>{featured.date}</span>
                  <span>·</span>
                  <span>{featured.views} vues</span>
                  <span>·</span>
                  <span>{featured.duration}</span>
                </div>
                <Button className="w-full bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/20 text-sm">
                  <Play className="w-3.5 h-3.5 mr-2 fill-blue-400" />
                  Regarder maintenant
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Filter tabs */}
        <div className="flex items-center gap-1 p-1 bg-[#111114] border border-white/[0.06] rounded-xl w-fit">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-lg text-[12px] font-medium transition-all cursor-pointer ${
                activeTab === tab
                  ? 'bg-white/[0.08] text-white/90'
                  : 'text-white/35 hover:text-white/60'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Video grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((v) => (
            <Card key={v.id} className="bg-[#111114] border-white/[0.06] overflow-hidden group cursor-pointer hover:border-white/[0.10] transition-colors">
              <div className={`relative h-44 bg-gradient-to-br ${v.color} flex items-center justify-center`}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="w-11 h-11 rounded-full bg-white/10 border border-white/15 flex items-center justify-center backdrop-blur-sm group-hover:bg-white/20 transition-colors">
                  <Play className="w-4 h-4 text-white fill-white ml-0.5" />
                </div>
                <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between z-10">
                  <Badge className="text-[10px] bg-black/40 text-white/60 border-white/10 backdrop-blur-sm">{v.category}</Badge>
                  <span className="text-[11px] text-white/50 bg-black/40 px-1.5 py-0.5 rounded backdrop-blur-sm">{v.duration}</span>
                </div>
              </div>
              <CardContent className="pt-3 pb-4">
                <p className="text-sm text-white/80 font-medium leading-snug line-clamp-2 mb-2">{v.title}</p>
                <div className="flex items-center justify-between text-[11px] text-white/30">
                  <span>{v.date}</span>
                  <span>{v.views} vues</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

      </div>
    </div>
  )
}
