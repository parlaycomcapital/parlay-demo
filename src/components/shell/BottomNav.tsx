'use client';

import Link from 'next/link';
import { Home, Compass, BarChart2, User } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function BottomNav() {
  const pathname = usePathname();

  const links = [
    { href: '/feed', icon: Home },
    { href: '/explore', icon: Compass },
    { href: '/dashboard', icon: BarChart2 },
    { href: '/profile', icon: User },
  ];

  return (
    <nav className="fixed lg:hidden bottom-0 inset-x-0 h-14 border-t border-slate-800 bg-navy-100/80 backdrop-blur-md z-40">
      <div className="grid grid-cols-4 h-full text-slatex-400">
        {links.map(({ href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center justify-center transition ${
              pathname === href ? 'text-amber' : 'hover:text-amber'
            }`}
          >
            <Icon size={20} />
          </Link>
        ))}
      </div>
    </nav>
  );
}