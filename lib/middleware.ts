import { NextRequest } from 'next/server';
import { getUserFromToken } from './auth';

export async function requireAuth(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const user = await getUserFromToken(token);

  if (!user) {
    throw new Error('Unauthorized');
  }

  return user;
}

