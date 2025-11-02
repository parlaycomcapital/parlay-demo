import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET || 'fallback-secret-for-development',
  });

  const { pathname } = request.nextUrl;

  // Protected routes
  if (pathname.startsWith('/dashboard')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    
    if (token.role !== 'creator') {
      return NextResponse.redirect(new URL('/feed', request.url));
    }
  }

  // Allow access to feed for all authenticated users
  if (pathname.startsWith('/feed')) {
    // Optional: redirect to login if not authenticated
    // For now, allow public access
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/feed/:path*',
    '/create/:path*',
    '/profile/:path*',
  ],
};
