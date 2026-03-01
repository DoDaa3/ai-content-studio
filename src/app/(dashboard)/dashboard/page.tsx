'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  PenTool,
  TrendingUp,
  Clock,
  BarChart3,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { PageTransition } from '@/components/ui/page-transition';
import { Skeleton } from '@/components/ui/skeleton';
import { EmptyState } from '@/components/ui/empty-state';
import { useAuth } from '@/providers/auth-provider';
import {
  useRecentGenerations,
  useGenerationStats,
} from '@/hooks/use-generations';
import {
  formatRelativeDate,
  getContentTypeLabel,
  getContentTypeIcon,
  truncateText,
} from '@/lib/utils';
import { CONTENT_TYPES } from '@/types';

const stagger = {
  animate: {
    transition: { staggerChildren: 0.05 },
  },
};

const fadeIn = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
};

export default function DashboardPage() {
  const { user } = useAuth();
  const { data: recent, isLoading: loadingRecent } = useRecentGenerations();
  const { data: stats, isLoading: loadingStats } = useGenerationStats();

  const firstName =
    user?.user_metadata?.full_name?.split(' ')[0] ||
    user?.email?.split('@')[0] ||
    'there';

  return (
    <PageTransition>
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Welcome */}
        <div>
          <h1 className="text-2xl font-bold">Welcome back, {firstName}</h1>
          <p className="text-text-secondary-light dark:text-text-secondary-dark mt-1">
            What would you like to create today?
          </p>
        </div>

        {/* Stats */}
        <motion.div
          variants={stagger}
          initial="initial"
          animate="animate"
          className="grid sm:grid-cols-3 gap-4"
        >
          <motion.div variants={fadeIn}>
            <Card className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 flex-shrink-0">
                <TrendingUp className="h-5 w-5 text-emerald-500" />
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {loadingStats ? (
                    <Skeleton className="h-7 w-12" />
                  ) : (
                    stats?.total || 0
                  )}
                </div>
                <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
                  Total Generations
                </p>
              </div>
            </Card>
          </motion.div>

          <motion.div variants={fadeIn}>
            <Card className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-500/10 flex-shrink-0">
                <BarChart3 className="h-5 w-5 text-teal-500" />
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {loadingStats ? (
                    <Skeleton className="h-7 w-20" />
                  ) : stats?.mostUsedType ? (
                    getContentTypeLabel(stats.mostUsedType.type)
                  ) : (
                    '—'
                  )}
                </div>
                <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
                  Most Used Type
                </p>
              </div>
            </Card>
          </motion.div>

          <motion.div variants={fadeIn}>
            <Card className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/10 flex-shrink-0">
                <Clock className="h-5 w-5 text-cyan-500" />
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {loadingRecent ? (
                    <Skeleton className="h-7 w-20" />
                  ) : recent && recent.length > 0 ? (
                    formatRelativeDate(recent[0].created_at)
                  ) : (
                    '—'
                  )}
                </div>
                <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
                  Last Generation
                </p>
              </div>
            </Card>
          </motion.div>
        </motion.div>

        {/* Quick actions */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {CONTENT_TYPES.map((type, i) => (
              <motion.div
                key={type.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link href={`/generate?type=${type.id}`}>
                  <Card hover className="text-center py-5 px-2">
                    <span className="text-2xl mb-2 block">{type.icon}</span>
                    <span className="text-xs font-medium truncate block">{type.label}</span>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recent generations */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Recent Generations</h2>
            <Link href="/history">
              <Button variant="ghost" size="sm">
                View All
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          {loadingRecent ? (
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <Card key={i} className="flex items-center gap-4">
                  <Skeleton className="h-10 w-10 rounded-xl" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-3 w-2/3" />
                  </div>
                </Card>
              ))}
            </div>
          ) : recent && recent.length > 0 ? (
            <motion.div
              variants={stagger}
              initial="initial"
              animate="animate"
              className="space-y-3"
            >
              {recent.map((gen) => (
                <motion.div key={gen.id} variants={fadeIn}>
                  <Card className="flex items-center gap-4">
                    <span className="text-xl flex-shrink-0">
                      {getContentTypeIcon(gen.content_type)}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                          {getContentTypeLabel(gen.content_type)}
                        </span>
                        <span className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
                          {formatRelativeDate(gen.created_at)}
                        </span>
                      </div>
                      <p className="text-sm font-medium truncate">
                        {gen.topic}
                      </p>
                      <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark truncate">
                        {truncateText(gen.generated_content, 100)}
                      </p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <EmptyState
              icon={PenTool}
              title="No generations yet"
              description="Create your first piece of content to see it here."
              action={
                <Link href="/generate">
                  <Button>
                    <PenTool className="h-4 w-4" />
                    Create Content
                  </Button>
                </Link>
              }
            />
          )}
        </div>
      </div>
    </PageTransition>
  );
}
