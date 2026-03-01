'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { ContentSkeleton } from '@/components/ui/skeleton';
import { PageTransition } from '@/components/ui/page-transition';
import { ContentTypeSelector } from '@/components/generate/content-type-selector';
import { ToneSelector } from '@/components/generate/tone-selector';
import { LengthSelector } from '@/components/generate/length-selector';
import { OutputDisplay } from '@/components/generate/output-display';
import { useSaveGeneration } from '@/hooks/use-generations';
import {
  type ContentType,
  type Tone,
  type ContentLength,
  type EmailSubType,
  type SocialPlatform,
  type GenerationInput,
  EMAIL_SUBTYPES,
  SOCIAL_PLATFORMS,
} from '@/types';
import { toast } from 'sonner';

export default function GeneratePage() {
  const searchParams = useSearchParams();
  const initialType = (searchParams.get('type') as ContentType) || 'blog-post';

  const [contentType, setContentType] = useState<ContentType>(initialType);
  const [emailSubType, setEmailSubType] = useState<EmailSubType>('professional');
  const [socialPlatform, setSocialPlatform] = useState<SocialPlatform>('twitter');
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState<Tone>('professional');
  const [length, setLength] = useState<ContentLength>('medium');
  const [additionalContext, setAdditionalContext] = useState('');
  const [targetAudience, setTargetAudience] = useState('');

  const [generatedContent, setGeneratedContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const abortControllerRef = useRef<AbortController | null>(null);
  const saveGeneration = useSaveGeneration();

  // Update content type from URL params
  useEffect(() => {
    const type = searchParams.get('type') as ContentType | null;
    if (type) setContentType(type);
  }, [searchParams]);

  const buildInput = useCallback((): GenerationInput => {
    return {
      contentType,
      emailSubType: contentType === 'email' ? emailSubType : undefined,
      socialPlatform: contentType === 'social-media' ? socialPlatform : undefined,
      topic,
      tone,
      length,
      additionalContext: additionalContext || undefined,
      targetAudience: targetAudience || undefined,
    };
  }, [
    contentType,
    emailSubType,
    socialPlatform,
    topic,
    tone,
    length,
    additionalContext,
    targetAudience,
  ]);

  const generate = useCallback(async () => {
    if (!topic.trim()) {
      toast.error('Please enter a topic or subject');
      return;
    }

    // Cancel any ongoing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    setIsGenerating(true);
    setIsStreaming(true);
    setGeneratedContent('');
    setIsSaved(false);

    try {
      const input = buildInput();
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
        signal: controller.signal,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate content');
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No response body');

      const decoder = new TextDecoder();
      let fullContent = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const text = decoder.decode(value, { stream: true });
        fullContent += text;
        setGeneratedContent(fullContent);
      }

      setIsStreaming(false);
      setIsGenerating(false);
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        return;
      }
      const message =
        error instanceof Error ? error.message : 'Something went wrong';
      toast.error(message);
      setIsStreaming(false);
      setIsGenerating(false);
    }
  }, [topic, buildInput]);

  const handleSave = useCallback(async () => {
    if (!generatedContent) return;

    try {
      const input = buildInput();
      await saveGeneration.mutateAsync({
        content_type: input.contentType,
        tone: input.tone,
        length: input.length,
        topic: input.topic,
        additional_context: input.additionalContext || null,
        target_audience: input.targetAudience || null,
        generated_content: generatedContent,
        is_saved: true,
      });
      setIsSaved(true);
      toast.success('Saved to history');
    } catch {
      toast.error('Failed to save');
    }
  }, [generatedContent, buildInput, saveGeneration]);

  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-2xl font-bold">Generate Content</h1>
          <p className="text-text-secondary-light dark:text-text-secondary-dark mt-1">
            Choose a content type and customize your output.
          </p>
        </div>

        <div className="space-y-6">
          {/* Content type */}
          <ContentTypeSelector value={contentType} onChange={setContentType} />

          {/* Sub-type selectors */}
          {contentType === 'email' && (
            <Select
              label="Email Type"
              value={emailSubType}
              onChange={(e) => setEmailSubType(e.target.value as EmailSubType)}
              options={EMAIL_SUBTYPES.map((s) => ({
                value: s.id,
                label: s.label,
              }))}
            />
          )}

          {contentType === 'social-media' && (
            <Select
              label="Platform"
              value={socialPlatform}
              onChange={(e) =>
                setSocialPlatform(e.target.value as SocialPlatform)
              }
              options={SOCIAL_PLATFORMS.map((s) => ({
                value: s.id,
                label: s.label,
              }))}
            />
          )}

          {/* Topic */}
          <Input
            label="Topic / Subject"
            id="topic"
            placeholder="e.g., 10 Tips for Better Sleep"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />

          {/* Tone & Length */}
          <div className="grid md:grid-cols-2 gap-6">
            <ToneSelector value={tone} onChange={setTone} />
            <LengthSelector value={length} onChange={setLength} />
          </div>

          {/* Target audience */}
          <Input
            label="Target Audience (optional)"
            id="audience"
            placeholder="e.g., Small business owners, Gen Z, Tech professionals"
            value={targetAudience}
            onChange={(e) => setTargetAudience(e.target.value)}
          />

          {/* Additional context */}
          <Textarea
            label="Additional Context & Keywords (optional)"
            id="context"
            placeholder="Add any specific details, keywords, or instructions..."
            rows={3}
            value={additionalContext}
            onChange={(e) => setAdditionalContext(e.target.value)}
          />

          {/* Generate button */}
          <Button
            size="lg"
            className="w-full"
            onClick={generate}
            loading={isGenerating && !generatedContent}
            disabled={isGenerating}
          >
            <Sparkles className="h-4 w-4" />
            {isGenerating ? 'Generating...' : 'Generate Content'}
          </Button>
        </div>

        {/* Loading skeleton */}
        {isGenerating && !generatedContent && (
          <div className="glass-card rounded-xl p-6">
            <ContentSkeleton lines={8} />
          </div>
        )}

        {/* Output */}
        {generatedContent && (
          <OutputDisplay
            content={generatedContent}
            isStreaming={isStreaming}
            isSaved={isSaved}
            onRegenerate={generate}
            onSave={handleSave}
            isRegenerating={isGenerating && !!generatedContent}
            isSaving={saveGeneration.isPending}
          />
        )}
      </div>
    </PageTransition>
  );
}
