'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Clock, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { PageTransition } from '@/components/ui/page-transition';
import { EmptyState } from '@/components/ui/empty-state';
import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';
import { HistoryCard } from '@/components/history/history-card';
import { useGenerations, useDeleteGeneration } from '@/hooks/use-generations';
import { CONTENT_TYPES } from '@/types';
import { toast } from 'sonner';

export default function HistoryPage() {
  const [search, setSearch] = useState('');
  const [contentTypeFilter, setContentTypeFilter] = useState('all');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const { data: generations, isLoading } = useGenerations({
    contentType: contentTypeFilter,
    search: search || undefined,
  });

  const deleteGeneration = useDeleteGeneration();

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await deleteGeneration.mutateAsync(id);
      toast.success('Generation deleted');
    } catch {
      toast.error('Failed to delete');
    } finally {
      setDeletingId(null);
    }
  };

  const filterOptions = [
    { value: 'all', label: 'All Types' },
    ...CONTENT_TYPES.map((t) => ({ value: t.id, label: t.label })),
  ];

  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold">History</h1>
          <p className="text-text-secondary-light dark:text-text-secondary-dark mt-1">
            Browse and manage your past generations.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary-light dark:text-text-secondary-dark" />
            <Input
              placeholder="Search by topic or content..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select
            value={contentTypeFilter}
            onChange={(e) => setContentTypeFilter(e.target.value)}
            options={filterOptions}
            className="sm:w-48"
          />
        </div>

        {/* Results */}
        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Card key={i} className="flex items-center gap-4">
                <Skeleton className="h-10 w-10 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-3 w-1/2" />
                  <Skeleton className="h-3 w-3/4" />
                </div>
              </Card>
            ))}
          </div>
        ) : generations && generations.length > 0 ? (
          <AnimatePresence mode="popLayout">
            <div className="space-y-3">
              {generations.map((gen) => (
                <HistoryCard
                  key={gen.id}
                  generation={gen}
                  onDelete={handleDelete}
                  isDeleting={deletingId === gen.id}
                />
              ))}
            </div>
          </AnimatePresence>
        ) : (
          <EmptyState
            icon={Clock}
            title="No history yet"
            description={
              search || contentTypeFilter !== 'all'
                ? 'No results match your filters. Try adjusting your search.'
                : 'Your generated content will appear here once you start creating.'
            }
          />
        )}
      </div>
    </PageTransition>
  );
}
