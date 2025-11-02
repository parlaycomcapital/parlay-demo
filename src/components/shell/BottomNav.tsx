'use client';
import { Home, BarChart2, User, Settings } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { icon: <Home size={20} />, label: 'Feed', href: '/feed' },
  { icon: <BarChart2 size={20} />, label: 'Dashboard', href: '/dashboard' },
  { icon: <User size={20} />, label: 'Profile', href: '/profile' },
  { icon: <Settings size={20} />, label: 'Settings', href: '/settings' },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#0B132B] border-t border-slate-800 px-4 py-2 z-50">
      <div className="flex items-center justify-around">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition ${
              pathname === link.href
                ? 'text-amber-400'
                : 'text-slate-400 hover:text-amber-400'
            }`}
          >
            {link.icon}
            <span className="text-xs">{link.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}

