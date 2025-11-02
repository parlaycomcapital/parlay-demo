import Stripe from 'stripe';

let stripeInstance: Stripe | null = null;

export function getStripe(): Stripe {
  if (!stripeInstance) {
    const secretKey = process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder';
    stripeInstance = new Stripe(secretKey, {
      apiVersion: '2025-10-29.clover',
    });
  }
  return stripeInstance;
}

// Lazy initialization - only call when needed
export const stripe = typeof window === 'undefined' 
  ? (process.env.STRIPE_SECRET_KEY ? getStripe() : null as any)
  : null as any;

export const subscriptionTiers = {
  basic: {
    name: 'Basic',
    price: 9.99,
    features: [
      'Access to free content',
      'Like and comment on posts',
      'Follow creators',
      'Join communities',
    ],
    stripePriceId: process.env.STRIPE_BASIC_PRICE_ID || '',
  },
  pro: {
    name: 'Pro',
    price: 19.99,
    features: [
      'Everything in Basic',
      'Access to premium content',
      'Exclusive creator insights',
      'Priority support',
      'Advanced analytics',
    ],
    stripePriceId: process.env.STRIPE_PRO_PRICE_ID || '',
  },
};

export async function createCheckoutSession(userId: string, tier: 'basic' | 'pro') {
  const tierConfig = subscriptionTiers[tier];
  const stripeClient = getStripe();
  
  const session = await stripeClient.checkout.sessions.create({
    customer_email: undefined, // Will be set from user
    payment_method_types: ['card'],
    mode: 'subscription',
    line_items: [
      {
        price: tierConfig.stripePriceId,
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/subscribe/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/subscribe?canceled=true`,
    metadata: {
      userId,
      tier,
    },
  });

  return session;
}

export async function createPortalSession(customerId: string) {
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/profile`,
  });

  return session;
}