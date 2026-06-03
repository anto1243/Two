'use client'
import { Topbar } from '@/components/layout/Topbar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { CreditCard, Users, HardDrive, Zap, CheckCircle, ArrowUpRight } from 'lucide-react'

const usageStats = [
  { label: 'Membres actifs', value: 23, max: 25, display: '23 / 25', icon: Users },
  { label: 'Stockage utilisé', value: 58, max: 100, display: '142 GB / 250 GB', icon: HardDrive },
  { label: 'Appels API', value: 71, max: 100, display: '14 200 / 20 000', icon: Zap },
]

const invoices = [
  { month: 'Novembre 2024', amount: '€299.00', status: 'Payé', date: '01 Nov 2024' },
  { month: 'Octobre 2024', amount: '€299.00', status: 'Payé', date: '01 Oct 2024' },
  { month: 'Septembre 2024', amount: '€299.00', status: 'Payé', date: '01 Sep 2024' },
  { month: 'Août 2024', amount: '€299.00', status: 'Payé', date: '01 Août 2024' },
  { month: 'Juillet 2024', amount: '€299.00', status: 'Payé', date: '01 Juil 2024' },
  { month: 'Juin 2024', amount: '€299.00', status: 'Payé', date: '01 Juin 2024' },
]

const enterpriseFeatures = [
  'Membres illimités',
  'Stockage 2 TB',
  'API calls illimitées',
  'Support dédié 24/7',
  'Intégrations sur mesure',
  'SLA garanti 99.99%',
]

export default function BillingPage() {
  return (
    <div className="min-h-screen bg-[#09090b]">
      <Topbar title="Facturation" subtitle="Abonnement, usage et historique" />

      <div className="px-8 py-8 space-y-8 max-w-5xl mx-auto">

        {/* Current plan */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          <Card className="lg:col-span-3 bg-[#111114] border-white/[0.06]">
            <CardHeader className="pb-4">
              <CardTitle className="text-[11px] uppercase tracking-widest text-white/30 font-normal">
                Plan actuel
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h2 className="text-3xl font-bold text-white/90">Elite</h2>
                    <Badge className="text-[10px] bg-blue-500/10 text-blue-400 border-blue-500/20">Actif</Badge>
                  </div>
                  <p className="text-white/40 text-sm mb-4">Renouvellement le 1 décembre 2024</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-white/90">€299</span>
                    <span className="text-white/40 text-sm">/ mois</span>
                  </div>
                </div>
                <div className="text-right">
                  <CreditCard className="w-8 h-8 text-white/15 mb-2 ml-auto" />
                  <p className="text-[11px] text-white/30">Visa •••• 4242</p>
                  <button className="text-[11px] text-blue-400 hover:text-blue-300 mt-1 transition-colors cursor-pointer">
                    Changer
                  </button>
                </div>
              </div>
              <div className="mt-6 flex gap-3">
                <Button variant="outline" className="text-xs border-white/[0.08] text-white/50 hover:text-white/80 hover:border-white/15">
                  Gérer l'abonnement
                </Button>
                <Button variant="outline" className="text-xs border-white/[0.08] text-white/50 hover:text-white/80 hover:border-white/15">
                  Télécharger facture
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Usage summary */}
          <Card className="lg:col-span-2 bg-[#111114] border-white/[0.06]">
            <CardHeader className="pb-4">
              <CardTitle className="text-[11px] uppercase tracking-widest text-white/30 font-normal">
                Usage ce mois
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              {usageStats.map(({ label, value, display, icon: Icon }) => (
                <div key={label}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Icon className="w-3.5 h-3.5 text-white/25" />
                      <span className="text-[12px] text-white/50">{label}</span>
                    </div>
                    <span className="text-[12px] text-white/60 font-medium">{display}</span>
                  </div>
                  <div className="h-[3px] w-full bg-white/[0.06] rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${value > 80 ? 'bg-amber-500' : 'bg-blue-500'}`}
                      style={{ width: `${value}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Invoice history */}
        <Card className="bg-[#111114] border-white/[0.06]">
          <CardHeader className="pb-4">
            <CardTitle className="text-[11px] uppercase tracking-widest text-white/30 font-normal">
              Historique des factures
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-0">
              {invoices.map((inv, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-3 border-b border-white/[0.04] last:border-0"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-sm text-white/80 font-medium">{inv.month}</p>
                      <p className="text-[11px] text-white/30">{inv.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge className="text-[10px] bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                      {inv.status}
                    </Badge>
                    <span className="text-sm font-semibold text-white/80 w-20 text-right">{inv.amount}</span>
                    <button className="text-white/25 hover:text-white/60 transition-colors cursor-pointer">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Enterprise upgrade */}
        <Card className="bg-[#111114] border-blue-500/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/[0.04] rounded-full -translate-y-32 translate-x-32 blur-3xl" />
          <CardContent className="pt-7 pb-7">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
              <div>
                <p className="text-[11px] uppercase tracking-widest text-blue-400/70 mb-3">Passer au niveau supérieur</p>
                <h3 className="text-2xl font-bold text-white/90 mb-2">Plan Enterprise</h3>
                <p className="text-sm text-white/40 leading-relaxed mb-6">
                  Pour les fédérations et clubs professionnels nécessitant une infrastructure sans compromis,
                  un accès illimité et un accompagnement dédié.
                </p>
                <div className="flex items-baseline gap-1.5 mb-6">
                  <span className="text-3xl font-bold text-white/90">Sur devis</span>
                </div>
                <Button className="bg-blue-500/15 text-blue-400 border border-blue-500/25 hover:bg-blue-500/25 text-sm">
                  Contacter l'équipe commerciale
                </Button>
              </div>
              <div className="space-y-2.5">
                <p className="text-[11px] uppercase tracking-widest text-white/30 mb-3">Inclus dans Enterprise</p>
                {enterpriseFeatures.map((feature) => (
                  <div key={feature} className="flex items-center gap-2.5">
                    <CheckCircle className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span className="text-sm text-white/60">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}
