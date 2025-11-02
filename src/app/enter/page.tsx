'use client';
import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Logo from '@/components/ui/Logo';

function EnterPageContent() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const params = useSearchParams();
  const redirectTo = params?.get('redirectTo') || '/';

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    const res = await fetch('/api/auth/password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      router.push(redirectTo);
    } else {
      const json = await res.json().catch(() => ({ message: 'Invalid password' }));
      setError(json?.message || 'Invalid password');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B132B] p-6">
      <div className="max-w-md w-full bg-[#0F1A33] p-8 rounded-2xl shadow-lg">
        <div className="flex flex-col items-center">
          {/* Logo component */}
          <Logo size={96} variant="solid" className="mb-4" />
          <h1 className="text-white text-2xl font-semibold mb-2">Site access</h1>
          <p className="text-slate-300 mb-4">Enter the access password to continue.</p>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full px-4 py-3 rounded-lg bg-[#0B132B] border border-slate-700 text-white placeholder-slate-400 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
            aria-label="Site password"
          />
          {error && <div className="text-rose-400 text-sm">{error}</div>}
          <button
            type="submit"
            className="w-full mt-2 px-4 py-3 bg-gradient-to-r from-ember to-amber text-white rounded-xl font-semibold hover:opacity-90 transition-opacity"
          >
            Unlock site
          </button>
        </form>
      </div>
    </div>
  );
}

export default function EnterPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#0B132B]">
        <div className="text-white">Loading...</div>
      </div>
    }>
      <EnterPageContent />
    </Suspense>
  );
}
