'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Copy, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  formatRelativeDate,
  truncateText,
  getContentTypeLabel,
  getContentTypeIcon,
} from '@/lib/utils';
import type { Generation } from '@/types';
import { toast } from 'sonner';

interface HistoryCardProps {
  generation: Generation;
  onDelete: (id: string) => void;
  isDeleting: boolean;
}

export function HistoryCard({
  generation,
  onDelete,
  isDeleting,
}: HistoryCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generation.generated_content);
      setCopied(true);
      toast.success('Copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Failed to copy to clipboard');
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="glass-card rounded-2xl overflow-hidden"
    >
      {/* Header */}
      <div
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-surface-light/50 dark:hover:bg-surface-dark/50 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-xl flex-shrink-0">
            {getContentTypeIcon(generation.content_type)}
          </span>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                {getContentTypeLabel(generation.content_type)}
              </span>
              <span className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
                {formatRelativeDate(generation.created_at)}
              </span>
            </div>
            <p className="text-sm font-medium truncate">{generation.topic}</p>
            {!expanded && (
              <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mt-0.5">
                {truncateText(generation.generated_content, 120)}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-1 flex-shrink-0 ml-2">
          {expanded ? (
            <ChevronUp className="h-4 w-4 text-text-secondary-light dark:text-text-secondary-dark" />
          ) : (
            <ChevronDown className="h-4 w-4 text-text-secondary-light dark:text-text-secondary-dark" />
          )}
        </div>
      </div>

      {/* Expanded content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="border-t px-4 py-4">
              {/* Metadata */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="inline-flex items-center rounded-lg bg-surface-light dark:bg-surface-dark px-2.5 py-1 text-xs font-medium">
                  Tone: {generation.tone}
                </span>
                <span className="inline-flex items-center rounded-lg bg-surface-light dark:bg-surface-dark px-2.5 py-1 text-xs font-medium">
                  Length: {generation.length}
                </span>
                {generation.target_audience && (
                  <span className="inline-flex items-center rounded-lg bg-surface-light dark:bg-surface-dark px-2.5 py-1 text-xs font-medium">
                    Audience: {generation.target_audience}
                  </span>
                )}
              </div>

              {/* Generated content */}
              <div className="rounded-xl bg-surface-light dark:bg-surface-dark p-4 text-sm whitespace-pre-wrap leading-relaxed max-h-80 overflow-y-auto">
                {generation.generated_content}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-2 mt-3">
                <Button variant="ghost" size="sm" onClick={handleCopy}>
                  {copied ? (
                    <Check className="h-4 w-4 text-emerald-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                  {copied ? 'Copied' : 'Copy'}
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => onDelete(generation.id)}
                  loading={isDeleting}
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
