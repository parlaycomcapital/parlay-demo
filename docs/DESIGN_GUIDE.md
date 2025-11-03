# Parlay Design Guide

## Brand Identity

### Colors

- **Navy**: `#0B132B` - Primary background
- **Card**: `#101A2E` - Card/surface background
- **Ember**: `#C64A38` - Primary accent (muted)
- **Amber**: `#E0A14C` - Secondary accent (muted)
- **Accent**: `#F5A623` - Highlight color

### Typography

**Font Families:**
- Headings: Poppins (weights: 400, 500, 600, 700)
- Body: Inter (weights: 400, 500, 600, 700)
- Mono: JetBrains Mono (weights: 400, 500)

**Scale:**
- h1: `clamp(1.8rem, 3vw, 2.6rem)` - semibold
- h2: `clamp(1.4rem, 2vw, 2rem)` - semibold
- h3: semibold
- Body: Use `font-medium` not `font-bold` for subtitles

### Spacing

Consistent 8/12/20 grid scale:
- Cards: 24px vertical rhythm
- Container padding: 20px gutters
- Sidebar: 260px width
- Feed: 720px max-width

### Shadows

- Card default: `0 0 16px rgba(198,74,56,0.1)`
- Card hover: `0 8px 32px rgba(0,0,0,0.3), 0 0 20px rgba(198,74,56,0.1)`
- Ember shadow: `0 0 20px rgba(198,74,56,0.15)`

### Motion

- Duration: 0.2s (short), 0.25s (medium), 0.5s (long)
- Easing: `cubic-bezier(0.25,0.1,0.25,1)` globally
- Card hover lift: `-3px` max
- Reduced motion: Wrapped in `@media (prefers-reduced-motion: no-preference)`

## Components

### Logo
- 1:1 aspect ratio, object-contain
- Sizes: 28px (nav), 40px (sidebar), 84px (hero)
- Subtle brightness filter, no glow

### Cards
- Background: `bg-card/90`
- Backdrop blur: `backdrop-blur-md`
- Border: `border-slate-800/50`
- Hover: TranslateY(-3px), scale(1.01)

### Scrollbars
- Width: 6px
- Track: `rgba(30,41,59,0.3)`
- Thumb: `rgba(198,74,56,0.4)`
- Hidden on touch devices

## Responsive

Breakpoints:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

Mobile:
- Bottom nav: 28px icons, 8px/12px padding
- Safe area inset for bottom padding

## Accessibility

- All interactive elements have `aria-label`
- Focus visible: `0 0 0 3px rgba(224,161,76,0.18)`
- Skip to content link available
- Keyboard navigation supported
- Color contrast: WCAG AA compliant
