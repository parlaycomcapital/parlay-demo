# 🔥 Parlay — Smart Sports. Smarter Minds.

A social platform for sports analysis where experts share insights and predictions.

## 🚀 Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/parlaycomcapital/parlay-demo)

**Live Demo**: https://parlay-demo.vercel.app/

## 🎨 Design System

This project follows a comprehensive design system for consistency and scalability. See [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) for full documentation.

### Key Principles
- **Clarity First**: Remove ambiguity, prioritize readability
- **Consistency**: Same patterns across the platform
- **Accessibility**: WCAG 2.1 AA compliant
- **Performance**: Fast is a feature
- **Elegance**: Simple, refined, premium feel

### Design Tokens
- **Colors**: Navy base, Ember/Amber accents, Semantic colors
- **Typography**: Poppins (headings), Inter (body), JetBrains Mono (code)
- **Spacing**: 8px grid system
- **Shadows**: 6-level depth hierarchy
- **Motion**: Purposeful, 60fps animations

## 🔐 Preview Access

This is a preview version with placeholder mode enabled:

- **Placeholder Mode**: `PLACEHOLDER_MODE=true` (demo data)
- **Production**: Connect real Supabase/Stripe instances

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint and format
npm run lint
npm run format
```

## 📱 Features

### Core Features ✅
- **Authentication**: NextAuth + Supabase, role-based (Creator/Follower/Admin)
- **Real-time**: Supabase Realtime for notifications, likes, comments
- **Payments**: Stripe integration (checkout, webhooks, subscriptions)
- **Content**: Premium paywalls, content previews
- **Social**: Likes, comments, shares, notifications
- **Analytics**: Leaderboard, ROI tracking, reputation system
- **Groups**: Community management and feeds
- **Admin**: Dashboard, moderation, analytics

### UI/UX Features
- **Responsive**: Mobile-first, tablet, desktop, widescreen
- **Accessible**: WCAG 2.1 AA, keyboard navigation, screen readers
- **Animated**: Smooth micro-interactions, scroll reveals
- **Loading**: Skeleton loaders, progressive enhancement
- **Polished**: Silicon-Valley grade design system

## 🎨 Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **TypeScript** - Type safety and developer experience
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Lucide React** - Icon system

### Backend
- **NextAuth** - Authentication and session management
- **Supabase** - Database, Realtime, Storage
- **Stripe** - Payment processing
- **Next.js API Routes** - Serverless functions

### Deployment
- **Vercel** - Hosting and CI/CD
- **GitHub** - Source control

## 📂 Project Structure

```
parlay-demo/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── api/                # API routes
│   │   ├── dashboard/          # Creator dashboard
│   │   ├── feed/               # Main feed
│   │   ├── leaderboard/        # Analyst rankings
│   │   ├── groups/             # Communities
│   │   └── ...
│   ├── components/
│   │   ├── shell/              # AppShell, Topbar, Sidebar
│   │   ├── feed/               # PostCard, Composer, etc.
│   │   ├── groups/             # Group components
│   │   └── ui/                 # Reusable UI components
│   ├── hooks/                  # Custom React hooks
│   ├── lib/                    # Utilities and clients
│   ├── types/                  # TypeScript definitions
│   └── styles/                 # Global styles
├── public/                     # Static assets
├── supabase-schema.sql         # Database schema
└── tailwind.config.js          # Tailwind configuration
```

## 🔧 Configuration

### Environment Variables

Create `.env.local`:

```env
# NextAuth
NEXTAUTH_SECRET=your-secret-here
NEXTAUTH_URL=http://localhost:3000

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Stripe (optional)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Placeholder Mode
PLACEHOLDER_MODE=true
```

### Supabase Setup

1. Create a Supabase project
2. Run `supabase-schema.sql` in SQL Editor
3. Enable Realtime for tables: posts, likes, comments, notifications
4. Update environment variables

## 📖 Documentation

- **[DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)** - Complete design system
- **[UX_AUDIT.md](./UX_AUDIT.md)** - UX audit and improvements
- **[CHANGELOG_UI_UX.md](./CHANGELOG_UI_UX.md)** - UI/UX changelog
- **[IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md)** - Implementation roadmap

## 🧪 Testing

```bash
# Type checking
npx tsc --noEmit

# Linting
npm run lint

# Build verification
npm run build
```

### Manual Testing Checklist
- [ ] Authentication flow (login, register, logout)
- [ ] Role-based navigation
- [ ] Feed interactions (like, comment, share)
- [ ] Premium content access
- [ ] Subscription flow
- [ ] Leaderboard filters
- [ ] Group creation and joining
- [ ] Admin dashboard
- [ ] Responsive layouts (mobile, tablet, desktop)
- [ ] Keyboard navigation
- [ ] Accessibility (screen reader)

## 🚀 Deployment

### Vercel Deployment
1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Build Optimization
- Automatic code splitting
- Image optimization with next/image
- CSS purging with Tailwind
- Bundle size monitoring

## 🤝 Contributing

### Code Style
- TypeScript strict mode
- ESLint + Prettier
- Follow design system tokens
- Write accessible code

### Component Guidelines
- Single responsibility
- Type-safe props
- Accessible by default
- Mobile-first responsive

## 📄 License

MIT License - Built with ❤️ for sports enthusiasts

## 🙏 Acknowledgments

- Next.js team for the framework
- Tailwind CSS for the utility system
- Supabase for the backend platform
- Vercel for hosting and deployment