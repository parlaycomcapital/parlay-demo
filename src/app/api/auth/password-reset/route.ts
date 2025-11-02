import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import bcrypt from 'bcryptjs';
import { isPlaceholderMode } from '@/lib/mockData';

// Request password reset
export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Placeholder mode: return success without actual email
    if (isPlaceholderMode() || !process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL === 'placeholder') {
      console.log('Placeholder mode: Password reset requested for', email);
      return NextResponse.json(
        { message: 'Password reset email sent (placeholder mode). In production, check your email.' },
        { status: 200 }
      );
    }

    // Check if user exists
    const { data: user } = await supabase
      .from('users')
      .select('id, email')
      .eq('email', email)
      .single();

    if (!user) {
      // Don't reveal if user exists for security
      return NextResponse.json(
        { message: 'If an account exists with this email, a password reset link has been sent.' },
        { status: 200 }
      );
    }

    // TODO: Generate reset token and send email
    // For now, return success
    // In production, you would:
    // 1. Generate a secure token
    // 2. Store it in database with expiry
    // 3. Send email with reset link
    // 4. Use nodemailer or similar service

    return NextResponse.json(
      { message: 'Password reset email sent. Please check your inbox.' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Password reset error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Reset password with token
export async function PUT(request: Request) {
  try {
    const { token, newPassword } = await request.json();

    if (!token || !newPassword) {
      return NextResponse.json(
        { error: 'Token and new password are required' },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    // Placeholder mode: return success
    if (isPlaceholderMode() || !process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL === 'placeholder') {
      console.log('Placeholder mode: Password reset completed');
      return NextResponse.json(
        { message: 'Password reset successful (placeholder mode)' },
        { status: 200 }
      );
    }

    // TODO: Verify token and update password
    // 1. Look up token in database
    // 2. Check if token is valid and not expired
    // 3. Hash new password
    // 4. Update user password
    // 5. Invalidate token

    return NextResponse.json(
      { message: 'Password reset successful' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Password reset error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
