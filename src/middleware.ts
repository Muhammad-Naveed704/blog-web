import { updateSession } from '@/lib/supabase/middleware'
import { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Match only protected routes that need authentication
     */
    '/create/:path*'
  ],
}
