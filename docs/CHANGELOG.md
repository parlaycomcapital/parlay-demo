# Changelog

All notable changes to Parlay Alpha will be documented in this file.

## [0.3.2-alpha-final] - 2024-01-XX

### 🎨 Visual Finalization
- Increased hero logo clamp: `clamp(96px, 12vw, 140px)`
- Added subtle diagonal gradient background: `#0A1027 → #101A2E`
- Toned down ember/amber saturation by 10%
- Replaced pure white text with `#E2E8F0` for smoother contrast
- Updated feed card shadows: `rgba(230,62,48,0.1)`
- Limited hover glow intensity (opacity 0.3 max)

### 📱 Mobile Polish
- Increased bottom nav height by +4px for thumb reach
- Added 8px safe-area inset for iOS
- Logo pulse animation on mount

### ⚡ Motion Updates
- Universal transition timing: `0.35–0.4s easeOut`
- Sidebar collapse spring: `stiffness: 250, damping: 22`
- Feed reflow uses layout animation from framer-motion

### ✨ UX & Microcopy
- Replaced "Loading…" with brand-aligned phrases:
  - "Fetching smart insights…"
  - "Crunching data…"
  - "Analyzing latest picks…"
- Updated button hover states (scale 1.04 max)
- Smooth scroll behavior applied globally

### ♿ Accessibility
- Added alt text to all images and icons
- Updated meta tags:
  - Description: "Parlay — The Social Network for Smart Sports Insights."
  - OG image: `/assets/brand/optimized/logo-solid@2x.webp`
  - Theme color: `#0B132B`
- Lighthouse a11y score target: ≥ 95

### 🚀 Performance
- WebP image optimization enabled
- Logo preload for faster LCP
- Image sizes configured for responsive loading

### 📦 Deployment
- Production-ready build
- Vercel deployment configuration
- Environment variables documented

---

## [0.3.1-alpha-polish] - 2024-01-XX

### Design Polish
- Logo lighting and background refinement
- Responsive motion polish
- Component library updates
- Tailwind design tokens

---

## [0.2.0-alpha-polish] - 2024-01-XX

### Initial Design Polish
- Color token updates
- Typography scaling
- Responsive layout improvements
- Motion system implementation

---

## [0.1.0-alpha] - 2024-01-XX

### Initial Release
- Core authentication
- Payment gateway integration
- Groups & communities
- Paywall system
- Leaderboard
- Social feed
- Admin tools
