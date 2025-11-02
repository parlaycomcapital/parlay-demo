/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    container: { center: true, padding: '1rem' },
    extend: {
      colors: {
        navy: {
          50: '#0A0F1E',
          100: '#0B132B',
          200: '#101A2E',
          300: '#111C3B',
        },
        ember: '#E63E30',
        amber: '#F5A623',
        slatex: {
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
        },
      },
      boxShadow: {
        ember: '0 0 20px rgba(230,62,48,0.18)',
        card: '0 6px 24px rgba(0,0,0,0.25)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.25,0.1,0.25,1)',
      },
    },
  },
  plugins: [],
};
