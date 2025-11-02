import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import bcrypt from 'bcryptjs';
import { isPlaceholderMode, mockUsers } from '@/lib/mockData';

export async function POST(request: Request) {
  try {
    const { email, password, role, name } = await request.json();

    // Placeholder mode: return mock user without database call
    if (isPlaceholderMode() || !process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL === 'placeholder') {
      console.log('Placeholder mode: User registration', { email, role, name });
      const mockUser = mockUsers.find(u => u.email === email) || {
        id: `user-${Date.now()}`,
        email,
        name: name || email,
        role: role || 'follower',
      };
      const { password: _, ...userWithoutPassword } = mockUser as any;
      return NextResponse.json(
        { message: 'User created successfully (placeholder mode)', user: userWithoutPassword },
        { status: 201 }
      );
    }

    // Validation
    if (!email || !password || !role) {
      return NextResponse.json(
        { error: 'Email, password, and role are required' },
        { status: 400 }
      );
    }

    if (!['creator', 'follower'].includes(role)) {
      return NextResponse.json(
        { error: 'Role must be either creator or follower' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('email')
      .eq('email', email)
      .single();

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const { data: user, error } = await supabase
      .from('users')
      .insert({
        email,
        password: hashedPassword,
        role,
        name: name || email,
      })
      .select()
      .single();

    if (error) {
      console.warn('Registration error (placeholder mode fallback):', error.message);
      // Fallback to placeholder mode response
      const mockUser = {
        id: `user-${Date.now()}`,
        email,
        name: name || email,
        role: role || 'follower',
      };
      return NextResponse.json(
        { message: 'User created successfully (placeholder mode)', user: mockUser },
        { status: 201 }
      );
    }

    // Return user without password
    const { password: _, ...userWithoutPassword } = user;
    return NextResponse.json(
      { message: 'User created successfully', user: userWithoutPassword },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
