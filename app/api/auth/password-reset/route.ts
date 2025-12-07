import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { hashPassword } from '@/lib/auth';
import { z } from 'zod';
import crypto from 'crypto';

const requestResetSchema = z.object({
  email: z.string().email(),
});

const resetPasswordSchema = z.object({
  token: z.string(),
  newPassword: z.string().min(6),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Check if it's a reset request or password update
    if ('email' in body) {
      const { email } = requestResetSchema.parse(body);
      
      const user = await prisma.user.findUnique({
        where: { email },
      });

      // Don't reveal if user exists for security
      if (user) {
        const token = crypto.randomBytes(32).toString('hex');
        const expiresAt = new Date();
        expiresAt.setHours(expiresAt.getHours() + 1); // 1 hour expiry

        await prisma.passwordReset.create({
          data: {
            userId: user.id,
            token,
            expiresAt,
          },
        });

        // In production, send email with reset link
        // For MVP, we'll return the token (not recommended for production)
        return NextResponse.json({
          message: 'Password reset token generated',
          token, // Remove this in production, send via email instead
        });
      }

      return NextResponse.json({
        message: 'If the email exists, a reset link has been sent',
      });
    } else {
      const { token, newPassword } = resetPasswordSchema.parse(body);
      
      const reset = await prisma.passwordReset.findUnique({
        where: { token },
        include: { user: true },
      });

      if (!reset || reset.expiresAt < new Date()) {
        return NextResponse.json(
          { error: 'Invalid or expired token' },
          { status: 400 }
        );
      }

      const hashedPassword = await hashPassword(newPassword);
      await prisma.user.update({
        where: { id: reset.userId },
        data: { password: hashedPassword },
      });

      await prisma.passwordReset.delete({
        where: { token },
      });

      return NextResponse.json({
        message: 'Password reset successfully',
      });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

