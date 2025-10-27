'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signIn, getSession } from 'next-auth/react';
import Logo from '@/components/ui/Logo';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError('');

    try {
      const result = await signIn('google', {
        redirect: false,
        callbackUrl: '/feed',
      });

      if (result?.error) {
        setError('Failed to sign in with Google');
      } else {
        router.push('/feed');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoSignIn = async () => {
    setLoading(true);
    setError('');

    try {
      // For demo purposes, redirect to feed
      router.push('/feed');
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy via-slate to-navy flex items-center justify-center px-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-gradient-radial from-amber/10 via-ember/5 to-transparent"></div>
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-amber/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-ember/5 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="relative z-10 max-w-md w-full">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 shadow-2xl hover:shadow-ember/10 transition-all duration-500">
          <div className="text-center mb-10">
            {/* Parlay Logo */}
            <Logo variant="solid" size={80} className="mb-6" />

            <h1 className="text-4xl font-bold text-white mb-3 tracking-tight">Welcome to Parlay</h1>
            <p className="text-slate-300 text-lg mb-10 font-medium">Smart Sports. Smarter Minds.</p>
          </div>

          {/* Google Sign In */}
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full bg-white text-gray-900 py-4 px-6 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 mb-4"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin"></div>
            ) : (
              <>
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 1.79-4.53 1.79z"
                  />
                </svg>
                Continue with Google
              </>
            )}
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-slate/50 text-slate-400">Or</span>
            </div>
          </div>

          {/* Demo Sign In */}
          <button
            onClick={handleDemoSignIn}
            disabled={loading}
            className="w-full bg-gradient-ember text-white py-4 px-6 rounded-xl font-bold text-lg hover:scale-105 hover:shadow-2xl hover:shadow-ember/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Entering Demo...
              </span>
            ) : (
              'Enter Demo Mode'
            )}
          </button>

          {error && (
            <div className="text-center mt-4">
              <div
                className={`text-sm ${error.includes('Check your email') ? 'text-green-400' : 'text-red-400'}`}
              >
                {error}
              </div>
            </div>
          )}

          <div className="mt-6 text-center">
            <p className="text-xs text-slate-400 font-body">
              By continuing, you agree to our Terms and Privacy Policy.
            </p>
            <Link
              href="/"
              className="text-amber hover:text-amber/80 text-sm mt-2 inline-block font-body"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
