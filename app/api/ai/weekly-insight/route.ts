import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/middleware';
import { getMongoDb } from '@/lib/db';
import { prisma } from '@/lib/db';
import { generateWeeklyInsight } from '@/lib/gemini';

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth(request);

    // Get journal entries from the last 7 days
    const db = await getMongoDb();
    const collection = db.collection('journal_entries');
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const entries = await collection
      .find({
        userId: user.id,
        createdAt: { $gte: sevenDaysAgo },
      })
      .sort({ createdAt: -1 })
      .toArray();

    if (entries.length === 0) {
      return NextResponse.json(
        { error: 'Not enough entries to generate insight' },
        { status: 400 }
      );
    }

    const entriesData = entries.map((entry) => ({
      content: entry.content,
      createdAt: entry.createdAt,
    }));

    // Generate insight
    const insight = await generateWeeklyInsight(
      user.name || user.email,
      entriesData
    );

    // Store insight
    await prisma.weeklyInsight.create({
      data: {
        userId: user.id,
        content: insight,
      },
    });

    return NextResponse.json({
      insight,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }
}

