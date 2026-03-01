'use client';

import { useAuth } from '@/providers/auth-provider';

export function Navbar() {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-end border-b bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-xl px-6 lg:px-8">
      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-sm font-medium leading-none">
            {user?.user_metadata?.full_name || user?.email?.split('@')[0]}
          </p>
          <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
            {user?.email}
          </p>
        </div>
        <div className="flex h-8 w-8 items-center justify-center rounded-full gradient-bg text-white text-sm font-bold">
          {(
            user?.user_metadata?.full_name?.[0] ||
            user?.email?.[0] ||
            'U'
          ).toUpperCase()}
        </div>
      </div>
    </header>
  );
}
