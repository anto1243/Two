'use client'
import { Topbar } from '@/components/layout/Topbar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CreditCard, Check, Zap, Shield, Crown, ArrowRight } from 'lucide-react'

const PLANS = [
  {
    name:'Starter',icon:Zap,price:49,desc:'Idéal pour les petits clubs amateurs',color:'slate',
    features:['Jusqu\'à 30 joueurs','Hub Organisationnel','Planning basique','Support email'],
    notIncluded:['Coach IA','Analyse Vidéo','Gamification avancée','Analytics premium'],
    current:false,
  },
  {
    name:'Pro',icon:Shield,price:149,desc:'Pour les clubs semi-professionnels',color:'sky',
    features:['Jusqu\'à 80 joueurs','Tous les modules','Coach IA','Analyse Vidéo IA','Gamification complète','Suivi Santé avancé','Support prioritaire'],
    notIncluded:[],
    current:true,
  },
  {
    name:'Elite',icon:Crown,price:349,desc:'Pour les clubs professionnels',color:'amber',
    features:['Joueurs illimités','Tout Pro inclus','Multi-équipes','API dédiée','Manager dédié','SLA 99.9%','Onboarding sur site'],
    notIncluded:[],
    current:false,
  },
]

const INVOICES = [
  {date:'1 Juin 2025',amount:149,status:'paid',desc:'Plan Pro · Juin 2025'},
  {date:'1 Mai 2025',amount:149,status:'paid',desc:'Plan Pro · Mai 2025'},
  {date:'1 Avr 2025',amount:149,status:'paid',desc:'Plan Pro · Avril 2025'},
]

export default function BillingPage() {
  return (
    <div className="flex flex-col min-h-full">
      <Topbar title="Facturation" subtitle="Gestion de votre abonnement KLoub"/>
      <div className="p-6 space-y-6">

        <div className="p-4 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-sky-400"/>
            <div>
              <p className="text-sm font-semibold text-slate-200">Plan Pro actif — FC Olympique Paris</p>
              <p className="text-xs text-slate-500">Renouvellement le 1 Juillet 2025 · 149€/mois</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm">Gérer</Button>
            <Button size="sm">Mettre à niveau <ArrowRight className="w-3.5 h-3.5"/></Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {PLANS.map(plan=>(
            <Card key={plan.name} className={plan.current?'border-sky-500/50 relative overflow-hidden':''} glow={plan.current}>
              {plan.current && (
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-sky-500 to-cyan-400"/>
              )}
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <plan.icon className={`w-5 h-5 ${plan.color==='sky'?'text-sky-400':plan.color==='amber'?'text-amber-400':'text-slate-400'}`}/>
                  <span className="text-base font-bold text-slate-200">{plan.name}</span>
                  {plan.current && <Badge variant="info" size="sm">Actuel</Badge>}
                </div>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-slate-100">{plan.price}€</span>
                  <span className="text-sm text-slate-500">/mois</span>
                </div>
                <p className="text-xs text-slate-500 mb-6">{plan.desc}</p>
                <div className="space-y-2 mb-6">
                  {plan.features.map(f=>(
                    <div key={f} className="flex items-center gap-2 text-xs text-slate-300">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0"/>{f}
                    </div>
                  ))}
                  {plan.notIncluded.map(f=>(
                    <div key={f} className="flex items-center gap-2 text-xs text-slate-600 line-through">
                      <Check className="w-3.5 h-3.5 text-slate-700 shrink-0"/>{f}
                    </div>
                  ))}
                </div>
                <Button variant={plan.current?'secondary':'primary'} className="w-full" disabled={plan.current}>
                  {plan.current?'Plan actuel':'Choisir ce plan'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader><CardTitle>Facturation</CardTitle></CardHeader>
            <CardContent className="p-0">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#1E2D4A]">
                    {['Date','Description','Montant','Statut',''].map(h=>(
                      <th key={h} className="px-4 py-3 text-left text-xs text-slate-500 font-medium">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {INVOICES.map(inv=>(
                    <tr key={inv.date} className="border-b border-[#1E2D4A]/50">
                      <td className="px-4 py-3 text-xs text-slate-400">{inv.date}</td>
                      <td className="px-4 py-3 text-xs text-slate-300">{inv.desc}</td>
                      <td className="px-4 py-3 text-xs font-semibold text-slate-200">{inv.amount}€</td>
                      <td className="px-4 py-3"><Badge variant="success" size="sm">Payé</Badge></td>
                      <td className="px-4 py-3"><Button variant="ghost" size="sm">PDF</Button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Moyen de paiement</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-slate-700 to-slate-800 border border-slate-600">
                <CreditCard className="w-8 h-8 text-slate-400"/>
                <div>
                  <p className="text-sm font-semibold text-slate-200">Visa •••• 4242</p>
                  <p className="text-xs text-slate-500">Expire 12/2027</p>
                </div>
                <Badge variant="success" className="ml-auto">Principale</Badge>
              </div>
              <Button variant="secondary" className="w-full"><CreditCard className="w-4 h-4"/>Ajouter une carte</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
