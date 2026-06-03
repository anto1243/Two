'use client'
import { Topbar } from '@/components/layout/Topbar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Avatar } from '@/components/ui/avatar'
import { Heart, Activity, Moon, Droplets, Zap, AlertTriangle, CheckCircle } from 'lucide-react'
import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis } from 'recharts'

const JOUEURS_SANTE = [
  { nom: 'Mike Maignan', club: 'AC Milan', pos: 'G', num: 16, score: 94, fc: 56, sommeil: 8.2, hydration: 95, fatigue: 18, statut: 'good' },
  { nom: 'Kylian Mbappé', club: 'Real Madrid', pos: 'ATT', num: 10, score: 78, fc: 63, sommeil: 6.8, hydration: 72, fatigue: 64, statut: 'warning' },
  { nom: 'A. Tchouaméni', club: 'Real Madrid', pos: 'MDC', num: 8, score: 41, fc: 74, sommeil: 5.9, hydration: 48, fatigue: 85, statut: 'danger' },
  { nom: 'William Saliba', club: 'Arsenal', pos: 'DC', num: 17, score: 91, fc: 58, sommeil: 8.0, hydration: 90, fatigue: 22, statut: 'good' },
  { nom: 'Antoine Griezmann', club: 'Atlético', pos: 'ATT', num: 7, score: 88, fc: 60, sommeil: 7.8, hydration: 85, fatigue: 30, statut: 'good' },
  { nom: 'Marcus Thuram', club: 'Inter Milan', pos: 'ATT', num: 9, score: 85, fc: 62, sommeil: 7.5, hydration: 80, fatigue: 38, statut: 'good' },
  { nom: 'N\'Golo Kanté', club: 'Al-Ittihad', pos: 'MDC', num: 13, score: 82, fc: 64, sommeil: 7.2, hydration: 78, fatigue: 45, statut: 'good' },
  { nom: 'Théo Hernandez', club: 'AC Milan', pos: 'LB', num: 22, score: 87, fc: 61, sommeil: 7.9, hydration: 83, fatigue: 35, statut: 'good' },
]

const HR_DATA = [{ t: '00', v: 56 }, { t: '04', v: 54 }, { t: '08', v: 72 }, { t: '12', v: 140 }, { t: '16', v: 125 }, { t: '20', v: 82 }, { t: '23', v: 60 }]
const SLEEP_DATA = [{ d: 'L', v: 7.8 }, { d: 'M', v: 6.5 }, { d: 'Me', v: 8.1 }, { d: 'J', v: 6.2 }, { d: 'V', v: 7.9 }, { d: 'S', v: 7.5 }, { d: 'D', v: 7.3 }]

const scoreColor = (s: number) => s >= 80 ? 'text-emerald-400' : s >= 60 ? 'text-amber-400' : 'text-red-400'
const scoreBg = (s: number) => s >= 80 ? 'success' as const : s >= 60 ? 'warning' as const : 'danger' as const
const statutDot = (s: string) => s === 'good' ? 'bg-emerald-400' : s === 'warning' ? 'bg-amber-400' : 'bg-red-500 animate-pulse'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Tip = ({ active, payload, label }: any) => active && payload?.length ? (
  <div className="bg-[#0D1526] border border-[#2A3A5A] px-3 py-2 rounded-lg text-xs">
    <p className="text-slate-400">{label}</p>
    <p className="text-sky-400 font-bold">{payload[0].value}</p>
  </div>
) : null

export default function HealthPage() {
  return (
    <div className="flex flex-col min-h-full">
      <Topbar title="Suivi Santé" subtitle="Monitoring temps réel · Prévention blessures · Rassemblement juin 2025" />
      <div className="p-6 space-y-5">

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Health Score moyen', value: '81/100', icon: Heart, color: 'text-emerald-400', bg: 'bg-emerald-500/10', sub: '23 joueurs · Bon état' },
            { label: 'Joueurs à risque', value: '2', icon: AlertTriangle, color: 'text-amber-400', bg: 'bg-amber-500/10', sub: 'Mbappé · Tchouaméni' },
            { label: 'Blessé confirmé', value: '1', icon: Activity, color: 'text-red-400', bg: 'bg-red-500/10', sub: 'Tchouaméni (cuisse)' },
            { label: 'FC moyen au repos', value: '61 bpm', icon: Zap, color: 'text-sky-400', bg: 'bg-sky-500/10', sub: 'Excellent niveau athlétique' },
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
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Health Score — Groupe de 23</CardTitle>
              <p className="text-xs text-slate-500 mt-0.5">Données capteurs · Mise à jour ce matin 08h00</p>
            </CardHeader>
            <CardContent className="space-y-2.5">
              {JOUEURS_SANTE.map(j => (
                <div key={j.nom} className={`flex items-center gap-4 p-3 rounded-xl border transition-colors cursor-pointer ${j.statut === 'danger' ? 'border-red-500/30 bg-red-500/5 hover:bg-red-500/8' : j.statut === 'warning' ? 'border-amber-500/20 bg-amber-500/5' : 'border-transparent hover:bg-[#1E2D4A]/40'}`}>
                  <div className="relative">
                    <Avatar name={j.nom} size="sm" />
                    <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-[#060B18] ${statutDot(j.statut)}`} />
                  </div>
                  <div className="w-32 shrink-0">
                    <p className="text-xs font-bold text-slate-200 truncate">{j.nom}</p>
                    <p className="text-[10px] text-slate-500">{j.club} · #{j.num}</p>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between mb-1.5">
                      <span className={`text-sm font-black ${scoreColor(j.score)}`}>{j.score}/100</span>
                      {j.statut === 'danger' && <Badge variant="danger" size="sm">⚠ Incertain</Badge>}
                      {j.statut === 'warning' && <Badge variant="warning" size="sm">Surveiller</Badge>}
                      {j.statut === 'good' && <Badge variant="success" size="sm">Disponible</Badge>}
                    </div>
                    <Progress value={j.score} max={100} color={scoreBg(j.score)} size="sm" />
                  </div>
                  <div className="hidden lg:flex items-center gap-5 shrink-0 text-xs">
                    <div className="text-center">
                      <p className="font-bold text-red-400">{j.fc}</p>
                      <p className="text-slate-600 text-[10px]">bpm</p>
                    </div>
                    <div className="text-center">
                      <p className="font-bold text-indigo-400">{j.sommeil}h</p>
                      <p className="text-slate-600 text-[10px]">sommeil</p>
                    </div>
                    <div className="text-center">
                      <p className="font-bold text-cyan-400">{j.hydration}%</p>
                      <p className="text-slate-600 text-[10px]">hydrat.</p>
                    </div>
                    <div className="text-center">
                      <p className={`font-bold ${j.fatigue > 70 ? 'text-red-400' : j.fatigue > 50 ? 'text-amber-400' : 'text-emerald-400'}`}>{j.fatigue}%</p>
                      <p className="text-slate-600 text-[10px]">fatigue</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="space-y-4">
            <Card>
              <CardHeader><CardTitle>FC équipe · 24h</CardTitle></CardHeader>
              <CardContent>
                <div className="flex items-end gap-2 mb-3">
                  <span className="text-3xl font-black text-slate-100">61</span>
                  <span className="text-sm text-slate-500 mb-1">bpm au repos</span>
                </div>
                <ResponsiveContainer width="100%" height={100}>
                  <AreaChart data={HR_DATA} margin={{ left: -25 }}>
                    <defs>
                      <linearGradient id="hrg" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#EF4444" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="#EF4444" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="t" tick={{ fontSize: 10, fill: '#64748B' }} axisLine={false} tickLine={false} />
                    <Tooltip content={<Tip />} />
                    <Area type="monotone" dataKey="v" stroke="#EF4444" strokeWidth={2} fill="url(#hrg)" dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Qualité du sommeil</CardTitle></CardHeader>
              <CardContent>
                <div className="flex items-end gap-2 mb-3">
                  <span className="text-3xl font-black text-slate-100">7.4h</span>
                  <span className="text-sm text-slate-500 mb-1">moyenne équipe</span>
                </div>
                <ResponsiveContainer width="100%" height={100}>
                  <AreaChart data={SLEEP_DATA} margin={{ left: -25 }}>
                    <defs>
                      <linearGradient id="slg" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#6366F1" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="#6366F1" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="d" tick={{ fontSize: 10, fill: '#64748B' }} axisLine={false} tickLine={false} />
                    <Tooltip content={<Tip />} />
                    <Area type="monotone" dataKey="v" stroke="#6366F1" strokeWidth={2} fill="url(#slg)" dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Appareils connectés</CardTitle></CardHeader>
              <CardContent className="space-y-2.5">
                {[
                  { name: 'Polar Vantage', joueurs: 14, actif: true },
                  { name: 'Whoop 4.0', joueurs: 6, actif: true },
                  { name: 'Apple Watch Ultra', joueurs: 3, actif: true },
                  { name: 'GPS Catapult', joueurs: 23, actif: true },
                ].map(d => (
                  <div key={d.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-2.5 h-2.5 rounded-full ${d.actif ? 'bg-emerald-400' : 'bg-slate-600'}`} />
                      <span className="text-xs font-medium text-slate-300">{d.name}</span>
                    </div>
                    <Badge variant="info" size="sm">{d.joueurs} joueurs</Badge>
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
