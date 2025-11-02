'use client';
import Link from 'next/link';
import Logo from '@/components/ui/Logo';

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-navy flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-[#141E3B] p-8 rounded-2xl shadow-lg text-center">
        <Logo size={80} variant="solid" className="mx-auto mb-6" />
        <h1 className="text-2xl font-bold text-white mb-4">Payment Successful!</h1>
        <p className="text-slate-300 mb-6">
          Thank you for your purchase. Your premium content is now unlocked.
        </p>
        <Link
          href="/feed"
          className="bg-gradient-ember text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity"
        >
          View Feed
        </Link>
      </div>
    </div>
  );
}
