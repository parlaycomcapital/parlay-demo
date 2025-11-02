'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Logo from './ui/Logo';
import ThemeToggle from './ui/ThemeToggle';

const NavBar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = useSession();

  const user = session?.user;
  const isLoggedIn = !!session?.user;

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/feed', label: 'Feed' },
    ...(isLoggedIn && user?.role === 'creator'
      ? [{ href: '/dashboard', label: 'Dashboard' }]
      : []),
    ...(isLoggedIn ? [{ href: `/profile/${user?.id}`, label: 'Profile' }] : []),
  ];

  return (
    <nav className="bg-navy/95 backdrop-blur-md border-b border-slate/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-4 group">
            <div className="hidden sm:block">
              <Logo size={48} variant="solid" />
            </div>
            <div className="block sm:hidden">
              <Logo size={40} variant="solid" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white group-hover:text-amber transition-colors duration-200">
              Parlay
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  pathname === item.href
                    ? 'bg-gradient-ember text-white shadow-lg shadow-ember/25'
                    : 'text-slate-300 hover:text-white hover:bg-slate/30 hover:scale-105'
                }`}
              >
                {item.label}
              </Link>
            ))}

            {/* Auth Section */}
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              {isLoggedIn ? (
                <>
                  <div className="flex items-center space-x-2">
                    <img
                      src={
                        user?.image ||
                        `https://ui-avatars.com/api/?name=${user?.name}&background=FF6B35&color=fff`
                      }
                      alt={user?.name || 'User'}
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="text-gray-300 text-sm">
                      {user?.name || 'User'} ({user?.role})
                    </span>
                  </div>
                  <button
                    onClick={() => signOut()}
                    className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="bg-gradient-ember text-white px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
                >
                  Login
                </Link>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white focus:outline-none focus:text-white"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-[#0B132B] border-t border-gray-800">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    pathname === item.href
                      ? 'bg-gradient-to-r from-[#FF6B35] to-[#F5A623] text-white'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              {/* Mobile Auth Section */}
              <div className="border-t border-gray-700 pt-4 mt-4">
                {isLoggedIn ? (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 px-3 py-2">
                      <img
                        src={
                          user?.image ||
                          `https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=FF6B35&color=fff`
                        }
                        alt={user?.name || 'User'}
                        className="w-8 h-8 rounded-full"
                      />
                      <span className="text-gray-300 text-sm">
                        {user?.name || 'User'} ({user?.role})
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        signOut();
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/login"
                    className="block bg-gradient-ember text-white px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
