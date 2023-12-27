import { utoa, utob } from '@/utils/string';
import { getNhostConfig } from './helpers';
import { AuthErrorPayload, NhostClient, NhostSession } from '@nhost/nhost-js'
import { cookies } from 'next/headers'

// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextRequest, NextResponse } from 'next/server'
import { type StateFrom } from 'xstate/lib/types'
import { waitFor } from 'xstate/lib/waitFor'

export const NHOST_SESSION_KEY = 'nhostSession'

export const getNhost = async (request?: NextRequest) => {
  const $cookies = request?.cookies || cookies()

  const nhost = new NhostClient({
    ...getNhostConfig(),
    start: false
  })

  const sessionCookieValue = $cookies.get(NHOST_SESSION_KEY)?.value || ''
  const initialSession: NhostSession = JSON.parse(utob(sessionCookieValue) || 'null')

  nhost.auth.client.start({ initialSession })
  await waitFor(nhost.auth.client.interpreter!, (state: StateFrom<any>) => !state.hasTag('loading'))

  return nhost
}

export const manageAuthSession = async (
  request: NextRequest,
  onError?: (error: AuthErrorPayload) => NextResponse
) => {
  const nhost = await getNhost(request)
  const session = nhost.auth.getSession()

  const url = new URL(request.url)
  const refreshToken = url.searchParams.get('refreshToken') || undefined

  const currentTime = Math.floor(Date.now() / 1000)
  const tokenExpirationTime = nhost.auth.getDecodedAccessToken()?.exp
  const accessTokenExpired = session && tokenExpirationTime && currentTime > tokenExpirationTime

  if (accessTokenExpired || refreshToken) {
    const { session: newSession, error } = await nhost.auth.refreshSession(refreshToken)

    if (error) {
      onError?.(error)
    }

    // remove the refreshToken from the url
    url.searchParams.delete('refreshToken')

    // overwrite the session cookie with the new session
    return NextResponse.redirect(url, {
      headers: {
        'Set-Cookie': `${NHOST_SESSION_KEY}=${utoa(JSON.stringify(newSession))}; Path=/`
      }
    })
  }
}
