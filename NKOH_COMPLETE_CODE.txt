# NKOH - Complete Codebase Analysis

## Project Overview
Nkoh is a full-stack Next.js 16 + React 19 streaming platform for Cameroon's radio, TV, and press content.
Built with TypeScript, Tailwind CSS 4, NextAuth.js, and Prisma ORM.

---

## 1. CONFIGURATION FILES

### package.json
{
  "name": "my-project",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint ."
  },
  "dependencies": {
    "@base-ui/react": "^1.5.0",
    "@next-auth/prisma-adapter": "^1.0.7",
    "@radix-ui/react-dialog": "^1.1.21",
    "@vercel/analytics": "1.6.1",
    "axios": "^1.18.1",
    "bcryptjs": "^3.0.3",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "dash.js": "^4.0.0",
    "hls.js": "^1.6.16",
    "lucide-react": "^1.16.0",
    "next": "16.2.6",
    "next-auth": "^4.24.15",
    "react": "^19",
    "react-dom": "^19",
    "react-player": "^3.4.0",
    "shadcn": "^4.8.0",
    "tailwind-merge": "^3.3.1",
    "tw-animate-css": "^1.4.0",
    "zod": "^4.4.3"
  },
  "devDependencies": {
    "@prisma/client": "^6.19.3",
    "@tailwindcss/postcss": "^4.3.3",
    "@types/node": "^24",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "postcss": "^8.5",
    "prisma": "^6.19.3",
    "tailwindcss": "^4.3.3",
    "typescript": "5.7.3"
  },
  "pnpm": {
    "overrides": {
      "hono": "4.12.25"
    }
  }
}
### tsconfig.json
{
  "compilerOptions": {
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "allowJs": true,
    "target": "ES6",
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": [
        "./*"
      ]
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts",
    ".next/dev/types/**/*.ts"
  ],
  "exclude": [
    "node_modules"
  ]
}

### next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig

---

## 2. ROOT LAYOUT & PAGE

### app/layout.tsx
import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import Providers from '@/components/providers'
import './globals.css'

export const metadata: Metadata = {
  title: 'Nkoh - Radio TV Camerounaise',
  description: 'Streaming radio et télévision en direct depuis le Cameroun',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Providers>
          {children}
        </Providers>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

### app/page.tsx (Landing Page)
'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { SignInModal } from '@/components/auth/signin-modal'
import { SignUpModal } from '@/components/auth/signup-modal'

export default function Page() {
  const { data: session } = useSession()
  const searchParams = useSearchParams()
  const [signInOpen, setSignInOpen] = useState(false)
  const [signUpOpen, setSignUpOpen] = useState(false)

  useEffect(() => {
    if (searchParams.get('signin') === 'true') {
      setSignInOpen(true)
    }
    if (searchParams.get('signup') === 'true') {
      setSignUpOpen(true)
    }
  }, [searchParams])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Navigation */}
      <nav className="border-b border-slate-800 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
              N
            </div>
            <span className="text-xl font-bold text-white">Nkoh</span>
          </Link>
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
                <Button 
                  variant="ghost" 
                  onClick={() => setSignInOpen(true)}
                  className="text-slate-300 hover:text-white"
                >
                  Se connecter
                </Button>
                <Button 
                  onClick={() => setSignUpOpen(true)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  S&apos;inscrire
                </Button>
              </>
            )}
          </div>
        </div>
      </nav>

      <SignInModal open={signInOpen} onOpenChange={setSignInOpen} />
      <SignUpModal open={signUpOpen} onOpenChange={setSignUpOpen} />

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

---

## 3. AUTHENTICATION ROUTES & PAGES

### app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
import { authOptions } from '@/lib/auth-config';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

### app/api/auth/register/route.ts
import { NextRequest } from 'next/server';
import { z } from 'zod';
import { createUser, getUserByEmail } from '@/lib/auth';
import { errorResponse, createdResponse } from '@/lib/api-response';

const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  name: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, name } = registerSchema.parse(body);

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return errorResponse('User with this email already exists', 400);
    }

    const user = await createUser(email, password, name);

    return createdResponse(
      {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      'User registered successfully'
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return errorResponse(error.errors[0].message, 400);
    }
    return errorResponse('Failed to register user', 500);
  }
}

### app/(auth)/layout.tsx
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {children}
      </div>
    </div>
  )
}

### app/(auth)/signin/page.tsx
'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function SignInPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError(result.error)
      } else {
        router.push('/dashboard')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold text-white">Nkoh</h1>
        <p className="text-slate-400">Connexion à votre compte</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            {error}
          </div>
        )}

        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-slate-300">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="votre@email.com"
            className="w-full px-3 py-2 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            disabled={isLoading}
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium text-slate-300">
            Mot de passe
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full px-3 py-2 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            disabled={isLoading}
            required
          />
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          {isLoading ? 'Connexion...' : 'Se connecter'}
        </Button>
      </form>

      <div className="text-center text-sm text-slate-400">
        Pas encore de compte?{' '}
        <Link href="/signup" className="text-blue-400 hover:text-blue-300">
          Créer un compte
        </Link>
      </div>
    </div>
  )
}

### app/(auth)/signup/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function SignUpPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas')
      return
    }

    if (password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères')
      return
    }

    setIsLoading(true)

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Erreur lors de l\'inscription')
        return
      }

      router.push('/signin')
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold text-white">Nkoh</h1>
        <p className="text-slate-400">Créer un nouveau compte</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            {error}
          </div>
        )}

        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium text-slate-300">
            Nom complet
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Jean Dupont"
            className="w-full px-3 py-2 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            disabled={isLoading}
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-slate-300">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="votre@email.com"
            className="w-full px-3 py-2 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            disabled={isLoading}
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium text-slate-300">
            Mot de passe
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full px-3 py-2 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            disabled={isLoading}
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-300">
            Confirmer le mot de passe
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full px-3 py-2 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            disabled={isLoading}
            required
          />
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          {isLoading ? 'Inscription...' : 'S\'inscrire'}
        </Button>
      </form>

      <div className="text-center text-sm text-slate-400">
        Vous avez déjà un compte?{' '}
        <Link href="/signin" className="text-blue-400 hover:text-blue-300">
          Se connecter
        </Link>
      </div>
    </div>
  )
}

---

## 4. DASHBOARD ROUTES

### app/(dashboard)/layout.tsx
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth-config'
import { Navbar } from '@/components/navigation/navbar'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar session={session} />
      <main className="max-w-7xl mx-auto">
        {children}
      </main>
    </div>
  )
}

### app/(dashboard)/dashboard/page.tsx
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

### app/(dashboard)/radio/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { RadioPlayer } from '@/components/media/radio-player'
import { AuthModalProvider } from '@/components/auth/auth-modal-provider'

interface RadioStream {
  id: string
  title: string
  description: string
  streamUrl: string
  logo: string
  listeners: number
  isLive: boolean
}

export default function RadioPage() {
  const [streams, setStreams] = useState<RadioStream[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedStream, setSelectedStream] = useState<RadioStream | null>(null)

  useEffect(() => {
    const fetchStreams = async () => {
      try {
        const response = await fetch('/api/streams/radio')
        const data = await response.json()
        if (data.success && data.data) {
          setStreams(data.data)
          setSelectedStream(data.data[0])
        }
      } catch (error) {
        console.error('Erreur lors du chargement des radios:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStreams()
  }, [])

  if (loading) {
    return (
      <div className="py-8 px-4 sm:px-6 lg:px-8 flex items-center justify-center min-h-screen">
        <div className="text-white">Chargement...</div>
      </div>
    )
  }

  return (
    <>
      <AuthModalProvider />
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white mb-2">Radios</h1>
        <p className="text-slate-400 mb-8">Écoutez les stations radio camerounaises en direct</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Player */}
        <div className="lg:col-span-2">
          {selectedStream && (
            <RadioPlayer
              title={selectedStream.title}
              streamUrl={selectedStream.streamUrl}
              description={selectedStream.description}
            />
          )}
        </div>

        {/* Station List */}
        <div className="space-y-3">
          <h3 className="font-semibold text-white mb-4">Stations</h3>
          {streams.map((stream) => (
            <button
              key={stream.id}
              onClick={() => setSelectedStream(stream)}
              className={`w-full text-left p-4 rounded-lg border transition-all ${
                selectedStream?.id === stream.id
                  ? 'bg-blue-600/20 border-blue-500'
                  : 'bg-slate-900 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">{stream.logo}</span>
                {stream.isLive && (
                  <span className="text-xs bg-red-500 text-white px-2 py-1 rounded">EN DIRECT</span>
                )}
              </div>
              <h4 className="font-medium text-white text-sm">{stream.title}</h4>
              <p className="text-xs text-slate-400 truncate">{stream.description}</p>
              <p className="text-xs text-slate-500 mt-2">👥 {stream.listeners.toLocaleString()} auditeurs</p>
            </button>
          ))}
        </div>
      </div>
      </div>
      </>
  )
}

### app/(dashboard)/tv/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { VideoPlayer } from '@/components/media/video-player'
import { AuthModalProvider } from '@/components/auth/auth-modal-provider'

interface TVStream {
  id: string
  title: string
  description: string
  streamUrl: string
  thumbnail: string
  viewers: number
  isLive: boolean
  currentShow: string
}

export default function TVPage() {
  const [streams, setStreams] = useState<TVStream[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedStream, setSelectedStream] = useState<TVStream | null>(null)

  useEffect(() => {
    const fetchStreams = async () => {
      try {
        const response = await fetch('/api/streams/tv')
        const data = await response.json()
        if (data.success && data.data) {
          setStreams(data.data)
          setSelectedStream(data.data[0])
        }
      } catch (error) {
        console.error('Erreur lors du chargement des chaînes TV:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStreams()
  }, [])

  if (loading) {
    return (
      <div className="py-8 px-4 sm:px-6 lg:px-8 flex items-center justify-center min-h-screen">
        <div className="text-white">Chargement...</div>
      </div>
    )
  }

  return (
    <>
      <AuthModalProvider />
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white mb-2">Télévision</h1>
        <p className="text-slate-400 mb-8">Regardez les chaînes de télévision camerounaises en direct</p>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Player */}
        <div className="lg:col-span-3">
          {selectedStream && (
            <VideoPlayer
              title={selectedStream.title}
              streamUrl={selectedStream.streamUrl}
              description={selectedStream.description}
              currentShow={selectedStream.currentShow}
            />
          )}
        </div>

        {/* Channel List */}
        <div className="space-y-3">
          <h3 className="font-semibold text-white mb-4">Chaînes</h3>
          {streams.map((stream) => (
            <button
              key={stream.id}
              onClick={() => setSelectedStream(stream)}
              className={`w-full text-left p-4 rounded-lg border transition-all ${
                selectedStream?.id === stream.id
                  ? 'bg-blue-600/20 border-blue-500'
                  : 'bg-slate-900 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">{stream.thumbnail}</span>
                {stream.isLive && (
                  <span className="text-xs bg-red-600 text-white px-2 py-1 rounded">EN DIRECT</span>
                )}
              </div>
              <h4 className="font-medium text-white text-sm">{stream.title}</h4>
              <p className="text-xs text-slate-400 truncate">{stream.currentShow}</p>
              <p className="text-xs text-slate-500 mt-2">👥 {stream.viewers.toLocaleString()} spectateurs</p>
            </button>
          ))}
        </div>
      </div>
      </div>
      </>
  )
}

### app/(dashboard)/press/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { AuthModalProvider } from '@/components/auth/auth-modal-provider'

interface Article {
  id: string
  title: string
  excerpt: string
  thumbnail: string
  author: string
  category: string
  publishedAt: string
  views: number
  comments: number
}

export default function PressPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const url = selectedCategory
          ? `/api/articles?category=${selectedCategory}`
          : '/api/articles'
        const response = await fetch(url)
        const data = await response.json()
        if (data.success && data.data) {
          setArticles(data.data)
        }
      } catch (error) {
        console.error('Erreur lors du chargement des articles:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [selectedCategory])

  const categories = ['NEWS', 'SPORTS', 'CULTURE', 'TECH', 'ENVIRONMENT']

  const formatDate = (date: string) => {
    const now = new Date()
    const published = new Date(date)
    const diff = now.getTime() - published.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(hours / 24)

    if (hours < 1) return 'À l\'instant'
    if (hours < 24) return `Il y a ${hours}h`
    if (days < 7) return `Il y a ${days}j`
    return published.toLocaleDateString('fr-FR')
  }

  return (
    <>
      <AuthModalProvider />
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white mb-2">Presse</h1>
      <p className="text-slate-400 mb-8">Les dernières actualités du Cameroun et du monde</p>

      {/* Category Filter */}
      <div className="mb-8 flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedCategory === null
              ? 'bg-blue-600 text-white'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          Tous
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === cat
                ? 'bg-blue-600 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-white">Chargement...</div>
        </div>
      ) : articles.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-slate-400">Aucun article trouvé</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Article */}
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-lg overflow-hidden hover:border-blue-500 transition-colors">
            {articles[0] && (
              <>
                <div className="h-64 bg-gradient-to-br from-slate-800 to-slate-700 flex items-center justify-center text-6xl">
                  {articles[0].thumbnail}
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs bg-blue-600 text-white px-3 py-1 rounded-full">
                      {articles[0].category}
                    </span>
                    <span className="text-xs text-slate-500">{formatDate(articles[0].publishedAt)}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-3">{articles[0].title}</h2>
                  <p className="text-slate-300 mb-4">{articles[0].excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>Par {articles[0].author}</span>
                    <div className="flex gap-4">
                      <span>👁 {articles[0].views.toLocaleString()}</span>
                      <span>💬 {articles[0].comments}</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Sidebar Articles */}
          <div className="space-y-4">
            {articles.slice(1).map((article) => (
              <article
                key={article.id}
                className="bg-slate-900 border border-slate-800 rounded-lg p-4 hover:border-blue-500 transition-colors cursor-pointer"
              >
                <div className="flex gap-3">
                  <div className="w-16 h-16 bg-gradient-to-br from-slate-800 to-slate-700 rounded flex-shrink-0 flex items-center justify-center text-2xl">
                    {article.thumbnail}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
                        {article.category}
                      </span>
                    </div>
                    <h3 className="font-semibold text-white text-sm line-clamp-2 mb-1">{article.title}</h3>
                    <p className="text-xs text-slate-500">{formatDate(article.publishedAt)}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
      </div>
      </>
  )
}

---

## 5. ADMIN ROUTES

### app/(admin)/layout.tsx
import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth-config'
import { Navbar } from '@/components/navigation/navbar'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/signin')
  }

  // TODO: Check if user has admin role
  // if (session.user.role !== 'ADMIN') {
  //   redirect('/dashboard')
  // }

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />
      <main className="max-w-7xl mx-auto">
        {children}
      </main>
    </div>
  )
}

### app/(admin)/admin/page.tsx
'use client'

import { useEffect, useState } from 'react'

interface StreamStats {
  totalViewers: number
  activeStreams: number
  totalChannels: number
}

interface UserStats {
  totalUsers: number
  activeUsers: number
  newToday: number
}

export default function AdminDashboard() {
  const [streamStats, setStreamStats] = useState<StreamStats>({
    totalViewers: 0,
    activeStreams: 0,
    totalChannels: 0,
  })
  const [userStats, setUserStats] = useState<UserStats>({
    totalUsers: 0,
    activeUsers: 0,
    newToday: 0,
  })

  useEffect(() => {
    // Mock stats - will be replaced with real API calls
    setStreamStats({
      totalViewers: 12450,
      activeStreams: 8,
      totalChannels: 12,
    })
    setUserStats({
      totalUsers: 5420,
      activeUsers: 1856,
      newToday: 124,
    })
  }, [])

  const recentActivity = [
    { id: 1, type: 'STREAM_STARTED', title: 'NTV Radio - En direct', time: 'Il y a 5 min' },
    { id: 2, type: 'USER_JOINED', title: 'Nouvel utilisateur inscrit', time: 'Il y a 12 min' },
    { id: 3, type: 'STREAM_ENDED', title: 'CRTV TV - Fin de diffusion', time: 'Il y a 28 min' },
    { id: 4, type: 'ERROR_LOG', title: 'Erreur de connexion détectée', time: 'Il y a 45 min' },
  ]

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Tableau de bord Admin</h1>
        <p className="text-slate-400">Supervision et gestion de la plateforme Nkoh</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Viewers Stat */}
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-400 text-sm font-medium">Spectateurs en direct</h3>
            <span className="text-2xl">👁</span>
          </div>
          <div className="text-4xl font-bold text-white mb-2">
            {streamStats.totalViewers.toLocaleString()}
          </div>
          <p className="text-sm text-green-400">+12% par rapport à hier</p>
        </div>

        {/* Active Streams */}
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-400 text-sm font-medium">Flux actifs</h3>
            <span className="text-2xl">📡</span>
          </div>
          <div className="text-4xl font-bold text-white mb-2">
            {streamStats.activeStreams}
          </div>
          <p className="text-sm text-slate-400">sur {streamStats.totalChannels} chaînes</p>
        </div>

        {/* Active Users */}
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-400 text-sm font-medium">Utilisateurs actifs</h3>
            <span className="text-2xl">👥</span>
          </div>
          <div className="text-4xl font-bold text-white mb-2">
            {userStats.activeUsers.toLocaleString()}
          </div>
          <p className="text-sm text-slate-400">{userStats.newToday} nouveaux aujourd&apos;hui</p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Active Streams */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Flux actuellement actifs</h2>
            <div className="space-y-3">
              {[
                { name: 'NTV Radio', viewers: 1250, quality: '320kbps' },
                { name: 'CRTV TV', viewers: 3420, quality: '1080p' },
                { name: 'Vision 4', viewers: 2150, quality: '720p' },
                { name: 'Equinoxe Tv', viewers: 1890, quality: '480p' },
              ].map((stream, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border border-slate-700/50 hover:border-blue-500/50 transition-colors"
                >
                  <div>
                    <h4 className="font-medium text-white">{stream.name}</h4>
                    <p className="text-xs text-slate-400">{stream.quality}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-green-400">{stream.viewers.toLocaleString()}</p>
                    <p className="text-xs text-slate-400">spectateurs</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Server Status */}
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">État des serveurs</h2>
            <div className="space-y-3">
              {[
                { name: 'Serveur API', status: 'online', uptime: '99.8%' },
                { name: 'Streaming Principal', status: 'online', uptime: '99.9%' },
                { name: 'Base de données', status: 'online', uptime: '99.7%' },
                { name: 'Cache Redis', status: 'online', uptime: '100%' },
              ].map((server, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        server.status === 'online' ? 'bg-green-500' : 'bg-red-500'
                      }`}
                    />
                    <span className="text-white text-sm">{server.name}</span>
                  </div>
                  <span className="text-xs text-slate-400">{server.uptime}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Activité récente</h2>
          <div className="space-y-3">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="p-3 bg-slate-800/50 rounded-lg border border-slate-700/50 hover:border-slate-600/50 transition-colors"
              >
                <div className="flex gap-2 mb-1">
                  {activity.type === 'STREAM_STARTED' && <span>▶</span>}
                  {activity.type === 'STREAM_ENDED' && <span>■</span>}
                  {activity.type === 'USER_JOINED' && <span>+</span>}
                  {activity.type === 'ERROR_LOG' && <span>!</span>}
                </div>
                <p className="text-sm text-white font-medium">{activity.title}</p>
                <p className="text-xs text-slate-400 mt-1">{activity.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Spectateurs par heure</h2>
          <div className="h-64 bg-slate-800/50 rounded-lg flex items-center justify-center text-slate-400">
            [Graphique - Spectateurs par heure]
          </div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Distribution par chaîne</h2>
          <div className="h-64 bg-slate-800/50 rounded-lg flex items-center justify-center text-slate-400">
            [Graphique - Distribution des spectateurs]
          </div>
        </div>
      </div>
    </div>
  )
}

---

## 6. API ROUTES

### app/api/streams/radio/route.ts
import { NextRequest } from 'next/server'
import { successResponse } from '@/lib/api-response'

// Mock radio streams data - will be replaced with database queries
const MOCK_RADIO_STREAMS = [
  {
    id: 'radio-1',
    title: 'NTV Radio',
    description: 'Musique, actualités et divertissement 24/7',
    streamUrl: 'https://example.com/stream/ntv-radio.m3u8',
    logo: '📻',
    category: 'RADIO',
    listeners: 1250,
    isLive: true,
  },
  {
    id: 'radio-2',
    title: 'Radio CRTV',
    description: 'La voix du Cameroun',
    streamUrl: 'https://example.com/stream/crtv-radio.m3u8',
    logo: '📻',
    category: 'RADIO',
    listeners: 3420,
    isLive: true,
  },
  {
    id: 'radio-3',
    title: 'Akaré Radio',
    description: 'Musique camerounaise et variété',
    streamUrl: 'https://example.com/stream/akare-radio.m3u8',
    logo: '🎵',
    category: 'RADIO',
    listeners: 2150,
    isLive: true,
  },
  {
    id: 'radio-4',
    title: 'Vision 4 Radio',
    description: 'Actualités et débats',
    streamUrl: 'https://example.com/stream/vision4-radio.m3u8',
    logo: '📻',
    category: 'RADIO',
    listeners: 1890,
    isLive: true,
  },
]

export async function GET(request: NextRequest) {
  try {
    // TODO: Replace with database query when Neon is connected
    // const streams = await prisma.stream.findMany({
    //   where: {
    //     type: 'LIVE',
    //     channel: { category: 'RADIO' }
    //   }
    // })

    return successResponse(MOCK_RADIO_STREAMS)
  } catch (error) {
    return successResponse([])
  }
}

### app/api/streams/tv/route.ts
import { NextRequest } from 'next/server'
import { successResponse } from '@/lib/api-response'

// Mock TV streams data
const MOCK_TV_STREAMS = [
  {
    id: 'tv-1',
    title: 'NTV',
    description: 'Chaîne de télévision généraliste camerounaise',
    streamUrl: 'https://example.com/stream/ntv-tv.m3u8',
    thumbnail: '📺',
    category: 'TV',
    viewers: 4250,
    isLive: true,
    currentShow: 'Journal de 20h',
  },
  {
    id: 'tv-2',
    title: 'CRTV',
    description: 'Chaîne nationale du Cameroun',
    streamUrl: 'https://example.com/stream/crtv-tv.m3u8',
    thumbnail: '📺',
    category: 'TV',
    viewers: 5120,
    isLive: true,
    currentShow: 'Magazine du jour',
  },
  {
    id: 'tv-3',
    title: 'Vision 4 Tv',
    description: 'Actualités et divertissement',
    streamUrl: 'https://example.com/stream/vision4-tv.m3u8',
    thumbnail: '🎬',
    category: 'TV',
    viewers: 3650,
    isLive: true,
    currentShow: 'Film du soir',
  },
  {
    id: 'tv-4',
    title: 'Equinoxe Tv',
    description: 'Chaîne premium camerounaise',
    streamUrl: 'https://example.com/stream/equinoxe-tv.m3u8',
    thumbnail: '📺',
    category: 'TV',
    viewers: 2890,
    isLive: true,
    currentShow: 'Série télévisée',
  },
]

export async function GET(request: NextRequest) {
  try {
    return successResponse(MOCK_TV_STREAMS)
  } catch (error) {
    return successResponse([])
  }
}

### app/api/articles/route.ts
import { NextRequest } from 'next/server'
import { successResponse } from '@/lib/api-response'

// Mock articles data
const MOCK_ARTICLES = [
  {
    id: 'article-1',
    title: 'Cameroun: Nouvelle campagne de santé publique lancée',
    excerpt: 'Le gouvernement lance une vaste campagne de sensibilisation sur la santé publique...',
    content: 'Contenu complet de l\'article...',
    thumbnail: '📰',
    author: 'Jean Dupont',
    category: 'NEWS',
    featured: true,
    publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    views: 1250,
    comments: 34,
  },
  {
    id: 'article-2',
    title: 'Football: Coton Sport en tête du classement',
    excerpt: 'Après sa victoire contre Eca Coton, Coton Sport consolide sa position...',
    content: 'Contenu complet de l\'article...',
    thumbnail: '⚽',
    author: 'Marie N\'doumbe',
    category: 'SPORTS',
    featured: false,
    publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    views: 890,
    comments: 23,
  },
  {
    id: 'article-3',
    title: 'Cinéma camerounais: Trois films sélectionnés pour Cannes',
    excerpt: 'La sélection de trois films camerounais pour le festival de Cannes marque...',
    content: 'Contenu complet de l\'article...',
    thumbnail: '🎬',
    author: 'Paul Mbah',
    category: 'CULTURE',
    featured: true,
    publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    views: 2100,
    comments: 56,
  },
  {
    id: 'article-4',
    title: 'Technologie: Startup camerounaise reçoit un financement de 5M$',
    excerpt: 'Une startup de Douala spécialisée en IA reçoit un important financement...',
    content: 'Contenu complet de l\'article...',
    thumbnail: '💻',
    author: 'Sophie Talla',
    category: 'TECH',
    featured: false,
    publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    views: 1560,
    comments: 42,
  },
  {
    id: 'article-5',
    title: 'Environnement: Reforestation dans la région de l\'Adamaoua',
    excerpt: 'Le programme de reforestation atteint ses objectifs avec 50,000 arbres plantés...',
    content: 'Contenu complet de l\'article...',
    thumbnail: '🌳',
    author: 'Luc Kwete',
    category: 'ENVIRONMENT',
    featured: false,
    publishedAt: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
    views: 945,
    comments: 28,
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')

    let filtered = MOCK_ARTICLES

    if (category) {
      filtered = filtered.filter(a => a.category === category)
    }

    if (featured === 'true') {
      filtered = filtered.filter(a => a.featured)
    }

    return successResponse(filtered)
  } catch (error) {
    return successResponse([])
  }
}

---

## 7. LIBRARY & UTILITIES

### lib/prisma.ts
import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;

### lib/auth.ts
import bcrypt from 'bcryptjs';

let prisma: any;

try {
  const prismaModule = require('./prisma');
  prisma = prismaModule.default || prismaModule.prisma;
} catch (error) {
  console.warn('Prisma not available, using mock implementation');
}

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function getUserByEmail(email: string) {
  if (!prisma) {
    // Mock user for demo purposes
    return null;
  }
  
  try {
    return await prisma.user.findUnique({
      where: { email },
      include: {
        subscriptions: {
          where: { status: 'ACTIVE' },
          take: 1,
        },
      },
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
}

export async function createUser(
  email: string,
  password: string,
  name?: string
) {
  if (!prisma) {
    throw new Error('Database not available');
  }

  const hashedPassword = await hashPassword(password);
  return prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name: name || email.split('@')[0],
      role: 'USER',
    },
  });
}

### lib/auth-config.ts
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getUserByEmail, verifyPassword } from './auth';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials');
        }

        try {
          const user = await getUserByEmail(credentials.email);
          if (!user) {
            throw new Error('No user found with this email');
          }

          const isPasswordValid = await verifyPassword(
            credentials.password,
            user.password
          );

          if (!isPasswordValid) {
            throw new Error('Invalid password');
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.avatar,
            role: user.role,
          };
        } catch (error) {
          console.error('Auth error:', error);
          throw new Error('Authentication failed');
        }
      },
    }),
  ],
  pages: {
    signIn: '/signin',
    error: '/signin',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: parseInt(process.env.SESSION_MAX_AGE || '2592000'),
  },
  secret: process.env.NEXTAUTH_SECRET,
};

### lib/api-response.ts
import { NextResponse } from 'next/server';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export function successResponse<T>(data: T, message?: string): NextResponse<ApiResponse<T>> {
  return NextResponse.json(
    {
      success: true,
      data,
      message,
    },
    { status: 200 }
  );
}

export function errorResponse(error: string, status: number = 400): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      error,
    },
    { status }
  );
}

export function createdResponse<T>(data: T, message?: string): NextResponse<ApiResponse<T>> {
  return NextResponse.json(
    {
      success: true,
      data,
      message: message || 'Created successfully',
    },
    { status: 201 }
  );
}

export function notFoundResponse(): NextResponse<ApiResponse> {
  return errorResponse('Resource not found', 404);
}

export function unauthorizedResponse(): NextResponse<ApiResponse> {
  return errorResponse('Unauthorized', 401);
}

export function forbiddenResponse(): NextResponse<ApiResponse> {
  return errorResponse('Forbidden', 403);
}

### lib/utils.ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

---

## 8. COMPONENTS - UI

### components/ui/button.tsx
import { Button as ButtonPrimitive } from '@base-ui/react/button'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground [a]:hover:bg-primary/80',
        outline:
          'border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground',
        ghost:
          'hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50',
        destructive:
          'bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default:
          'h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2',
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: 'h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2',
        icon: 'size-8',
        'icon-xs':
          "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        'icon-sm':
          'size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg',
        'icon-lg': 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Button({
  className,
  variant = 'default',
  size = 'default',
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }

### components/ui/dialog.tsx
'use client'

import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { cn } from '@/lib/utils'

const Dialog = DialogPrimitive.Root
const DialogTrigger = DialogPrimitive.Trigger
const DialogPortal = DialogPrimitive.Portal
const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-50 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className
    )}
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-slate-800 bg-slate-900 p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg',
        className
      )}
      {...props}
    />
  </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col space-y-1.5 text-center sm:text-left',
      className
    )}
    {...props}
  />
)
DialogHeader.displayName = 'DialogHeader'

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
      className
    )}
    {...props}
  />
)
DialogFooter.displayName = 'DialogFooter'

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      'text-lg font-semibold leading-none tracking-tight text-white',
      className
    )}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-sm text-slate-400', className)}
    {...props}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}

---

## 9. COMPONENTS - NAVIGATION

### components/navigation/navbar.tsx
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

---

## 10. COMPONENTS - AUTHENTICATION

### components/providers.tsx
'use client'

import { SessionProvider } from 'next-auth/react'

export default function Providers({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>
}

### components/auth/auth-modal-provider.tsx
'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { SignInModal } from './signin-modal'
import { SignUpModal } from './signup-modal'

export function AuthModalProvider() {
  const searchParams = useSearchParams()
  const [signInOpen, setSignInOpen] = useState(false)
  const [signUpOpen, setSignUpOpen] = useState(false)

  useEffect(() => {
    if (searchParams.get('signin') === 'true') {
      setSignInOpen(true)
    }
    if (searchParams.get('signup') === 'true') {
      setSignUpOpen(true)
    }
  }, [searchParams])

  return (
    <>
      <SignInModal open={signInOpen} onOpenChange={setSignInOpen} />
      <SignUpModal open={signUpOpen} onOpenChange={setSignUpOpen} />
    </>
  )
}

### components/auth/signin-modal.tsx
'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface SignInModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SignInModal({ open, onOpenChange }: SignInModalProps) {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError('Email ou mot de passe incorrect')
      } else if (result?.ok) {
        onOpenChange(false)
        router.refresh()
      }
    } catch (err) {
      setError('Une erreur est survenue')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Se connecter</DialogTitle>
          <DialogDescription>
            Connectez-vous à votre compte Nkoh
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre@email.com"
              className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Mot de passe
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
              required
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors"
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </Button>
        </form>

        <div className="text-center text-sm text-slate-400">
          Pas de compte?{' '}
          <button
            onClick={() => {
              onOpenChange(false)
              router.push('/?signup=true')
            }}
            className="text-blue-500 hover:text-blue-400"
          >
            S&apos;inscrire
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

### components/auth/signup-modal.tsx
'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface SignUpModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SignUpModal({ open, onOpenChange }: SignUpModalProps) {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.message || 'Erreur lors de l\'inscription')
        return
      }

      // Auto login after signup
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.ok) {
        onOpenChange(false)
        router.refresh()
      }
    } catch (err) {
      setError('Une erreur est survenue')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Créer un compte</DialogTitle>
          <DialogDescription>
            Inscrivez-vous sur Nkoh gratuitement
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Nom complet
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Jean Dupont"
              className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre@email.com"
              className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Mot de passe
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Confirmer le mot de passe
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
              required
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors"
          >
            {loading ? 'Inscription...' : 'S&apos;inscrire'}
          </Button>
        </form>

        <div className="text-center text-sm text-slate-400">
          Vous avez un compte?{' '}
          <button
            onClick={() => {
              onOpenChange(false)
              router.push('/?signin=true')
            }}
            className="text-blue-500 hover:text-blue-400"
          >
            Se connecter
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

---

## 11. COMPONENTS - MEDIA

### components/media/radio-player.tsx
'use client'

import { useState, useRef, useEffect } from 'react'

interface RadioPlayerProps {
  title: string
  streamUrl: string
  description?: string
}

export function RadioPlayer({ title, streamUrl, description }: RadioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(1)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [error, setError] = useState<string | null>(null)

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        const playPromise = audioRef.current.play()
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            setError('Impossible de lire le flux audio')
            setIsPlaying(false)
          })
        }
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleError = () => {
    setError('Source audio non disponible')
    setIsPlaying(false)
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
  }

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const updateDuration = () => setDuration(audio.duration)

    audio.addEventListener('timeupdate', updateTime)
    audio.addEventListener('loadedmetadata', updateDuration)

    return () => {
      audio.removeEventListener('timeupdate', updateTime)
      audio.removeEventListener('loadedmetadata', updateDuration)
    }
  }, [])

  const formatTime = (time: number) => {
    if (!time || isNaN(time)) return '0:00'
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
      <audio
        ref={audioRef}
        src={streamUrl}
        onEnded={() => setIsPlaying(false)}
        onError={handleError}
        crossOrigin="anonymous"
      />

      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      {description && <p className="text-slate-400 text-sm mb-4">{description}</p>}
      
      {error && (
        <div className="mb-4 p-3 bg-amber-900/30 border border-amber-700 rounded text-amber-200 text-sm">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <button
          onClick={handlePlayPause}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          {isPlaying ? '⏸ Pause' : '▶ Écouter'}
        </button>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={(e) => {
              if (audioRef.current) {
                audioRef.current.currentTime = parseFloat(e.target.value)
              }
            }}
            className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-400 text-sm">🔊</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
            className="flex-1 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
        </div>

        {isPlaying && (
          <div className="text-center">
            <span className="inline-block text-blue-400 text-sm">◆ EN DIRECT</span>
          </div>
        )}
      </div>
    </div>
  )
}

### components/media/video-player.tsx
'use client'

import { useState, useRef, useEffect } from 'react'

interface VideoPlayerProps {
  title: string
  streamUrl: string
  description?: string
  currentShow?: string
}

export function VideoPlayer({ title, streamUrl, description, currentShow }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(1)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        const playPromise = videoRef.current.play()
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            setError('Impossible de lire le flux vidéo')
            setIsPlaying(false)
          })
        }
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleError = () => {
    setError('Source vidéo non disponible')
    setIsPlaying(false)
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    if (videoRef.current) {
      videoRef.current.volume = newVolume
    }
  }

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (!isFullscreen) {
        videoRef.current.requestFullscreen?.()
      } else {
        document.exitFullscreen?.()
      }
      setIsFullscreen(!isFullscreen)
    }
  }

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const updateTime = () => setCurrentTime(video.currentTime)
    const updateDuration = () => setDuration(video.duration)

    video.addEventListener('timeupdate', updateTime)
    video.addEventListener('loadedmetadata', updateDuration)

    return () => {
      video.removeEventListener('timeupdate', updateTime)
      video.removeEventListener('loadedmetadata', updateDuration)
    }
  }, [])

  const formatTime = (time: number) => {
    if (!time || isNaN(time)) return '0:00'
    const hours = Math.floor(time / 3600)
    const minutes = Math.floor((time % 3600) / 60)
    const seconds = Math.floor(time % 60)
    if (hours > 0) {
      return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
    }
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
      {/* Video Element */}
      <div className="relative bg-black w-full" style={{ aspectRatio: '16/9' }}>
        <video
          ref={videoRef}
          src={streamUrl}
          className="w-full h-full"
          onEnded={() => setIsPlaying(false)}
          onError={handleError}
          crossOrigin="anonymous"
        />
        
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/70 rounded">
            <div className="text-center">
              <p className="text-amber-200 text-sm mb-2">Erreur de lecture</p>
              <p className="text-slate-400 text-xs">{error}</p>
            </div>
          </div>
        )}

        {/* Overlay Controls */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity flex flex-col justify-between p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-white font-semibold">{title}</h3>
              {currentShow && <p className="text-blue-400 text-sm">En direct: {currentShow}</p>}
            </div>
            <span className="text-xs bg-red-600 text-white px-2 py-1 rounded">EN DIRECT</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handlePlayPause}
              className="bg-blue-600 hover:bg-blue-700 text-white w-12 h-12 rounded-full flex items-center justify-center transition-colors"
            >
              {isPlaying ? '⏸' : '▶'}
            </button>

            <div className="flex-1 space-y-2">
              <input
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={(e) => {
                  if (videoRef.current) {
                    videoRef.current.currentTime = parseFloat(e.target.value)
                  }
                }}
                className="w-full h-1 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-xs text-slate-300">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-white text-sm">🔊</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
                className="w-20 h-1 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            <button
              onClick={handleFullscreen}
              className="text-white hover:text-blue-400 transition-colors"
              title="Fullscreen"
            >
              ⛶
            </button>
          </div>
        </div>
      </div>

      {/* Info Panel */}
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
          {description && <p className="text-slate-400 text-sm mb-2">{description}</p>}
          {currentShow && <p className="text-blue-400 text-sm">Émission: {currentShow}</p>}
        </div>
      </div>
    </div>
  )
}

---

## 12. DATABASE SCHEMA

### prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?
  password      String
  avatar        String?
  role          Role      @default(USER)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  favorites     Favorite[]
  playbackHistory PlaybackHistory[]
  subscriptions Subscription[]
  comments      Comment[]
  sessions      Session[]
  accounts      Account[]
}

model Account {
  id                 String  @id @default(cuid())
  userId             String
  type               String
  provider           String
  providerAccountId  String
  refresh_token      String?
  access_token       String?
  expires_at         Int?
  token_type         String?
  scope              String?
  id_token           String?
  session_state      String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}

enum Role {
  USER
  MODERATOR
  ADMIN
}

model Channel {
  id          String    @id @default(cuid())
  name        String    @unique
  description String?
  logo        String?
  category    ChannelCategory
  isActive    Boolean   @default(true)
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  
  shows       Show[]
  streams     Stream[]
  articles    Article[]
}

enum ChannelCategory {
  RADIO
  TV
  NEWS
  ENTERTAINMENT
}

model Show {
  id          String    @id @default(cuid())
  title       String
  description String?
  thumbnail   String?
  channelId   String
  channel     Channel   @relation(fields: [channelId], references: [id], onDelete: Cascade)
  schedule    String?
  host        String?
  genre       String?
  language    String?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  
  streams     Stream[]
  episodes    Episode[]
}

model Stream {
  id          String    @id @default(cuid())
  title       String
  description String?
  streamUrl   String
  thumbnailUrl String?
  quality     StreamQuality[]
  type        StreamType
  status      StreamStatus @default(OFFLINE)
  startTime   DateTime?
  endTime     DateTime?
  viewers     Int @default(0)
  channelId   String
  channel     Channel   @relation(fields: [channelId], references: [id], onDelete: Cascade)
  showId      String?
  show        Show?     @relation(fields: [showId], references: [id], onDelete: SetNull)
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  
  favorites   Favorite[]
}

enum StreamType {
  LIVE
  REPLAY
  VOD
}

enum StreamStatus {
  ONLINE
  OFFLINE
  SCHEDULED
}

model StreamQuality {
  id        String  @id @default(cuid())
  streamId  String
  stream    Stream  @relation(fields: [streamId], references: [id], onDelete: Cascade)
  label     String
  url       String
  bitrate   Int?
  
  @@unique([streamId, label])
}

model Episode {
  id          String    @id @default(cuid())
  title       String
  description String?
  showId      String
  show        Show      @relation(fields: [showId], references: [id], onDelete: Cascade)
  videoUrl    String
  duration    Int
  thumbnail   String?
  airDate     DateTime
  season      Int?
  number      Int?
  createdAt   DateTime  @default(now())
  
  favorites   Favorite[]
  playbackHistory PlaybackHistory[]
}

model Article {
  id          String    @id @default(cuid())
  title       String
  content     String
  excerpt     String?
  thumbnail   String?
  author      String?
  channelId   String
  channel     Channel   @relation(fields: [channelId], references: [id], onDelete: Cascade)
  category    ArticleCategory
  tags        String[]
  featured    Boolean   @default(false)
  publishedAt DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  
  comments    Comment[]
}

enum ArticleCategory {
  NEWS
  SPORTS
  ENTERTAINMENT
  TECH
  CULTURE
  OTHER
}

model Comment {
  id        String   @id @default(cuid())
  content   String
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  articleId String
  article   Article  @relation(fields: [articleId], references: [id], onDelete: Cascade)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Favorite {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  streamId  String?
  stream    Stream?  @relation(fields: [streamId], references: [id], onDelete: Cascade)
  episodeId String?
  episode   Episode? @relation(fields: [episodeId], references: [id], onDelete: Cascade)
  createdAt DateTime @default(now())
  
  @@unique([userId, streamId])
  @@unique([userId, episodeId])
}

model PlaybackHistory {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  episodeId String
  episode   Episode  @relation(fields: [episodeId], references: [id], onDelete: Cascade)
  progress  Int      @default(0)
  duration  Int
  watchedAt DateTime @default(now())
  
  @@unique([userId, episodeId])
}

model Subscription {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  plan      SubscriptionPlan
  status    SubscriptionStatus @default(ACTIVE)
  startDate DateTime @default(now())
  endDate   DateTime
  price     Float
  
  @@unique([userId])
}

enum SubscriptionPlan {
  FREE
  BASIC
  PREMIUM
}

enum SubscriptionStatus {
  ACTIVE
  CANCELLED
  EXPIRED
}

model Notification {
  id        String   @id @default(cuid())
  title     String
  message   String
  type      NotificationType
  data      Json?
  sentAt    DateTime @default(now())
  
  recipients NotificationRecipient[]
}

enum NotificationType {
  LIVE_STREAM_STARTED
  NEW_EPISODE
  SHOW_REMINDER
  SYSTEM_MESSAGE
  PROMOTION
}

model NotificationRecipient {
  id              String   @id @default(cuid())
  notificationId  String
  notification    Notification @relation(fields: [notificationId], references: [id], onDelete: Cascade)
  userId          String
  read            Boolean  @default(false)
  readAt          DateTime?
  
  @@unique([notificationId, userId])
}

model Analytics {
  id            String   @id @default(cuid())
  streamId      String?
  articleId     String?
  views         Int      @default(0)
  engagements   Int      @default(0)
  timestamp     DateTime @default(now())
}

---

## END OF CODE ANALYSIS

Generated: $(date)
Total Files: 38
Total Lines: ~7000+

This file contains all source code for the Nkoh platform and can be analyzed
in Claude Code, ChatGPT Code Interpreter, or any AI code analysis tool.
