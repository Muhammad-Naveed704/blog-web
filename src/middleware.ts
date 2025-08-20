import { updateSession } from '@/lib/supabase/middleware'
import { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Protect authenticated-only routes
     */
    '/create/:path*',
    '/profile/:path*',
    '/my-posts/:path*',
    '/posts/:path*/edit'
  ],
}
