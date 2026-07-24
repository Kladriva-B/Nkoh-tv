'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Page() {
  const { data: session } = useSession()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Navigation */}
      <nav className="border-b border-slate-800 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
              N
            </div>
            <span className="text-xl font-bold text-white">Nkoh</span>
          </div>
          <div className="flex items-center gap-4">
            {session ? (
              <>
                <span className="text-sm text-slate-300">{session.user?.email}</span>
                <Link href="/dashboard">
                  <Button className="bg-blue-600 hover:bg-blue-700">Aller au tableau de bord</Button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/signin">
                  <Button variant="ghost" className="text-slate-300 hover:text-white">Se connecter</Button>
                </Link>
                <Link href="/signup">
                  <Button className="bg-blue-600 hover:bg-blue-700">S&apos;inscrire</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 text-balance">
              Streaming Radio et TV du Cameroun
            </h1>
            <p className="text-xl text-slate-400 mb-8 text-balance">
              Écoutez vos radios préférées, regardez la télévision en direct, et découvrez l&apos;actualité camerounaise en un seul endroit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/radio">
                <Button className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6">
                  Écouter les radios
                </Button>
              </Link>
              <Link href="/tv">
                <Button className="bg-slate-800 hover:bg-slate-700 text-lg px-8 py-6">
                  Regarder la TV
                </Button>
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-8 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl mb-3">📻</div>
                <h3 className="text-white font-semibold">Radio</h3>
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-8 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl mb-3">📺</div>
                <h3 className="text-white font-semibold">Télévision</h3>
              </div>
            </div>
            <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-lg p-8 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl mb-3">📰</div>
                <h3 className="text-white font-semibold">Presse</h3>
              </div>
            </div>
            <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg p-8 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl mb-3">🎛️</div>
                <h3 className="text-white font-semibold">Premium</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-800">
        <h2 className="text-4xl font-bold text-white mb-12 text-center">Pourquoi choisir Nkoh?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-8 hover:border-blue-500 transition-colors">
            <div className="text-3xl mb-4">🔴</div>
            <h3 className="text-xl font-semibold text-white mb-3">Streaming en direct</h3>
            <p className="text-slate-400">
              Accédez au contenu radio et TV en direct avec une qualité optimale et sans interruption.
            </p>
          </div>
          <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-8 hover:border-blue-500 transition-colors">
            <div className="text-3xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-white mb-3">Contenu premium</h3>
            <p className="text-slate-400">
              Débloquez des émissions exclusives, des replays et du contenu premium avec votre abonnement.
            </p>
          </div>
          <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-8 hover:border-blue-500 transition-colors">
            <div className="text-3xl mb-4">📱</div>
            <h3 className="text-xl font-semibold text-white mb-3">Multi-appareil</h3>
            <p className="text-slate-400">
              Regardez ou écoutez sur n&apos;importe quel appareil. Continuez où vous avez laissé.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-blue-500 mb-2">15+</div>
            <p className="text-slate-400">Stations radio</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-blue-500 mb-2">8+</div>
            <p className="text-slate-400">Chaînes TV</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-blue-500 mb-2">1000+</div>
            <p className="text-slate-400">Articles d&apos;actualités</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-blue-500 mb-2">24/7</div>
            <p className="text-slate-400">Service disponible</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-800">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Prêt à explorer Nkoh?</h2>
          <p className="text-blue-100 mb-8 text-lg">
            Commencez maintenant et accédez à tous vos contenus préférés du Cameroun
          </p>
          {!session ? (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button className="bg-white text-blue-600 hover:bg-slate-100 text-lg px-8 py-3">
                  Créer un compte gratuit
                </Button>
              </Link>
              <Link href="/radio">
                <Button className="border border-white text-white hover:bg-blue-700 text-lg px-8 py-3">
                  Continuer sans inscription
                </Button>
              </Link>
            </div>
          ) : (
            <Link href="/dashboard">
              <Button className="bg-white text-blue-600 hover:bg-slate-100 text-lg px-8 py-3">
                Accéder à votre tableau de bord
              </Button>
            </Link>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900/50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-white font-semibold mb-4">Nkoh</h4>
              <p className="text-slate-400 text-sm">Le meilleur streaming camerounais en un endroit.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Navigation</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><Link href="/radio" className="hover:text-white">Radio</Link></li>
                <li><Link href="/tv" className="hover:text-white">Télévision</Link></li>
                <li><Link href="/press" className="hover:text-white">Presse</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Compte</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><Link href="/signin" className="hover:text-white">Se connecter</Link></li>
                <li><Link href="/signup" className="hover:text-white">S&apos;inscrire</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>contact@nkoh.cm</li>
                <li>+237 XXX XXX XXX</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-slate-500 text-sm">
            <p>&copy; 2026 Nkoh. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
