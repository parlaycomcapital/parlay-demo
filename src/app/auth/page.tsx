'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Logo from '@/components/ui/Logo';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'creator' | 'follower'>('follower');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [mode, setMode] = useState<'login' | 'register'>('register');
  const router = useRouter();
  const { isAuthenticated } = useSupabaseAuth();

  useEffect(() => {
    // If already authenticated, redirect to feed
    if (isAuthenticated) {
      router.push('/feed');
    }
  }, [isAuthenticated, router]);

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      // Use magic link (OTP) for both sign up and sign in
      // The first time user signs up, Supabase will create account
      // Subsequent uses will sign them in
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/onboarding`,
          data: mode === 'register' ? {
            role,
            full_name: email.split('@')[0], // Default name from email
          } : undefined,
        },
      });

      if (error) throw error;

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setLoading(true);
    setError('');

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/onboarding`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });

      if (error) throw error;
    } catch (err: any) {
      setError(err.message || 'Failed to sign in with Google. Please try again.');
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#0A1027] via-[#0B132B] to-[#101A2E] px-4 py-10">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at 50% 30%, rgba(178,66,48,0.15), transparent 70%)`,
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md bg-card/70 backdrop-blur-lg p-8 rounded-2xl border border-slate-800/60 shadow-[0_0_40px_rgba(245,166,35,0.1)] z-10"
      >
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Logo variant="hero" />
        </div>

        {/* Header */}
        <h1 className="text-3xl font-poppins font-semibold text-white text-center mb-2">
          {mode === 'register' ? 'Welcome to Parlay' : 'Welcome Back'}
        </h1>
        <p className="text-slate-400 text-center text-sm">
          {mode === 'register'
            ? 'Join the social network for smart sports minds.'
            : 'Sign in to continue exploring insights.'}
        </p>

        {/* Mode Toggle */}
        <div className="mt-6 flex gap-2 p-1 bg-slate-900/50 rounded-lg">
          <button
            onClick={() => {
              setMode('register');
              setError('');
              setSuccess(false);
            }}
            className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all ${
              mode === 'register'
                ? 'bg-gradient-to-r from-ember to-amber text-white shadow-[0_0_12px_rgba(245,166,35,0.3)]'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Sign Up
          </button>
          <button
            onClick={() => {
              setMode('login');
              setError('');
              setSuccess(false);
            }}
            className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all ${
              mode === 'login'
                ? 'bg-gradient-to-r from-ember to-amber text-white shadow-[0_0_12px_rgba(245,166,35,0.3)]'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Sign In
          </button>
        </div>

        {/* Role Selector (only show on register) */}
        {mode === 'register' && (
          <div className="mt-6">
            <label className="block text-sm font-medium text-slate-300 mb-3">
              Choose your role
            </label>
            <div className="flex gap-3">
              <motion.button
                onClick={() => setRole('follower')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex-1 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  role === 'follower'
                    ? 'bg-amber/20 text-amber border-2 border-amber/40 shadow-[0_0_12px_rgba(245,166,35,0.2)]'
                    : 'bg-slate-800/50 text-slate-300 border-2 border-transparent hover:border-slate-700'
                }`}
              >
                Follower
              </motion.button>
              <motion.button
                onClick={() => setRole('creator')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex-1 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  role === 'creator'
                    ? 'bg-amber/20 text-amber border-2 border-amber/40 shadow-[0_0_12px_rgba(245,166,35,0.2)]'
                    : 'bg-slate-800/50 text-slate-300 border-2 border-transparent hover:border-slate-700'
                }`}
              >
                Creator
              </motion.button>
            </div>
          </div>
        )}

        {/* Email Form */}
        <form onSubmit={handleEmailAuth} className="mt-6">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
            className="w-full px-4 py-3 rounded-xl bg-slate-900/70 border border-slate-700 text-white text-sm outline-none focus:ring-2 focus:ring-amber/50 focus:border-amber/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          />

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 text-sm text-red-400"
            >
              {error}
            </motion.p>
          )}

          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 p-3 rounded-lg bg-green-500/10 border border-green-500/30"
            >
              <p className="text-sm text-green-400">
                {mode === 'register'
                  ? 'Check your email to confirm your account!'
                  : 'Check your email for the magic link!'}
              </p>
            </motion.div>
          )}

          <motion.button
            type="submit"
            disabled={loading || !email}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full mt-4 py-3 rounded-xl bg-gradient-to-r from-ember to-amber text-white font-medium hover:shadow-[0_0_20px_rgba(245,166,35,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {loading ? 'Sending...' : mode === 'register' ? 'Create Account' : 'Send Magic Link'}
          </motion.button>
        </form>

        {/* Divider */}
        <div className="relative mt-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-700" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-card/70 text-slate-400">Or continue with</span>
          </div>
        </div>

        {/* Google OAuth Button */}
        <motion.button
          onClick={handleGoogleAuth}
          disabled={loading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full mt-4 py-3 rounded-xl border border-slate-700 text-slate-200 hover:bg-slate-800/50 hover:border-slate-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
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
          Continue with Google
        </motion.button>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-slate-500">
          By continuing, you agree to Parlay's{' '}
          <a href="/terms" className="text-amber hover:underline">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="/privacy" className="text-amber hover:underline">
            Privacy Policy
          </a>
        </p>
      </motion.div>
    </main>
  );
}

