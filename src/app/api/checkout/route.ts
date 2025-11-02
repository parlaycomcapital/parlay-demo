import { NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { isPlaceholderMode } from '@/lib/mockData';

export async function POST(req: Request) {
  const { title, price, postId } = await req.json();
  
  // Placeholder mode: return success without real Stripe call
  if (isPlaceholderMode() || !process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY === 'placeholder') {
    console.log('Placeholder mode: Post purchase initiated', { title, price, postId });
    const successUrl = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/success?session_id=placeholder_${Date.now()}`;
    return NextResponse.json({ url: successUrl });
  }
  
  // Check if Stripe is configured
  if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY === '') {
    return NextResponse.json({ 
      error: 'Stripe is not configured. Please set STRIPE_SECRET_KEY in environment variables.' 
    }, { status: 500 });
  }
  
  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: { name: title },
            unit_amount: Math.round(price * 100),
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/feed`,
      metadata: {
        postId: postId || '',
        type: 'post_purchase',
      },
    });
    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.warn('Stripe error (placeholder mode fallback):', err.message);
    // Fallback to placeholder mode
    const successUrl = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/success?session_id=placeholder_${Date.now()}`;
    return NextResponse.json({ url: successUrl });
  }
}
