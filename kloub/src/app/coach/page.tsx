'use client'
import { Topbar } from '@/components/layout/Topbar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar } from '@/components/ui/avatar'
import { Brain, Send, Zap, Dumbbell, Moon, Droplets } from 'lucide-react'
import { useState } from 'react'
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip } from 'recharts'

const MESSAGES = [
  { role: 'user', text: 'Quel est l\'état de forme du groupe avant la demi-finale contre la Croatie ?' },
  { role: 'ai', text: 'Analyse pré-match — France vs Croatie (4 juin) :\n\n✅ **Groupe en bonne forme globale** : 20/23 joueurs opérationnels à 100%\n\n⚠️ **Points de vigilance** :\n• **Tchouaméni** — gêne musculaire à la cuisse gauche (60% de chances de jouer)\n• **Mbappé** — charge élevée, 3 matchs en 8 jours. Repos recommandé ce soir\n• **Coman** — absent, pas convoqué sur cette liste\n\n🔥 **Points positifs** :\n• Retour de **Kanté** = densité au milieu retrouvée\n• **Maignan** à 94/100 sur son Health Score\n• Équipe en série de 6 victoires, scoring moyen 86.7/100\n\n**Recommandation tactique** : Alignement 4-3-3 avec Kanté-Tchouaméni(si fit)-Camavinga au milieu.' },
  { role: 'user', text: 'Propose un programme de récupération pour Mbappé ce soir.' },
  { role: 'ai', text: 'Programme récupération personnalisé — K. Mbappé — Soir du 3 juin :\n\n**18h00 — Bain de contraste** (15 min)\n→ 1 min froid (12°C) / 1 min chaud (38°C) × 7 cycles\n\n**18h30 — Nutrition récupération**\n→ 40g protéines + 80g glucides + 500mg magnésium\n→ Hydratation : 1.5L eau + électrolytes\n\n**19h00 — Séance ostéo** (30 min)\n→ Travail sur les ischio-jambiers et les adducteurs\n\n**20h30 — Sommeil**\n→ Objectif : 9h de sommeil. Chambre à 18°C.\n→ Pas d\'écrans après 20h00.\n\nSuivi demain matin à 07h30 avec Dr. Le Gall.' },
]

const RADAR_DATA = [
  { attr: 'Vitesse', val: 97 }, { attr: 'Endurance', val: 85 }, { attr: 'Force', val: 78 },
  { attr: 'Technique', val: 99 }, { attr: 'Mental', val: 94 }, { attr: 'Récupération', val: 68 },
]

const JOUEURS = [
  { nom: 'Kylian Mbappé', pos: 'ATT', score: 78, trend: '↓ Surveiller' },
  { nom: 'A. Tchouaméni', pos: 'MDC', score: 41, trend: '⚠ Incertain' },
  { nom: 'Mike Maignan', pos: 'GK', score: 94, trend: '✓ Excellent' },
  { nom: 'W. Saliba', pos: 'DC', score: 91, trend: '✓ Excellent' },
]

export default function CoachPage() {
  const [input, setInput] = useState('')
  return (
    <div className="flex flex-col min-h-full">
      <Topbar title="Coach IA" subtitle="Assistant intelligent · Analyse personnalisée · Ligue des Nations 2025" />
      <div className="p-6 space-y-5">

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Score forme groupe', value: '81/100', icon: Zap, color: 'text-sky-400', bg: 'bg-sky-500/10', sub: 'Bon · 20 dispo sur 23' },
            { label: 'Charge entraîn.', value: '1,620 UA', icon: Dumbbell, color: 'text-violet-400', bg: 'bg-violet-500/10', sub: 'Cette semaine · Normal' },
            { label: 'Sommeil moyen', value: '7.4h', icon: Moon, color: 'text-indigo-400', bg: 'bg-indigo-500/10', sub: 'Objectif 8h · OK' },
            { label: 'Hydratation moy.', value: '82%', icon: Droplets, color: 'text-cyan-400', bg: 'bg-cyan-500/10', sub: 'Objectif 90% · Correct' },
          ].map(k => (
            <Card key={k.label} hover>
              <CardContent className="p-4">
                <div className={`w-9 h-9 rounded-xl ${k.bg} flex items-center justify-center mb-3`}>
                  <k.icon className={`w-4 h-4 ${k.color}`} />
                </div>
                <p className="text-2xl font-black text-slate-100">{k.value}</p>
                <p className="text-xs font-semibold text-slate-400 mt-1">{k.label}</p>
                <p className="text-[11px] text-slate-600 mt-0.5">{k.sub}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <Card className="lg:col-span-2 flex flex-col h-[560px]">
            <CardHeader className="flex flex-row items-center gap-3 shrink-0 pb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-sky-500/20">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <CardTitle>Coach IA — Équipe de France</CardTitle>
                <p className="text-xs text-slate-500">Analyse basée sur les données temps réel du groupe</p>
              </div>
              <Badge variant="success">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 animate-pulse inline-block" />
                En ligne
              </Badge>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col p-4 overflow-hidden">
              <div className="flex-1 overflow-y-auto space-y-4 pr-1">
                {MESSAGES.map((m, i) => (
                  <div key={i} className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : ''}`}>
                    {m.role === 'ai' && (
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-sky-500 to-cyan-400 flex items-center justify-center shrink-0 mt-0.5 shadow-md">
                        <Brain className="w-3.5 h-3.5 text-white" />
                      </div>
                    )}
                    <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${m.role === 'user' ? 'bg-sky-500 text-white rounded-tr-sm' : 'bg-[#1E2D4A] text-slate-300 rounded-tl-sm border border-[#2A3A5A]'}`}>
                      {m.text}
                    </div>
                    {m.role === 'user' && <Avatar name="Didier Deschamps" size="xs" className="mt-0.5 shrink-0" />}
                  </div>
                ))}
              </div>
              <div className="mt-4 shrink-0">
                <div className="flex gap-2 mb-2 flex-wrap">
                  {['État du groupe pré-match', 'Analyse Croatie', 'Programme récupération Mbappé', 'Formation optimale'].map(q => (
                    <button key={q} onClick={() => setInput(q)}
                      className="px-2.5 py-1 rounded-full bg-[#1E2D4A] border border-[#2A3A5A] text-xs text-slate-400 hover:text-slate-200 hover:border-sky-500/30 transition-colors cursor-pointer">
                      {q}
                    </button>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input value={input} onChange={e => setInput(e.target.value)}
                    placeholder="Posez une question à votre coach IA..."
                    className="flex-1 px-4 py-2.5 bg-[#1E2D4A] border border-[#2A3A5A] rounded-xl text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500/50" />
                  <Button size="icon" onClick={() => setInput('')}><Send className="w-4 h-4" /></Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <Card>
              <CardHeader><CardTitle>Profil athlétique</CardTitle><p className="text-xs text-slate-500">K. Mbappé · Real Madrid</p></CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <RadarChart data={RADAR_DATA}>
                    <PolarGrid stroke="#1E2D4A" />
                    <PolarAngleAxis dataKey="attr" tick={{ fontSize: 10, fill: '#64748B' }} />
                    <Radar dataKey="val" stroke="#0EA5E9" fill="#0EA5E9" fillOpacity={0.2} strokeWidth={2} dot={{ fill: '#0EA5E9', r: 3 }} />
                    <Tooltip contentStyle={{ background: '#0D1526', border: '1px solid #1E2D4A', borderRadius: 8, fontSize: 12 }} />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Suivi individuel</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {JOUEURS.map(j => (
                  <div key={j.nom} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#1E2D4A] transition-colors cursor-pointer">
                    <Avatar name={j.nom} size="sm" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-slate-200 truncate">{j.nom}</p>
                      <p className={`text-[11px] mt-0.5 ${j.score >= 80 ? 'text-emerald-400' : j.score >= 60 ? 'text-amber-400' : 'text-red-400'}`}>{j.trend}</p>
                    </div>
                    <span className={`text-sm font-black ${j.score >= 80 ? 'text-emerald-400' : j.score >= 60 ? 'text-amber-400' : 'text-red-400'}`}>{j.score}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
