'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, Compass, BarChart2, User, Plus } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { fadeUp } from '@/lib/motion';

export default function BottomNav() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const links = [
    { href: '/feed', label: 'Feed', icon: Home },
    { href: '/leaderboard', label: 'Leaderboard', icon: Compass },
    { href: '/create', label: 'Create', icon: Plus },
    { href: '/groups', label: 'Communities', icon: BarChart2 },
    { href: '/profile', label: 'Profile', icon: User },
  ];

  // Adjust grid columns based on number of links
  const gridCols = links.length === 4 ? 'grid-cols-4' : links.length === 5 ? 'grid-cols-5' : 'grid-cols-3';

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
      className="fixed lg:hidden bottom-0 inset-x-0 h-20 border-t border-slate-800 bg-navy/95 backdrop-blur-md z-40 shadow-lg pb-safe"
      style={{ paddingBottom: `calc(env(safe-area-inset-bottom) + 8px)` }}
    >
      <motion.div
        className={`grid ${gridCols} h-full text-slatex-400`}
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.05,
              delayChildren: 0.1,
            },
          },
        }}
      >
        {links.map(({ href, icon: Icon, label }) => (
          <motion.div
            key={href}
            variants={fadeUp}
          >
            <Link
              href={href}
              className="flex flex-col items-center justify-center transition-colors px-2 py-1"
              aria-label={label}
            >
              <motion.div
                whileTap={{ scale: 0.85 }}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
                className={`rounded-full transition-colors ${
                  pathname === href ? 'bg-amber/10 text-amber' : 'hover:text-amber'
                }`}
              >
                <Icon size={28} strokeWidth={pathname === href ? 2.5 : 2} aria-hidden="true" />
              </motion.div>
              <span className={`text-[10px] mt-1 ${pathname === href ? 'text-amber font-medium' : ''}`}>
                {label}
              </span>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </motion.nav>
  );
}