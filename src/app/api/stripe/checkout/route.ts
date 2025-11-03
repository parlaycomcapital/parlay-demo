import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Only initialize Stripe if secret key exists
const getStripe = () => {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey || secretKey === 'placeholder' || secretKey === '') {
    return null;
  }
  return new Stripe(secretKey, {
    apiVersion: '2025-10-29.clover',
  });
};

export async function POST(req: Request) {
  try {
    const { userId, tier, email } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!tier || !['basic', 'pro'].includes(tier)) {
      return NextResponse.json({ error: 'Invalid tier' }, { status: 400 });
    }

    // Email can be passed from client, or Stripe will prompt
    const userEmail = email || undefined;

    // Get price ID from environment or use tier-based pricing
    const priceId = tier === 'pro' 
      ? (process.env.STRIPE_PRO_PRICE_ID || process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID || '')
      : (process.env.STRIPE_BASIC_PRICE_ID || process.env.NEXT_PUBLIC_STRIPE_BASIC_PRICE_ID || '');

    if (!priceId) {
      return NextResponse.json(
        { error: 'Stripe price ID not configured' },
        { status: 500 }
      );
    }

    // Get Stripe instance
    const stripe = getStripe();
    if (!stripe) {
      return NextResponse.json(
        { error: 'Stripe not configured' },
        { status: 500 }
      );
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      customer_email: userEmail,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/subscribe/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/subscribe?canceled=true`,
      metadata: {
        userId,
        tier,
      },
      subscription_data: {
        metadata: {
          userId,
          tier,
        },
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error('Stripe checkout error:', err);
    return NextResponse.json(
      { error: err.message || 'Checkout failed' },
      { status: 500 }
    );
  }
}
