-- ContentStudio Database Schema
-- Run this in your Supabase SQL Editor

-- Create the generations table
CREATE TABLE IF NOT EXISTS public.generations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  content_type text NOT NULL,
  tone text NOT NULL,
  length text NOT NULL,
  topic text NOT NULL,
  additional_context text,
  target_audience text,
  generated_content text NOT NULL,
  is_saved boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_generations_user_id ON public.generations(user_id);
CREATE INDEX IF NOT EXISTS idx_generations_created_at ON public.generations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_generations_content_type ON public.generations(content_type);

-- Enable Row Level Security
ALTER TABLE public.generations ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only view their own generations
CREATE POLICY "Users can view own generations"
  ON public.generations
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Users can insert their own generations
CREATE POLICY "Users can insert own generations"
  ON public.generations
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own generations
CREATE POLICY "Users can update own generations"
  ON public.generations
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Policy: Users can delete their own generations
CREATE POLICY "Users can delete own generations"
  ON public.generations
  FOR DELETE
  USING (auth.uid() = user_id);
