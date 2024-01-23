'use server'

import { getNhost } from '@/lib/nhost/nhost'
import { redirect } from 'next/navigation'
import { zfd } from "zod-form-data";

const schema = zfd.formData({
  email: zfd.text(),
});

export const forgotPassword = async (form: FormData) => {
  const nhost = await getNhost()

  const { email } = schema.parse(form)

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
