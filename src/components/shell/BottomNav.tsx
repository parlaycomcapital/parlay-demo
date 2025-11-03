'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, TrendingUp, Users, BarChart2, User, Shield } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function BottomNav() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const links = [
    { href: '/feed', icon: Home, label: 'Feed' },
    { href: '/leaderboard', icon: TrendingUp, label: 'Leaderboard' },
    { href: '/groups', icon: Users, label: 'Communities' },
    ...(session?.user?.role === 'creator' ? [{ href: '/dashboard', icon: BarChart2, label: 'Dashboard' }] : []),
    ...(session?.user?.role === 'admin' ? [{ href: '/admin', icon: Shield, label: 'Admin' }] : []),
    { href: '/profile', icon: User, label: 'Profile' },
  ];

  // Adjust grid columns based on number of links
  const gridCols = links.length === 4 ? 'grid-cols-4' : links.length === 5 ? 'grid-cols-5' : 'grid-cols-3';

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed lg:hidden bottom-0 inset-x-0 h-16 border-t border-slate-800 bg-navy-100/95 backdrop-blur-md z-40 shadow-lg"
    >
      <div className={`grid ${gridCols} h-full text-slatex-400`}>
        {links.map(({ href, icon: Icon, label }) => (
          <Link
            key={href}
            href={href}
            className="flex flex-col items-center justify-center transition-colors"
          >
            <motion.div
              whileTap={{ scale: 0.85, y: -2 }}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
              className={`p-2 rounded-full transition-colors ${
                pathname === href ? 'bg-amber/10 text-amber' : 'hover:text-amber'
              }`}
            >
              <Icon size={22} strokeWidth={pathname === href ? 2.5 : 2} />
            </motion.div>
            <span className={`text-[10px] mt-0.5 ${pathname === href ? 'text-amber font-medium' : ''}`}>
              {label}
            </span>
          </Link>
        ))}
      </div>
    </motion.nav>
  );
}