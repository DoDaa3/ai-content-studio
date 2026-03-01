'use client';

import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '@/providers/theme-provider';
import { cn } from '@/lib/utils';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const options = [
    { value: 'light' as const, icon: Sun, label: 'Light' },
    { value: 'dark' as const, icon: Moon, label: 'Dark' },
    { value: 'system' as const, icon: Monitor, label: 'System' },
  ];

  return (
    <div className="flex items-center gap-1 rounded-xl bg-surface-light dark:bg-surface-dark p-1">
      {options.map(({ value, icon: Icon, label }) => (
        <button
          key={value}
          onClick={() => setTheme(value)}
          className={cn(
            'flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all cursor-pointer',
            theme === value
              ? 'bg-white dark:bg-card-dark text-accent shadow-sm'
              : 'text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-text-primary-dark'
          )}
          aria-label={`Switch to ${label} theme`}
        >
          <Icon className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">{label}</span>
        </button>
      ))}
    </div>
  );
}
