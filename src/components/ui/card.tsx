'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export function Card({
  children,
  className,
  hover = false,
  onClick,
}: CardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -3, scale: 1.01 } : undefined}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className={cn(
        'glass-card rounded-2xl p-6',
        hover && 'cursor-pointer hover:shadow-md hover:shadow-emerald-500/5 dark:hover:shadow-emerald-500/5 transition-shadow',
        className
      )}
    >
      {children}
    </motion.div>
  );
}
