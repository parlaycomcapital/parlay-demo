import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const pass = (body?.password || '').toString();
  const SITE_PASSWORD = process.env.SITE_PASSWORD || '';
  const COOKIE_SECRET = process.env.COOKIE_SECRET || 'dev_secret_placeholder';
  const AUTH_COOKIE_NAME = process.env.AUTH_COOKIE_NAME || 'parlay_auth';
  const COOKIE_MAX_AGE = parseInt(process.env.COOKIE_MAX_AGE || '2592000', 10); // 30 days

  if (!SITE_PASSWORD) {
    return NextResponse.json({ message: 'Site password not configured' }, { status: 500 });
  }

  if (pass !== SITE_PASSWORD) {
    return NextResponse.json({ message: 'Invalid password' }, { status: 401 });
  }

  // create cookie value (value.signature)
  const value = Date.now().toString(); // simple random-ish payload (timestamp)
  const hmac = crypto.createHmac('sha256', COOKIE_SECRET);
  hmac.update(value);
  const sig = hmac.digest('hex');
  const cookieValue = `${value}.${sig}`;

  const res = NextResponse.json({ ok: true });
  const cookieStr = `${AUTH_COOKIE_NAME}=${cookieValue}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${COOKIE_MAX_AGE}`;
  res.headers.set('Set-Cookie', cookieStr);
  return res;
}
