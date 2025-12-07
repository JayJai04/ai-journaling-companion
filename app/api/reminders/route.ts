import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/middleware';
import { prisma } from '@/lib/db';
import { z } from 'zod';

const updateReminderSchema = z.object({
  enabled: z.boolean(),
  time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).optional(),
});

export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth(request);

    const reminder = await prisma.reminderSettings.findUnique({
      where: { userId: user.id },
    });

    return NextResponse.json({
      reminder: reminder || {
        enabled: false,
        time: null,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const user = await requireAuth(request);
    const body = await request.json();
    const { enabled, time } = updateReminderSchema.parse(body);

    const reminder = await prisma.reminderSettings.upsert({
      where: { userId: user.id },
      update: {
        enabled,
        time: enabled ? time || null : null,
      },
      create: {
        userId: user.id,
        enabled,
        time: enabled ? time || null : null,
      },
    });

    return NextResponse.json({
      reminder: {
        enabled: reminder.enabled,
        time: reminder.time,
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

