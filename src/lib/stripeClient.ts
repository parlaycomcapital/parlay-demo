import { loadStripe, Stripe } from '@stripe/stripe-js';

// Client-side Stripe instance
let stripePromise: Promise<Stripe | null> | null = null;

export const getStripeClient = () => {
  if (!stripePromise) {
    const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    if (!publishableKey) {
      console.warn('Stripe publishable key not found');
      return null;
    }
    stripePromise = loadStripe(publishableKey);
  }
  return stripePromise;
};

// Test price IDs - Replace with your actual Stripe price IDs
export const STRIPE_PRICE_IDS = {
  pro: process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID || 'price_test_pro_monthly',
  basic: process.env.NEXT_PUBLIC_STRIPE_BASIC_PRICE_ID || 'price_test_basic_monthly',
};

export const subscriptionTiers = {
  free: {
    name: 'Free',
    price: 0,
    priceDisplay: '$0',
    desc: 'Access to basic insights and community features.',
    features: [
      'Access to free content',
      'Like and comment on posts',
      'Follow creators',
      'Join public communities',
    ],
  },
  pro: {
    name: 'Pro',
    price: 14.99,
    priceDisplay: '$14.99',
    desc: 'Unlock premium analyses, ROI tracking, and analyst groups.',
    features: [
      'Everything in Free',
      'Unlock all premium content',
      'Exclusive creator insights',
      'Advanced ROI tracking',
      'Priority support',
      'Join private analyst groups',
    ],
    stripePriceId: STRIPE_PRICE_IDS.pro,
  },
};

