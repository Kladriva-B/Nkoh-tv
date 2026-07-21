import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth-config'

export default async function Page() {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect('/dashboard')
  } else {
    redirect('/signin')
  }
}
