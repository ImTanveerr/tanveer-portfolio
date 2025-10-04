'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const session = useSession();

  const navItems = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Blog', href: '#blog' },
    { name: 'Contact', href: '#contact' },
    { name: 'Skills', href: '#skills' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-6xl px-4 py-2">
        <div className="flex justify-between items-center gap-6 rounded-full px-4 py-2 shadow-sm bg-gradient-to-r from-blue-500/90 to-blue-400/90 dark:from-blue-800/90 dark:to-blue-700/90 backdrop-blur-md">
          
          {/* Left: Logo/Name */}
          <Link
            href="/"
            className="font-bold text-white text-lg tracking-wide hover:scale-105 transition-transform"
          >
            Tanveer
          </Link>

          {/* Right: Navigation + Login/Dashboard */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="font-medium text-white/80 hover:text-white text-sm transition-colors"
              >
                {item.name}
              </a>
            ))}

            <Button
              className="bg-white/90 text-blue-600 hover:bg-white transition-colors h-8 px-4 text-sm"
              disabled={session.status === 'loading'}
              asChild
            >
              <Link href={session.data ? '/dashboard' : '/sign-in'}>
                {session.data ? (
                  'Dashboard'
                ) : session.status === 'loading' ? (
                  <span className="flex flex-row items-center gap-1">
                    <Loader2 className="animate-spin h-4 w-4" />
                    Loading...
                  </span>
                ) : (
                  'Log In'
                )}
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-2 rounded-lg shadow-md bg-blue-500/95 dark:bg-blue-800/95 p-4">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="py-2 font-medium text-white/80 hover:text-white text-sm transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Button
                className="bg-white/90 text-blue-600 hover:bg-white transition-colors h-8 px-4 text-sm mt-2"
                asChild
              >
                <Link href={session.data ? '/dashboard' : '/sign-in'}>
                  {session.data ? 'Dashboard' : 'Sign In'}
                </Link>
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
