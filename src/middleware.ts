import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if password protection is enabled
  const isPasswordProtected = process.env.PASSWORD_PROTECTION === 'true';
  
  // For demo purposes, disable password protection if not explicitly set
  if (!isPasswordProtected) {
    return NextResponse.next();
  }

  // Check for password in cookies
  const password = request.cookies.get('parlay-preview-password');
  const correctPassword = process.env.PREVIEW_PASSWORD || 'parlay2024';

  if (password?.value === correctPassword) {
    return NextResponse.next();
  }

  // Show password form
  if (request.nextUrl.pathname === '/api/auth/preview') {
    return NextResponse.next();
  }

  // Redirect to password page
  const url = request.nextUrl.clone();
  url.pathname = '/preview-login';
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    '/((?!api/auth/preview|preview-login|_next/static|_next/image|favicon.ico).*)',
  ],
};
