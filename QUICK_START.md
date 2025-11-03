# 🚀 Quick Start Guide

## 1. Environment Setup

```bash
# Copy environment template
cp env.example .env.local

# Edit .env.local with your credentials
```

### Required Environment Variables:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `STRIPE_SECRET_KEY` (for subscriptions)
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`

## 2. Supabase Setup

### Run SQL Scripts (in order):

1. **Authentication** → `supabase-auth-schema.sql`
2. **Groups** → `supabase-groups-schema.sql`
3. **Subscriptions** → `supabase-subscription-schema.sql`
4. **Social** → `supabase-social-schema.sql`
5. **Admin** → `supabase-admin-schema.sql`

### Enable Realtime:
- Go to Supabase Dashboard → Database → Replication
- Enable for: `notifications`, `comments`, `follows`, `posts`, `groups`

## 3. Create Admin User

```sql
UPDATE profiles 
SET role = 'admin' 
WHERE id = 'your-user-id';
```

## 4. Run Development Server

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## ✅ Testing Checklist

- [ ] Authentication works (`/auth`)
- [ ] Feed loads posts (`/feed`)
- [ ] Can like posts
- [ ] Can comment on posts
- [ ] Notifications appear (bell icon)
- [ ] Can follow users
- [ ] Groups creation works (`/groups`)
- [ ] Admin dashboard accessible (`/admin` - admin only)

## 🐛 Common Issues

### Build Errors
```bash
rm -rf .next node_modules
npm install
npm run build
```

### Supabase Connection
- Check `.env.local` has correct Supabase URL and key
- Verify Supabase project is active

### Real-time Not Working
- Enable replication in Supabase Dashboard
- Check browser console for errors

### Admin Access Denied
- Ensure user has `role = 'admin'` in `profiles` table
- Sign out and sign in again

## 📚 Full Documentation

See `SETUP.md` for detailed setup instructions.

