'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useSupabaseAuth } from './useSupabaseAuth';

export interface Subscription {
  id: string;
  user_id: string;
  tier: 'basic' | 'pro';
  status: 'active' | 'canceled' | 'expired' | 'past_due';
  stripe_subscription_id?: string;
  stripe_customer_id?: string;
  current_period_start?: string;
  current_period_end?: string;
  cancel_at_period_end: boolean;
  created_at: string;
  updated_at: string;
}

export function useSupabaseSubscription() {
  const { user, isAuthenticated } = useSupabaseAuth();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated || !user) {
      setSubscription(null);
      setLoading(false);
      return;
    }

    fetchSubscription();

    // Set up real-time listener
    const channel = supabase
      .channel(`subscription:${user.id}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'subscriptions',
          filter: `user_id=eq.${user.id}`,
        },
        () => {
          fetchSubscription();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [isAuthenticated, user]);

  const fetchSubscription = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .in('status', ['active', 'past_due']) // Include active and past_due
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') {
        // PGRST116 = no rows returned, which is fine
        console.error('Subscription fetch error:', error);
        setSubscription(null);
      } else {
        setSubscription(data || null);
      }
    } catch (error: any) {
      console.error('Error fetching subscription:', error);
      setSubscription(null);
    } finally {
      setLoading(false);
    }
  };

  const hasActiveSubscription = (): boolean => {
    return subscription?.status === 'active' || false;
  };

  const hasProSubscription = (): boolean => {
    return subscription?.status === 'active' && subscription?.tier === 'pro';
  };

  const canAccessPremiumContent = (): boolean => {
    // Pro tier can access premium content
    return hasProSubscription();
  };

  return {
    subscription,
    loading,
    hasActiveSubscription,
    hasProSubscription,
    canAccessPremiumContent,
    refreshSubscription: fetchSubscription,
  };
}

