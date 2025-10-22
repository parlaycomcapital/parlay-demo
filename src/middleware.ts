import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // No password protection - allow all access
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
