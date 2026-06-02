'use client'
import { Topbar } from '@/components/layout/Topbar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { BarChart3, TrendingUp, Users, Clock, Target, Download } from 'lucide-react'
import { BarChart, Bar, LineChart, Line, AreaChart, Area, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Legend, RadarChart, Radar, PolarGrid, PolarAngleAxis } from 'recharts'

const MONTHLY = [
  {m:'Jan',wins:3,draws:2,losses:1},{m:'Fév',wins:4,draws:1,losses:1},{m:'Mar',wins:2,draws:3,losses:2},
  {m:'Avr',wins:5,draws:0,losses:1},{m:'Mai',wins:4,draws:2,losses:0},{m:'Jun',wins:3,draws:1,losses:1},
]
const LOAD = [
  {week:'S1',load:820,rec:75},{week:'S2',load:940,rec:68},{week:'S3',load:760,rec:82},
  {week:'S4',load:1020,rec:60},{week:'S5',load:890,rec:71},{week:'S6',load:840,rec:78},
]
const RADAR_DATA = [
  {attr:'Possession',val:64},{attr:'Pressing',val:78},{attr:'Transition',val:71},{attr:'Duels',val:68},{attr:'Tirs',val:82},{attr:'Défense',val:74}
]

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Tip = ({active,payload,label}:any) => active && payload?.length ? (
  <div className="glass px-3 py-2 rounded-lg text-xs space-y-1">
    <p className="text-slate-400">{label}</p>
    {payload.map((p: {name: string, value: number, color: string},i: number)=>(
      <p key={i} style={{color:p.color}} className="font-semibold">{p.name}: {p.value}</p>
    ))}
  </div>
) : null

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col min-h-full">
      <Topbar title="Analytics" subtitle="Tableau de bord analytique · Saison 2025/26"/>
      <div className="p-6 space-y-6">

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {label:'Matchs joués',value:'38',sub:'Saison 2025/26',icon:BarChart3,color:'text-sky-400',bg:'bg-sky-500/10'},
            {label:'Victoires',value:'24',sub:'63.2% de réussite',icon:TrendingUp,color:'text-emerald-400',bg:'bg-emerald-500/10'},
            {label:'Buts marqués',value:'78',sub:'2.05/match',icon:Target,color:'text-amber-400',bg:'bg-amber-500/10'},
            {label:'Minutes jouées',value:'3,420',sub:'Temps de jeu total',icon:Clock,color:'text-violet-400',bg:'bg-violet-500/10'},
          ].map(k=>(
            <Card key={k.label} hover>
              <CardContent className="p-4">
                <div className={`w-9 h-9 rounded-xl ${k.bg} flex items-center justify-center mb-3`}>
                  <k.icon className={`w-4 h-4 ${k.color}`}/>
                </div>
                <p className="text-xl font-bold text-slate-100">{k.value}</p>
                <p className="text-xs text-slate-500">{k.label}</p>
                <p className="text-[10px] text-slate-600 mt-1">{k.sub}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Résultats par mois</CardTitle>
              <Button variant="ghost" size="sm"><Download className="w-3.5 h-3.5"/>Export</Button>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={MONTHLY} barSize={12}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E2D4A" vertical={false}/>
                  <XAxis dataKey="m" tick={{fontSize:11,fill:'#8B9FC0'}} axisLine={false} tickLine={false}/>
                  <YAxis tick={{fontSize:11,fill:'#8B9FC0'}} axisLine={false} tickLine={false}/>
                  <Tooltip content={<Tip/>}/>
                  <Legend wrapperStyle={{fontSize:11,color:'#8B9FC0'}}/>
                  <Bar dataKey="wins" name="Victoires" fill="#22C55E" radius={[3,3,0,0]}/>
                  <Bar dataKey="draws" name="Nuls" fill="#F59E0B" radius={[3,3,0,0]}/>
                  <Bar dataKey="losses" name="Défaites" fill="#EF4444" radius={[3,3,0,0]}/>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Profil tactique</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <RadarChart data={RADAR_DATA}>
                  <PolarGrid stroke="#1E2D4A"/>
                  <PolarAngleAxis dataKey="attr" tick={{fontSize:10,fill:'#8B9FC0'}}/>
                  <Radar dataKey="val" stroke="#0EA5E9" fill="#0EA5E9" fillOpacity={0.2} strokeWidth={2}/>
                  <Tooltip contentStyle={{background:'#0D1526',border:'1px solid #1E2D4A',borderRadius:8,fontSize:12}}/>
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader><CardTitle>Charge d&apos;entraînement vs Récupération</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={180}>
                <AreaChart data={LOAD}>
                  <defs>
                    <linearGradient id="lg1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0EA5E9" stopOpacity={0.3}/><stop offset="100%" stopColor="#0EA5E9" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="lg2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#22C55E" stopOpacity={0.3}/><stop offset="100%" stopColor="#22C55E" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E2D4A" vertical={false}/>
                  <XAxis dataKey="week" tick={{fontSize:11,fill:'#8B9FC0'}} axisLine={false} tickLine={false}/>
                  <YAxis tick={{fontSize:11,fill:'#8B9FC0'}} axisLine={false} tickLine={false}/>
                  <Tooltip content={<Tip/>}/>
                  <Legend wrapperStyle={{fontSize:11,color:'#8B9FC0'}}/>
                  <Area type="monotone" dataKey="load" name="Charge (UA)" stroke="#0EA5E9" fill="url(#lg1)" strokeWidth={2} dot={false}/>
                  <Area type="monotone" dataKey="rec" name="Récupération (%)" stroke="#22C55E" fill="url(#lg2)" strokeWidth={2} dot={false}/>
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Top stats saison</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {[
                {label:'Possession moyenne',value:'58%',max:100,color:'primary' as const},
                {label:'Tirs par match',value:'14.2',max:20,color:'accent' as const},
                {label:'Taux de pressing',value:'72%',max:100,color:'success' as const},
                {label:'Passes réussies',value:'87%',max:100,color:'warning' as const},
              ].map(s=>(
                <div key={s.label} className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">{s.label}</span>
                    <span className="text-slate-200 font-bold">{s.value}</span>
                  </div>
                  <div className="h-1.5 bg-[#1E2D4A] rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-sky-500 to-cyan-400" style={{width:s.value.replace(/[^0-9.]/g,'')+'%'}}/>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
