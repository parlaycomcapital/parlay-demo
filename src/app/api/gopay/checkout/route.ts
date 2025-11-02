import { NextResponse } from 'next/server';
import { isPlaceholderMode } from '@/lib/mockData';

// GoPay sandbox integration for CZ/SK markets
// Placeholder implementation for MVP
export async function POST(request: Request) {
  try {
    const { tier, userId } = await request.json();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!tier || !['basic', 'pro'].includes(tier)) {
      return NextResponse.json({ error: 'Invalid tier' }, { status: 400 });
    }

    // Placeholder mode: return success without real GoPay call
    if (isPlaceholderMode() || !process.env.GOPAY_CLIENT_TOKEN || process.env.GOPAY_CLIENT_TOKEN === 'placeholder') {
      console.log('Placeholder mode: GoPay checkout initiated for plan:', tier, 'userId:', userId);
      // Redirect to success page in placeholder mode
      const successUrl = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/subscribe/success?session_id=gopay_placeholder_${Date.now()}`;
      return NextResponse.json({ url: successUrl });
    }

    // TODO: Implement real GoPay checkout
    // GoPay API integration would go here
    // For now, return placeholder response
    const successUrl = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/subscribe/success?session_id=gopay_${Date.now()}`;
    return NextResponse.json({ url: successUrl });
  } catch (error: any) {
    console.warn('GoPay checkout error (placeholder mode fallback):', error.message);
    const successUrl = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/subscribe/success?session_id=gopay_placeholder_${Date.now()}`;
    return NextResponse.json({ url: successUrl });
  }
}
