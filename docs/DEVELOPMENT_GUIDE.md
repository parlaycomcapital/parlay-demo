# Parlay Development Guide

## Setup

```bash
npm install
npm run dev
```

## Environment Variables

Copy `.env.local.example` to `.env.local` and configure:

### Required (Placeholder Mode)
- `PLACEHOLDER_MODE=true`
- `NEXTAUTH_SECRET=placeholder`
- `NEXTAUTH_URL=http://localhost:3000`
- `NEXT_PUBLIC_SUPABASE_URL=https://placeholder.supabase.co`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY=placeholder`

### Optional (Production)
- `STRIPE_SECRET_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `GOPAY_API_KEY`
- `GOPAY_SECRET`

## Commands

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript check
npm run analyze      # Bundle size analysis
```

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **TailwindCSS** (Custom design tokens)
- **Framer Motion** (Animations)
- **NextAuth** (Authentication)
- **Supabase** (Database/Auth)
- **Recharts** (Data visualization)

## Project Structure

```
src/
├── app/              # Next.js app router pages
├── components/       # React components
│   ├── ui/          # Base UI components
│   ├── feed/        # Feed components
│   ├── shell/       # Layout components
│   └── auth/        # Auth components
├── lib/             # Utilities & configs
├── hooks/           # React hooks
├── styles/          # Global styles
└── utils/           # Helper functions
```

## Code Style

- TypeScript strict mode
- ESLint + Prettier
- Component props typed
- Consistent naming: PascalCase components, camelCase functions

## Performance

- Image optimization via Next.js `<Image>`
- `priority` only for hero logo
- Lazy load charts and heavy components
- Bundle size target: < 500 kB

## Testing

- Visual regression: `npm run test:visual`
- E2E: Cypress/Playwright
- Build check: GitHub Actions
