'use client';

import { LENGTHS, type ContentLength } from '@/types';
import { cn } from '@/lib/utils';

interface LengthSelectorProps {
  value: ContentLength;
  onChange: (length: ContentLength) => void;
}

export function LengthSelector({ value, onChange }: LengthSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-text-primary-light dark:text-text-primary-dark">
        Length
      </label>
      <div className="flex gap-3">
        {LENGTHS.map((length) => (
          <button
            key={length.id}
            onClick={() => onChange(length.id)}
            className={cn(
              'flex-1 rounded-lg border px-4 py-2.5 text-center transition-colors cursor-pointer',
              value === length.id
                ? 'border-accent bg-accent/5 ring-1 ring-accent/20'
                : 'border-border-light dark:border-border-dark hover:border-accent/40'
            )}
          >
            <div className="text-sm font-medium">{length.label}</div>
            <div className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
              {length.description}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
