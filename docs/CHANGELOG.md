# Changelog

All notable changes to Parlay will be documented in this file.

## [0.2.0-alpha-polish] - 2024-XX-XX

### Design & UI Polish

#### Logo & Brand
- Removed orange/amber glow effects behind logo
- Added subtle glass container effect
- Optimized logo rendering with brightness filter

#### Layout & Components
- Lightened card shadows to `rgba(198,74,56,0.1)`
- Standardized feed spacing to 24px vertical rhythm
- Updated card hover lift to -3px max

#### Typography
- Responsive h1 scale: `clamp(1.8rem, 3vw, 2.6rem)`
- Responsive h2 scale: `clamp(1.4rem, 2vw, 2rem)`
- Changed subtitle weights from bold to semibold
- Added font preconnect links for faster loading

#### Color System
- Updated color tokens:
  - Ember: `#E63E30` → `#C64A38`
  - Amber: `#F5A623` → `#E0A14C`
- Muted shadow intensities
- Updated gradient colors

#### Animations
- Reduced animation durations: 0.8s → 0.5s (long)
- Standardized easing: `cubic-bezier(0.25,0.1,0.25,1)`
- Reduced card hover lift from -4px to -3px

#### Responsiveness
- Added touch device scrollbar hiding
- Improved mobile bottom nav spacing
- Responsive typography with clamp()

#### Accessibility
- Added aria-labels to all icon buttons
- Enhanced focus visible states
- Skip to content link present
- Keyboard navigation improved

#### Performance
- Added font preconnect links
- Image optimization priorities
- Lazy loading for charts

### Documentation
- Added DESIGN_GUIDE.md
- Added DEVELOPMENT_GUIDE.md
- Created CHANGELOG.md
- Updated .env.local.example

---

## [0.1.0-alpha] - 2024-XX-XX

### Initial Release
- Free alpha launch
- Placeholder mode
- Core features: Feed, Groups, Leaderboard, Profiles
