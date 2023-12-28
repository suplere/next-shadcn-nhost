'use server'

import { getNhost } from '@/lib/nhost/nhost'
import { redirect } from 'next/navigation'

export const forgotPassword = async (form: FormData) => {
  const nhost = await getNhost()

  const email = form.get("email").toString()

  const {error} = await nhost.auth.resetPassword({
    email,
    options: {
      redirectTo: '/dashboard/profile'
    }
  })

  if (error) {
    return {
      error: error?.message
    }
  }

  redirect('/')

}
