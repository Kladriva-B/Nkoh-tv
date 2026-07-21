import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Tableau de bord - Nkoh',
  description: 'Tableau de bord Nkoh',
}

export default function DashboardPage() {
  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="rounded-lg bg-gradient-to-r from-blue-600 to-blue-800 p-8 text-white">
          <h1 className="text-4xl font-bold mb-2">Bienvenue sur Nkoh</h1>
          <p className="text-blue-100">Votre plateforme de streaming radio et télévision camerounaise</p>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/radio">
            <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 hover:border-blue-500 transition-colors cursor-pointer">
              <div className="text-4xl mb-3">📻</div>
              <h2 className="text-xl font-semibold text-white mb-2">Radio</h2>
              <p className="text-slate-400">Écoutez les stations en direct et les replays</p>
            </div>
          </Link>

          <Link href="/tv">
            <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 hover:border-blue-500 transition-colors cursor-pointer">
              <div className="text-4xl mb-3">📺</div>
              <h2 className="text-xl font-semibold text-white mb-2">Télévision</h2>
              <p className="text-slate-400">Regardez la TV en direct et vos émissions en replay</p>
            </div>
          </Link>

          <Link href="/press">
            <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 hover:border-blue-500 transition-colors cursor-pointer">
              <div className="text-4xl mb-3">📰</div>
              <h2 className="text-xl font-semibold text-white mb-2">Presse</h2>
              <p className="text-slate-400">Consultez les dernières actualités et dépêches</p>
            </div>
          </Link>
        </div>

        {/* Featured Content */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Contenu vedette</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-900 rounded-lg overflow-hidden border border-slate-800 hover:border-blue-500 transition-colors">
              <div className="h-48 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                <span className="text-6xl">📻</span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-white mb-1">Station radio en direct</h3>
                <p className="text-sm text-slate-400">En direct maintenant</p>
              </div>
            </div>

            <div className="bg-slate-900 rounded-lg overflow-hidden border border-slate-800 hover:border-blue-500 transition-colors">
              <div className="h-48 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                <span className="text-6xl">📺</span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-white mb-1">Émission TV populaire</h3>
                <p className="text-sm text-slate-400">À regarder maintenant</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
