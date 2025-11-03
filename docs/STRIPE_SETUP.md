# Stripe Subscription Integration Setup

This guide will help you set up Stripe payments for Parlay Alpha subscriptions.

## Prerequisites

1. Stripe account (sign up at [stripe.com](https://stripe.com))
2. Access to Stripe Dashboard

## Step 1: Get Stripe API Keys

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/test/apikeys)
2. Make sure you're in **Test Mode** (toggle in top right)
3. Copy your keys:
   - **Publishable key** (starts with `pk_test_`)
   - **Secret key** (starts with `sk_test_`)

## Step 2: Create Products and Prices in Stripe

1. Go to **Products** → **+ Add product**
2. Create two products:

   **Pro Plan:**
   - Name: `Parlay Pro`
   - Description: `Premium subscription for Parlay Alpha`
   - Pricing: `Recurring` → `Monthly` → `$14.99`
   - Copy the **Price ID** (starts with `price_`)

   **Basic Plan (Optional):**
   - Name: `Parlay Basic`
   - Pricing: `$9.99/month`
   - Copy the **Price ID**

## Step 3: Configure Environment Variables

Add to your `.env.local`:

```env
# Stripe Payments
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
STRIPE_PRO_PRICE_ID=price_your_pro_price_id_here
STRIPE_BASIC_PRICE_ID=price_your_basic_price_id_here
NEXT_PUBLIC_STRIPE_PRO_PRICE_ID=price_your_pro_price_id_here
```

## Step 4: Set Up Webhook (For Production)

1. Go to **Developers** → **Webhooks** → **Add endpoint**
2. Endpoint URL: `https://your-app.vercel.app/api/stripe/webhook`
3. Select events:
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `checkout.session.completed`
4. Copy the **Webhook signing secret** (starts with `whsec_`)
5. Add to `.env.local`:
   ```env
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
   ```

## Step 5: Update Database Schema

Run `supabase-subscription-schema.sql` in your Supabase SQL Editor to set up the subscriptions table.

## Step 6: Test Checkout Flow

1. Start dev server: `npm run dev`
2. Navigate to `/subscribe`
3. Click "Go Pro"
4. Use Stripe test card: `4242 4242 4242 4242`
   - Any future expiry date
   - Any 3-digit CVC
   - Any ZIP code
5. Complete checkout
6. Verify redirect to `/subscribe/success`
7. Check Supabase `subscriptions` table for new record

## Testing Different Scenarios

### Test Cards

- **Success**: `4242 4242 4242 4242`
- **Declined**: `4000 0000 0000 0002`
- **3D Secure**: `4000 0025 0000 3155`
- **Requires Authentication**: `4000 0027 6000 3184`

### Test Subscription Statuses

1. **Active**: Default after successful checkout
2. **Past Due**: Use test card `4000 0000 0000 0341`
3. **Canceled**: Cancel subscription in Stripe Dashboard

## Troubleshooting

### "Checkout failed" error
- Verify `STRIPE_SECRET_KEY` is set correctly
- Check price IDs match Stripe Dashboard
- Ensure you're using test mode keys

### Subscription not appearing in database
- Check webhook is configured correctly
- Verify webhook events are being received
- Check Supabase RLS policies allow inserts

### "User not found" error
- Ensure user is authenticated before checkout
- Verify Supabase auth is set up correctly

## Next Steps

1. **Set up webhook handler** (see `src/app/api/stripe/webhook/route.ts`)
2. **Create subscription management page** (cancel, update)
3. **Add billing portal** for customers
4. **Set up production keys** when ready to launch

## Production Checklist

- [ ] Switch to live mode in Stripe
- [ ] Update API keys to live keys
- [ ] Set up production webhook endpoint
- [ ] Test full checkout flow with real card (your own)
- [ ] Set up subscription cancellation flow
- [ ] Add error monitoring (Sentry, etc.)

## Security Notes

- **Never commit** `.env.local` to git
- **Never expose** `STRIPE_SECRET_KEY` client-side
- Use **RLS policies** in Supabase to protect subscription data
- Verify webhook signatures before processing events

## Support

For issues:
- [Stripe Documentation](https://stripe.com/docs)
- [Stripe Support](https://support.stripe.com)

