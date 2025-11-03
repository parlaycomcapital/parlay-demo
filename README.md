# Parlay — Smart Sports. Smarter Minds.

The social network where verified analysts share insights, track ROI, and build communities around data-driven sports intelligence.

## 🚀 Quick Start

See **[QUICK_START.md](./QUICK_START.md)** for quick setup instructions.

See **[SETUP.md](./SETUP.md)** for detailed setup guide.

## ✨ Features

- 🔐 **Supabase Authentication** - Secure email/password auth
- 📊 **Real-time Feed** - Live posts from verified analysts
- ❤️ **Social Interactions** - Likes, comments, follows with real-time notifications
- 💬 **Comment Threading** - Nested discussions (2 levels max)
- 👥 **Groups & Communities** - Creator-led private/public groups
- 💳 **Stripe Subscriptions** - Pro/Basic tiers for premium content
- 🛡️ **Admin Dashboard** - Reports, verification, group approvals
- 🎨 **Cinematic UI** - Premium design with Framer Motion animations

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
└── lib/                   # Utilities & clients
```

## 🛠️ Tech Stack

- **Next.js 16** (App Router)
- **TypeScript**
- **Supabase** (Auth, Database, Realtime)
- **Stripe** (Payments)
- **Tailwind CSS** (Styling)
- **Framer Motion** (Animations)

## 📚 Documentation

- **[QUICK_START.md](./QUICK_START.md)** - Quick setup guide
- **[SETUP.md](./SETUP.md)** - Detailed setup instructions
- **[DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)** - Deployment checklist

## 🗄️ Database Setup

Run these SQL scripts in Supabase SQL Editor (in order):

1. `supabase-auth-schema.sql` - Authentication & profiles
2. `supabase-groups-schema.sql` - Groups & communities
3. `supabase-subscription-schema.sql` - Stripe subscriptions
4. `supabase-social-schema.sql` - Social features (follows, comments, notifications)
5. `supabase-admin-schema.sql` - Admin dashboard & moderation

## 🔧 Environment Variables

See `env.example` for required environment variables.

Required:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `STRIPE_SECRET_KEY` (for subscriptions)
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`

## 📦 Install & Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🧪 Testing

After setup, test these features:
- ✅ Authentication (`/auth`)
- ✅ Feed loads posts (`/feed`)
- ✅ Like posts
- ✅ Comment on posts
- ✅ Follow users
- ✅ Notifications (bell icon)
- ✅ Groups (`/groups`)
- ✅ Admin dashboard (`/admin` - admin only)

## 🐛 Troubleshooting

See [SETUP.md](./SETUP.md#-troubleshooting) for common issues and solutions.

## 📄 License

Private - All rights reserved.
