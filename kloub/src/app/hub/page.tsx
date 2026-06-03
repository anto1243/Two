'use client'
import { Topbar } from '@/components/layout/Topbar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar } from '@/components/ui/avatar'
import { Calendar, Clock, MapPin, Users, Plus, Shield } from 'lucide-react'
import { useState } from 'react'

const TABS = [
  { id: 'planning', label: 'Planning', icon: Calendar },
  { id: 'effectif', label: 'Effectif', icon: Users },
  { id: 'staff', label: 'Staff', icon: Shield },
]

const EFFECTIF = [
  { nom: 'Mike Maignan', club: 'AC Milan', pos: 'G', num: 16, age: 29, statut: 'available' },
  { nom: 'Alphonse Areola', club: 'West Ham', pos: 'G', num: 23, age: 32, statut: 'available' },
  { nom: 'Brice Samba', club: 'RC Lens', pos: 'G', num: 30, age: 30, statut: 'available' },
  { nom: 'William Saliba', club: 'Arsenal', pos: 'DC', num: 17, age: 24, statut: 'available' },
  { nom: 'Dayot Upamecano', club: 'Bayern Munich', pos: 'DC', num: 15, age: 26, statut: 'available' },
  { nom: 'Ibrahima Konaté', club: 'Liverpool', pos: 'DC', num: 5, age: 25, statut: 'available' },
  { nom: 'Benjamin Pavard', club: 'Inter Milan', pos: 'DC', num: 2, age: 28, statut: 'available' },
  { nom: 'Theo Hernandez', club: 'AC Milan', pos: 'LB', num: 22, age: 27, statut: 'available' },
  { nom: 'Jonathan Clauss', club: 'OM', pos: 'RB', num: 19, age: 32, statut: 'available' },
  { nom: 'Lucas Digne', club: 'Aston Villa', pos: 'LB', num: 3, age: 31, statut: 'available' },
  { nom: 'N\'Golo Kanté', club: 'Al-Ittihad', pos: 'MDC', num: 13, age: 34, statut: 'available' },
  { nom: 'Aurélien Tchouaméni', club: 'Real Madrid', pos: 'MDC', num: 8, age: 24, statut: 'doubtful' },
  { nom: 'Eduardo Camavinga', club: 'Real Madrid', pos: 'MIL', num: 14, age: 22, statut: 'available' },
  { nom: 'Adrien Rabiot', club: 'OM', pos: 'MIL', num: 4, age: 30, statut: 'available' },
  { nom: 'Youssouf Fofana', club: 'AC Milan', pos: 'MIL', num: 6, age: 26, statut: 'available' },
  { nom: 'Warren Zaïre-Emery', club: 'PSG', pos: 'MIL', num: 29, age: 19, statut: 'available' },
  { nom: 'Kylian Mbappé', club: 'Real Madrid', pos: 'ATT', num: 10, age: 26, statut: 'available' },
  { nom: 'Antoine Griezmann', club: 'Atlético Madrid', pos: 'ATT', num: 7, age: 34, statut: 'available' },
  { nom: 'Marcus Thuram', club: 'Inter Milan', pos: 'ATT', num: 9, age: 27, statut: 'available' },
  { nom: 'Ousmane Dembélé', club: 'PSG', pos: 'ATT', num: 11, age: 28, statut: 'available' },
  { nom: 'Bradley Barcola', club: 'PSG', pos: 'ATT', num: 26, age: 22, statut: 'available' },
  { nom: 'Kingsley Coman', club: 'Bayern Munich', pos: 'ATT', num: 18, age: 28, statut: 'injured' },
  { nom: 'Randal Kolo Muani', club: 'Juventus', pos: 'ATT', num: 20, age: 26, statut: 'available' },
]

const STAFF = [
  { nom: 'Didier Deschamps', role: 'Sélectionneur National', depuis: '2012', matchs: 167, victoires: 109 },
  { nom: 'Guy Stéphan', role: 'Adjoint du Sélectionneur', depuis: '2012', matchs: 167, victoires: 109 },
  { nom: 'Franck Raviot', role: 'Entraîneur des Gardiens', depuis: '2016', matchs: 120, victoires: 78 },
  { nom: 'Patrick Sandrin', role: 'Préparateur Physique', depuis: '2012', matchs: 167, victoires: 109 },
  { nom: 'Franck Le Gall', role: 'Médecin de l\'équipe', depuis: '2004', matchs: 267, victoires: 160 },
  { nom: 'Grégory Dupont', role: 'Responsable Performance', depuis: '2018', matchs: 98, victoires: 65 },
]

const PLANNING = [
  { date: 'Mar 3', label: 'Arrivée au Centre National', heure: '14:00', type: 'logistique', loc: 'CNF Clairefontaine', info: '23 joueurs' },
  { date: 'Mar 3', label: 'Séance récupération / activation', heure: '17:30', type: 'entrainement', loc: 'CNF Clairefontaine', info: '23 joueurs' },
  { date: 'Mer 4', label: 'Entraînement tactique officiel', heure: '10:00', type: 'entrainement', loc: 'Stade de Lyon (terrain annexe)', info: '23 joueurs' },
  { date: 'Mer 4', label: 'Conférence de presse', heure: '13:00', type: 'media', loc: 'Stade de Lyon', info: 'Deschamps + 1 joueur' },
  { date: 'Mer 4', label: 'France vs Croatie', heure: '21:00', type: 'match', loc: 'Groupama Stadium, Lyon', info: '½ FINALE LDN' },
  { date: 'Jeu 5', label: 'Récupération post-match', heure: '11:00', type: 'entrainement', loc: 'Hôtel officiel', info: 'Groupe entier' },
  { date: 'Dim 8', label: 'Finale ou 3e place', heure: '21:00', type: 'match', loc: 'Allianz Arena, Munich', info: 'FINALE LDN' },
]

const posTag = (p: string) => {
  if (p === 'G') return 'text-violet-400 border border-violet-400/20'
  if (['DC','LB','RB'].includes(p)) return 'text-emerald-400 border border-emerald-400/20'
  if (['MDC','MIL'].includes(p)) return 'text-blue-400 border border-blue-400/20'
  return 'text-amber-400 border border-amber-400/20'
}
const statutDot = (s: string) => s === 'available' ? 'bg-emerald-400' : s === 'doubtful' ? 'bg-amber-400' : 'bg-red-400'
const statutLabel = (s: string) => s === 'available' ? 'Disponible' : s === 'doubtful' ? 'Incertain' : 'Blessé'
const typeAccent = (t: string) => t === 'match' ? 'border-l-blue-400' : t === 'entrainement' ? 'border-l-white/20' : t === 'media' ? 'border-l-white/10' : 'border-l-white/10'

const byPos = (label: string) => EFFECTIF.filter(j => {
  if (label === 'Gardiens') return j.pos === 'G'
  if (label === 'Défenseurs') return ['DC','LB','RB'].includes(j.pos)
  if (label === 'Milieux') return ['MDC','MIL'].includes(j.pos)
  return j.pos === 'ATT'
})

export default function HubPage() {
  const [tab, setTab] = useState('planning')
  return (
    <div className="flex flex-col min-h-full bg-[#09090b]">
      <Topbar title="Hub Organisationnel" subtitle="Gestion du rassemblement · Ligue des Nations · Phase finale" />
      <div className="p-6 space-y-6">

        {/* KPI strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Joueurs présents', v: '23', sub: 'Groupe complet', icon: Users },
            { label: 'Entraînements restants', v: '2', sub: 'Avant la demi-finale', icon: Clock },
            { label: 'Prochain match', v: 'Mer 4', sub: 'France vs Croatie · 21h', icon: Calendar },
            { label: 'Lieu', v: 'Lyon', sub: 'Groupama Stadium', icon: MapPin },
          ].map(k => (
            <Card key={k.label} className="bg-[#111114] border border-white/[0.06]">
              <CardContent className="p-5">
                <p className="text-[11px] uppercase tracking-widest text-white/30 mb-3">{k.label}</p>
                <p className="text-3xl font-bold text-white/90 leading-none">{k.v}</p>
                <p className="text-xs text-white/40 mt-2">{k.sub}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 p-1 bg-[#111114] rounded-xl border border-white/[0.06] w-fit">
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${tab === t.id ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'text-white/40 hover:text-white/70'}`}>
              <t.icon className="w-3.5 h-3.5" />
              {t.label}
            </button>
          ))}
        </div>

        {/* Planning */}
        {tab === 'planning' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <Card className="lg:col-span-2 bg-[#111114] border border-white/[0.06]">
              <CardHeader className="flex flex-row items-center justify-between pb-4">
                <div>
                  <p className="text-[11px] uppercase tracking-widest text-white/30 mb-1">Programme</p>
                  <CardTitle className="text-white/90 text-base font-semibold">3 — 8 Juin 2025 · Phase finale LDN</CardTitle>
                </div>
                <Button size="sm" className="bg-white/[0.06] hover:bg-white/[0.09] text-white/60 border border-white/[0.06] text-xs">
                  <Plus className="w-3.5 h-3.5 mr-1" />Ajouter
                </Button>
              </CardHeader>
              <CardContent className="space-y-2 pt-0">
                {PLANNING.map((e, i) => (
                  <div key={i} className={`flex gap-4 p-3.5 rounded-lg border-l-2 border border-white/[0.04] bg-white/[0.02] hover:bg-white/[0.04] transition-colors cursor-pointer ${typeAccent(e.type)}`}>
                    <div className="w-12 shrink-0 pt-0.5">
                      <p className="text-[10px] text-white/30 uppercase tracking-wider">{e.date.split(' ')[0]}</p>
                      <p className="text-lg font-bold text-white/80 leading-tight">{e.date.split(' ')[1]}</p>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium leading-tight ${e.type === 'match' ? 'text-white/90' : 'text-white/70'}`}>{e.label}</p>
                      <div className="flex items-center gap-3 mt-1.5 text-[11px] text-white/30">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{e.heure}</span>
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{e.loc}</span>
                      </div>
                    </div>
                    <div className="shrink-0">
                      <span className={`text-[10px] px-2 py-0.5 rounded border ${e.type === 'match' ? 'text-blue-400 border-blue-400/20 bg-blue-500/5' : 'text-white/30 border-white/[0.06]'}`}>
                        {e.info}
                      </span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-[#111114] border border-white/[0.06]">
              <CardHeader className="pb-4">
                <p className="text-[11px] uppercase tracking-widest text-white/30 mb-1">Statuts</p>
                <CardTitle className="text-white/90 text-base font-semibold">Groupe · 23 joueurs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-0.5 pt-0">
                {EFFECTIF.map(j => (
                  <div key={j.nom} className="flex items-center gap-2.5 py-1.5 px-2 hover:bg-white/[0.03] rounded-lg transition-colors cursor-pointer">
                    <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${statutDot(j.statut)}`} />
                    <span className={`text-[10px] font-medium w-8 text-center rounded px-1 py-0.5 ${posTag(j.pos)}`}>{j.pos}</span>
                    <span className="text-xs text-white/70 flex-1 truncate">{j.nom}</span>
                    <span className="text-[10px] text-white/20 truncate max-w-[80px]">{j.club}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Effectif */}
        {tab === 'effectif' && (
          <div className="space-y-4">
            {['Gardiens','Défenseurs','Milieux','Attaquants'].map(groupe => (
              <Card key={groupe} className="bg-[#111114] border border-white/[0.06]">
                <CardHeader className="py-4">
                  <div className="flex items-center gap-3">
                    <p className="text-[11px] uppercase tracking-widest text-white/30">{groupe}</p>
                    <span className="text-[11px] text-white/20">({byPos(groupe).length})</span>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/[0.06]">
                        {['#','Joueur','Club','Poste','Âge','Statut'].map(h => (
                          <th key={h} className="px-4 py-2.5 text-left text-[10px] font-medium text-white/30 uppercase tracking-wider">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.03]">
                      {byPos(groupe).map(j => (
                        <tr key={j.nom} className="hover:bg-white/[0.02] transition-colors cursor-pointer">
                          <td className="px-4 py-3 text-sm font-bold text-white/20 w-10">{j.num}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <Avatar name={j.nom} size="sm" />
                              <p className="text-sm text-white/80 font-medium">{j.nom}</p>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-xs text-white/40">{j.club}</td>
                          <td className="px-4 py-3">
                            <span className={`text-[10px] font-medium px-2 py-0.5 rounded border ${posTag(j.pos)}`}>{j.pos}</span>
                          </td>
                          <td className="px-4 py-3 text-sm text-white/40">{j.age}a</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <div className={`w-1.5 h-1.5 rounded-full ${statutDot(j.statut)}`} />
                              <span className="text-xs text-white/50">{statutLabel(j.statut)}</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Staff */}
        {tab === 'staff' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {STAFF.map(s => (
              <Card key={s.nom} className="bg-[#111114] border border-white/[0.06]">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-5">
                    <Avatar name={s.nom} size="md" />
                    <div>
                      <p className="text-sm font-semibold text-white/90">{s.nom}</p>
                      <p className="text-xs text-blue-400 mt-0.5">{s.role}</p>
                      <p className="text-[11px] text-white/30 mt-0.5">En poste depuis {s.depuis}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/[0.06]">
                    <div>
                      <p className="text-[11px] uppercase tracking-widest text-white/30 mb-1">Matchs</p>
                      <p className="text-2xl font-bold text-white/90">{s.matchs}</p>
                    </div>
                    <div>
                      <p className="text-[11px] uppercase tracking-widest text-white/30 mb-1">Victoires</p>
                      <p className="text-2xl font-bold text-white/90">{Math.round(s.victoires / s.matchs * 100)}%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}
