'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { authCopy } from '@/content/auth';
import AuthCard from '@/components/auth/AuthCard';
import SegmentedControl from '@/components/ui/SegmentedControl';
import LegalCheck from '@/components/ui/LegalCheck';
import FlameButton from '@/components/ui/FlameButton';
import Logo from '@/components/ui/Logo';
import { supabase } from '@/lib/supabaseClient';

function OnboardingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, profile, loading, isAuthenticated, updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    handle: '',
    avatarUrl: '',
    role: 'follower' as 'creator' | 'follower',
    agreedTos: false,
  });
  const [errors, setErrors] = useState<{
    fullName?: string;
    handle?: string;
    role?: string;
    agreedTos?: string;
  }>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Get role from URL params or user metadata
  useEffect(() => {
    if (!loading && isAuthenticated && user) {
      // Check if profile already exists
      if (profile) {
        // Profile exists, redirect based on role
        router.push(profile.role === 'creator' ? authCopy.onboarding.creatorRedirect : authCopy.onboarding.followerRedirect);
        return;
      }

      // Get role from user metadata or URL params
      const getInitialData = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        const userMetadata = session?.user?.user_metadata;
        const roleFromMeta = userMetadata?.role;
        const roleFromUrl = searchParams.get('role');
        const initialRole = (roleFromUrl || roleFromMeta || 'follower') as 'creator' | 'follower';

        setFormData({
          fullName: userMetadata?.full_name || user.email?.split('@')[0] || '',
          handle: '',
          avatarUrl: userMetadata?.avatar_url || '',
          role: initialRole,
          agreedTos: false,
        });
      };
      getInitialData();
    } else if (!loading && !isAuthenticated) {
      router.push('/auth');
    }
  }, [loading, isAuthenticated, user, profile, router, searchParams]);

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.handle.trim()) {
      newErrors.handle = 'Handle is required';
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.handle)) {
      newErrors.handle = 'Handle can only contain letters, numbers, and underscores';
    } else if (formData.handle.length < 3) {
      newErrors.handle = 'Handle must be at least 3 characters';
    }

    if (!formData.role) {
      newErrors.role = 'Role is required';
    }

    if (!formData.agreedTos) {
      newErrors.agreedTos = 'You must agree to Terms & Privacy';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSubmitting(true);

    if (!validateForm()) {
      setSubmitting(false);
      return;
    }

    try {
      // Check if handle is available
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('id')
        .eq('handle', formData.handle)
        .single();

      if (existingProfile) {
        setErrors({ handle: 'This handle is already taken' });
        setSubmitting(false);
        return;
      }

      // Upsert profile
      const { error } = await supabase.from('profiles').upsert({
        id: user!.id,
        full_name: formData.fullName.trim(),
        handle: formData.handle.trim().toLowerCase(),
        avatar_url: formData.avatarUrl.trim() || null,
        role: formData.role,
        agreed_tos: formData.agreedTos,
      });

      if (error) throw error;

      setSuccess(true);
      // Redirect after short delay
      setTimeout(() => {
        router.push(
          formData.role === 'creator'
            ? authCopy.onboarding.creatorRedirect
            : authCopy.onboarding.followerRedirect
        );
      }, 1000);
    } catch (err: any) {
      setErrors({ handle: err.message || 'Failed to create profile' });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <AuthCard>
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <Logo variant="hero" className="mx-auto mb-6" />
            <p className="text-slate-400 text-lg">Authenticating your account…</p>
          </motion.div>
        </div>
      </AuthCard>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <AuthCard className="max-w-2xl">
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
        {authCopy.onboarding.title}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: prefersReducedMotion ? 0.2 : 0.4, delay: 0.15 }}
        className="text-slate-400 text-center text-sm mb-8"
      >
        {authCopy.onboarding.subtitle}
      </motion.p>

      {/* Form */}
      <AnimatePresence mode="wait">
        {success ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-8"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4"
            >
              <svg
                className="w-8 h-8 text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </motion.div>
            <p className="text-green-400 text-lg font-medium">Profile created!</p>
            <p className="text-slate-400 text-sm mt-2">Redirecting you now...</p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0.2 : 0.4, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-slate-300 mb-2">
                {authCopy.onboarding.fields.fullName}
              </label>
              <input
                id="fullName"
                type="text"
                value={formData.fullName}
                onChange={(e) => {
                  setFormData({ ...formData, fullName: e.target.value });
                  setErrors({ ...errors, fullName: undefined });
                }}
                required
                disabled={submitting}
                aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                className="w-full px-4 py-3 rounded-xl bg-slate-900/70 border border-slate-700 text-white text-sm outline-none focus:ring-2 focus:ring-amber/50 focus:border-amber/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              />
              {errors.fullName && (
                <motion.p
                  id="fullName-error"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 text-sm text-red-400"
                  role="alert"
                >
                  {errors.fullName}
                </motion.p>
              )}
            </div>

            {/* Handle */}
            <div>
              <label htmlFor="handle" className="block text-sm font-medium text-slate-300 mb-2">
                {authCopy.onboarding.fields.handle}
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                  @
                </span>
                <input
                  id="handle"
                  type="text"
                  placeholder={authCopy.onboarding.fields.handlePlaceholder}
                  value={formData.handle}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^a-zA-Z0-9_]/g, '').toLowerCase();
                    setFormData({ ...formData, handle: value });
                    setErrors({ ...errors, handle: undefined });
                  }}
                  required
                  disabled={submitting}
                  aria-describedby={errors.handle ? 'handle-error' : undefined}
                  className="w-full pl-8 pr-4 py-3 rounded-xl bg-slate-900/70 border border-slate-700 text-white text-sm outline-none focus:ring-2 focus:ring-amber/50 focus:border-amber/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
              {errors.handle && (
                <motion.p
                  id="handle-error"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 text-sm text-red-400"
                  role="alert"
                >
                  {errors.handle}
                </motion.p>
              )}
            </div>

            {/* Avatar URL (optional) */}
            <div>
              <label htmlFor="avatarUrl" className="block text-sm font-medium text-slate-300 mb-2">
                {authCopy.onboarding.fields.avatar} <span className="text-slate-500">(optional)</span>
              </label>
              <input
                id="avatarUrl"
                type="url"
                placeholder="https://example.com/avatar.jpg"
                value={formData.avatarUrl}
                onChange={(e) => setFormData({ ...formData, avatarUrl: e.target.value })}
                disabled={submitting}
                className="w-full px-4 py-3 rounded-xl bg-slate-900/70 border border-slate-700 text-white text-sm outline-none focus:ring-2 focus:ring-amber/50 focus:border-amber/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            {/* Role Selector */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-3">
                {authCopy.onboarding.fields.role}
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
                value={formData.role}
                onChange={(value) => {
                  setFormData({ ...formData, role: value as 'creator' | 'follower' });
                  setErrors({ ...errors, role: undefined });
                }}
                disabled={submitting}
              />
              {errors.role && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 text-sm text-red-400"
                  role="alert"
                >
                  {errors.role}
                </motion.p>
              )}
            </div>

            {/* Legal Checkbox */}
            <LegalCheck
              tosChecked={formData.agreedTos}
              ageChecked={true}
              onTosChange={(checked) => {
                setFormData({ ...formData, agreedTos: checked });
                setErrors({ ...errors, agreedTos: undefined });
              }}
              onAgeChange={() => {}}
              errors={errors.agreedTos ? { tos: errors.agreedTos } : undefined}
            />

            <FlameButton
              type="submit"
              variant="primary"
              disabled={submitting}
              ariaLabel={authCopy.onboarding.submit}
              className="w-full"
            >
              {submitting ? 'Creating...' : authCopy.onboarding.submit}
            </FlameButton>
          </motion.form>
        )}
      </AnimatePresence>
    </AuthCard>
  );
}

export default function OnboardingPage() {
  return (
    <Suspense fallback={
      <AuthCard>
        <div className="text-center">
          <Logo variant="hero" className="mx-auto mb-6" />
          <p className="text-slate-400 text-lg">Loading...</p>
        </div>
      </AuthCard>
    }>
      <OnboardingContent />
    </Suspense>
  );
}
