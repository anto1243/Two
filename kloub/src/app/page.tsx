'use client'
import { Topbar } from '@/components/layout/Topbar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { ArrowUpRight, CheckCircle, MinusCircle, XCircle, ChevronRight, ArrowRight, TrendingUp } from 'lucide-react'
import { LineChart, Line, AreaChart, Area, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const PERF = [
  { j:'BEL',v:78 },{ j:'ISR',v:92 },{ j:'ITA',v:85 },{ j:'BEL',v:88 },{ j:'ITA',v:82 },{ j:'ISR',v:94 },
]
const PRESENCE = [{ s:'S1',p:91 },{ s:'S2',p:96 },{ s:'S3',p:88 },{ s:'S4',p:100 },{ s:'S5',p:94 },{ s:'S6',p:97 }]

const JOUEURS = [
  { nom:'Kylian Mbappé',    club:'Real Madrid',    pos:'ATT', num:10, buts:8, passes:4, note:9.1, forme:'up' },
  { nom:'Antoine Griezmann', club:'Atlético Madrid', pos:'MIL', num:7,  buts:5, passes:9, note:8.7, forme:'up' },
  { nom:'Marcus Thuram',    club:'Inter Milan',    pos:'ATT', num:9,  buts:6, passes:3, note:8.4, forme:'up' },
  { nom:'William Saliba',   club:'Arsenal',        pos:'DEF', num:17, buts:0, passes:1, note:8.1, forme:'stable' },
  { nom:'Mike Maignan',     club:'AC Milan',       pos:'GK',  num:16, buts:0, passes:0, note:7.9, forme:'up' },
]

const ALERTES = [
  { dot:'bg-amber-400', joueur:'A. Tchouaméni', msg:'Gêne musculaire', detail:'Statut incertain — 4 juin' },
  { dot:'bg-blue-400',  joueur:'N. Kanté',      msg:'Retour collectif', detail:'Disponible pour la demi-finale' },
  { dot:'bg-white/20',  joueur:'K. Mbappé',     msg:'Charge élevée', detail:'Protocole récupération activé' },
]

const RESULTATS = [
  { adv:'Belgique', score:'2–1', dom:true },
  { adv:'Israël',   score:'4–1', dom:true },
  { adv:'Italie',   score:'3–1', dom:false },
  { adv:'Belgique', score:'3–2', dom:false },
  { adv:'Italie',   score:'3–1', dom:true },
]

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Tip = ({ active, payload, label }: any) => active && payload?.length ? (
  <div className="bg-[#111114] border border-white/[0.08] px-3 py-2 rounded-lg text-xs shadow-xl">
    <p className="text-white/40 mb-1">vs {label}</p>
    <p className="text-white/90 font-semibold">{payload[0].value} pts</p>
  </div>
) : null


export default function DashboardPage() {
  return (
    <div className="min-h-full bg-[#09090b]">
      <Topbar title="Dashboard" subtitle="Ligue des Nations 2024/25 · Phase finale · Équipe de France" />

      <div className="px-8 py-8 space-y-6 max-w-[1400px]">

        {/* ── Hero : match banner ── */}
        <div className="flex items-center justify-between p-6 rounded-2xl bg-[#111114] border border-white/[0.06]">
          <div className="flex items-center gap-6">
            <div>
              <p className="text-[11px] font-semibold text-white/30 uppercase tracking-widest mb-1">Prochain match · ½ Finale LDN</p>
              <p className="text-2xl font-bold text-white/90 tracking-tight">France <span className="text-white/20 mx-3 font-light">vs</span> Croatie</p>
              <p className="text-sm text-white/40 mt-1">Mercredi 4 juin 2025 · 21h00 · Groupama Stadium, Lyon</p>
            </div>
          </div>
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              {RESULTATS.map((r, i) => (
                <div key={i} className="flex flex-col items-center gap-1.5">
                  <div className="w-7 h-7 rounded-full bg-emerald-500/10 border border-emerald-500/15 flex items-center justify-center">
                    <span className="text-[10px] font-bold text-emerald-400">V</span>
                  </div>
                  <span className="text-[10px] text-white/25">{r.adv.slice(0,3)}</span>
                </div>
              ))}
              <div className="ml-2 text-right">
                <p className="text-lg font-bold text-white/90">5V</p>
                <p className="text-[11px] text-white/30">6 matchs</p>
              </div>
            </div>
            <Button>Préparer le match <ArrowRight className="w-3.5 h-3.5" /></Button>
          </div>
        </div>

        {/* ── KPIs ── */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { label:'Classement FIFA', value:'#2',    delta:'+1',   suffix:'Mondial' },
            { label:'Victoires LDN',   value:'6/6',   delta:'100%', suffix:'Phase groupes' },
            { label:'Buts marqués',    value:'19',    delta:'+3.2', suffix:'Par match' },
            { label:'Groupe convoqué', value:'23',    delta:'100%', suffix:'Disponibles' },
          ].map(k => (
            <Card key={k.label}>
              <CardContent className="py-5">
                <p className="text-[11px] text-white/30 uppercase tracking-widest mb-3">{k.label}</p>
                <p className="text-4xl font-bold text-white/90 tracking-tight leading-none mb-1">{k.value}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-emerald-400 text-xs font-semibold">{k.delta}</span>
                  <span className="text-white/25 text-xs">{k.suffix}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* ── Row 2 ── */}
        <div className="grid grid-cols-3 gap-4">

          {/* Performance chart */}
          <Card className="col-span-2">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Performance collective</CardTitle>
                  <p className="text-xs text-white/30 mt-1">Score IA par match · Phase de groupes LDN 2024/25</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-white/90">86.7</p>
                  <p className="text-[11px] text-emerald-400 font-medium">Score moyen</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={180}>
                <AreaChart data={PERF} margin={{ left:-20, right:4, top:4, bottom:0 }}>
                  <defs>
                    <linearGradient id="pg" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.08}/>
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="j" tick={{fontSize:11,fill:'rgba(255,255,255,0.25)'}} axisLine={false} tickLine={false}/>
                  <YAxis domain={[70,100]} tick={{fontSize:10,fill:'rgba(255,255,255,0.25)'}} axisLine={false} tickLine={false}/>
                  <Tooltip content={<Tip/>}/>
                  <Area type="monotone" dataKey="v" stroke="#3b82f6" strokeWidth={1.5} fill="url(#pg)"
                    dot={{fill:'#3b82f6',r:3,strokeWidth:0}}
                    activeDot={{r:5,fill:'#60a5fa',strokeWidth:0}}/>
                </AreaChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-4 gap-4 mt-6 pt-5 border-t border-white/[0.05]">
                {[
                  {label:'Possession moy.',value:'62%'},
                  {label:'Buts / match',value:'3.2'},
                  {label:'Tirs cadrés',value:'7.1'},
                  {label:'Clean sheets',value:'3'},
                ].map(s => (
                  <div key={s.label}>
                    <p className="text-lg font-semibold text-white/90">{s.value}</p>
                    <p className="text-[11px] text-white/30 mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Groupe dispo */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle>Groupe · 23 joueurs</CardTitle>
                <Badge variant="success">Demi-finale</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-5">
              {[
                { label:'Disponibles', count:20, total:23, icon:CheckCircle, ic:'text-emerald-400', color:'success' as const },
                { label:'Incertains',  count:2,  total:23, icon:MinusCircle, ic:'text-amber-400',   color:'warning' as const },
                { label:'Blessés',     count:1,  total:23, icon:XCircle,     ic:'text-red-400',     color:'danger'  as const },
              ].map(item => (
                <div key={item.label}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <item.icon className={`w-3.5 h-3.5 ${item.ic}`}/>
                      <span className="text-sm text-white/60">{item.label}</span>
                    </div>
                    <span className="text-lg font-semibold text-white/90">{item.count}</span>
                  </div>
                  <Progress value={item.count} max={item.total} color={item.color}/>
                </div>
              ))}

              <div className="pt-4 border-t border-white/[0.05]">
                <p className="text-[11px] text-white/30 mb-3 uppercase tracking-widest">Alertes médicales</p>
                <div className="space-y-3">
                  {ALERTES.map((a, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <div className={`w-1.5 h-1.5 rounded-full ${a.dot} mt-1.5 shrink-0`}/>
                      <div>
                        <p className="text-xs font-medium text-white/70">{a.joueur} <span className="text-white/30">— {a.msg}</span></p>
                        <p className="text-[11px] text-white/30">{a.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ── Row 3 : Table joueurs ── */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Performances individuelles</CardTitle>
                <p className="text-xs text-white/30 mt-1">Ligue des Nations 2024/25 · Phase de groupes</p>
              </div>
              <Button variant="ghost" size="sm">Effectif complet <ChevronRight className="w-3.5 h-3.5"/></Button>
            </div>
          </CardHeader>
          <CardContent className="p-0 pb-2">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.04]">
                  {['Joueur','Club','Poste','Note','Buts','Passes D.','Forme'].map(h => (
                    <th key={h} className="px-6 py-3 text-left text-[11px] font-medium text-white/25 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {JOUEURS.map((j, i) => (
                  <tr key={j.nom} className={`border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors cursor-pointer ${i === JOUEURS.length-1 ? 'border-0' : ''}`}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar name={j.nom} size="sm"/>
                        <div>
                          <p className="text-sm font-medium text-white/90">{j.nom}</p>
                          <p className="text-[11px] text-white/30">#{j.num}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-white/40">{j.club}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-semibold ${j.pos==='ATT'?'text-amber-400':j.pos==='MIL'?'text-blue-400':j.pos==='DEF'?'text-emerald-400':'text-violet-400'}`}>{j.pos}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-bold text-white/90">{j.note}</span>
                      <span className="text-white/20 text-xs ml-0.5">/10</span>
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-white/80">{j.buts}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-white/80">{j.passes}</td>
                    <td className="px-6 py-4">
                      {j.forme === 'up'
                        ? <div className="flex items-center gap-1 text-emerald-400"><ArrowUpRight className="w-3.5 h-3.5"/><span className="text-xs">Hausse</span></div>
                        : <span className="text-xs text-white/30">Stable</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}
