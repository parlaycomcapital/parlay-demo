'use client';
import { Home, BarChart2, User, Settings } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './ui/Logo';

const links = [
  { icon: <Home size={20} />, label: 'Feed', href: '/feed' },
  { icon: <BarChart2 size={20} />, label: 'Dashboard', href: '/dashboard' },
  { icon: <User size={20} />, label: 'Profile', href: '/profile' },
  { icon: <Settings size={20} />, label: 'Settings', href: '/settings' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col justify-between w-64 min-h-screen bg-[#0B132B] border-r border-slate-800 p-6 fixed">
      <div className="space-y-8">
        <Link href="/" className="flex items-center gap-2 text-2xl font-semibold">
          <Logo size={32} />
          <span className="text-white">Parlay</span>
        </Link>
        <nav className="space-y-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-xl transition ${
                pathname === link.href
                  ? 'bg-gradient-to-r from-ember to-amber text-white'
                  : 'text-slate-300 hover:text-amber-400 hover:bg-slate-800/50'
              }`}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
      <footer className="text-xs text-slate-500">Parlay ™ {new Date().getFullYear()}</footer>
    </aside>
  );
}
