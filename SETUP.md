# Parlay Setup Guide

## 📋 Pre-requisites

- Node.js 18+ 
- npm alebo yarn
- Supabase project
- Stripe account (pre subscriptions)

## 🚀 Quick Start

### 1. Clone & Install

```bash
git clone <repo-url>
cd parlay-demo
npm install
```

### 2. Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp env.example .env.local
```

Fill in your Supabase and Stripe credentials:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Stripe (Test Mode)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PRO_PRICE_ID=price_...
STRIPE_BASIC_PRICE_ID=price_...

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_PITCH_MODE=false
```

### 3. Supabase Database Setup

Run these SQL scripts in your Supabase SQL Editor **in order**:

1. **Authentication Schema** - `supabase-auth-schema.sql`
   - Creates `profiles` table
   - Sets up auth triggers
   - Configures RLS policies

2. **Posts Schema** (if not exists)
   - Ensure `posts` table exists with columns:
     - `id`, `author_id`, `title`, `content`, `created_at`, `likes_count`, etc.

3. **Groups Schema** - `supabase-groups-schema.sql`
   - Creates `groups` and `group_members` tables
   - Sets up RLS policies

4. **Subscriptions Schema** - `supabase-subscription-schema.sql`
   - Creates `subscriptions` table
   - Stripe integration tables

5. **Social Schema** - `supabase-social-schema.sql`
   - Creates `follows`, `comments`, `notifications` tables
   - Real-time subscriptions setup

6. **Admin Schema** - `supabase-admin-schema.sql`
   - Creates `reports`, `verifications`, `group_approvals`, `audit_logs` tables
   - Admin-only access policies

### 4. Enable Realtime

In Supabase Dashboard:
1. Go to **Database** → **Replication**
2. Enable replication for:
   - `notifications`
   - `comments`
   - `follows`
   - `posts` (for likes_count updates)
   - `groups`
   - `group_members`

### 5. Create Admin User

After setting up profiles, create an admin user:

```sql
-- Set role to 'admin' for a specific user
UPDATE profiles 
SET role = 'admin' 
WHERE id = 'user-uuid-here';
```

Or via Supabase Dashboard → Authentication → Users → Edit user metadata.

### 6. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── admin/             # Admin dashboard (admin-only)
│   ├── auth/              # Authentication pages
│   ├── feed/              # Main feed page
│   ├── groups/            # Groups/communities
│   ├── notifications/     # Notifications center
│   └── subscribe/         # Stripe subscription
├── components/
│   ├── admin/             # Admin components
│   ├── comments/          # Comment threads
│   ├── feed/              # Post cards, paywalls
│   ├── sections/          # Landing page sections
│   ├── ui/                # Reusable UI components
│   └── providers/         # Context providers
├── hooks/                 # Custom React hooks
│   ├── useSupabaseAuth.ts    # Auth state management
│   ├── useNotifications.ts   # Real-time notifications
│   ├── useComments.ts        # Comment system
│   ├── useFollows.ts         # Follow/unfollow
│   └── useLikes.ts           # Like system
└── lib/
    ├── supabaseClient.ts     # Supabase client
    ├── admin.ts              # Admin utilities
    └── motion.ts             # Animation presets
```

## ✅ Feature Checklist

- [x] Authentication (Supabase Auth)
- [x] Posts & Feed
- [x] Likes & Reactions
- [x] Comments & Threading
- [x] Follow System
- [x] Real-time Notifications
- [x] Groups & Communities
- [x] Subscriptions (Stripe)
- [x] Admin Dashboard
- [x] Cinematic Landing Page

## 🔧 Troubleshooting

### Build Errors

```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Supabase Connection Issues

- Verify `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Check Supabase project status
- Ensure RLS policies are enabled

### Real-time Notifications Not Working

1. Enable replication in Supabase Dashboard
2. Check browser console for subscription errors
3. Verify user is authenticated

### Admin Access Denied

1. Ensure user has `role = 'admin'` in `profiles` table
2. Check `/app/admin/layout.tsx` for role verification
3. Sign out and sign in again after role change

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Stripe Test Mode](https://stripe.com/docs/testing)

## 🚢 Deployment

### Vercel

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Environment Variables for Production

Ensure all `.env.local` variables are added to Vercel:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `STRIPE_SECRET_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_PRO_PRICE_ID`
- `STRIPE_BASIC_PRICE_ID`
- `NEXT_PUBLIC_APP_URL`
- `NEXT_PUBLIC_PITCH_MODE` (set to `false` for production)

