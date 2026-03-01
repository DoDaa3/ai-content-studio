import { type GenerationInput } from '@/types';

export function buildSystemPrompt(input: GenerationInput): string {
  const { contentType, emailSubType, socialPlatform, tone, length } = input;

  const lengthGuide = {
    short: '100-200 words',
    medium: '300-500 words',
    long: '700-1000 words',
  }[length];

  let typeInstruction = '';

  switch (contentType) {
    case 'blog-post':
      typeInstruction = `Write a well-structured blog post with a compelling headline, engaging introduction, organized body with subheadings where appropriate, and a strong conclusion. Include a clear narrative flow.`;
      break;
    case 'email':
      typeInstruction = `Write a ${emailSubType || 'professional'} email with a clear subject line suggestion, appropriate greeting, well-organized body, and professional sign-off. ${
        emailSubType === 'cold-outreach'
          ? 'Focus on value proposition and include a clear call-to-action.'
          : emailSubType === 'marketing'
            ? 'Make it engaging with a strong hook and clear CTA.'
            : 'Keep it clear, concise, and professional.'
      }`;
      break;
    case 'social-media':
      typeInstruction = `Write a ${socialPlatform || 'general'} social media post. ${
        socialPlatform === 'instagram'
          ? 'Include relevant emoji usage and suggest hashtags. Make it visually descriptive and engaging.'
          : socialPlatform === 'twitter'
            ? 'Keep it concise and punchy. Suggest relevant hashtags. Consider thread format for longer content.'
            : socialPlatform === 'linkedin'
              ? 'Make it professional yet engaging. Use line breaks for readability. Include a thought-provoking hook.'
              : 'Make it engaging and platform-appropriate.'
      }`;
      break;
    case 'product-description':
      typeInstruction = `Write a compelling product description that highlights key features, benefits, and unique selling points. Use sensory language and focus on how the product solves problems or improves the user's life.`;
      break;
    case 'ad-copy':
      typeInstruction = `Write high-converting ad copy with a strong headline, compelling value proposition, social proof elements where appropriate, and a clear call-to-action. Make every word count.`;
      break;
    case 'custom':
      typeInstruction = `Generate content based on the user's specific request. Be creative and deliver high-quality output that matches their needs.`;
      break;
  }

  return `You are an expert content writer and copywriter. Your task is to generate high-quality content.

${typeInstruction}

Guidelines:
- Tone: ${tone}
- Target length: ${lengthGuide}
- Write naturally and avoid sounding robotic or generic
- Do not include meta-commentary about the content (e.g., "Here's your blog post:")
- Output only the content itself, ready to use
- Use proper formatting (paragraphs, bullet points, headers) where appropriate
- Make it engaging and valuable for the target audience`;
}

export function buildUserPrompt(input: GenerationInput): string {
  const parts: string[] = [];

  parts.push(`Topic/Subject: ${input.topic}`);

  if (input.targetAudience) {
    parts.push(`Target Audience: ${input.targetAudience}`);
  }

  if (input.additionalContext) {
    parts.push(`Additional Context & Keywords: ${input.additionalContext}`);
  }

  return parts.join('\n\n');
}
