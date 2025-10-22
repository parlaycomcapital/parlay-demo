'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useUser } from '@/hooks/useUser';
import { User } from '@/lib/localStorage';

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
    <div className="min-h-screen bg-[#0B132B] flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link href="/" className="flex items-center justify-center space-x-2 mb-4">
            <div className="text-4xl">🔥</div>
            <span className="text-white font-bold text-3xl">Parlay</span>
          </Link>
          <h1 className="text-2xl font-bold text-white mb-2">Sign In</h1>
          <p className="text-gray-300">Choose your role and enter your username</p>
        </div>

        <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-300 mb-2">
                Choose Your Role
              </label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value as 'fan' | 'analyst' | 'admin')}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="fan">Fan - Browse and purchase analyses</option>
                <option value="analyst">Analyst - Create and share insights</option>
                <option value="admin">Admin - Manage platform</option>
              </select>
            </div>

            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Enter your username"
                required
              />
            </div>

            {error && (
              <div className="text-red-400 text-sm text-center">{error}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-ember text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              This is a demo - no real authentication required
            </p>
            <Link 
              href="/" 
              className="text-orange-400 hover:text-orange-300 text-sm mt-2 inline-block"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
