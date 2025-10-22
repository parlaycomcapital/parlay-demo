'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PreviewLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/preview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        router.push('/');
        router.refresh();
      } else {
        setError('Incorrect password. Please try again.');
      }
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
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="text-4xl">🔥</div>
            <span className="text-white font-bold text-3xl">Parlay</span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Preview Access</h1>
          <p className="text-gray-300">Enter the preview password to access the site</p>
        </div>

        <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Preview Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Enter preview password"
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
              {loading ? 'Verifying...' : 'Access Preview'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              This is a preview version of Parlay.sk
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
