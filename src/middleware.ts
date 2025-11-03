import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Create response object
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  // Create Supabase client for server-side
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          request.cookies.set({
            name,
            value,
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: any) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value: '',
            ...options,
          });
        },
      },
    }
  );

  // Get session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Protected routes
  if (pathname.startsWith('/dashboard') || pathname.startsWith('/create')) {
    if (!session) {
      return NextResponse.redirect(new URL('/auth', request.url));
    }

    // Check if user is creator (requires profile lookup in component level)
    // For now, just check if authenticated
  }

  // Optional: Protect feed route (can be made public)
  // if (pathname.startsWith('/feed') && !session) {
  //   return NextResponse.redirect(new URL('/auth', request.url));
  // }

  // Redirect authenticated users away from auth page
  if (pathname.startsWith('/auth') && session) {
    return NextResponse.redirect(new URL('/feed', request.url));
  }

  // Redirect authenticated users from onboarding to feed if already onboarded
  if (pathname.startsWith('/onboarding') && session) {
    // Check if profile exists (this is handled in the component)
    // Allow access for now
  }

  return response;
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/feed/:path*',
    '/create/:path*',
    '/profile/:path*',
    '/auth/:path*',
    '/onboarding/:path*',
  ],
};
