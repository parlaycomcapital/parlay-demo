const required = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY'
];


required.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`⚠️ Missing environment variable: ${key}`);
  }
});

export const env = {
  SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL!,
  SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET || 'dev_secret_placeholder',
  NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'http://localhost:3000',
  SITE_PASSWORD: process.env.SITE_PASSWORD || 'parlay2024',
  COOKIE_SECRET: process.env.COOKIE_SECRET || 'dev_secret_placeholder',
  AUTH_COOKIE_NAME: process.env.AUTH_COOKIE_NAME || 'parlay_auth',
  COOKIE_MAX_AGE: parseInt(process.env.COOKIE_MAX_AGE || '2592000', 10),
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY || '',
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
};
