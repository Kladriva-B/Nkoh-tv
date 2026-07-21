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
