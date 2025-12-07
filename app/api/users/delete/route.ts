import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/middleware';
import { prisma } from '@/lib/db';

export async function DELETE(request: NextRequest) {
  try {
    const user = await requireAuth(request);

    await prisma.user.delete({
      where: { id: user.id },
    });

    const response = NextResponse.json({
      message: 'Account deleted successfully',
    });
    response.cookies.delete('token');
    return response;
  } catch (error) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }
}

