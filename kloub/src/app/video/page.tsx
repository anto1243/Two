'use client'
import { Topbar } from '@/components/layout/Topbar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Video, Upload, Play, Clock, Zap, Film, ChevronRight, Eye } from 'lucide-react'
import { useState } from 'react'

const VIDEOS = [
  {id:1,title:'FC Olympique vs AS Monaco',date:'1 Juin 2025',duration:'94:12',status:'analyzed',views:18,tags:['Ligue 1','Domicile'],thumbnail:'bg-gradient-to-br from-sky-900 to-slate-900'},
  {id:2,title:'Séance Tactique — 28 Mai',date:'28 Mai 2025',duration:'45:33',status:'analyzed',views:24,tags:['Entraînement'],thumbnail:'bg-gradient-to-br from-violet-900 to-slate-900'},
  {id:3,title:'FC Olympique vs OGC Nice',date:'24 Mai 2025',duration:'92:05',status:'processing',views:0,tags:['Ligue 1','Extérieur'],thumbnail:'bg-gradient-to-br from-emerald-900 to-slate-900'},
  {id:4,title:'Corner routines — 20 Mai',date:'20 Mai 2025',duration:'22:10',status:'analyzed',views:31,tags:['Tactique'],thumbnail:'bg-gradient-to-br from-amber-900 to-slate-900'},
]

const HIGHLIGHTS = [
  {time:'12:34',label:'But de K. Mbappé',type:'goal',player:'Kylian Mbappé'},
  {time:'27:19',label:'Occasion manquée',type:'chance',player:'A. Griezmann'},
  {time:'45:02',label:'Bonne transition défensive',type:'defensive',player:'R. Varane'},
  {time:'67:44',label:'But de K. Mbappé (doublé)',type:'goal',player:'Kylian Mbappé'},
  {time:'78:11',label:'Pressing haut efficace',type:'tactical',player:'Équipe'},
  {time:'89:55',label:'Erreur de relance',type:'error',player:'H. Lloris'},
]

const typeColor = (t: string) => t==='goal'?'success':t==='chance'?'warning':t==='error'?'danger':'info'
const typeBg = (t: string) => t==='goal'?'bg-emerald-500':t==='chance'?'bg-amber-500':t==='error'?'bg-red-500':'bg-sky-500'

export default function VideoPage() {
  const [selected, setSelected] = useState(VIDEOS[0])
  return (
    <div className="flex flex-col min-h-full">
      <Topbar title="Analyse Vidéo IA" subtitle="Analyse automatique des matchs et séances"/>
      <div className="p-6 space-y-6">

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {label:'Vidéos analysées',value:'42',icon:Video,color:'text-sky-400',bg:'bg-sky-500/10'},
            {label:'Heures analysées',value:'186h',icon:Clock,color:'text-violet-400',bg:'bg-violet-500/10'},
            {label:'Actions détectées',value:'3,420',icon:Zap,color:'text-amber-400',bg:'bg-amber-500/10'},
            {label:'Séquences partagées',value:'128',icon:Film,color:'text-emerald-400',bg:'bg-emerald-500/10'},
          ].map(k=>(
            <Card key={k.label} hover>
              <CardContent className="p-4">
                <div className={`w-9 h-9 rounded-xl ${k.bg} flex items-center justify-center mb-3`}>
                  <k.icon className={`w-4 h-4 ${k.color}`}/>
                </div>
                <p className="text-xl font-bold text-slate-100">{k.value}</p>
                <p className="text-xs text-slate-500">{k.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardContent className="p-4">
                <div className={`relative w-full aspect-video rounded-xl overflow-hidden ${selected.thumbnail} flex items-center justify-center cursor-pointer group`}>
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"/>
                  <div className="relative w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/30 group-hover:scale-110 transition-transform">
                    <Play className="w-7 h-7 text-white ml-1"/>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                    <div>
                      <p className="text-sm font-bold text-white">{selected.title}</p>
                      <p className="text-xs text-white/70">{selected.date} · {selected.duration}</p>
                    </div>
                    {selected.status==='processing' && (
                      <Badge variant="warning" className="animate-pulse">Analyse en cours...</Badge>
                    )}
                    {selected.status==='analyzed' && (
                      <Badge variant="success">Analysé par IA</Badge>
                    )}
                  </div>
                  <div className="absolute top-4 left-4 right-4 flex gap-1">
                    {[0,1,2,3].map(s=>(
                      <div key={s} className="flex-1 h-0.5 bg-white/60 rounded-full"/>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {selected.status==='analyzed' && (
              <Card>
                <CardHeader><CardTitle>Timeline intelligente — {selected.title}</CardTitle></CardHeader>
                <CardContent className="space-y-2">
                  <div className="relative w-full h-2 bg-[#1E2D4A] rounded-full mb-6">
                    {HIGHLIGHTS.map((h,i)=>{
                      const [min,sec] = h.time.split(':').map(Number)
                      const totalMin = 94
                      const pct = ((min + sec/60) / totalMin * 100)
                      return (
                        <div key={i} className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full ${typeBg(h.type)} cursor-pointer hover:scale-150 transition-transform`} style={{left:`${pct}%`}} title={h.label}/>
                      )
                    })}
                  </div>
                  {HIGHLIGHTS.map((h,i)=>(
                    <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-[#1E2D4A] transition-colors cursor-pointer">
                      <span className="text-xs font-mono text-slate-500 w-12 shrink-0">{h.time}</span>
                      <div className={`w-2 h-2 rounded-full ${typeBg(h.type)} shrink-0`}/>
                      <div className="flex-1">
                        <p className="text-xs font-medium text-slate-200">{h.label}</p>
                        <p className="text-[10px] text-slate-500">{h.player}</p>
                      </div>
                      <Badge variant={typeColor(h.type) as 'success'|'warning'|'danger'|'info'} size="sm">{h.type}</Badge>
                      <Button variant="ghost" size="sm" className="shrink-0"><Play className="w-3 h-3"/></Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>

          <div className="space-y-4">
            <Button className="w-full"><Upload className="w-4 h-4"/>Importer une vidéo</Button>

            <Card>
              <CardHeader><CardTitle>Vidéothèque</CardTitle></CardHeader>
              <CardContent className="space-y-3 p-4">
                {VIDEOS.map(v=>(
                  <div key={v.id} onClick={()=>setSelected(v)} className={`p-3 rounded-lg cursor-pointer transition-all border ${selected.id===v.id?'border-sky-500/50 bg-sky-500/5':'border-[#2A3A5A] hover:border-sky-500/20 hover:bg-[#1E2D4A]'}`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg ${v.thumbnail} flex items-center justify-center shrink-0`}>
                        <Film className="w-4 h-4 text-white/70"/>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-slate-200 truncate">{v.title}</p>
                        <p className="text-[10px] text-slate-500">{v.date} · {v.duration}</p>
                      </div>
                      {v.status==='processing'?<Zap className="w-3.5 h-3.5 text-amber-400 animate-pulse shrink-0"/>:<Eye className="w-3.5 h-3.5 text-slate-500 shrink-0"/>}
                    </div>
                    <div className="flex gap-1 mt-2">
                      {v.tags.map(t=><Badge key={t} variant="outline" size="sm">{t}</Badge>)}
                    </div>
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
