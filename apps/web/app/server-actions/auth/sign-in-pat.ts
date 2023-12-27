'use server'

import { NHOST_SESSION_KEY, getNhost } from '@/lib/nhost/nhost'
import { utoa } from '@/utils/string'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const signInWithPAT = async (formData: FormData) => {
  const nhost = await getNhost()

  const pat = formData.get('pat') as string

  const { session, error } = await nhost.auth.signInPAT(pat)

  if (session) {
    cookies().set(NHOST_SESSION_KEY, utoa(JSON.stringify(session)), { path: '/' })
    redirect('/protected/todos')
  }

  if (error) {
    return {
      error: error?.message
    }
  }
}
