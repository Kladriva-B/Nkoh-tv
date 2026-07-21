'use client'

import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'

const navItems = [
  { href: '/dashboard', label: 'Accueil', icon: '🏠' },
  { href: '/radio', label: 'Radio', icon: '📻' },
  { href: '/tv', label: 'TV', icon: '📺' },
  { href: '/press', label: 'Presse', icon: '📰' },
]

export function Navbar() {
  const { data: session } = useSession()
  const pathname = usePathname()

  return (
    <nav className="bg-slate-900 border-b border-slate-800 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="text-2xl font-bold text-blue-500">Nkoh</div>
          </Link>

          <div className="flex items-center gap-8">
            <div className="hidden md:flex gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    pathname.startsWith(item.href)
                      ? 'bg-slate-800 text-blue-400'
                      : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </div>

            {session?.user && (
              <div className="flex items-center gap-4">
                <div className="text-sm text-slate-300">
                  {session.user.name || session.user.email}
                </div>
                <Button
                  onClick={() => signOut({ redirect: true, callbackUrl: '/signin' })}
                  variant="outline"
                  size="sm"
                  className="text-slate-300 border-slate-600 hover:bg-slate-800"
                >
                  Déconnexion
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
