'use client'
import { Topbar } from '@/components/layout/Topbar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Heart, MessageCircle, Share2, Send, Image as ImageIcon, Users, TrendingUp } from 'lucide-react'
import { useState } from 'react'

const POSTS = [
  {
    id: 1,
    author: 'Didier Deschamps',
    role: 'Sélectionneur',
    time: 'il y a 35 min',
    content: 'Séance tactique terminée. Le groupe est concentré, l\'ambiance est excellente. Demain c\'est le grand jour — France vs Croatie. On est prêts.',
    likes: 31,
    comments: 9,
    liked: false,
    tag: 'Staff',
  },
  {
    id: 2,
    author: 'Kylian Mbappé',
    role: 'Attaquant · #10',
    time: 'il y a 2h',
    content: 'Récupération complète ce matin, je me sens bien. La demi-finale contre la Croatie est notre objectif depuis le début de ce rassemblement. On va tout donner au Groupama Stadium. Allez les Bleus 🇫🇷',
    likes: 118,
    comments: 34,
    liked: true,
    tag: 'Joueur',
  },
  {
    id: 3,
    author: 'William Saliba',
    role: 'Défenseur · #17',
    time: 'il y a 4h',
    content: 'Belle séance collective ce matin. La défense est en place, on a bien travaillé les duels aériens. Modric ne passera pas.',
    likes: 47,
    comments: 12,
    liked: false,
    tag: 'Joueur',
  },
  {
    id: 4,
    author: 'Grégory Dupont',
    role: 'Responsable Performance',
    time: 'il y a 6h',
    content: 'Données GPS de la séance d\'hier : charge moyenne 89 UA, sprint max 34.2 km/h (Mbappé), distance couverte moyenne 10.4 km. Groupe en excellente condition physique avant la demi-finale.',
    likes: 22,
    comments: 5,
    liked: false,
    tag: 'Staff',
  },
  {
    id: 5,
    author: 'Antoine Griezmann',
    role: 'Milieu · #7',
    time: 'il y a 8h',
    content: 'Confidence totale dans ce groupe. On connaît la Croatie, on les a déjà affrontés en finale 2018. Cette fois on joue chez nous, en Ligue des Nations. Pas de surprise possible.',
    likes: 63,
    comments: 18,
    liked: false,
    tag: 'Joueur',
  },
]

const TOP_CONTRIBUTORS = [
  { name: 'Kylian Mbappé', role: 'Attaquant', posts: 12, likes: 847 },
  { name: 'Antoine Griezmann', role: 'Milieu', posts: 9, likes: 412 },
  { name: 'Didier Deschamps', role: 'Sélectionneur', posts: 7, likes: 318 },
  { name: 'William Saliba', role: 'Défenseur', posts: 5, likes: 201 },
  { name: 'Marcus Thuram', role: 'Attaquant', posts: 4, likes: 176 },
]

const tagColor = (tag: string) =>
  tag === 'Staff'
    ? 'text-blue-400 border-blue-400/20 bg-blue-500/[0.05]'
    : 'text-white/30 border-white/[0.06] bg-white/[0.02]'

export default function SocialPage() {
  const [posts, setPosts] = useState(POSTS)
  const [newPost, setNewPost] = useState('')

  const toggleLike = (id: number) => {
    setPosts(p =>
      p.map(post =>
        post.id === id
          ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
          : post
      )
    )
  }

  const handlePublish = () => {
    if (!newPost.trim()) return
    setPosts(prev => [
      {
        id: Date.now(),
        author: 'Didier Deschamps',
        role: 'Sélectionneur',
        time: 'à l\'instant',
        content: newPost,
        likes: 0,
        comments: 0,
        liked: false,
        tag: 'Staff',
      },
      ...prev,
    ])
    setNewPost('')
  }

  return (
    <div className="flex flex-col min-h-full bg-[#09090b]">
      <Topbar title="Réseau Social" subtitle="Communication interne · Équipe de France · LDN 2025" />
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Feed */}
          <div className="lg:col-span-2 space-y-4">

            {/* Composer */}
            <Card className="bg-[#111114] border border-white/[0.06]">
              <CardContent className="p-4">
                <div className="flex gap-3">
                  <Avatar name="Didier Deschamps" size="sm" />
                  <div className="flex-1">
                    <textarea
                      value={newPost}
                      onChange={e => setNewPost(e.target.value)}
                      placeholder="Partagez une actualité avec l'équipe..."
                      rows={3}
                      className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 text-sm text-white/80 placeholder-white/20 focus:outline-none focus:border-blue-500/20 resize-none transition-colors"
                    />
                    <div className="flex items-center justify-between mt-2">
                      <button className="flex items-center gap-1.5 text-xs text-white/30 hover:text-white/60 transition-colors cursor-pointer">
                        <ImageIcon className="w-3.5 h-3.5" />
                        Photo
                      </button>
                      <Button
                        size="sm"
                        onClick={handlePublish}
                        disabled={!newPost.trim()}
                        className="bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 text-blue-400 text-xs disabled:opacity-30"
                      >
                        <Send className="w-3 h-3 mr-1" />
                        Publier
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Posts */}
            {posts.map(post => (
              <Card key={post.id} className="bg-[#111114] border border-white/[0.06] hover:border-white/[0.09] transition-colors">
                <CardContent className="p-5">
                  <div className="flex items-start gap-3">
                    <Avatar name={post.author} size="md" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-semibold text-white/90">{post.author}</p>
                        <span className="text-[11px] text-white/30">{post.role}</span>
                        <span
                          className={`text-[10px] px-1.5 py-0.5 rounded border uppercase tracking-wider ml-auto ${tagColor(post.tag)}`}
                        >
                          {post.tag}
                        </span>
                      </div>
                      <p className="text-[11px] text-white/20 mt-0.5">{post.time}</p>
                      <p className="text-sm text-white/60 mt-3 leading-relaxed">{post.content}</p>
                      <div className="flex items-center gap-4 mt-4 pt-3 border-t border-white/[0.06]">
                        <button
                          onClick={() => toggleLike(post.id)}
                          className={`flex items-center gap-1.5 text-xs transition-colors cursor-pointer ${
                            post.liked ? 'text-red-400' : 'text-white/30 hover:text-red-400'
                          }`}
                        >
                          <Heart className={`w-3.5 h-3.5 ${post.liked ? 'fill-red-400' : ''}`} />
                          {post.likes}
                        </button>
                        <button className="flex items-center gap-1.5 text-xs text-white/30 hover:text-white/60 transition-colors cursor-pointer">
                          <MessageCircle className="w-3.5 h-3.5" />
                          {post.comments}
                        </button>
                        <button className="flex items-center gap-1.5 text-xs text-white/30 hover:text-white/60 transition-colors cursor-pointer ml-auto">
                          <Share2 className="w-3.5 h-3.5" />
                          Partager
                        </button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">

            {/* Stats strip */}
            <Card className="bg-[#111114] border border-white/[0.06]">
              <CardContent className="p-5">
                <p className="text-[11px] uppercase tracking-widest text-white/30 mb-4">Activité · 7 derniers jours</p>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: 'Publications', v: '47' },
                    { label: 'Réactions', v: '1.2K' },
                    { label: 'Membres actifs', v: '21' },
                  ].map(s => (
                    <div key={s.label} className="text-center">
                      <p className="text-2xl font-bold text-white/90">{s.v}</p>
                      <p className="text-[10px] text-white/30 mt-1">{s.label}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top contributors */}
            <Card className="bg-[#111114] border border-white/[0.06]">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-3.5 h-3.5 text-white/30" />
                  <p className="text-[11px] uppercase tracking-widest text-white/30">Top contributeurs</p>
                </div>
              </CardHeader>
              <CardContent className="space-y-1 pt-0">
                {TOP_CONTRIBUTORS.map((c, i) => (
                  <div
                    key={c.name}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/[0.03] transition-colors cursor-pointer"
                  >
                    <span className="text-[11px] text-white/20 font-bold w-4 text-center shrink-0">{i + 1}</span>
                    <div className="relative shrink-0">
                      <Avatar name={c.name} size="sm" />
                      <span className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-400 rounded-full border border-[#111114]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-white/80 truncate">{c.name}</p>
                      <p className="text-[10px] text-white/30 mt-0.5">{c.role}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs font-semibold text-white/60">{c.likes}</p>
                      <p className="text-[10px] text-white/20">likes</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Active members */}
            <Card className="bg-[#111114] border border-white/[0.06]">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-white/30" />
                    <p className="text-[11px] uppercase tracking-widest text-white/30">En ligne maintenant</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[11px] text-white/30">6</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-1 pt-0">
                {[
                  'Kylian Mbappé',
                  'Antoine Griezmann',
                  'Didier Deschamps',
                  'William Saliba',
                  'Marcus Thuram',
                  'Eduardo Camavinga',
                ].map(name => (
                  <div
                    key={name}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/[0.03] transition-colors cursor-pointer"
                  >
                    <div className="relative shrink-0">
                      <Avatar name={name} size="sm" />
                      <span className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-400 rounded-full border border-[#111114]" />
                    </div>
                    <p className="text-xs text-white/60">{name}</p>
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
