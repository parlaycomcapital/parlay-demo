'use client';

import { useState, useEffect } from 'react';
import { supabase, Subscription } from '@/lib/supabaseClient';
import { useSession } from 'next-auth/react';

export function useSubscription() {
  const { data: session } = useSession();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session?.user?.id) {
      setLoading(false);
      return;
    }

    fetchSubscription();

    // Set up realtime listener
    const channel = supabase
      .channel(`subscription:${session.user.id}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'subscriptions',
          filter: `user_id=eq.${session.user.id}`,
        },
        () => {
          fetchSubscription();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [session?.user?.id]);

  const fetchSubscription = async () => {
    if (!session?.user?.id) return;

    try {
      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', session.user.id)
        .eq('status', 'active')
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching subscription:', error);
      } else {
        setSubscription(data || null);
      }
    } catch (error) {
      console.error('Subscription fetch error:', error);
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
    return hasProSubscription();
  };

  return {
    subscription,
    loading,
    hasActiveSubscription,
    hasProSubscription,
    canAccessPremiumContent,
    refetch: fetchSubscription,
  };
}
