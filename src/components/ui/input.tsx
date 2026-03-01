'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-medium text-text-primary-light dark:text-text-primary-dark"
          >
            {label}
          </label>
        )}
        <input
          id={id}
          ref={ref}
          className={cn(
            'w-full rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-surface-dark px-4 py-2.5 text-sm text-text-primary-light dark:text-text-primary-dark placeholder:text-text-secondary-light/60 dark:placeholder:text-text-secondary-dark/60 transition-all focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent',
            error && 'border-red-500 focus:ring-red-500/40',
            className
          )}
          {...props}
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
