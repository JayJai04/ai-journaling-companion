import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/middleware';
import { getMongoDb } from '@/lib/db';
import { z } from 'zod';

const createEntrySchema = z.object({
  content: z.string().min(1),
});

export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth(request);
    const db = await getMongoDb();
    const collection = db.collection('journal_entries');

    const entries = await collection
      .find({ userId: user.id })
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({
      entries: entries.map((entry) => ({
        id: entry._id.toString(),
        content: entry.content,
        createdAt: entry.createdAt,
      })),
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth(request);
    const body = await request.json();
    const { content } = createEntrySchema.parse(body);

    const db = await getMongoDb();
    const collection = db.collection('journal_entries');

    const entry = {
      userId: user.id,
      content,
      createdAt: new Date(),
    };

    const result = await collection.insertOne(entry);

    return NextResponse.json({
      entry: {
        id: result.insertedId.toString(),
        content: entry.content,
        createdAt: entry.createdAt,
      },
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

