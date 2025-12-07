import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/middleware';
import { prisma } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth(request);

    // Get weekly insights as notifications
    const insights = await prisma.weeklyInsight.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
      take: 10,
    });

    const notifications = insights.map((insight) => ({
      id: insight.id,
      type: 'weekly_insight',
      content: insight.content,
      createdAt: insight.createdAt,
    }));

    return NextResponse.json({ notifications });
  } catch (error) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }
}

