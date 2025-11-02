import { NextResponse } from 'next/server';
import { createCheckoutSession } from '@/lib/stripe';
import { isPlaceholderMode } from '@/lib/mockData';

export async function POST(request: Request) {
  try {
    const { tier, userId } = await request.json();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!tier || !['basic', 'pro'].includes(tier)) {
      return NextResponse.json({ error: 'Invalid tier' }, { status: 400 });
    }

    // Placeholder mode: return success without real Stripe call
    if (isPlaceholderMode() || !process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY === 'placeholder') {
      console.log('Placeholder mode: Checkout initiated for plan:', tier, 'userId:', userId);
      // Redirect to success page in placeholder mode
      const successUrl = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/subscribe/success?session_id=placeholder_${Date.now()}`;
      return NextResponse.json({ url: successUrl });
    }

    const checkoutSession = await createCheckoutSession(userId, tier);
    
    return NextResponse.json({ url: checkoutSession.url });
  } catch (error: any) {
    console.warn('Stripe checkout error (placeholder mode fallback):', error.message);
    // In placeholder mode, still return success
    if (isPlaceholderMode() || !process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY === 'placeholder') {
      const successUrl = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/subscribe/success?session_id=placeholder_${Date.now()}`;
      return NextResponse.json({ url: successUrl });
    }
    return NextResponse.json(
      { error: error.message || 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
