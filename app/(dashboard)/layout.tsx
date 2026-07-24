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
