'use server'

import { NHOST_SESSION_KEY, getNhost } from '@lib/nhost/nhost'
import { utoa } from '@utils/string'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const signUp = async (formData: FormData) => {
  const nhost = await getNhost()

  const firstName = formData.get('firstName') as string
  const lastName = formData.get('lastName') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { session, error } = await nhost.auth.signUp({
    email,
    password,
    options: {
      displayName: `${firstName} ${lastName}`
    }
  })

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
