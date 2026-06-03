'use client'
import { Topbar } from '@/components/layout/Topbar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Users, Calendar, Heart, TrendingUp, AlertTriangle, Zap, Trophy,
  ArrowUpRight, ArrowDownRight, Activity, Clock, MapPin, Target,
  ChevronRight, Flame, Star, CheckCircle, XCircle, MinusCircle,
  Flag, Shield
} from 'lucide-react'
import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

// ── Données réelles Équipe de France ──────────────────────────────
const PERF_DATA = [
  { j: 'BEL', v: 78 }, { j: 'ISR', v: 92 }, { j: 'ITA', v: 85 },
  { j: 'BEL', v: 88 }, { j: 'ITA', v: 82 }, { j: 'ISR', v: 94 },
]
const PRESENCE_DATA = [
  { s: 'S1', p: 91 }, { s: 'S2', p: 96 }, { s: 'S3', p: 88 },
  { s: 'S4', p: 100 }, { s: 'S5', p: 94 }, { s: 'S6', p: 97 },
]

const PROCHAINS_MATCHS = [
  { adversaire: 'Croatie', date: 'Mer 4 Juin 2025', heure: '21:00', lieu: 'Stade de Lyon', type: 'home', comp: 'Ligue des Nations — ½ Finale', code: 'CRO' },
  { adversaire: 'Finale / 3e place', date: 'Dim 8 Juin 2025', heure: '21:00', lieu: 'Allianz Arena, Munich', type: 'away', comp: 'Ligue des Nations — Finale', code: 'TBD' },
]

const DERNIERS_RESULTATS = [
  { adv: 'Israël', score: '4–1', dom: true, comp: 'LDN', type: 'victoire' },
  { adv: 'Belgique', score: '3–2', dom: false, comp: 'LDN', type: 'victoire' },
  { adv: 'Italie', score: '3–1', dom: true, comp: 'LDN', type: 'victoire' },
  { adv: 'Belgique', score: '2–1', dom: true, comp: 'LDN', type: 'victoire' },
  { adv: 'Italie', score: '3–1', dom: false, comp: 'LDN', type: 'victoire' },
]

const TOP_JOUEURS = [
  { nom: 'Kylian Mbappé', club: 'Real Madrid', pos: 'ATT', num: 10, buts: 8, passes: 4, note: 9.1, forme: 'up' },
  { nom: 'Antoine Griezmann', club: 'Atlético Madrid', pos: 'MIL', num: 7, buts: 5, passes: 9, note: 8.7, forme: 'up' },
  { nom: 'Marcus Thuram', club: 'Inter Milan', pos: 'ATT', num: 9, buts: 6, passes: 3, note: 8.4, forme: 'up' },
  { nom: 'William Saliba', club: 'Arsenal', pos: 'DEF', num: 17, buts: 0, passes: 1, note: 8.1, forme: 'stable' },
  { nom: 'Mike Maignan', club: 'AC Milan', pos: 'GK', num: 16, buts: 0, passes: 0, note: 7.9, forme: 'up' },
]

const ALERTES = [
  { type: 'warning', joueur: 'A. Tchouaméni', msg: 'Gêne musculaire à la cuisse', detail: 'Statut incertain pour le 4 juin · Surveillance médicale renforcée' },
  { type: 'info', joueur: 'K. Mbappé', msg: 'Charge élevée détectée', detail: 'Fatigue accumulée après 3 matchs en 8 jours — Protocole récupération activé' },
  { type: 'success', joueur: 'N. Kanté', msg: 'Retour à l\'entraînement collectif', detail: 'Opérationnel après sa blessure · Disponible pour la demi-finale' },
]

const KPIS = [
  { label: 'Joueurs convoqués', value: '23', sub: 'Groupe complet', icon: Users, color: 'text-sky-400', bg: 'bg-sky-500/10', trend: null },
  { label: 'Matchs qualification', value: '6/6', sub: '100% de victoires', icon: Trophy, color: 'text-amber-400', bg: 'bg-amber-500/10', trend: 'up' },
  { label: 'Buts marqués', value: '20', sub: '3.3 buts / match', icon: Target, color: 'text-emerald-400', bg: 'bg-emerald-500/10', trend: 'up' },
  { label: 'Classement FIFA', value: '#2', sub: '▲ +1 ce mois', icon: Flag, color: 'text-violet-400', bg: 'bg-violet-500/10', trend: 'up' },
]

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ChartTip = ({ active, payload, label }: any) => active && payload?.length ? (
  <div className="bg-[#0D1526] border border-[#2A3A5A] px-3 py-2 rounded-lg text-xs shadow-xl">
    <p className="text-slate-400 mb-0.5">Match vs {label}</p>
    <p className="text-sky-400 font-bold text-sm">{payload[0].value} pts</p>
  </div>
) : null

export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-full bg-[#060B18]">
      <Topbar title="Dashboard" subtitle="Ligue des Nations 2024/25 · Phase finale · Équipe de France" />
      <div className="p-6 space-y-6">

        {/* ── Bannière demi-finale ── */}
        <div className="relative overflow-hidden rounded-2xl p-5 bg-gradient-to-r from-[#0A1628] via-[#0D1E35] to-[#0A1628] border border-sky-500/20">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-sky-500/10 to-transparent" />
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-lg font-black text-white shadow-lg shadow-blue-500/30">🇫🇷</div>
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">Prochain match</span>
                  <span className="animate-pulse w-2 h-2 rounded-full bg-emerald-400 inline-block" />
                </div>
                <p className="text-xl font-black text-white">France <span className="text-slate-400 mx-2">vs</span> Croatie</p>
                <p className="text-sm text-slate-400 mt-0.5">Mercredi 4 juin 2025 · 21h00 · Stade de Lyon · <span className="text-amber-400 font-semibold">½ Finale LDN</span></p>
              </div>
            </div>
            <div className="hidden lg:flex items-center gap-6 mr-4">
              {DERNIERS_RESULTATS.slice(0, 5).map((r, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${r.type === 'victoire' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : r.type === 'nul' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}>
                    {r.type === 'victoire' ? 'V' : r.type === 'nul' ? 'N' : 'D'}
                  </div>
                  <span className="text-[10px] text-slate-500">{r.adv}</span>
                </div>
              ))}
              <div className="flex flex-col items-center">
                <span className="text-xs text-slate-500">5 matchs</span>
                <span className="text-base font-bold text-emerald-400">5V 0N 0D</span>
              </div>
            </div>
            <Button size="sm" className="shrink-0">Voir la feuille de match <ChevronRight className="w-3.5 h-3.5" /></Button>
          </div>
        </div>

        {/* ── KPIs ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {KPIS.map((k) => (
            <Card key={k.label} className="relative overflow-hidden group cursor-pointer hover:border-sky-500/30 transition-all duration-200">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl ${k.bg} flex items-center justify-center`}>
                    <k.icon className={`w-5 h-5 ${k.color}`} />
                  </div>
                  {k.trend === 'up' && (
                    <div className="flex items-center gap-1 text-emerald-400 text-xs bg-emerald-500/10 px-2 py-1 rounded-full">
                      <ArrowUpRight className="w-3 h-3" /> +
                    </div>
                  )}
                </div>
                <p className="text-3xl font-black text-slate-100 tracking-tight">{k.value}</p>
                <p className="text-xs font-semibold text-slate-400 mt-1">{k.label}</p>
                <p className="text-[11px] text-slate-600 mt-0.5">{k.sub}</p>
                <div className={`absolute -bottom-4 -right-4 w-20 h-20 ${k.bg} rounded-full blur-2xl opacity-40 group-hover:opacity-60 transition-opacity`} />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* ── Ligne 2 : Performance + Disponibilité ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* Graphique performances */}
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="text-base">Performance par match</CardTitle>
                <p className="text-xs text-slate-500 mt-0.5">Score collectif analysé par IA · Phase de groupes LDN</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-black text-slate-100">86.7</p>
                <p className="text-xs text-emerald-400 font-medium">Score moyen</p>
              </div>
            </CardHeader>
            <CardContent className="pt-2">
              <ResponsiveContainer width="100%" height={160}>
                <AreaChart data={PERF_DATA} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                  <defs>
                    <linearGradient id="pg" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0EA5E9" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="#0EA5E9" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="j" tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
                  <YAxis domain={[70, 100]} tick={{ fontSize: 10, fill: '#64748B' }} axisLine={false} tickLine={false} />
                  <Tooltip content={<ChartTip />} />
                  <Area type="monotone" dataKey="v" stroke="#0EA5E9" strokeWidth={2.5} fill="url(#pg)"
                    dot={{ fill: '#0EA5E9', r: 4, strokeWidth: 0 }}
                    activeDot={{ r: 6, fill: '#22D3EE', strokeWidth: 2, stroke: '#0EA5E9' }} />
                </AreaChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-4 gap-3 mt-4 pt-4 border-t border-[#1E2D4A]">
                {[
                  { label: 'Possession moy.', value: '62%' },
                  { label: 'Buts / match', value: '3.3' },
                  { label: 'Tirs cadrés', value: '7.2' },
                  { label: 'Clean sheets', value: '3' },
                ].map(s => (
                  <div key={s.label} className="text-center">
                    <p className="text-base font-bold text-slate-200">{s.value}</p>
                    <p className="text-[10px] text-slate-600 mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Disponibilité groupe */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Groupe · 23 joueurs</CardTitle>
                <Badge variant="success">Semi-finale</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: 'Disponibles', count: 20, total: 23, color: 'success' as const, icon: CheckCircle, icolor: 'text-emerald-400' },
                { label: 'Incertains', count: 2, total: 23, color: 'warning' as const, icon: MinusCircle, icolor: 'text-amber-400' },
                { label: 'Blessés', count: 1, total: 23, color: 'danger' as const, icon: XCircle, icolor: 'text-red-400' },
              ].map(item => (
                <div key={item.label} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <item.icon className={`w-4 h-4 ${item.icolor}`} />
                      <span className="text-sm font-medium text-slate-300">{item.label}</span>
                    </div>
                    <span className="text-base font-bold text-slate-100">{item.count}</span>
                  </div>
                  <Progress value={item.count} max={item.total} color={item.color} size="sm" />
                </div>
              ))}

              <div className="mt-2 p-3 rounded-xl bg-gradient-to-br from-sky-500/10 to-transparent border border-sky-500/20">
                <div className="flex gap-2 mb-2">
                  <Zap className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <span className="text-xs font-semibold text-sky-300">Analyse IA Pré-match</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Groupe en excellente forme. Tchouaméni à surveiller. Retour de Kanté = boost tactique majeur en demi-finale.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ── Ligne 3 : Matchs + Alertes + Présence ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* Prochains matchs */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Calendrier</CardTitle>
                <Badge variant="warning">Phase finale</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 p-4">
              {PROCHAINS_MATCHS.map((m, i) => (
                <div key={i} className="p-4 rounded-xl border border-[#2A3A5A] hover:border-sky-500/40 hover:bg-sky-500/5 transition-all cursor-pointer group">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-[#1E2D4A] flex items-center justify-center text-sm font-bold text-slate-300">
                        {m.code}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-200 group-hover:text-sky-300 transition-colors">{m.adversaire}</p>
                        <p className="text-[10px] text-slate-500">{m.heure} · {m.date}</p>
                      </div>
                    </div>
                    <Badge variant={m.type === 'home' ? 'success' : 'info'} size="sm">{m.type === 'home' ? 'Domicile' : 'Extérieur'}</Badge>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                    <MapPin className="w-3 h-3" /> {m.lieu}
                  </div>
                  <div className="mt-2 text-[11px] text-amber-400 font-medium">{m.comp}</div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Alertes médicales / IA */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Alertes &amp; Infos médicales</CardTitle>
                <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold flex items-center justify-center">3</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 p-4">
              {ALERTES.map((a, i) => (
                <div key={i} className={`p-3 rounded-xl border flex gap-3 ${a.type === 'warning' ? 'bg-amber-500/5 border-amber-500/20' : a.type === 'success' ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-sky-500/5 border-sky-500/20'}`}>
                  <div className="shrink-0 mt-0.5">
                    {a.type === 'warning' ? <AlertTriangle className="w-4 h-4 text-amber-400" /> :
                      a.type === 'success' ? <CheckCircle className="w-4 h-4 text-emerald-400" /> :
                        <Zap className="w-4 h-4 text-sky-400" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-slate-200">{a.joueur}</p>
                    <p className="text-xs text-slate-300 mt-0.5">{a.msg}</p>
                    <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">{a.detail}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Taux de présence */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Présence aux entraînements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-3 mb-4">
                <span className="text-4xl font-black text-slate-100">96%</span>
                <div className="mb-1">
                  <div className="flex items-center gap-1 text-emerald-400 text-xs font-semibold">
                    <ArrowUpRight className="w-3.5 h-3.5" /> +4% vs rassemblement précédent
                  </div>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={80}>
                <AreaChart data={PRESENCE_DATA} margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
                  <defs>
                    <linearGradient id="ag" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#22C55E" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#22C55E" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="s" tick={{ fontSize: 10, fill: '#64748B' }} axisLine={false} tickLine={false} />
                  <Tooltip content={<ChartTip />} />
                  <Area type="monotone" dataKey="p" stroke="#22C55E" strokeWidth={2} fill="url(#ag)" dot={false} />
                </AreaChart>
              </ResponsiveContainer>
              <div className="mt-4 flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-orange-500/10 to-transparent border border-orange-500/20">
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-orange-400" />
                  <span className="text-xs font-semibold text-slate-200">Streak parfait</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span className="text-sm font-bold text-amber-400">22 séances</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ── Ligne 4 : Top joueurs ── */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-base">Performances individuelles · LDN 2024/25</CardTitle>
              <p className="text-xs text-slate-500 mt-0.5">Phase de groupes — 6 matchs disputés</p>
            </div>
            <Button variant="secondary" size="sm">Voir l&apos;effectif complet <ChevronRight className="w-3.5 h-3.5" /></Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#1E2D4A]">
                    {['Joueur', 'Club', 'Poste', 'Note IA', 'Buts', 'Passes D.', 'Forme'].map(h => (
                      <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1E2D4A]/50">
                  {TOP_JOUEURS.map((p) => (
                    <tr key={p.nom} className="hover:bg-[#1E2D4A]/40 transition-colors cursor-pointer group">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <Avatar name={p.nom} size="sm" />
                            <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#0D1526] border border-[#2A3A5A] text-[9px] font-bold text-slate-400 flex items-center justify-center">{p.num}</span>
                          </div>
                          <span className="text-sm font-semibold text-slate-200 group-hover:text-sky-300 transition-colors">{p.nom}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-xs text-slate-500">{p.club}</td>
                      <td className="px-5 py-4">
                        <span className={`px-2 py-0.5 rounded-md text-xs font-bold ${p.pos === 'ATT' ? 'bg-amber-500/15 text-amber-400' : p.pos === 'MIL' ? 'bg-sky-500/15 text-sky-400' : p.pos === 'DEF' ? 'bg-emerald-500/15 text-emerald-400' : 'bg-violet-500/15 text-violet-400'}`}>
                          {p.pos}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-black text-amber-400">{p.note}</span>
                          <div className="flex gap-0.5">
                            {[...Array(Math.floor(p.note / 2))].map((_, i) => <Star key={i} className="w-2.5 h-2.5 text-amber-400 fill-amber-400" />)}
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-sm font-bold text-slate-200">{p.buts}</td>
                      <td className="px-5 py-4 text-sm font-bold text-slate-200">{p.passes}</td>
                      <td className="px-5 py-4">
                        {p.forme === 'up' ? (
                          <div className="flex items-center gap-1 text-emerald-400">
                            <ArrowUpRight className="w-4 h-4" />
                            <span className="text-xs font-semibold">En hausse</span>
                          </div>
                        ) : <div className="flex items-center gap-1 text-slate-500"><Activity className="w-4 h-4" /><span className="text-xs">Stable</span></div>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}
