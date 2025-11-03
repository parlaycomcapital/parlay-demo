/**
 * Central motion configuration for Parlay
 * Defines spring physics, timing, and easing curves
 */

export const motionConfig = {
  duration: {
    short: 0.2,
    medium: 0.35,
    long: 0.4,
  },
  easing: {
    smooth: [0.25, 0.1, 0.25, 1] as const,
    inOut: [0.4, 0, 0.2, 1] as const,
    outExpo: [0.19, 1, 0.22, 1] as const,
    easeOut: 'easeOut' as const,
    bounce: [0.68, -0.55, 0.265, 1.55] as const,
  },
  spring: {
    gentle: { type: 'spring', stiffness: 150, damping: 25 } as const,
    snappy: { type: 'spring', stiffness: 300, damping: 30 } as const,
    bouncy: { type: 'spring', stiffness: 400, damping: 20 } as const,
    sidebar: { type: 'spring', stiffness: 250, damping: 22 } as const,
  },
};

// Fade animations
export const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.4, ease: [0.19, 1, 0.22, 1] as const } 
  },
};

export const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.3, ease: [0.19, 1, 0.22, 1] as const } 
  },
};

// Slide animations
export const slideIn = (direction: 'left' | 'right' = 'left') => ({
  hidden: { x: direction === 'left' ? -50 : 50, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1, 
    transition: { duration: 0.35, ease: [0.19, 1, 0.22, 1] as const } 
  },
});

// Scale pulse for interactive elements
export const scalePulse = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
  transition: { type: 'spring', stiffness: 300, damping: 20 },
};

export const motionVariants = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },
  slideDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  },
  slideLeft: {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  },
  slideRight: {
    initial: { opacity: 0, x: -100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  },
  scaleUp: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  },
};

// Common transition presets
export const transitions = {
  quick: {
    duration: motionConfig.duration.short,
    ease: motionConfig.easing.smooth,
  },
  smooth: {
    duration: motionConfig.duration.medium,
    ease: motionConfig.easing.smooth,
  },
  elastic: motionConfig.spring.bouncy,
  gentle: motionConfig.spring.gentle,
};

// Stagger children configurations
export const staggerConfig = {
  container: {
    animate: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.05,
      },
    },
  },
  fast: {
    transition: { staggerChildren: 0.03 },
  },
  slow: {
    transition: { staggerChildren: 0.15 },
  },
  icons: {
    transition: { staggerChildren: 0.05 },
  },
};

// Hover and tap presets
export const interactions = {
  hover: { scale: 1.02, transition: transitions.quick },
  tap: { scale: 0.98, transition: transitions.quick },
  hoverLarge: { scale: 1.05, transition: transitions.quick },
  tapLarge: { scale: 0.95, transition: transitions.quick },
};

// Reusable animation props
export const pageTransition = {
  initial: 'initial',
  animate: 'animate',
  exit: 'exit',
  variants: motionVariants.fadeIn,
  transition: transitions.smooth,
};

export const cardHover = {
  whileHover: { 
    y: -3, 
    scale: 1.01,
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), 0 0 20px rgba(198, 74, 56, 0.15)',
    transition: { duration: 0.25, ease: 'easeOut' }
  },
  whileTap: interactions.tap,
};

export const buttonHover = {
  whileHover: {
    ...interactions.hover,
    boxShadow: '0 0 8px rgba(224, 161, 76, 0.3)',
  },
  whileTap: {
    ...interactions.tap,
    boxShadow: 'none',
  },
};

// Modal animation variants
export const modalVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.19, 1, 0.22, 1] as const } },
  exit: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};

export const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};