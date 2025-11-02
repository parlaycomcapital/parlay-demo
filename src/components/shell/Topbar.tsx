'use client';
import Link from 'next/link';
import Logo from '../ui/Logo';
import ThemeToggle from '../ui/ThemeToggle';
import { usePathname } from 'next/navigation';

export default function Topbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-[#0B132B] border-b border-slate-800 px-5 py-4">
      <div className="flex items-center justify-between max-w-[var(--content-width)] mx-auto">
        <Link href="/" className="flex items-center gap-2 text-xl font-semibold">
          <Logo variant="transparent" size={28} />
          <span className="text-white">Parlay</span>
        </Link>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link
            href="/login"
            className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition"
          >
            Login
          </Link>
        </div>
      </div>
    </header>
  );
}

