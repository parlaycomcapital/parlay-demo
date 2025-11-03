# Supabase Authentication Setup Guide

This guide will walk you through setting up Supabase authentication for Parlay Alpha.

## Prerequisites

1. A Supabase account (sign up at [supabase.com](https://supabase.com))
2. A Supabase project created

## Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com/dashboard)
2. Click "New Project"
3. Fill in project details (name, database password, region)
4. Wait for project to initialize (~2 minutes)

## Step 2: Get Your Supabase Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy your **Project URL** (this is `NEXT_PUBLIC_SUPABASE_URL`)
3. Copy your **anon/public key** (this is `NEXT_PUBLIC_SUPABASE_ANON_KEY`)
4. Add these to your `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

## Step 3: Set Up Database Schema

1. In Supabase dashboard, go to **SQL Editor**
2. Copy and paste the contents of `supabase-auth-schema.sql`
3. Click "Run" to execute the SQL
4. This will create:
   - `profiles` table with role support
   - Automatic profile creation trigger on user signup
   - Row Level Security (RLS) policies

## Step 4: Configure Google OAuth (Optional but Recommended)

1. In Supabase dashboard, go to **Authentication** → **Providers**
2. Find **Google** and click "Enable"
3. You'll need:
   - **Client ID** (from Google Cloud Console)
   - **Client Secret** (from Google Cloud Console)
4. Configure redirect URL:
   - Add `https://your-project-id.supabase.co/auth/v1/callback` to authorized redirect URIs in Google Cloud Console
5. Save settings in Supabase

### Getting Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing
3. Enable **Google+ API**
4. Go to **Credentials** → **Create Credentials** → **OAuth 2.0 Client ID**
5. Select **Web application**
6. Add authorized redirect URIs:
   - `https://your-project-id.supabase.co/auth/v1/callback`
   - `http://localhost:3000` (for local development)
7. Copy **Client ID** and **Client Secret**

## Step 5: Configure Email Templates (Optional)

1. In Supabase dashboard, go to **Authentication** → **Email Templates**
2. Customize the **Magic Link** template to match Parlay branding
3. Customize **Confirm Signup** template

## Step 6: Set Up Site URL

1. In Supabase dashboard, go to **Authentication** → **URL Configuration**
2. Set **Site URL** to your production URL: `https://your-app.vercel.app`
3. Add **Redirect URLs**:
   - `http://localhost:3000/**` (for local development)
   - `https://your-app.vercel.app/**` (for production)

## Step 7: Test Authentication Flow

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `/auth`
3. Try:
   - **Email sign-up**: Enter email, select role, click "Create Account"
   - **Magic link**: Check email inbox for confirmation link
   - **Google OAuth**: Click "Continue with Google"

4. After successful authentication, you should be redirected to `/onboarding`

## Troubleshooting

### "Invalid API key" error
- Verify your `.env.local` has correct `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Restart your dev server after adding env variables

### Google OAuth redirect error
- Verify redirect URI matches exactly in Google Cloud Console
- Check Site URL configuration in Supabase

### Profile not created after signup
- Check Supabase SQL Editor → run the trigger function manually
- Verify RLS policies are enabled on `profiles` table
- Check browser console for errors

### "Row Level Security" errors
- Ensure RLS policies are created (see `supabase-auth-schema.sql`)
- Check that policies allow authenticated users to read profiles

## Security Notes

- **Never commit** `.env.local` to git
- The `anon` key is safe to use client-side (it has RLS protection)
- For server-side operations, consider using the `service_role` key (but never expose it client-side)

## Next Steps

After authentication is working:

1. **Connect Stripe** for subscription payments (see Stripe integration guide)
2. **Set up feed** to use real Supabase data
3. **Configure webhooks** for real-time updates

## Support

For issues or questions:
- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Discord](https://discord.supabase.com)

