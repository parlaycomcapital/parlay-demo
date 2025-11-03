/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    container: { center: true, padding: '1rem' },
    extend: {
      colors: {
        // Base Navy
        navy: {
          50: '#0A0F1E',
          100: '#0B132B',
          200: '#101A2E',
          300: '#111C3B',
        },
        // Primary Accents
        ember: '#E63E30',
        amber: '#F5A623',
        // Semantic Colors
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#3B82F6',
        // Neutral Slate
        slatex: {
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        // Extended scale with responsive clamp
        'xs': ['12px', { lineHeight: '16px', letterSpacing: '0.01em' }],
        'sm': ['14px', { lineHeight: '20px', letterSpacing: '0.01em' }],
        'base': ['clamp(0.9rem, 1vw, 1.1rem)', { lineHeight: '1.5', letterSpacing: '0em' }],
        'lg': ['clamp(1rem, 1.25vw, 1.25rem)', { lineHeight: '1.5', letterSpacing: '-0.01em' }],
        'xl': ['clamp(1.125rem, 1.5vw, 1.5rem)', { lineHeight: '1.4', letterSpacing: '-0.01em' }],
        '2xl': ['clamp(1.5rem, 1.6vw, 2rem)', { lineHeight: '1.4', letterSpacing: '-0.02em' }],
        '3xl': ['clamp(1.75rem, 2vw, 2.5rem)', { lineHeight: '1.4', letterSpacing: '-0.02em' }],
        '4xl': ['clamp(2rem, 2.5vw, 3rem)', { lineHeight: '1.3', letterSpacing: '-0.02em' }],
        '5xl': ['clamp(2.5rem, 3vw, 4rem)', { lineHeight: '1.3', letterSpacing: '-0.03em' }],
      },
      boxShadow: {
        // Refined shadow system
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        // Brand shadows
        'ember': '0 0 20px rgba(230, 62, 48, 0.25)',
        'ember-sm': '0 0 10px rgba(230, 62, 48, 0.15)',
        'ember-lg': '0 0 30px rgba(230, 62, 48, 0.35)',
        'card': '0 6px 24px rgba(0, 0, 0, 0.25)',
        'card-hover': '0 8px 32px rgba(0, 0, 0, 0.3)',
      },
      spacing: {
        // 8px grid system
        '1': '8px',
        '2': '16px',
        '3': '24px',
        '4': '32px',
        '5': '40px',
        '6': '48px',
        '8': '64px',
        '10': '80px',
        '12': '96px',
        // Custom spacing
        '260': '260px',
        '280': '280px',
        '720': '720px',
      },
      borderRadius: {
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '24px',
        'xl2': '1.25rem',
      },
      transitionTimingFunction: {
        // Smooth easing functions
        smooth: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
        'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
      },
      transitionDuration: {
        // Standardized durations
        'fast': '150ms',
        'base': '250ms',
        'slow': '350ms',
      },
      lineClamp: {
        1: '1',
        2: '2',
        3: '3',
      },
    },
  },
  plugins: [],
};