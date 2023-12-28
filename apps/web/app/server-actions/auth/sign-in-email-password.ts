'use server'

import { NHOST_SESSION_KEY, getNhost } from '@/lib/nhost/nhost'
import { utoa } from '@/utils/string'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const signIn = async (formData: FormData) => {
  const nhost = await getNhost()

  const email = formData.get('email').toString()
  const password = formData.get('password').toString()

  const { session, error } = await nhost.auth.signIn({ email, password })

  if (session) {
    cookies().set(NHOST_SESSION_KEY, utoa(JSON.stringify(session)), { path: '/' })
    redirect('/dashboard')
  }

  if (error) {
    return {
      error: error?.message
    }
  }
}
