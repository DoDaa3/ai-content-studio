import Anthropic from '@anthropic-ai/sdk';
import { buildSystemPrompt, buildUserPrompt } from '@/lib/anthropic';
import type { GenerationInput } from '@/types';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as GenerationInput;

    // Server-side validation
    if (!body.topic || body.topic.trim().length === 0) {
      return Response.json(
        { error: 'Topic is required' },
        { status: 400 }
      );
    }

    if (!body.contentType || !body.tone || !body.length) {
      return Response.json(
        { error: 'Content type, tone, and length are required' },
        { status: 400 }
      );
    }

    const systemPrompt = buildSystemPrompt(body);
    const userPrompt = buildUserPrompt(body);

    const stream = anthropic.messages.stream({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2048,
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: userPrompt,
        },
      ],
    });

    const readableStream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();

        try {
          for await (const event of stream) {
            if (
              event.type === 'content_block_delta' &&
              event.delta.type === 'text_delta'
            ) {
              controller.enqueue(encoder.encode(event.delta.text));
            }
          }
          controller.close();
        } catch (err) {
          const message =
            err instanceof Error ? err.message : 'Stream error';
          controller.enqueue(
            encoder.encode(`\n\n[Error: ${message}]`)
          );
          controller.close();
        }
      },
    });

    return new Response(readableStream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Generation error:', error);

    if (error instanceof Anthropic.RateLimitError) {
      return Response.json(
        { error: 'Rate limit exceeded. Please try again in a moment.' },
        { status: 429 }
      );
    }

    if (error instanceof Anthropic.AuthenticationError) {
      return Response.json(
        { error: 'API authentication failed. Please check your API key.' },
        { status: 401 }
      );
    }

    return Response.json(
      { error: 'Failed to generate content. Please try again.' },
      { status: 500 }
    );
  }
}
