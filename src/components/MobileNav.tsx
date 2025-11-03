'use client';
import { useState } from 'react';
import { Menu, X, Home, BarChart2, User, Settings } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './ui/Logo';

const links = [
  { icon: <Home size={20} />, label: 'Feed', href: '/feed' },
  { icon: <BarChart2 size={20} />, label: 'Dashboard', href: '/dashboard' },
  { icon: <User size={20} />, label: 'Profile', href: '/profile' },
  { icon: <Settings size={20} />, label: 'Settings', href: '/settings' },
];

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-[#0B132B] border border-slate-800 rounded-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile sidebar overlay */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/50" onClick={() => setIsOpen(false)} />
      )}

      {/* Mobile sidebar */}
      <aside
        className={`md:hidden fixed top-0 left-0 z-40 w-64 h-full bg-[#0B132B] border-r border-slate-800 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 space-y-8">
          <div className="flex items-center gap-2 text-2xl font-semibold">
            <Logo variant="mobile" />
            <span className="text-white">Parlay</span>
          </div>
          <nav className="space-y-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
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
          <footer className="text-xs text-slate-500">Parlay ™ {new Date().getFullYear()}</footer>
        </div>
      </aside>
    </>
  );
}
