import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/middleware';
import { getMongoDb } from '@/lib/db';
import { ObjectId } from 'mongodb';
import { z } from 'zod';

const updateEntrySchema = z.object({
  content: z.string().min(1),
});

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireAuth(request);
    const db = await getMongoDb();
    const collection = db.collection('journal_entries');

    const entry = await collection.findOne({
      _id: new ObjectId(params.id),
      userId: user.id,
    });

    if (!entry) {
      return NextResponse.json(
        { error: 'Entry not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      entry: {
        id: entry._id.toString(),
        content: entry.content,
        createdAt: entry.createdAt,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireAuth(request);
    const body = await request.json();
    const { content } = updateEntrySchema.parse(body);

    const db = await getMongoDb();
    const collection = db.collection('journal_entries');

    const result = await collection.findOneAndUpdate(
      {
        _id: new ObjectId(params.id),
        userId: user.id,
      },
      {
        $set: {
          content,
          updatedAt: new Date(),
        },
      },
      { returnDocument: 'after' }
    );

    if (!result) {
      return NextResponse.json(
        { error: 'Entry not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      entry: {
        id: result._id.toString(),
        content: result.content,
        createdAt: result.createdAt,
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

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireAuth(request);
    const db = await getMongoDb();
    const collection = db.collection('journal_entries');

    const result = await collection.deleteOne({
      _id: new ObjectId(params.id),
      userId: user.id,
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: 'Entry not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Entry deleted successfully',
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }
}

