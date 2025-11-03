'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, Compass, BarChart2, User, Users, Shield, TrendingUp, Palette } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';

const baseLinks = [
  { href: '/feed', label: 'Feed', icon: Home },
  { href: '/leaderboard', label: 'Leaderboard', icon: TrendingUp },
  { href: '/groups', label: 'Communities', icon: Users },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const links = [
    ...baseLinks,
    ...(session?.user?.role === 'creator' ? [{ href: '/dashboard', label: 'Dashboard', icon: BarChart2 }] : []),
    ...(session?.user?.role === 'admin' ? [{ href: '/admin', label: 'Admin', icon: Shield }] : []),
    { href: '/profile', label: 'Profile', icon: User },
  ];

  return (
    <aside className="hidden lg:flex fixed left-0 top-[56px] bottom-0 w-[260px] border-r border-slate-800 bg-navy-100/60 backdrop-blur-md z-30">
      <div className="p-5 lg:p-6 flex flex-col gap-2 w-full">
        {links.map(({ href, label, icon: Icon }) => (
          <motion.div 
            key={href} 
            whileTap={{ scale: 0.97 }} 
            whileHover={{ x: 4 }}
            transition={{ duration: 0.15 }}
          >
            <Link
              href={href}
              className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                pathname === href
                  ? 'text-amber bg-white/5 shadow-ember-sm'
                  : 'text-slatex-300 hover:text-amber hover:bg-white/5'
              }`}
            >
              {pathname === href && (
                <motion.div
                  layoutId="activeSidebarLink"
                  className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-ember to-amber rounded-r-full"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <Icon size={18} strokeWidth={pathname === href ? 2.5 : 2} />
              <span className="font-medium">{label}</span>
            </Link>
          </motion.div>
        ))}
        {session?.user?.role === 'follower' && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 card bg-gradient-to-br from-ember/10 to-amber/10 border-amber/20"
          >
            <p className="text-sm text-slatex-300 font-medium">Upgrade to Creator</p>
            <p className="text-xs text-slatex-400 mt-1">Post premium analyses and manage communities.</p>
            <div className="mt-3">
              <Link href="/register" className="btn-grad w-full block text-center text-sm py-2">
                Become Creator
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </aside>
  );
}