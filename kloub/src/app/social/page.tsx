'use client'
import { Topbar } from '@/components/layout/Topbar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar } from '@/components/ui/avatar'
import { Heart, MessageCircle, Share2, Plus, Send, Image as ImageIcon, Users } from 'lucide-react'
import { useState } from 'react'

const GROUPS = [
  {name:'Équipe Première',members:24,unread:3,color:'from-sky-500 to-cyan-400'},
  {name:'U21',members:20,unread:0,color:'from-violet-500 to-purple-400'},
  {name:'Staff Technique',members:8,unread:1,color:'from-emerald-500 to-teal-400'},
  {name:'Médical',members:5,unread:0,color:'from-amber-500 to-orange-400'},
]

const POSTS = [
  {id:1,author:'Thomas Müller',role:'Entraîneur',time:'il y a 2h',content:'Grande séance ce matin ! Intensité au top, l\'équipe est prête pour samedi. Continuez comme ça les gars 💪',likes:18,comments:7,liked:false},
  {id:2,author:'Kylian Mbappé',role:'Attaquant',time:'il y a 4h',content:'Retour sur le terrain après quelques jours de repos. Objectif : être à 100% pour Monaco. Hâte d\'y être !',likes:47,comments:12,liked:true},
  {id:3,author:'Hugo Lloris',role:'Gardien · Capitaine',time:'il y a 6h',content:'Victoire 3-1 hier, belle prestation collective. Mention spéciale à notre défense qui n\'a laissé passer qu\'un seul tir cadré.',likes:31,comments:9,liked:false},
]

export default function SocialPage() {
  const [posts, setPosts] = useState(POSTS)
  const [newPost, setNewPost] = useState('')

  const toggleLike = (id: number) => {
    setPosts(p=>p.map(post=>post.id===id?{...post,liked:!post.liked,likes:post.liked?post.likes-1:post.likes+1}:post))
  }

  return (
    <div className="flex flex-col min-h-full">
      <Topbar title="Réseau Social" subtitle="Communication interne du club"/>
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex gap-3">
                  <Avatar name="Antoine Dupont" size="sm" className="shrink-0"/>
                  <div className="flex-1">
                    <textarea
                      value={newPost}
                      onChange={e=>setNewPost(e.target.value)}
                      placeholder="Partagez une actualité avec l'équipe..."
                      rows={3}
                      className="w-full bg-[#1E2D4A] border border-[#2A3A5A] rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500/50 resize-none"
                    />
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm"><ImageIcon className="w-4 h-4"/>Photo</Button>
                      </div>
                      <Button size="sm" disabled={!newPost.trim()}>
                        <Send className="w-3.5 h-3.5"/>Publier
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {posts.map(post=>(
              <Card key={post.id} hover>
                <CardContent className="p-5">
                  <div className="flex items-start gap-3">
                    <Avatar name={post.author} size="md" className="shrink-0"/>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-slate-200">{post.author}</p>
                        <span className="text-xs text-slate-500">{post.role}</span>
                        <span className="text-xs text-slate-600 ml-auto">{post.time}</span>
                      </div>
                      <p className="text-sm text-slate-300 mt-2 leading-relaxed">{post.content}</p>
                      <div className="flex items-center gap-4 mt-4 pt-3 border-t border-[#1E2D4A]">
                        <button onClick={()=>toggleLike(post.id)} className={`flex items-center gap-1.5 text-xs cursor-pointer transition-colors ${post.liked?'text-red-400':'text-slate-500 hover:text-red-400'}`}>
                          <Heart className={`w-4 h-4 ${post.liked?'fill-red-400':''}`}/> {post.likes}
                        </button>
                        <button className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-sky-400 cursor-pointer transition-colors">
                          <MessageCircle className="w-4 h-4"/> {post.comments}
                        </button>
                        <button className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-emerald-400 cursor-pointer transition-colors ml-auto">
                          <Share2 className="w-4 h-4"/> Partager
                        </button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Groupes</CardTitle>
                <Button variant="ghost" size="icon"><Plus className="w-4 h-4"/></Button>
              </CardHeader>
              <CardContent className="space-y-2 p-4">
                {GROUPS.map(g=>(
                  <div key={g.name} className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#1E2D4A] transition-colors cursor-pointer">
                    <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${g.color} flex items-center justify-center shrink-0`}>
                      <Users className="w-4 h-4 text-white"/>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-200 truncate">{g.name}</p>
                      <p className="text-xs text-slate-500">{g.members} membres</p>
                    </div>
                    {g.unread>0 && <span className="w-5 h-5 rounded-full bg-sky-500 text-white text-[10px] font-bold flex items-center justify-center">{g.unread}</span>}
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Membres actifs</CardTitle></CardHeader>
              <CardContent className="space-y-2 p-4">
                {['Kylian Mbappé','Hugo Lloris','Thomas Müller','Raphaël Varane','Antoine Griezmann'].map(name=>(
                  <div key={name} className="flex items-center gap-3 cursor-pointer hover:bg-[#1E2D4A] p-2 rounded-lg transition-colors">
                    <div className="relative">
                      <Avatar name={name} size="sm"/>
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#060B18]"/>
                    </div>
                    <p className="text-xs font-medium text-slate-300">{name}</p>
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
