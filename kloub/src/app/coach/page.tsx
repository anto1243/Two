'use client'
import { Topbar } from '@/components/layout/Topbar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { Brain, Send, Zap, TrendingUp, Heart, Dumbbell, Moon, Droplets, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip } from 'recharts'

const MESSAGES = [
  { role: 'user', text: 'Comment améliorer ma vitesse cette semaine ?' },
  { role: 'ai', text: 'Basé sur tes données de performance et ton niveau de fatigue actuel (68/100), je recommande :\n\n**1. Sprint courts (3×5 répétitions de 30m)** — Idéal en début de séance quand tu es frais.\n\n**2. Exercices de coordination** — 15min de corde à sauter variée améliore la fréquence de foulée.\n\n**3. Récupération active** — 8h de sommeil minimum. Ton tracker montre 6.5h cette semaine.\n\nProgramme optimal : Mardi + Jeudi, jamais la veille d\'un match.' },
  { role: 'user', text: 'Pourquoi ma performance baisse cette semaine ?' },
  { role: 'ai', text: 'Analyse de tes données sur 7 jours :\n\n⚠️ **Fatigue accumulée** : Charge d\'entraînement +23% vs semaine normale\n😴 **Sommeil insuffisant** : Moyenne 6.2h (objectif : 8h)\n💧 **Hydratation** : 1.8L/j (objectif : 3L pendant l\'entraînement)\n\n**Recommandation** : Réduire l\'intensité de 20% les 2 prochains jours et prioriser la récupération.' },
]

const RADAR_DATA = [
  {attr:'Vitesse',val:82},{attr:'Endurance',val:74},{attr:'Force',val:68},{attr:'Technique',val:91},{attr:'Mental',val:85},{attr:'Récupération',val:70}
]

const PROGRAMS = [
  {title:'Programme Vitesse',duration:'4 semaines',level:'Intermédiaire',tag:'Recommandé',color:'sky'},
  {title:'Renforcement Musculaire',duration:'6 semaines',level:'Avancé',tag:'',color:'violet'},
  {title:'Récupération Active',duration:'1 semaine',level:'Facile',tag:'Urgent',color:'emerald'},
]

export default function CoachPage() {
  const [input, setInput] = useState('')

  return (
    <div className="flex flex-col min-h-full">
      <Topbar title="Coach IA Personnalisé" subtitle="Votre entraîneur intelligent disponible 24/7"/>
      <div className="p-6 space-y-6">

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {label:'Score Forme',value:'72/100',icon:Zap,color:'text-sky-400',bg:'bg-sky-500/10',sub:'↓ Fatigue détectée'},
            {label:'Charge hebdo',value:'1,840',icon:Dumbbell,color:'text-violet-400',bg:'bg-violet-500/10',sub:'UA · +23% vs moy.'},
            {label:'Sommeil moyen',value:'6.2h',icon:Moon,color:'text-indigo-400',bg:'bg-indigo-500/10',sub:'↓ Objectif: 8h'},
            {label:'Hydratation',value:'1.8L',icon:Droplets,color:'text-cyan-400',bg:'bg-cyan-500/10',sub:'↓ Objectif: 3L'},
          ].map(k=>(
            <Card key={k.label} hover>
              <CardContent className="p-4">
                <div className={`w-9 h-9 rounded-xl ${k.bg} flex items-center justify-center mb-3`}>
                  <k.icon className={`w-4 h-4 ${k.color}`}/>
                </div>
                <p className="text-xl font-bold text-slate-100">{k.value}</p>
                <p className="text-xs text-slate-500">{k.label}</p>
                <p className="text-xs text-slate-500 mt-1">{k.sub}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 flex flex-col h-[520px]">
            <CardHeader className="flex flex-row items-center gap-3 shrink-0">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-500 to-cyan-400 flex items-center justify-center">
                <Brain className="w-4 h-4 text-white"/>
              </div>
              <div>
                <CardTitle>Chat avec votre Coach IA</CardTitle>
                <p className="text-xs text-slate-500">Analyse en temps réel de vos données</p>
              </div>
              <Badge variant="success" className="ml-auto">En ligne</Badge>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col p-4 overflow-hidden">
              <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                {MESSAGES.map((m,i)=>(
                  <div key={i} className={`flex gap-3 ${m.role==='user'?'justify-end':''}`}>
                    {m.role==='ai' && (
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-sky-500 to-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Brain className="w-3.5 h-3.5 text-white"/>
                      </div>
                    )}
                    <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${m.role==='user'?'bg-sky-500 text-white rounded-tr-sm':'bg-[#1E2D4A] text-slate-300 rounded-tl-sm border border-[#2A3A5A]'}`}>
                      {m.text}
                    </div>
                    {m.role==='user' && <Avatar name="Kylian Mbappé" size="xs" className="mt-0.5 shrink-0"/>}
                  </div>
                ))}
              </div>
              <div className="flex gap-2 mt-4 shrink-0">
                <div className="flex-1 flex gap-2 px-4 py-2.5 bg-[#1E2D4A] border border-[#2A3A5A] rounded-xl focus-within:border-sky-500/50 transition-colors">
                  <input
                    value={input}
                    onChange={e=>setInput(e.target.value)}
                    placeholder="Posez une question à votre coach IA..."
                    className="flex-1 bg-transparent text-sm text-slate-200 placeholder-slate-500 focus:outline-none"
                  />
                </div>
                <Button size="icon" onClick={()=>setInput('')}>
                  <Send className="w-4 h-4"/>
                </Button>
              </div>
              <div className="flex gap-2 mt-2 flex-wrap shrink-0">
                {["Améliorer ma vitesse","Récupération post-match","Programme nutritionnel"].map(q=>(
                  <button key={q} onClick={()=>setInput(q)} className="px-2.5 py-1 rounded-full bg-[#1E2D4A] border border-[#2A3A5A] text-xs text-slate-400 hover:text-slate-200 hover:border-sky-500/30 transition-colors cursor-pointer">{q}</button>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <Card>
              <CardHeader><CardTitle>Profil athlétique</CardTitle></CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <RadarChart data={RADAR_DATA}>
                    <PolarGrid stroke="#1E2D4A"/>
                    <PolarAngleAxis dataKey="attr" tick={{fontSize:10,fill:'#8B9FC0'}}/>
                    <Radar dataKey="val" stroke="#0EA5E9" fill="#0EA5E9" fillOpacity={0.15} strokeWidth={1.5}/>
                    <Tooltip contentStyle={{background:'#0D1526',border:'1px solid #1E2D4A',borderRadius:8,fontSize:12}}/>
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Programmes recommandés</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {PROGRAMS.map(p=>(
                  <div key={p.title} className="p-3 rounded-lg border border-[#2A3A5A] hover:border-sky-500/30 transition-colors cursor-pointer">
                    <div className="flex justify-between items-start mb-1">
                      <p className="text-xs font-semibold text-slate-200">{p.title}</p>
                      {p.tag && <Badge variant={p.tag==='Urgent'?'danger':'info'} size="sm">{p.tag}</Badge>}
                    </div>
                    <p className="text-[10px] text-slate-500">{p.duration} · {p.level}</p>
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
