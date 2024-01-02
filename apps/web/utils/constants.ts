import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies"

export const MAX_AGE = 60 * 60 * 24 * 365 * 1000

export const DEFAULT_COOKIE_OPTIONS:Partial<ResponseCookie> = {
  path: '/',
  sameSite: 'lax',
	maxAge: MAX_AGE
}
