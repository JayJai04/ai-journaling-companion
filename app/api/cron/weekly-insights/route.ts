import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getMongoDb } from '@/lib/db';
import { generateWeeklyInsight } from '@/lib/gemini';

export async function GET(request: NextRequest) {
  // Verify cron secret (set in Vercel environment variables)
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Get all users with reminder settings enabled or all users
    const users = await prisma.user.findMany();

    const db = await getMongoDb();
    const collection = db.collection('journal_entries');

    for (const user of users) {
      // Get journal entries from the last 7 days
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      const entries = await collection
        .find({
          userId: user.id,
          createdAt: { $gte: sevenDaysAgo },
        })
        .sort({ createdAt: -1 })
        .toArray();

      // Only generate insight if user has entries
      if (entries.length > 0) {
        const entriesData = entries.map((entry) => ({
          content: entry.content,
          createdAt: entry.createdAt,
        }));

        try {
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
        } catch (error) {
          console.error(`Failed to generate insight for user ${user.id}:`, error);
        }
      }
    }

    return NextResponse.json({
      message: 'Weekly insights generated successfully',
      usersProcessed: users.length,
    });
  } catch (error) {
    console.error('Cron job error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

