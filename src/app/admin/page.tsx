'use client';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

export default function AdminPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  if (isLoading) return <p className="text-slate-300 text-center mt-10">Loading...</p>;
  if (!user || user.role !== 'admin') {
    router.push('/');
    return null;
  }

  return (
    <main className="max-w-5xl mx-auto py-16 px-6">
      <h1 className="text-3xl font-bold text-white mb-6">Admin Dashboard</h1>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="p-6 bg-[#141E3B] rounded-xl border border-slate-800 text-white">
          <h2 className="text-lg font-semibold mb-2">Total Users</h2>
          <p className="text-amber-400 text-2xl font-bold">1,284</p>
        </div>
        <div className="p-6 bg-[#141E3B] rounded-xl border border-slate-800 text-white">
          <h2 className="text-lg font-semibold mb-2">Total Posts</h2>
          <p className="text-amber-400 text-2xl font-bold">340</p>
        </div>
        <div className="p-6 bg-[#141E3B] rounded-xl border border-slate-800 text-white">
          <h2 className="text-lg font-semibold mb-2">Revenue</h2>
          <p className="text-amber-400 text-2xl font-bold">$2,430</p>
        </div>
      </div>
    </main>
  );
}