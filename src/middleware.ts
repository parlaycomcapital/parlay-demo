import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Public routes - allow access
  const publicRoutes = [
    '/',
    '/auth',
    '/onboarding',
    '/screenshot',
    '/terms',
    '/privacy',
    '/responsible-use',
    '/help',
    '/contact',
  ];

  // Check if route is public
  const isPublicRoute = publicRoutes.some((route) => pathname === route || pathname.startsWith('/api/'));
  
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Protected routes - check for session cookie
  const protectedRoutes = ['/feed', '/groups', '/settings', '/dashboard', '/create', '/profile'];
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));

  if (isProtectedRoute) {
    // Check for Supabase session cookie (lightweight check)
    const accessToken = request.cookies.get('sb-access-token')?.value;
    const refreshToken = request.cookies.get('sb-refresh-token')?.value;

    // If no session cookies, redirect to auth
    if (!accessToken && !refreshToken) {
      const redirectUrl = new URL('/auth', request.url);
      redirectUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(redirectUrl);
    }
  }

  // Redirect authenticated users away from auth page
  if (pathname.startsWith('/auth')) {
    const accessToken = request.cookies.get('sb-access-token')?.value;
    if (accessToken) {
      return NextResponse.redirect(new URL('/feed', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
