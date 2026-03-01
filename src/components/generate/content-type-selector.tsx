'use client';

import { motion } from 'framer-motion';
import { CONTENT_TYPES, type ContentType } from '@/types';
import { cn } from '@/lib/utils';

interface ContentTypeSelectorProps {
  value: ContentType;
  onChange: (type: ContentType) => void;
}

export function ContentTypeSelector({
  value,
  onChange,
}: ContentTypeSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-text-primary-light dark:text-text-primary-dark">
        Content Type
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {CONTENT_TYPES.map((type) => (
          <motion.button
            key={type.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onChange(type.id)}
            className={cn(
              'relative flex flex-col items-start gap-1.5 rounded-2xl border p-4 text-left transition-all cursor-pointer',
              value === type.id
                ? 'border-emerald-500 bg-emerald-500/5 ring-1 ring-emerald-500/20 shadow-sm shadow-emerald-500/5'
                : 'border-border-light dark:border-border-dark hover:border-emerald-500/30 hover:bg-surface-light dark:hover:bg-surface-dark'
            )}
          >
            <span className="text-xl">{type.icon}</span>
            <span className="text-sm font-medium">{type.label}</span>
            <span className="text-xs text-text-secondary-light dark:text-text-secondary-dark leading-tight">
              {type.description}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
