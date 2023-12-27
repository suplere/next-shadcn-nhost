'use server'

import { getNhost } from '@/lib/nhost/nhost'
import { redirect } from 'next/navigation'

export const signInWithApple = async () => {
  const nhost = await getNhost()

  const { providerUrl } = await nhost.auth.signIn({
    provider: 'apple',
    options: {
      redirectTo: `/oauth`
    }
  })

  if (providerUrl) {
    redirect(providerUrl)
  }
}
