export type ContentType =
  | 'blog-post'
  | 'email'
  | 'social-media'
  | 'product-description'
  | 'ad-copy'
  | 'custom';

export type EmailSubType = 'professional' | 'marketing' | 'cold-outreach';

export type SocialPlatform = 'instagram' | 'twitter' | 'linkedin';

export type Tone =
  | 'professional'
  | 'casual'
  | 'witty'
  | 'persuasive'
  | 'friendly'
  | 'formal';

export type ContentLength = 'short' | 'medium' | 'long';

export interface GenerationInput {
  contentType: ContentType;
  emailSubType?: EmailSubType;
  socialPlatform?: SocialPlatform;
  topic: string;
  tone: Tone;
  length: ContentLength;
  additionalContext?: string;
  targetAudience?: string;
  model?: AIModel;
}

export interface Generation {
  id: string;
  user_id: string;
  content_type: string;
  tone: string;
  length: string;
  topic: string;
  additional_context: string | null;
  target_audience: string | null;
  generated_content: string;
  is_saved: boolean;
  created_at: string;
}

export interface UserProfile {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  created_at?: string;
}

export interface ContentTypeOption {
  id: ContentType;
  label: string;
  description: string;
  icon: string;
}

export interface ToneOption {
  id: Tone;
  label: string;
}

export interface LengthOption {
  id: ContentLength;
  label: string;
  description: string;
}

export const CONTENT_TYPES: ContentTypeOption[] = [
  {
    id: 'blog-post',
    label: 'Blog Post',
    description: 'Long-form articles and blog content',
    icon: '📝',
  },
  {
    id: 'email',
    label: 'Email',
    description: 'Professional, marketing, or outreach emails',
    icon: '✉️',
  },
  {
    id: 'social-media',
    label: 'Social Media',
    description: 'Captions for Instagram, Twitter/X, LinkedIn',
    icon: '📱',
  },
  {
    id: 'product-description',
    label: 'Product Description',
    description: 'Compelling product copy for e-commerce',
    icon: '🏷️',
  },
  {
    id: 'ad-copy',
    label: 'Ad Copy',
    description: 'High-converting advertisement text',
    icon: '📢',
  },
  {
    id: 'custom',
    label: 'Custom',
    description: 'Free-form prompt for any content type',
    icon: '✨',
  },
];

export const TONES: ToneOption[] = [
  { id: 'professional', label: 'Professional' },
  { id: 'casual', label: 'Casual' },
  { id: 'witty', label: 'Witty' },
  { id: 'persuasive', label: 'Persuasive' },
  { id: 'friendly', label: 'Friendly' },
  { id: 'formal', label: 'Formal' },
];

export const LENGTHS: LengthOption[] = [
  { id: 'short', label: 'Short', description: '~100-200 words' },
  { id: 'medium', label: 'Medium', description: '~300-500 words' },
  { id: 'long', label: 'Long', description: '~700-1000 words' },
];

export const EMAIL_SUBTYPES: { id: EmailSubType; label: string }[] = [
  { id: 'professional', label: 'Professional' },
  { id: 'marketing', label: 'Marketing' },
  { id: 'cold-outreach', label: 'Cold Outreach' },
];

export const SOCIAL_PLATFORMS: { id: SocialPlatform; label: string }[] = [
  { id: 'instagram', label: 'Instagram' },
  { id: 'twitter', label: 'Twitter/X' },
  { id: 'linkedin', label: 'LinkedIn' },
];

export type AIModel = 'gemini-2.5-flash' | 'gemini-3-flash-preview' | 'gemini-2.5-flash-lite';

export interface AIModelOption {
  id: AIModel;
  label: string;
  description: string;
}

export const AI_MODELS: AIModelOption[] = [
  { id: 'gemini-2.5-flash', label: 'Gemini 2.5 Flash', description: 'Balanced speed & quality' },
  { id: 'gemini-3-flash-preview', label: 'Gemini 3 Flash', description: 'Latest model' },
  { id: 'gemini-2.5-flash-lite', label: 'Gemini 2.5 Flash Lite', description: 'Fastest, higher rate limits' },
];
