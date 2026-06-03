'use client'
import { Topbar } from '@/components/layout/Topbar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Brain, Send, Zap, Dumbbell, Moon, Droplets } from 'lucide-react'
import { useState } from 'react'

const MESSAGES = [
  {
    role: 'user',
    text: "Quel est l'état de forme du groupe avant la demi-finale contre la Croatie ?",
  },
  {
    role: 'ai',
    text: `Analyse pré-match — France vs Croatie (4 juin) :

✅ Groupe en bonne forme globale : 20/23 joueurs opérationnels à 100%

⚠️ Points de vigilance :
• Tchouaméni — gêne musculaire à la cuisse gauche (60% de chances de jouer)
• Mbappé — charge élevée, 3 matchs en 8 jours. Repos recommandé ce soir
• Coman — absent, pas convoqué sur cette liste

🔥 Points positifs :
• Retour de Kanté = densité au milieu retrouvée
• Maignan à 94/100 sur son Health Score
• Équipe en série de 6 victoires, scoring moyen 86.7/100

Recommandation tactique : Alignement 4-3-3 avec Kanté–Tchouaméni (si fit)–Camavinga au milieu.`,
  },
  {
    role: 'user',
    text: 'Propose un programme de récupération pour Mbappé ce soir.',
  },
  {
    role: 'ai',
    text: `Programme récupération personnalisé — K. Mbappé — Soir du 3 juin :

18h00 — Bain de contraste (15 min)
→ 1 min froid (12°C) / 1 min chaud (38°C) × 7 cycles

18h30 — Nutrition récupération
→ 40g protéines + 80g glucides + 500mg magnésium
→ Hydratation : 1.5L eau + électrolytes

19h00 — Séance ostéo (30 min)
→ Travail sur les ischio-jambiers et les adducteurs

20h30 — Sommeil
→ Objectif : 9h de sommeil. Chambre à 18°C.
→ Pas d'écrans après 20h00.

Suivi demain matin à 07h30 avec Dr. Le Gall.`,
  },
  {
    role: 'user',
    text: 'Analyse tactique France vs Croatie — que recommandes-tu pour le pressing ?',
  },
  {
    role: 'ai',
    text: `Analyse tactique — Pressing France vs Croatie :

La Croatie joue en 4-3-3 avec Modric en pivot. Leur sortie de balle est lente sur les côtés.

Recommandations pressing :
• Déclencher le pressing haut dès la relance du GK croate
• Mbappé et Dembélé verrouillent les deux centraux pour forcer les longs ballons
• Camavinga chasse Modric, Kanté couvre le couloir gauche

Zones à exploiter :
• Couloir droit croate — Gvardiol offensif laisse des espaces en transition
• Deuxième poteau sur corner — Thuram à surveiller

Risque principal : fatigue en deuxième mi-temps si le pressing n'est pas bien dosé. Prévoir une phase médiane plus conservative entre 60' et 75'.`,
  },
]

const JOUEURS = [
  { nom: 'Kylian Mbappé', pos: 'ATT', score: 78, trend: 'Surveiller', color: 'text-amber-400' },
  { nom: 'A. Tchouaméni', pos: 'MDC', score: 41, trend: 'Incertain', color: 'text-red-400' },
  { nom: 'Mike Maignan', pos: 'GK', score: 94, trend: 'Excellent', color: 'text-emerald-400' },
  { nom: 'W. Saliba', pos: 'DC', score: 91, trend: 'Excellent', color: 'text-emerald-400' },
  { nom: 'E. Camavinga', pos: 'MIL', score: 88, trend: 'Très bon', color: 'text-emerald-400' },
]

const SUGGESTIONS = [
  "État du groupe pré-match",
  "Analyse Croatie",
  "Récupération Mbappé",
  "Formation optimale",
]

export default function CoachPage() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState(MESSAGES)

  const handleSend = () => {
    if (!input.trim()) return
    setMessages(prev => [...prev, { role: 'user', text: input }])
    setInput('')
  }

  return (
    <div className="flex flex-col min-h-full bg-[#09090b]">
      <Topbar title="Coach IA" subtitle="Assistant intelligent · Analyse personnalisée · Ligue des Nations 2025" />
      <div className="p-6 space-y-5">

        {/* KPI strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Score forme groupe', value: '81', unit: '/100', sub: 'Bon · 20 dispo sur 23', icon: Zap },
            { label: 'Charge entraîn.', value: '1 620', unit: 'UA', sub: 'Cette semaine · Normal', icon: Dumbbell },
            { label: 'Sommeil moyen', value: '7.4', unit: 'h', sub: 'Objectif 8h · OK', icon: Moon },
            { label: 'Hydratation moy.', value: '82', unit: '%', sub: 'Objectif 90% · Correct', icon: Droplets },
          ].map(k => (
            <Card key={k.label} className="bg-[#111114] border border-white/[0.06]">
              <CardContent className="p-5">
                <p className="text-[11px] uppercase tracking-widest text-white/30 mb-3">{k.label}</p>
                <div className="flex items-baseline gap-1">
                  <p className="text-3xl font-bold text-white/90 leading-none">{k.value}</p>
                  <p className="text-sm text-white/30">{k.unit}</p>
                </div>
                <p className="text-xs text-white/40 mt-2">{k.sub}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* Chat */}
          <Card className="lg:col-span-2 bg-[#111114] border border-white/[0.06] flex flex-col h-[600px]">
            <CardHeader className="flex flex-row items-center gap-3 shrink-0 pb-4 border-b border-white/[0.06]">
              <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                <Brain className="w-4 h-4 text-blue-400" />
              </div>
              <div className="flex-1">
                <CardTitle className="text-white/90 text-sm font-semibold">Coach IA — Équipe de France</CardTitle>
                <p className="text-[11px] text-white/30 mt-0.5">Analyse basée sur les données temps réel du groupe</p>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[11px] text-white/40">En ligne</span>
              </div>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col p-4 overflow-hidden">
              <div className="flex-1 overflow-y-auto space-y-4 pr-1">
                {messages.map((m, i) => (
                  <div key={i} className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : ''}`}>
                    {m.role === 'ai' && (
                      <div className="w-7 h-7 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0 mt-0.5">
                        <Brain className="w-3.5 h-3.5 text-blue-400" />
                      </div>
                    )}
                    <div
                      className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                        m.role === 'user'
                          ? 'bg-white/[0.06] border border-white/[0.06] text-white/80 rounded-tr-sm'
                          : 'bg-[#111114] border border-white/[0.06] text-white/70 rounded-tl-sm'
                      }`}
                    >
                      {m.text}
                    </div>
                    {m.role === 'user' && (
                      <div className="w-7 h-7 rounded-full bg-white/[0.06] border border-white/[0.06] flex items-center justify-center shrink-0 mt-0.5 text-[10px] text-white/50 font-medium">
                        DD
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-4 shrink-0 space-y-2">
                <div className="flex gap-2 flex-wrap">
                  {SUGGESTIONS.map(q => (
                    <button
                      key={q}
                      onClick={() => setInput(q)}
                      className="px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.06] text-[11px] text-white/40 hover:text-white/70 hover:border-blue-500/20 transition-colors cursor-pointer"
                    >
                      {q}
                    </button>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSend()}
                    placeholder="Posez une question à votre coach IA..."
                    className="flex-1 px-4 py-2.5 bg-white/[0.03] border border-white/[0.06] rounded-xl text-sm text-white/80 placeholder-white/20 focus:outline-none focus:border-blue-500/30 transition-colors"
                  />
                  <Button
                    size="icon"
                    onClick={handleSend}
                    className="bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 text-blue-400"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Profil Mbappé radar replaced with stat grid */}
            <Card className="bg-[#111114] border border-white/[0.06]">
              <CardHeader className="pb-3">
                <p className="text-[11px] uppercase tracking-widest text-white/30 mb-1">Profil athlétique</p>
                <CardTitle className="text-white/90 text-sm font-semibold">K. Mbappé · Real Madrid</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Vitesse', val: 97 },
                  { label: 'Technique', val: 99 },
                  { label: 'Endurance', val: 85 },
                  { label: 'Mental', val: 94 },
                  { label: 'Force', val: 78 },
                  { label: 'Récupération', val: 68 },
                ].map(attr => (
                  <div key={attr.label} className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="text-[11px] text-white/40">{attr.label}</span>
                      <span className="text-[11px] font-semibold text-white/70">{attr.val}</span>
                    </div>
                    <div className="h-0.5 bg-white/[0.06] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500/60 rounded-full"
                        style={{ width: `${attr.val}%` }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Suivi individuel */}
            <Card className="bg-[#111114] border border-white/[0.06]">
              <CardHeader className="pb-3">
                <p className="text-[11px] uppercase tracking-widest text-white/30 mb-1">Suivi individuel</p>
                <CardTitle className="text-white/90 text-sm font-semibold">Health scores</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1 pt-0">
                {JOUEURS.map(j => (
                  <div
                    key={j.nom}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/[0.03] transition-colors cursor-pointer"
                  >
                    <Avatar name={j.nom} size="sm" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-white/80 truncate">{j.nom}</p>
                      <p className={`text-[11px] mt-0.5 ${j.color}`}>{j.trend}</p>
                    </div>
                    <span className={`text-lg font-bold leading-none ${j.color}`}>{j.score}</span>
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
