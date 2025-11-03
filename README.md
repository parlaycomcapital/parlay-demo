# 🔥 Parlay Alpha (v0.3.2-alpha-final)

**The Social Network for Smart Sports Insights**

A premium social platform for sports analysis where verified experts share insights and predictions with transparent performance tracking.

## 🚀 Live Demo

**🌐 Production**: https://parlay-demo.vercel.app

## ✨ Features

### ✅ Authentication & Authorization
- NextAuth + Supabase integration
- Email/password authentication
- Role-based access (Creator, Follower, Admin)
- Secure session management

### 💳 Payment & Subscriptions
- Stripe integration for subscriptions
- GoPay support for CZ/SK markets
- Premium content paywall system
- Subscription tiers (Basic, Pro)

### 👥 Groups & Communities
- Create and manage communities
- Public/Private groups
- Member management
- Community-based content

### 🔒 Premium Content
- Paywall system for locked content
- One-time purchase posts
- Subscription-based access
- Content preview system

### 🏆 Leaderboard & Reputation
- Analyst ROI tracking
- Win rate calculations
- Trust score algorithm
- Follower metrics
- Leaderboard rankings

### 📱 Social Feed
- Real-time post feed
- Like & Share functionality
- Comments & discussions
- Notification system
- Community engagement

### 🛡️ Admin & Moderation
- Admin dashboard
- User management
- Content moderation tools
- Platform analytics
- Verification system

## 🎨 Design System

This project follows a cinematic, premium design system that makes Parlay feel like a billion-dollar tech product.

### Motion Philosophy
- **Cinematic**: Every interaction breathes with purpose
- **Elegant**: Smooth, never flashy
- **Premium**: Apple × Tesla × Coinbase aesthetic
- **Alive**: Gradient fields, ambient lighting, parallax depth

### Visual Identity
- **Typography**: Poppins (headings), Inter (body), JetBrains Mono (code)
- **Colors**: Navy base, Ember (#B24230), Amber (#C89144)
- **Layout**: 260px sidebar, 720px feed width, 20px gutters
- **Motion**: Spring physics, staggered reveals, GPU acceleration
- **Effects**: Particle fields, ambient light, subtle glow animations

### Quality Standards
- 60fps animations
- WCAG 2.1 AA accessibility
- Mobile-first responsive
- Performance-optimized
- Investor-grade polish

## 🛠️ Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Optimize assets
npm run optimize-assets
```

## 📦 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Auth**: NextAuth.js v5
- **Database**: Supabase (PostgreSQL)
- **Styling**: TailwindCSS + Custom Design Tokens
- **Animations**: Framer Motion
- **Payments**: Stripe, GoPay
- **TypeScript**: Full type safety

## 🎯 Core Features Status

| Feature | Status | Completion |
|---------|--------|------------|
| Authentication | ✅ | 100% |
| Payment Gateway | ✅ | 90% (GoPay skeleton) |
| Groups/Communities | ✅ | 100% |
| Paywall System | ✅ | 100% |
| Leaderboard | ✅ | 100% |
| Feed/Notifications | ✅ | 85% |
| Admin Tools | ✅ | 70% |

## 🚢 Deployment

### Vercel (Recommended)

1. **Connect Repository** to Vercel
2. **Set Environment Variables**:
   - `PLACEHOLDER_MODE=true`
   - `NEXTAUTH_URL=https://parlay-demo.vercel.app`
   - `NEXTAUTH_SECRET=your-secret`
   - `NEXT_PUBLIC_SUPABASE_URL=your-url`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key`
3. **Deploy** - Auto-deploys on push to main

### Manual Deploy

```bash
npx vercel --prod --yes
```

## 📖 Documentation

- **Design Guide**: `docs/DESIGN_GUIDE.md`
- **Development Guide**: `docs/DEVELOPMENT_GUIDE.md`
- **Feature Audit**: `docs/FEATURE_AUDIT.md`
- **Changelog**: `docs/CHANGELOG.md`

## 🎬 Alpha Release Notes

**v0.3.2-alpha-final** — Production-ready alpha release

- ✅ Fully responsive cinematic UI
- ✅ Optimized assets and motion system
- ✅ Placeholder data for safe demos
- ✅ Investor Pitch Mode available in `/admin/pitch-dashboard`
- ✅ All TOP PRIORITY features implemented
- ✅ WebP image optimization
- ✅ Accessibility compliance (WCAG 2.1 AA)
- ✅ Performance optimized (LCP < 1.5s target)

## 📸 Screenshots

_Add screenshots of Hero, Feed, Dashboard here_

## 🔐 Environment Variables

See `.env.local.example` for required variables.

## 📝 License

Private — All rights reserved

---

**Built with ❤️ for sports minds**
