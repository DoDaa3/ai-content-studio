'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Copy,
  Check,
  RefreshCw,
  Bookmark,
  BookmarkCheck,
  Type,
  Hash,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { countWords, countCharacters } from '@/lib/utils';
import { toast } from 'sonner';

interface OutputDisplayProps {
  content: string;
  isStreaming: boolean;
  isSaved: boolean;
  onRegenerate: () => void;
  onSave: () => void;
  isRegenerating: boolean;
  isSaving: boolean;
}

export function OutputDisplay({
  content,
  isStreaming,
  isSaved,
  onRegenerate,
  onSave,
  isRegenerating,
  isSaving,
}: OutputDisplayProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    toast.success('Copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glass-card rounded-xl overflow-hidden"
    >
      {/* Toolbar */}
      <div className="flex items-center justify-between border-b px-4 py-3">
        <div className="flex items-center gap-4 text-xs text-text-secondary-light dark:text-text-secondary-dark">
          <span className="flex items-center gap-1">
            <Type className="h-3.5 w-3.5" />
            {countWords(content)} words
          </span>
          <span className="flex items-center gap-1">
            <Hash className="h-3.5 w-3.5" />
            {countCharacters(content)} chars
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            disabled={isStreaming}
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
            {copied ? 'Copied' : 'Copy'}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onRegenerate}
            disabled={isStreaming}
            loading={isRegenerating}
          >
            <RefreshCw className="h-4 w-4" />
            Regenerate
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onSave}
            disabled={isStreaming || isSaved}
            loading={isSaving}
          >
            {isSaved ? (
              <BookmarkCheck className="h-4 w-4 text-accent" />
            ) : (
              <Bookmark className="h-4 w-4" />
            )}
            {isSaved ? 'Saved' : 'Save'}
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap leading-relaxed">
          {content}
          {isStreaming && (
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="inline-block w-0.5 h-5 bg-accent ml-0.5 align-text-bottom"
            />
          )}
        </div>
      </div>
    </motion.div>
  );
}
