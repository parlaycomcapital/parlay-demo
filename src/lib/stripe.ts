import Stripe from 'stripe';

// Only initialize Stripe if API key is provided
let stripeInstance: Stripe | null = null;

export const getStripe = () => {
  if (!stripeInstance) {
    const apiKey = process.env.STRIPE_SECRET_KEY;
    if (!apiKey || apiKey === '') {
      throw new Error('Stripe API key is not configured');
    }
    stripeInstance = new Stripe(apiKey, {
      apiVersion: '2024-06-20' as any,
    });
  }
  return stripeInstance;
};

// For backwards compatibility
export const stripe = new Proxy({} as Stripe, {
  get(_target, prop) {
    return getStripe()[prop as keyof Stripe];
  },
});
