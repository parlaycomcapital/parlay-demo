'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ReactNode, useState, useEffect } from 'react';

interface FlameButtonProps {
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
  ariaLabel?: string;
  flameDuration?: number; // Duration in ms, default 350ms
  disabled?: boolean;
}

export default function FlameButton({
  href,
  onClick,
  type = 'button',
  children,
  variant = 'primary',
  className = '',
  ariaLabel,
  flameDuration = 350,
  disabled = false,
}: FlameButtonProps) {
  const [showFlame, setShowFlame] = useState(false);

  useEffect(() => {
    // Trigger flame effect on mount
    setShowFlame(true);
    const timer = setTimeout(() => setShowFlame(false), flameDuration);
    return () => clearTimeout(timer);
  }, [flameDuration]);

  const baseClasses = variant === 'primary'
    ? 'inline-block px-8 py-4 rounded-xl bg-gradient-to-r from-ember to-amber text-white font-medium text-lg hover:shadow-[0_0_28px_rgba(245,166,35,0.4)] transition-all relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none'
    : 'inline-block px-8 py-4 rounded-xl border border-slate-700 text-slate-200 hover:bg-slate-800/50 hover:border-slate-600 transition-all text-lg disabled:opacity-50 disabled:cursor-not-allowed';

  const content = (
    <motion.span
      className="relative z-10 inline-block"
      animate={showFlame && variant === 'primary' ? {
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      } : {}}
      transition={{
        duration: flameDuration / 1000,
        ease: 'easeInOut',
      }}
      style={{
        background: showFlame && variant === 'primary'
          ? 'linear-gradient(90deg, #ffffff 0%, #f5a623 50%, #ffffff 100%)'
          : 'transparent',
        backgroundSize: '200% 100%',
        WebkitBackgroundClip: showFlame && variant === 'primary' ? 'text' : 'unset',
        WebkitTextFillColor: showFlame && variant === 'primary' ? 'transparent' : 'inherit',
        backgroundClip: showFlame && variant === 'primary' ? 'text' : 'unset',
      }}
    >
      {children}
    </motion.span>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={`${baseClasses} ${className}`}
        aria-label={ariaLabel || (typeof children === 'string' ? children : 'Button')}
        aria-disabled={disabled}
      >
        {content}
        {variant === 'primary' && (
          <>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-ember/20 via-amber/30 to-ember/20"
              initial={{ x: '-100%' }}
              animate={showFlame ? { x: '100%' } : { x: '-100%' }}
              transition={{
                duration: flameDuration / 1000,
                ease: 'easeInOut',
              }}
              aria-hidden="true"
            />
            {showFlame && (
              <motion.span
                className="absolute inset-0 z-20"
                style={{
                  background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
                  backgroundSize: '200% 100%',
                }}
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%'],
                }}
                transition={{
                  duration: flameDuration / 1000,
                  ease: 'easeInOut',
                }}
                aria-hidden="true"
              />
            )}
          </>
        )}
      </Link>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${className}`}
      aria-label={ariaLabel || (typeof children === 'string' ? children : 'Button')}
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      >
        {content}
        {variant === 'primary' && (
          <>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-ember/20 via-amber/30 to-ember/20"
              initial={{ x: '-100%' }}
              animate={showFlame ? { x: '100%' } : { x: '-100%' }}
              transition={{
                duration: flameDuration / 1000,
                ease: 'easeInOut',
              }}
              aria-hidden="true"
            />
            {showFlame && (
              <motion.span
                className="absolute inset-0 z-20"
                style={{
                  background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
                  backgroundSize: '200% 100%',
                }}
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%'],
                }}
                transition={{
                  duration: flameDuration / 1000,
                  ease: 'easeInOut',
                }}
                aria-hidden="true"
              />
            )}
          </>
        )}
    </motion.button>
  );
}

