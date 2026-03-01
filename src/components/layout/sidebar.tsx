'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  PenTool,
  Clock,
  User,
  LogOut,
  Menu,
  X,
  Leaf,
} from 'lucide-react';
import { useAuth } from '@/providers/auth-provider';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/generate', label: 'New Generation', icon: PenTool },
  { href: '/history', label: 'History', icon: Clock },
  { href: '/profile', label: 'Profile', icon: User },
];

export function Sidebar() {
  const pathname = usePathname();
  const { signOut } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const sidebarContent = (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-bg shadow-md shadow-emerald-500/20">
          <Leaf className="h-5 w-5 text-white" />
        </div>
        <div>
          <h1 className="text-base font-bold tracking-tight">ContentStudio</h1>
          <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
            AI Content Generator
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                'relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all',
                isActive
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : 'text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-text-primary-dark hover:bg-surface-light dark:hover:bg-surface-dark'
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/10"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                />
              )}
              <item.icon className="relative h-4.5 w-4.5" />
              <span className="relative">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="border-t p-4 space-y-3">
        <ThemeToggle />
        <button
          onClick={signOut}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark hover:text-red-500 hover:bg-red-500/10 transition-all cursor-pointer"
        >
          <LogOut className="h-4.5 w-4.5" />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed top-4 left-4 z-50 lg:hidden rounded-xl glass-card p-2 cursor-pointer"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 z-50 w-[280px] bg-card-light dark:bg-card-dark border-r lg:hidden"
            >
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute top-4 right-4 rounded-lg p-1 hover:bg-surface-light dark:hover:bg-surface-dark cursor-pointer"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:w-[260px] lg:flex-col lg:fixed lg:inset-y-0 bg-card-light dark:bg-card-dark border-r">
        {sidebarContent}
      </aside>
    </>
  );
}
