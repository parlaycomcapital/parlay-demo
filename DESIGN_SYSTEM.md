# Parlay Design System

## Brand Identity

### Core Philosophy
**Smart Sports. Smarter Minds.** — A premium social platform where analytics meets adrenaline.

### Color System

#### Primary Palette
```css
/* Base Navy */
--navy-50: #0A0F1E   /* Deepest background */
--navy-100: #0B132B  /* Main background */
--navy-200: #101A2E  /* Elevated surfaces */
--navy-300: #111C3B  /* Card backgrounds */

/* Accent Colors */
--ember: #E63E30     /* Primary CTA, emphasis */
--amber: #F5A623     /* Secondary accent, highlights */

/* Neutral Grays */
--slate-300: #CBD5E1  /* Text primary */
--slate-400: #94A3B8  /* Text secondary */
--slate-500: #64748B  /* Text tertiary */
--slate-800: #1E293B  /* Borders */
```

#### Semantic Colors
```css
--success: #10B981   /* Green for positive actions */
--warning: #F59E0B   /* Amber for cautions */
--error: #EF4444     /* Red for errors */
--info: #3B82F6      /* Blue for information */

/* Gradients */
--gradient-primary: linear-gradient(135deg, #E63E30, #F5A623)
--gradient-subtle: linear-gradient(180deg, rgba(230,62,48,0.1), transparent)
```

### Typography

#### Type Scale
```
Hero:     48px / 56px (4xl)
H1:       36px / 44px (3xl)
H2:       30px / 38px (2xl)
H3:       24px / 32px (xl)
H4:       20px / 28px (lg)
Body:     16px / 24px (base)
Small:    14px / 20px (sm)
Tiny:     12px / 16px (xs)
```

#### Font Families
- **Headings**: Poppins (600-700 weight)
- **Body**: Inter (400-500 weight)
- **Monospace**: JetBrains Mono (for code/data)

### Spacing System

Based on 8px grid:
```
1:  8px    (.5rem)
2:  16px   (1rem)
3:  24px   (1.5rem)
4:  32px   (2rem)
5:  40px   (2.5rem)
6:  48px   (3rem)
8:  64px   (4rem)
10: 80px   (5rem)
12: 96px   (6rem)
```

### Component Tokens

#### Shadows
```css
--shadow-sm: 0 1px 2px 0 rgba(0,0,0,0.05)
--shadow-md: 0 4px 6px -1px rgba(0,0,0,0.1)
--shadow-lg: 0 10px 15px -3px rgba(0,0,0,0.1)
--shadow-card: 0 6px 24px rgba(0,0,0,0.25)
--shadow-ember: 0 0 20px rgba(230,62,48,0.25)
--shadow-ember-lg: 0 0 30px rgba(230,62,48,0.35)
```

#### Border Radius
```css
--radius-sm: 4px
--radius-md: 8px
--radius-lg: 12px
--radius-xl: 16px
--radius-2xl: 24px
--radius-full: 9999px
```

#### Transitions
```css
--transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1)
--transition-base: 250ms cubic-bezier(0.4, 0, 0.2, 1)
--transition-slow: 350ms cubic-bezier(0.4, 0, 0.2, 1)
--ease-in-out: cubic-bezier(0.25, 0.1, 0.25, 1)
```

## Component Library

### Atoms

#### Button
```typescript
Variants: 'primary' | 'secondary' | 'ghost' | 'danger'
Sizes: 'sm' | 'md' | 'lg'
States: default | hover | active | disabled | loading
```

#### Input
```typescript
Variants: 'default' | 'error' | 'success'
Sizes: 'sm' | 'md' | 'lg'
States: default | focus | disabled | error
```

#### Badge
```typescript
Variants: 'default' | 'success' | 'warning' | 'error' | 'premium'
Sizes: 'sm' | 'md'
```

### Molecules

#### Card
- Elevated container with shadow
- Hover lift effect
- Consistent padding (p-5/p-6)
- Glassmorphism for premium content

#### PostCard
- Author avatar
- Title with badges
- Content preview/teaser
- Interactive footer (likes, comments, share)
- Premium paywall overlay

#### Navigation
- Topbar (sticky header)
- Sidebar (desktop navigation)
- BottomNav (mobile navigation)
- Active state indicators

### Templates

#### AppShell
- Responsive layout
- 260px sidebar (desktop)
- 720px max-width content
- 20px gutter

#### Page Patterns
- Hero sections
- Feed layouts
- Dashboard grids
- Profile headers

## Responsive Breakpoints

```css
sm: 640px   /* Mobile landscape */
md: 768px   /* Tablet portrait */
lg: 1024px  /* Tablet landscape / Desktop */
xl: 1280px  /* Desktop large */
2xl: 1536px /* Desktop xlarge */
```

## Accessibility Standards

### WCAG 2.1 AA Compliance
- Color contrast: 4.5:1 for text, 3:1 for UI
- Keyboard navigation for all interactive elements
- ARIA labels for screen readers
- Focus indicators visible
- Form validation with error messages
- Skip links for navigation

### Focus States
```css
--focus-ring: 0 0 0 3px rgba(245, 166, 35, 0.18)
```

## Motion Design

### Principles
- **Purposeful**: Every animation serves a function
- **Subtle**: Enhance, don't distract
- **Performant**: 60fps animations only
- **Respectful**: Reduced motion support

### Animations
```typescript
// Hover lift
transform: translateY(-2px)
duration: 150ms

// Tap feedback
scale: 0.98
duration: 100ms

// Fade in
opacity: 0 → 1
duration: 300ms

// Slide up
y: 20px → 0
opacity: 0 → 1
duration: 400ms
```

### Loading States
- Skeleton loaders matching content shape
- Smooth transitions
- Progressive disclosure
- Optimistic UI updates

## Performance Guidelines

### Metrics
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Time to Interactive: < 3.5s
- Cumulative Layout Shift: < 0.1

### Optimization
- Image lazy loading (next/image)
- Code splitting (route-based)
- Font optimization (next/font)
- CSS purging (Tailwind)
- Bundle size monitoring

## Design Principles

1. **Clarity First**: Remove ambiguity, prioritize readability
2. **Consistency**: Same patterns across the platform
3. **Feedback**: Immediate visual response to actions
4. **Forgiveness**: Easy to undo/redo actions
5. **Elegance**: Simple, refined, premium feel
6. **Accessibility**: Usable by everyone
7. **Performance**: Fast is a feature
