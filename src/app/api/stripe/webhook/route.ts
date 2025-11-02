import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { getStripe } from '@/lib/stripe';
import { supabase } from '@/lib/supabaseClient';
import Stripe from 'stripe';

export async function POST(request: Request) {
  const body = await request.text();
  const headersList = await headers();
  const signature = headersList.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'No signature' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    const stripe = getStripe();
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || ''
    );
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.userId;
        const tier = session.metadata?.tier;

        if (userId && tier) {
          // Create or update subscription
          await supabase.from('subscriptions').upsert({
            user_id: userId,
            tier,
            status: 'active',
            stripe_subscription_id: session.subscription as string,
            stripe_customer_id: session.customer as string,
            current_period_start: new Date(session.created * 1000).toISOString(),
            current_period_end: new Date((session.created + 2592000) * 1000).toISOString(), // 30 days
          });
        }
        break;
      }

      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        const periodStart = (subscription as any).current_period_start;
        const periodEnd = (subscription as any).current_period_end;
        const cancelAtPeriodEnd = (subscription as any).cancel_at_period_end;
        
        await supabase
          .from('subscriptions')
          .update({
            status: subscription.status === 'active' ? 'active' : 
                   subscription.status === 'canceled' ? 'canceled' : 
                   subscription.status === 'past_due' ? 'past_due' : 'expired',
            current_period_start: periodStart
              ? new Date(periodStart * 1000).toISOString()
              : null,
            current_period_end: periodEnd
              ? new Date(periodEnd * 1000).toISOString()
              : null,
            cancel_at_period_end: cancelAtPeriodEnd || false,
          })
          .eq('stripe_subscription_id', subscription.id);
        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice;
        const subscriptionId = (invoice as any).subscription;
        if (subscriptionId) {
          await supabase
            .from('subscriptions')
            .update({ status: 'active' })
            .eq('stripe_subscription_id', subscriptionId as string);
        }
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        const subscriptionId = (invoice as any).subscription;
        if (subscriptionId) {
          await supabase
            .from('subscriptions')
            .update({ status: 'past_due' })
            .eq('stripe_subscription_id', subscriptionId as string);
        }
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('Webhook handler error:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
