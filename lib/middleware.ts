import { NextRequest, NextResponse } from 'next/server';
import { getUserFromToken } from './auth';

export async function requireAuth(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const user = await getUserFromToken(token);

  if (!user) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  return user;
}

