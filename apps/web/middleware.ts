

// eslint-disable-next-line @next/next/no-server-import-in-page
import { manageAuthSession } from '@lib/nhost/nhost'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  return manageAuthSession(request, () =>
    NextResponse.redirect(new URL('/auth/sign-in', request.url))
  )
}
