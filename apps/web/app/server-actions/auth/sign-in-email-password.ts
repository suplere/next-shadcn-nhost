'use server'

import { NHOST_SESSION_KEY, getNhost } from '@/lib/nhost/nhost'
import { DEFAULT_COOKIE_OPTIONS } from '@/utils/constants'
import { utoa } from '@/utils/string'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { zfd } from "zod-form-data";

const schema = zfd.formData({
  email: zfd.text(),
  password: zfd.text(),
});

export const signIn = async (formData: FormData) => {
  const nhost = await getNhost()

  const { email, password } = schema.parse(formData)

  const { session, error } = await nhost.auth.signIn({ email, password })

  if (session) {
    cookies().set(NHOST_SESSION_KEY, utoa(JSON.stringify(session)), { ...DEFAULT_COOKIE_OPTIONS })
    redirect('/dashboard')
  }

  if (error) {
    return {
      error: error?.message
    }
  }
}
