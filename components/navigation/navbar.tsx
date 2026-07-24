'use client'

import { signOut } from 'next-auth/react'
import type { Session } from 'next-auth'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'

const navItems = [
  { href: '/dashboard', label: 'Accueil', icon: '🏠' },
  { href: '/radio', label: 'Radio', icon: '📻' },
  { href: '/tv', label: 'TV', icon: '📺' },
  { href: '/press', label: 'Presse', icon: '📰' },
]

interface NavbarProps {
  session?: Session | null
}

export function Navbar({ session }: NavbarProps) {
  const pathname = usePathname()

  return (
    <nav className="bg-slate-900 border-b border-slate-800 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                N
              </div>
              <div className="text-2xl font-bold text-blue-500">Nkoh</div>
            </Link>

            <Link 
              href="/" 
              className="text-slate-300 hover:text-white text-sm font-medium transition-colors flex items-center gap-1"
            >
              ← Accueil
            </Link>
          </div>

          <div className="flex items-center gap-8">
            <div className="hidden md:flex gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    pathname.startsWith(item.href.split('/')[1])
                      ? 'bg-slate-800 text-blue-400'
                      : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-4">
              {session?.user ? (
                <>
                  <div className="text-sm text-slate-300">
                    {session.user.name || session.user.email}
                  </div>
                  <Button
                    onClick={() => signOut({ redirect: true, callbackUrl: '/' })}
                    variant="outline"
                    size="sm"
                    className="text-slate-300 border-slate-600 hover:bg-slate-800"
                  >
                    Déconnexion
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/signin">
                    <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white">
                      Se connecter
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      S&apos;inscrire
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
