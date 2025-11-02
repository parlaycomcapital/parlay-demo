'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { signIn } from 'next-auth/react';
import Logo from '@/components/ui/Logo';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<'creator' | 'follower'>('follower');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Register user
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role, name }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Registration failed');
        setLoading(false);
        return;
      }

      // Auto sign in after registration
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('Account created but sign in failed. Please try logging in.');
      } else {
        // Redirect based on role
        if (role === 'creator') {
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
            <Logo size={64} className="mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white mb-2">Create an account</h1>
            <p className="text-slatex-400">Join Parlay and start sharing insights</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input"
                placeholder="Name (optional)"
              />
            </div>

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
                minLength={6}
                className="input"
                placeholder="Password (min 6 characters)"
              />
            </div>

            <div className="space-y-2">
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value as 'creator' | 'follower')}
                required
                className="input"
              >
                <option value="follower">Follower - Browse and subscribe</option>
                <option value="creator">Creator - Post content and manage groups</option>
              </select>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              transition={{ duration: 0.1 }}
              className="btn-grad w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating account...' : 'Create account'}
            </motion.button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-slatex-400 text-sm">
              Already have an account?{' '}
              <Link href="/login" className="text-amber hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
