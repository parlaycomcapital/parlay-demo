'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useUser } from '@/hooks/useUser';
import { User } from '@/lib/localStorage';
import ParlayLogo from '@/components/ParlayLogo';

export default function Login() {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState<'fan' | 'analyst' | 'admin'>('fan');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useUser();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!username.trim()) {
      setError('Please enter a username');
      setLoading(false);
      return;
    }

    try {
      // Create user object
      const user: User = {
        id: Date.now().toString(),
        username: username.trim(),
        role,
        email: `${username.toLowerCase()}@example.com`,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=FF6B35&color=fff`,
        bio: role === 'analyst' ? 'Professional sports analyst' : 'Sports enthusiast',
        followers: Math.floor(Math.random() * 1000),
        following: Math.floor(Math.random() * 100),
        isAnalyst: role === 'analyst',
        isAdmin: role === 'admin',
        joinDate: new Date().toISOString(),
      };

      login(user);
      router.push('/feed');
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

              return (
                <div className="min-h-screen bg-navy flex items-center justify-center px-4">
                  {/* Background Gradient */}
                  <div className="absolute inset-0 bg-gradient-radial"></div>
                  
                  <div className="relative z-10 max-w-md w-full">
                    <div className="glass rounded-2xl p-8 hover-lift transition-all duration-300">
                      <div className="text-center mb-8">
                        {/* Parlay Logo */}
                        <ParlayLogo size={80} className="mb-6" />
                        
                        <h1 className="text-3xl font-heading font-semibold text-white mb-2">
                          Welcome to Parlay
                        </h1>
                        <p className="text-slate-300 font-body mb-8">
                          Smart Sports. Smarter Minds.
                        </p>
                      </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-white mb-2 font-body">
                Choose Your Role
              </label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value as 'fan' | 'analyst' | 'admin')}
                className="w-full px-4 py-3 bg-slate/30 border border-slate-600 rounded-xl text-white focus:outline-none focus:border-amber focus:ring-amber font-body"
              >
                <option value="fan">Fan - Browse and purchase analyses</option>
                <option value="analyst">Analyst - Create and share insights</option>
                <option value="admin">Admin - Manage platform</option>
              </select>
            </div>

            <div>
              <label htmlFor="username" className="block text-sm font-medium text-white mb-2 font-body">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 bg-slate/30 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-amber focus:ring-amber font-body"
                placeholder="Enter your username"
                required
              />
            </div>

            {error && (
              <div className="text-red-400 text-sm text-center font-body">{error}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-ember text-white py-4 px-6 rounded-xl font-heading font-semibold hover:opacity-90 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover-glow"
            >
              {loading ? 'Signing In...' : 'Enter Parlay'}
            </button>
          </form>

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
