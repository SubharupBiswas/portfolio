'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
  Award,
  Code2,
  FolderGit2,
  Github,
  Home,
  Linkedin,
  Mail,
  Menu,
  MessageSquare,
  X,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { href: '/', label: 'Home', icon: <Home className="w-3.5 h-3.5" /> },
  { href: '/skills', label: 'Skills', icon: <Code2 className="w-3.5 h-3.5" /> },
  { href: '/projects', label: 'Projects', icon: <FolderGit2 className="w-3.5 h-3.5" /> },
  { href: '/certificates', label: 'Certs', icon: <Award className="w-3.5 h-3.5" /> },
  { href: '/contact', label: 'Contact', icon: <MessageSquare className="w-3.5 h-3.5" /> },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'glass border-b border-slate-200 dark:border-zinc-800 shadow-xs'
            : 'bg-transparent border-b border-transparent'
        )}
      >
        <div className="section-container">
          <nav className="flex items-center justify-between h-16 sm:h-18">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2.5 group cursor-pointer"
            >
              <div className="w-8 h-8 rounded-xl bg-sky-600 dark:bg-sky-500 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform duration-300">
                <span className="font-mono font-bold text-sm text-white">S</span>
              </div>
              <span className="font-bold text-slate-900 dark:text-zinc-100 text-sm sm:text-base group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors duration-200">
                Subharup.com
              </span>
            </Link>

            {/* Desktop Nav Links */}
            <motion.div
              className="hidden md:flex items-center gap-1 glass-subtle px-3 py-1.5 rounded-full border border-slate-200/80 dark:border-zinc-800/80"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'relative flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 cursor-pointer',
                      isActive
                        ? 'text-sky-700 dark:text-sky-300 font-bold'
                        : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-100 hover:bg-slate-200/50 dark:hover:bg-zinc-800/40'
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 bg-sky-500/10 dark:bg-sky-500/15 rounded-full border border-sky-500/30"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{link.icon}</span>
                    <span className="relative z-10">{link.label}</span>
                  </Link>
                );
              })}
            </motion.div>

            {/* Right Actions: Theme Toggle + Mobile Toggle */}
            <motion.div
              className="flex items-center gap-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              {/* Theme Toggle Button */}
              <ThemeToggle />

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileOpen((o: boolean) => !o)}
                className="md:hidden btn-ghost p-2"
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              >
                <AnimatePresence mode="wait">
                  {mobileOpen ? (
                    <motion.span
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <X className="w-5 h-5" />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Menu className="w-5 h-5" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          </nav>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-16 left-0 right-0 z-40 glass border-b border-slate-200 dark:border-zinc-800 md:hidden overflow-hidden"
          >
            <div className="section-container py-4 flex flex-col gap-1">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      'flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium transition-colors cursor-pointer',
                      isActive
                        ? 'text-sky-700 dark:text-sky-300 bg-sky-50 dark:bg-sky-500/15 border border-sky-200 dark:border-sky-500/20 font-bold'
                        : 'text-slate-700 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-zinc-100 hover:bg-slate-200/50 dark:hover:bg-zinc-800/60'
                    )}
                  >
                    {link.icon}
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
