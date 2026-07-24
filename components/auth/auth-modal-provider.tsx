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
