'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Compass, BarChart2, User, Users, Shield, TrendingUp, Palette } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Logo from '@/components/ui/Logo';
import { fadeUp, staggerConfig } from '@/lib/motion';

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

  const sidebarVariants = {
    collapsed: { width: 72, opacity: 1 },
    expanded: { width: 260, opacity: 1 },
  };

  const isExpanded = true; // Can be toggled in future

  return (
    <motion.aside
      className="hidden md:flex fixed left-0 top-[72px] bottom-0 border-r border-slate-800 bg-navy/60 backdrop-blur-md z-30"
      initial="collapsed"
      animate={isExpanded ? 'expanded' : 'collapsed'}
      variants={sidebarVariants}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      <motion.div
        className="p-4 lg:p-5 flex flex-col gap-4 w-full overflow-hidden"
        variants={{
          expanded: {
            transition: { staggerChildren: 0.05, delayChildren: 0.1 },
          },
          collapsed: {
            transition: { staggerChildren: 0.03 },
          },
        }}
      >
        <motion.div
          className="flex items-center justify-center lg:justify-start gap-2 mb-4"
          variants={fadeUp}
        >
          <Logo variant="sidebar" />
          <motion.span
            className="font-heading font-bold text-lg text-white hidden lg:inline"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: isExpanded ? 1 : 0, x: isExpanded ? 0 : -10 }}
            transition={{ duration: 0.2 }}
          >
            Parlay
          </motion.span>
        </motion.div>
        
        <motion.div
          variants={{
            expanded: {
              transition: { staggerChildren: 0.05 },
            },
          }}
        >
          {links.map(({ href, label, icon: Icon }) => (
            <motion.div
              key={href}
              variants={fadeUp}
              whileTap={{ scale: 0.97 }}
              whileHover={{ x: 4 }}
              transition={{ duration: 0.15 }}
              className="group"
            >
              <Link
                href={href}
                className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                  pathname === href
                    ? 'text-amber bg-white/5 shadow-ember-sm'
                    : 'text-slatex-300 hover:text-amber hover:bg-white/5'
                }`}
                aria-label={label}
              >
                {pathname === href && (
                  <motion.div
                    layoutId="activeSidebarLink"
                    className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-ember to-amber rounded-r-full"
                    transition={{ type: 'spring', stiffness: 250, damping: 22 }}
                  />
                )}
                <Icon size={18} strokeWidth={pathname === href ? 2.5 : 2} aria-hidden="true" />
                <motion.span
                  className="font-medium hidden lg:inline"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isExpanded ? 1 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {label}
                </motion.span>
                {/* Tooltip for tablet view */}
                <span className="absolute left-full ml-2 px-2 py-1 bg-card border border-slate-800 rounded-lg text-xs text-textSecondary opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap md:block lg:hidden z-50">
                  {label}
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {session?.user?.role === 'follower' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
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
      </motion.div>
    </motion.aside>
  );
}