'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';
import type { Generation } from '@/types';

const supabase = createClient();

export function useGenerations(filters?: {
  contentType?: string;
  search?: string;
}) {
  return useQuery({
    queryKey: ['generations', filters],
    queryFn: async () => {
      let query = supabase
        .from('generations')
        .select('*')
        .order('created_at', { ascending: false });

      if (filters?.contentType && filters.contentType !== 'all') {
        query = query.eq('content_type', filters.contentType);
      }

      if (filters?.search) {
        query = query.or(
          `topic.ilike.%${filters.search}%,generated_content.ilike.%${filters.search}%`
        );
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as Generation[];
    },
  });
}

export function useRecentGenerations(limit = 5) {
  return useQuery({
    queryKey: ['generations', 'recent', limit],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('generations')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data as Generation[];
    },
  });
}

export function useGenerationStats() {
  return useQuery({
    queryKey: ['generations', 'stats'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('generations')
        .select('content_type, created_at');

      if (error) throw error;

      const generations = data as Pick<Generation, 'content_type' | 'created_at'>[];
      const total = generations.length;

      const typeCounts: Record<string, number> = {};
      generations.forEach((g) => {
        typeCounts[g.content_type] = (typeCounts[g.content_type] || 0) + 1;
      });

      const mostUsedType = Object.entries(typeCounts).sort(
        ([, a], [, b]) => b - a
      )[0];

      return {
        total,
        mostUsedType: mostUsedType
          ? { type: mostUsedType[0], count: mostUsedType[1] }
          : null,
        typeCounts,
      };
    },
  });
}

export function useSaveGeneration() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      generation: Omit<Generation, 'id' | 'user_id' | 'created_at'>
    ) => {
      const { data, error } = await supabase
        .from('generations')
        .insert(generation)
        .select()
        .single();

      if (error) throw error;
      return data as Generation;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['generations'] });
    },
  });
}

export function useToggleSaved() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      is_saved,
    }: {
      id: string;
      is_saved: boolean;
    }) => {
      const { error } = await supabase
        .from('generations')
        .update({ is_saved })
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['generations'] });
    },
  });
}

export function useDeleteGeneration() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('generations')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['generations'] });
    },
  });
}
