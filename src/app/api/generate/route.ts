import { GoogleGenerativeAI } from '@google/generative-ai';
import { buildSystemPrompt, buildUserPrompt } from '@/lib/prompts';
import type { GenerationInput } from '@/types';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || '');

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

    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      systemInstruction: systemPrompt,
    });

    const result = await model.generateContentStream(userPrompt);

    const readableStream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();

        try {
          for await (const chunk of result.stream) {
            const text = chunk.text();
            if (text) {
              controller.enqueue(encoder.encode(text));
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

    const message = error instanceof Error ? error.message : '';

    if (message.includes('429') || message.includes('RESOURCE_EXHAUSTED')) {
      return Response.json(
        { error: 'Rate limit exceeded. Please try again in a moment.' },
        { status: 429 }
      );
    }

    if (message.includes('API_KEY_INVALID') || message.includes('401')) {
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
