'use client';

import { TONES, type Tone } from '@/types';
import { cn } from '@/lib/utils';

interface ToneSelectorProps {
  value: Tone;
  onChange: (tone: Tone) => void;
}

export function ToneSelector({ value, onChange }: ToneSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-text-primary-light dark:text-text-primary-dark">
        Tone
      </label>
      <div className="flex flex-wrap gap-2">
        {TONES.map((tone) => (
          <button
            key={tone.id}
            onClick={() => onChange(tone.id)}
            className={cn(
              'rounded-xl px-4 py-1.5 text-sm font-medium transition-all cursor-pointer',
              value === tone.id
                ? 'gradient-bg text-white shadow-sm shadow-emerald-500/20'
                : 'bg-surface-light dark:bg-surface-dark text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-text-primary-dark border border-border-light dark:border-border-dark'
            )}
          >
            {tone.label}
          </button>
        ))}
      </div>
    </div>
  );
}
