'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, Compass, BarChart2, User, Users } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function BottomNav() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const links = [
    { href: '/feed', icon: Home },
    { href: '/leaderboard', icon: BarChart2 },
    { href: '/groups', icon: Users },
    ...(session?.user?.role === 'creator' ? [{ href: '/dashboard', icon: BarChart2 }] : []),
    { href: '/profile', icon: User },
  ];

  // Adjust grid columns based on number of links
  const gridCols = links.length === 4 ? 'grid-cols-4' : 'grid-cols-3';

  return (
    <nav className="fixed lg:hidden bottom-0 inset-x-0 h-14 border-t border-slate-800 bg-navy-100/80 backdrop-blur-md z-40">
      <div className={`grid ${gridCols} h-full text-slatex-400`}>
        {links.map(({ href, icon: Icon }) => (
          <motion.div key={href} whileTap={{ scale: 0.9 }} transition={{ duration: 0.1 }}>
            <Link
              href={href}
              className={`flex items-center justify-center transition ${
                pathname === href ? 'text-amber' : 'hover:text-amber'
              }`}
            >
              <Icon size={20} />
            </Link>
          </motion.div>
        ))}
      </div>
    </nav>
  );
}