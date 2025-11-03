'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { authCopy } from '@/content/auth';
import AuthCard from '@/components/auth/AuthCard';
import SegmentedControl from '@/components/ui/SegmentedControl';
import LegalCheck from '@/components/ui/LegalCheck';
import FlameButton from '@/components/ui/FlameButton';
import Logo from '@/components/ui/Logo';

export default function AuthPage() {
  const router = useRouter();
  const { isAuthenticated, signInWithEmail, signInWithGoogle, loading, error, clearError } = useAuth();
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'creator' | 'follower'>('follower');
  const [tosChecked, setTosChecked] = useState(false);
  const [ageChecked, setAgeChecked] = useState(false);
  const [success, setSuccess] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{
    email?: string;
    tos?: string;
    age?: string;
  }>({});

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/feed');
    }
  }, [isAuthenticated, router]);

  const validateForm = (): boolean => {
    const errors: typeof fieldErrors = {};

    if (!email) {
      errors.email = authCopy.errors.emailRequired;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = authCopy.errors.emailInvalid;
    }

    if (!tosChecked) {
      errors.tos = 'Required';
    }

    if (!ageChecked) {
      errors.age = 'Required';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setSuccess(false);
    setFieldErrors({});

    if (!validateForm()) return;

    try {
      await signInWithEmail(email, role);
      setSuccess(true);
    } catch (err) {
      // Error is handled by useAuth hook
    }
  };

  const handleGoogleAuth = async () => {
    clearError();
    setFieldErrors({});

    if (!tosChecked || !ageChecked) {
      setFieldErrors({
        tos: !tosChecked ? 'Required' : undefined,
        age: !ageChecked ? 'Required' : undefined,
      });
      return;
    }

    try {
      await signInWithGoogle(role);
      // OAuth redirect happens, so we don't set success here
    } catch (err) {
      // Error is handled by useAuth hook
    }
  };

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <AuthCard>
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: prefersReducedMotion ? 0.2 : 0.4 }}
        className="flex justify-center mb-6"
      >
        <Logo variant="hero" />
      </motion.div>

      {/* Header */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: prefersReducedMotion ? 0.2 : 0.4, delay: 0.1 }}
        className="text-3xl font-poppins font-semibold text-white text-center mb-2"
      >
        {authCopy.hero.title}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: prefersReducedMotion ? 0.2 : 0.4, delay: 0.15 }}
        className="text-slate-400 text-center text-sm mb-6"
      >
        {authCopy.hero.subtitle}
      </motion.p>

      {/* Role Selector */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: prefersReducedMotion ? 0.2 : 0.4, delay: 0.2 }}
        className="mb-6"
      >
        <label className="block text-sm font-medium text-slate-300 mb-3">
          Choose your role
        </label>
        <SegmentedControl
          options={[
            {
              value: 'follower',
              label: authCopy.role.follower,
              description: authCopy.role.followerDesc,
            },
            {
              value: 'creator',
              label: authCopy.role.creator,
              description: authCopy.role.creatorDesc,
            },
          ]}
          value={role}
          onChange={(value) => setRole(value as 'creator' | 'follower')}
          disabled={loading}
        />
      </motion.div>

      {/* Email Form */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: prefersReducedMotion ? 0.2 : 0.4, delay: 0.25 }}
        onSubmit={handleEmailAuth}
        className="space-y-4"
      >
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
            {authCopy.email.label}
          </label>
          <input
            id="email"
            type="email"
            placeholder={authCopy.email.placeholder}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setFieldErrors((prev) => ({ ...prev, email: undefined }));
            }}
            required
            disabled={loading || success}
            aria-describedby={fieldErrors.email ? 'email-error' : undefined}
            className="w-full px-4 py-3 rounded-xl bg-slate-900/70 border border-slate-700 text-white text-sm outline-none focus:ring-2 focus:ring-amber/50 focus:border-amber/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          />
          {fieldErrors.email && (
            <motion.p
              id="email-error"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 text-sm text-red-400"
              role="alert"
            >
              {fieldErrors.email}
            </motion.p>
          )}
        </div>

        {/* Legal Checkboxes */}
        <LegalCheck
          tosChecked={tosChecked}
          ageChecked={ageChecked}
          onTosChange={(checked) => {
            setTosChecked(checked);
            setFieldErrors((prev) => ({ ...prev, tos: undefined }));
          }}
          onAgeChange={(checked) => {
            setAgeChecked(checked);
            setFieldErrors((prev) => ({ ...prev, age: undefined }));
          }}
          errors={fieldErrors}
        />

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="p-3 rounded-lg bg-red-500/10 border border-red-500/30"
              role="alert"
            >
              <p className="text-sm text-red-400">{error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success Message */}
        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="p-3 rounded-lg bg-green-500/10 border border-green-500/30"
              role="status"
              aria-live="polite"
            >
              <p className="text-sm text-green-400">{authCopy.email.success}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <FlameButton
          type="submit"
          variant="primary"
          disabled={loading || success}
          ariaLabel={authCopy.email.button}
          className="w-full"
        >
          {loading ? 'Sending...' : authCopy.email.button}
        </FlameButton>
      </motion.form>

      {/* Divider */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="relative mt-6"
      >
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-700" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-card/70 text-slate-400">or</span>
        </div>
      </motion.div>

      {/* Google OAuth Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: prefersReducedMotion ? 0.2 : 0.4, delay: 0.35 }}
        onClick={handleGoogleAuth}
        disabled={loading}
        className="w-full mt-4 py-3 rounded-xl border border-slate-700 text-slate-200 hover:bg-slate-800/50 hover:border-slate-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-amber/50 focus-visible:outline-none"
        aria-label={authCopy.google.button}
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="currentColor"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="currentColor"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="currentColor"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="currentColor"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        {authCopy.google.button}
      </motion.button>
    </AuthCard>
  );
}
