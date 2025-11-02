'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, Compass, BarChart2, User } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';

const baseLinks = [
  { href: '/feed', label: 'Feed', icon: Home },
  { href: '/explore', label: 'Explore', icon: Compass },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const links = [
    ...baseLinks,
    ...(session?.user?.role === 'creator' ? [{ href: '/dashboard', label: 'Dashboard', icon: BarChart2 }] : []),
    { href: '/profile', label: 'Profile', icon: User },
  ];

  return (
    <aside className="hidden lg:flex fixed left-0 top-14 bottom-0 w-[260px] border-r border-slate-800 bg-navy-100/60 backdrop-blur-md">
      <div className="p-5 lg:p-6 flex flex-col gap-3 w-full">
        {links.map(({ href, label, icon: Icon }) => (
          <motion.div key={href} whileTap={{ scale: 0.97 }} transition={{ duration: 0.1 }}>
            <Link
              href={href}
              className={`flex items-center gap-3 px-3 py-2 rounded-xl transition ${
                pathname === href
                  ? 'text-amber bg-white/5 shadow-ember-sm'
                  : 'text-slatex-300 hover:text-amber hover:bg-white/5'
              }`}
            >
              <Icon size={18} />
              <span>{label}</span>
            </Link>
          </motion.div>
        ))}
        {session?.user?.role === 'follower' && (
          <div className="mt-6 p-4 card">
            <p className="text-sm text-slatex-400">Upgrade your profile to post premium analyses.</p>
            <div className="mt-3">
              <Link href="/register" className="btn-grad w-full block text-center">
                Become Creator
              </Link>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}