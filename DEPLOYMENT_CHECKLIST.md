# 🚀 Deployment Checklist

## Pre-Deployment

### ✅ Database Setup
- [ ] Run `supabase-auth-schema.sql` in Supabase SQL Editor
- [ ] Run `supabase-groups-schema.sql`
- [ ] Run `supabase-subscription-schema.sql`
- [ ] Run `supabase-social-schema.sql`
- [ ] Run `supabase-admin-schema.sql`

### ✅ Realtime Configuration
- [ ] Enable replication for `notifications` table
- [ ] Enable replication for `comments` table
- [ ] Enable replication for `follows` table
- [ ] Enable replication for `posts` table
- [ ] Enable replication for `groups` table
- [ ] Enable replication for `group_members` table

### ✅ Environment Variables
- [ ] `NEXT_PUBLIC_SUPABASE_URL` set
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` set
- [ ] `STRIPE_SECRET_KEY` set (production key)
- [ ] `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` set
- [ ] `STRIPE_PRO_PRICE_ID` set
- [ ] `STRIPE_BASIC_PRICE_ID` set
- [ ] `NEXT_PUBLIC_APP_URL` set to production URL
- [ ] `NEXT_PUBLIC_PITCH_MODE` set to `false` (or `true` for demo)

### ✅ Admin Setup
- [ ] Create at least one admin user (set `role = 'admin'` in profiles)
- [ ] Test admin dashboard access at `/admin`

### ✅ Stripe Configuration
- [ ] Create Stripe products and prices
- [ ] Set up Stripe webhook endpoint (for subscription updates)
- [ ] Test subscription flow in test mode
- [ ] Switch to live keys for production

### ✅ Build & Test
- [ ] Run `npm run build` successfully
- [ ] Test authentication flow
- [ ] Test post creation
- [ ] Test likes & comments
- [ ] Test notifications
- [ ] Test follow system
- [ ] Test groups creation
- [ ] Test subscription flow

## Vercel Deployment

### ✅ Project Setup
- [ ] Import GitHub repository to Vercel
- [ ] Configure build command: `npm run build`
- [ ] Set output directory: `.next`
- [ ] Add all environment variables

### ✅ Post-Deployment
- [ ] Test production URL
- [ ] Verify authentication works
- [ ] Check real-time subscriptions
- [ ] Monitor error logs in Vercel
- [ ] Test Stripe webhook (if configured)

## Monitoring

### ✅ Health Checks
- [ ] Check Supabase connection status
- [ ] Monitor API response times
- [ ] Check error rates in Vercel logs
- [ ] Monitor Stripe webhook deliveries

### ✅ User Testing
- [ ] Test on mobile devices
- [ ] Test on different browsers
- [ ] Check notification delivery
- [ ] Verify real-time updates work

## Rollback Plan

If issues occur:
1. Check Vercel deployment logs
2. Verify environment variables
3. Check Supabase dashboard for errors
4. Rollback to previous deployment if needed

