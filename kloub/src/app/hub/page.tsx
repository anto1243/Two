'use client'
import { Topbar } from '@/components/layout/Topbar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { Calendar, Clock, MapPin, Users, Plus, CheckCircle, XCircle, AlertCircle, ChevronRight, Filter, Shield } from 'lucide-react'
import { useState } from 'react'

const TABS = [
  { id: 'planning', label: 'Planning', icon: Calendar },
  { id: 'effectif', label: 'Effectif', icon: Users },
  { id: 'staff', label: 'Staff', icon: Shield },
]

const EFFECTIF = [
  // Gardiens
  { nom: 'Mike Maignan', club: 'AC Milan', pos: 'G', num: 16, age: 29, statut: 'available', nat: '🇫🇷' },
  { nom: 'Alphonse Areola', club: 'West Ham', pos: 'G', num: 23, age: 32, statut: 'available', nat: '🇫🇷' },
  { nom: 'Brice Samba', club: 'RC Lens', pos: 'G', num: 30, age: 30, statut: 'available', nat: '🇫🇷' },
  // Défenseurs
  { nom: 'William Saliba', club: 'Arsenal', pos: 'DC', num: 17, age: 24, statut: 'available', nat: '🇫🇷' },
  { nom: 'Dayot Upamecano', club: 'Bayern Munich', pos: 'DC', num: 15, age: 26, statut: 'available', nat: '🇫🇷' },
  { nom: 'Ibrahima Konaté', club: 'Liverpool', pos: 'DC', num: 5, age: 25, statut: 'available', nat: '🇫🇷' },
  { nom: 'Benjamin Pavard', club: 'Inter Milan', pos: 'DC', num: 2, age: 28, statut: 'available', nat: '🇫🇷' },
  { nom: 'Theo Hernandez', club: 'AC Milan', pos: 'LB', num: 22, age: 27, statut: 'available', nat: '🇫🇷' },
  { nom: 'Jonathan Clauss', club: 'OM', pos: 'RB', num: 19, age: 32, statut: 'available', nat: '🇫🇷' },
  { nom: 'Lucas Digne', club: 'Aston Villa', pos: 'LB', num: 3, age: 31, statut: 'available', nat: '🇫🇷' },
  // Milieux
  { nom: 'N\'Golo Kanté', club: 'Al-Ittihad', pos: 'MDC', num: 13, age: 34, statut: 'available', nat: '🇫🇷' },
  { nom: 'Aurélien Tchouaméni', club: 'Real Madrid', pos: 'MDC', num: 8, age: 24, statut: 'doubtful', nat: '🇫🇷' },
  { nom: 'Eduardo Camavinga', club: 'Real Madrid', pos: 'MIL', num: 14, age: 22, statut: 'available', nat: '🇫🇷' },
  { nom: 'Adrien Rabiot', club: 'OM', pos: 'MIL', num: 4, age: 30, statut: 'available', nat: '🇫🇷' },
  { nom: 'Youssouf Fofana', club: 'AC Milan', pos: 'MIL', num: 6, age: 26, statut: 'available', nat: '🇫🇷' },
  { nom: 'Warren Zaïre-Emery', club: 'PSG', pos: 'MIL', num: 29, age: 19, statut: 'available', nat: '🇫🇷' },
  // Attaquants
  { nom: 'Kylian Mbappé', club: 'Real Madrid', pos: 'ATT', num: 10, age: 26, statut: 'available', nat: '🇫🇷' },
  { nom: 'Antoine Griezmann', club: 'Atlético Madrid', pos: 'ATT', num: 7, age: 34, statut: 'available', nat: '🇫🇷' },
  { nom: 'Marcus Thuram', club: 'Inter Milan', pos: 'ATT', num: 9, age: 27, statut: 'available', nat: '🇫🇷' },
  { nom: 'Ousmane Dembélé', club: 'PSG', pos: 'ATT', num: 11, age: 28, statut: 'available', nat: '🇫🇷' },
  { nom: 'Bradley Barcola', club: 'PSG', pos: 'ATT', num: 26, age: 22, statut: 'available', nat: '🇫🇷' },
  { nom: 'Kingsley Coman', club: 'Bayern Munich', pos: 'ATT', num: 18, age: 28, statut: 'injured', nat: '🇫🇷' },
  { nom: 'Randal Kolo Muani', club: 'Juventus', pos: 'ATT', num: 20, age: 26, statut: 'available', nat: '🇫🇷' },
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
  { date: 'Mer 4', label: '🇫🇷 France vs 🇭🇷 Croatie', heure: '21:00', type: 'match', loc: 'Groupama Stadium, Lyon', info: '½ FINALE LIGUE DES NATIONS' },
  { date: 'Jeu 5', label: 'Récupération post-match', heure: '11:00', type: 'entrainement', loc: 'Hôtel officiel', info: 'Groupe entier' },
  { date: 'Dim 8', label: '🏆 Finale ou 3e place', heure: '21:00', type: 'match', loc: 'Allianz Arena, Munich', info: 'FINALE LIGUE DES NATIONS' },
]

const posColor = (p: string) => p === 'G' ? 'bg-violet-500/15 text-violet-400' : p === 'DC' || p === 'LB' || p === 'RB' ? 'bg-emerald-500/15 text-emerald-400' : p === 'MDC' || p === 'MIL' ? 'bg-sky-500/15 text-sky-400' : 'bg-amber-500/15 text-amber-400'
const statutColor = (s: string) => s === 'available' ? 'success' : s === 'doubtful' ? 'warning' : 'danger'
const statutLabel = (s: string) => s === 'available' ? 'Disponible' : s === 'doubtful' ? 'Incertain' : 'Blessé'
const statutDot = (s: string) => s === 'available' ? 'bg-emerald-400' : s === 'doubtful' ? 'bg-amber-400' : 'bg-red-400'
const typeStyle = (t: string) => t === 'match' ? 'border-l-amber-400 bg-amber-500/5' : t === 'entrainement' ? 'border-l-sky-400 bg-sky-500/5' : t === 'media' ? 'border-l-violet-400 bg-violet-500/5' : 'border-l-slate-500 bg-[#1E2D4A]/30'

const byPos = (label: string) => EFFECTIF.filter(j => {
  if (label === 'Gardiens') return j.pos === 'G'
  if (label === 'Défenseurs') return ['DC', 'LB', 'RB'].includes(j.pos)
  if (label === 'Milieux') return ['MDC', 'MIL'].includes(j.pos)
  return j.pos === 'ATT'
})

export default function HubPage() {
  const [tab, setTab] = useState('planning')
  return (
    <div className="flex flex-col min-h-full">
      <Topbar title="Hub Organisationnel" subtitle="Gestion du rassemblement · Ligue des Nations · Phase finale" />
      <div className="p-6 space-y-5">

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Joueurs présents', v: '23/23', icon: Users, c: 'text-sky-400', bg: 'bg-sky-500/10', sub: 'Groupe complet' },
            { label: 'Entraînements restants', v: '2', icon: Clock, c: 'text-emerald-400', bg: 'bg-emerald-500/10', sub: 'Avant la demi-finale' },
            { label: 'Prochain match', v: 'Mer 4', icon: Calendar, c: 'text-amber-400', bg: 'bg-amber-500/10', sub: 'France vs Croatie 21h' },
            { label: 'Lieu du rassemblement', v: 'Lyon', icon: MapPin, c: 'text-violet-400', bg: 'bg-violet-500/10', sub: 'Groupama Stadium' },
          ].map(k => (
            <Card key={k.label} hover>
              <CardContent className="p-4 flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl ${k.bg} flex items-center justify-center shrink-0`}>
                  <k.icon className={`w-5 h-5 ${k.c}`} />
                </div>
                <div>
                  <p className="text-xl font-black text-slate-100">{k.v}</p>
                  <p className="text-xs font-medium text-slate-400">{k.label}</p>
                  <p className="text-[11px] text-slate-600">{k.sub}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 p-1 bg-[#0D1526] rounded-xl border border-[#1E2D4A] w-fit">
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${tab === t.id ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/20' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'}`}>
              <t.icon className="w-4 h-4" />
              {t.label}
            </button>
          ))}
        </div>

        {/* Planning */}
        {tab === 'planning' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <Card className="lg:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Programme du rassemblement</CardTitle>
                  <p className="text-xs text-slate-500 mt-0.5">3 — 8 Juin 2025 · Phase finale LDN</p>
                </div>
                <Button size="sm"><Plus className="w-3.5 h-3.5" />Ajouter</Button>
              </CardHeader>
              <CardContent className="space-y-2 p-4">
                {PLANNING.map((e, i) => (
                  <div key={i} className={`flex gap-4 p-3.5 rounded-xl border-l-2 ${typeStyle(e.type)} cursor-pointer hover:opacity-80 transition-opacity`}>
                    <div className="w-14 text-center shrink-0 pt-0.5">
                      <p className="text-[10px] font-semibold text-slate-500">{e.date.split(' ')[0].toUpperCase()}</p>
                      <p className="text-lg font-black text-slate-200">{e.date.split(' ')[1]}</p>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-slate-200 leading-tight">{e.label}</p>
                      <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-500">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {e.heure}</span>
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {e.loc}</span>
                      </div>
                    </div>
                    <div className="shrink-0">
                      <Badge variant={e.type === 'match' ? 'warning' : e.type === 'entrainement' ? 'info' : 'default'} size="sm">
                        {e.info}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Statuts du groupe</CardTitle></CardHeader>
              <CardContent className="space-y-2 p-4">
                {EFFECTIF.map(j => (
                  <div key={j.nom} className="flex items-center gap-3 py-1.5 hover:bg-[#1E2D4A]/40 rounded-lg px-2 transition-colors cursor-pointer">
                    <div className={`w-2 h-2 rounded-full shrink-0 ${statutDot(j.statut)}`} />
                    <span className={`text-[10px] font-bold w-9 text-center rounded-md px-1 py-0.5 ${posColor(j.pos)}`}>{j.pos}</span>
                    <span className="text-xs font-medium text-slate-300 flex-1 truncate">{j.nom}</span>
                    <span className="text-[10px] text-slate-600">{j.club}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Effectif */}
        {tab === 'effectif' && (
          <div className="space-y-5">
            {['Gardiens', 'Défenseurs', 'Milieux', 'Attaquants'].map(groupe => (
              <Card key={groupe}>
                <CardHeader className="py-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm">{groupe} <span className="text-slate-600 font-normal ml-1">({byPos(groupe).length})</span></CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[#1E2D4A]">
                        {['#', 'Joueur', 'Club', 'Poste', 'Âge', 'Statut'].map(h => (
                          <th key={h} className="px-4 py-2.5 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1E2D4A]/40">
                      {byPos(groupe).map(j => (
                        <tr key={j.nom} className="hover:bg-[#1E2D4A]/40 transition-colors cursor-pointer">
                          <td className="px-4 py-3 text-sm font-black text-slate-500 w-10">{j.num}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <Avatar name={j.nom} size="sm" />
                              <div>
                                <p className="text-sm font-semibold text-slate-200">{j.nom}</p>
                                <p className="text-[10px] text-slate-600">{j.nat} France</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-xs text-slate-400">{j.club}</td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-0.5 rounded text-xs font-bold ${posColor(j.pos)}`}>{j.pos}</span>
                          </td>
                          <td className="px-4 py-3 text-sm text-slate-400">{j.age} ans</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <div className={`w-2 h-2 rounded-full ${statutDot(j.statut)}`} />
                              <Badge variant={statutColor(j.statut) as 'success' | 'warning' | 'danger'} size="sm">{statutLabel(j.statut)}</Badge>
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
              <Card key={s.nom} hover>
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar name={s.nom} size="lg" />
                    <div>
                      <p className="text-sm font-bold text-slate-200">{s.nom}</p>
                      <p className="text-xs text-sky-400 font-medium">{s.role}</p>
                      <p className="text-[11px] text-slate-600 mt-0.5">En poste depuis {s.depuis}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 pt-4 border-t border-[#1E2D4A]">
                    <div className="text-center">
                      <p className="text-xl font-black text-slate-100">{s.matchs}</p>
                      <p className="text-[10px] text-slate-600">Matchs</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-black text-emerald-400">{Math.round(s.victoires / s.matchs * 100)}%</p>
                      <p className="text-[10px] text-slate-600">Victoires</p>
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
