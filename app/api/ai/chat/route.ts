import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/middleware';
import { getMongoDb } from '@/lib/db';
import { generateChatResponse } from '@/lib/gemini';
import { z } from 'zod';

const chatSchema = z.object({
  message: z.string().min(1),
  conversationHistory: z.array(z.object({
    role: z.enum(['user', 'assistant']),
    content: z.string(),
  })).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth(request);
    const body = await request.json();
    const { message, conversationHistory = [] } = chatSchema.parse(body);

    // Get recent journal entries for context
    const db = await getMongoDb();
    const collection = db.collection('journal_entries');
    const recentEntries = await collection
      .find({ userId: user.id })
      .sort({ createdAt: -1 })
      .limit(5)
      .toArray();

    const entries = recentEntries.map((entry) => ({
      content: entry.content,
      createdAt: entry.createdAt,
    }));

    // Generate AI response
    const response = await generateChatResponse(
      user.name || user.email,
      message,
      conversationHistory,
      entries
    );

    return NextResponse.json({
      response,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }
}

