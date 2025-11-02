'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { signIn } from 'next-auth/react';
import Logo from '@/components/ui/Logo';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        // In placeholder mode, allow login with any credentials
        const { isPlaceholderMode } = await import('@/lib/mockData');
        if (isPlaceholderMode()) {
          // Redirect based on email (demo@parlay.app -> creator, others -> follower)
          if (email.includes('creator') || email.includes('demo')) {
            router.push('/dashboard');
          } else {
            router.push('/feed');
          }
          return;
        }
        setError('Invalid email or password');
      } else {
        // Get session to check role and redirect accordingly
        const response = await fetch('/api/auth/session');
        const session = await response.json();
        
        if (session?.user?.role === 'creator') {
          router.push('/dashboard');
        } else {
          router.push('/feed');
        }
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-navy-100 flex items-center justify-center p-5 lg:p-6">
      <div className="w-full max-w-md">
        <motion.div
          className="card p-6 lg:p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-center mb-8">
            <Logo size={64} variant="transparent" className="mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white mb-2">Welcome back</h1>
            <p className="text-slatex-400">Sign in to your Parlay account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input"
                placeholder="Email"
              />
            </div>

            <div className="space-y-2">
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="input"
                placeholder="Password"
              />
            </div>

          <motion.button
            type="submit"
            disabled={loading}
            whileTap={{ scale: loading ? 1 : 0.98 }}
            transition={{ duration: 0.1 }}
            className="btn-grad w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </motion.button>
          </form>

                  <div className="mt-6 text-center space-y-2">
                    <p className="text-slatex-400 text-sm">
                      Don't have an account?{' '}
                      <Link href="/register" className="text-amber hover:underline">
                        Sign up
                      </Link>
                    </p>
                    <p className="text-slatex-400 text-sm">
                      <Link href="/forgot-password" className="text-amber hover:underline">
                        Forgot your password?
                      </Link>
                    </p>
                  </div>
        </motion.div>
      </div>
    </div>
  );
}