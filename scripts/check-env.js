const required = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY'
];

const optional = [
  'NEXTAUTH_SECRET',
  'NEXTAUTH_URL',
  'STRIPE_SECRET_KEY',
  'NEXT_PUBLIC_APP_URL'
];

let allFound = true;

required.forEach((v) => {
  if (!process.env[v]) {
    console.error(`❌ Missing environment variable: ${v}`);
    allFound = false;
  }
});

if (allFound) {
  console.log('✅ All required env variables found.');
  console.log('ℹ️  Optional variables:', optional.filter(v => !process.env[v]).length > 0 ? 
    optional.filter(v => !process.env[v]).join(', ') + ' (not set)' : 'all set');
} else {
  console.error('❌ Some required environment variables are missing. Please check your .env.local file.');
  process.exit(1);
}
