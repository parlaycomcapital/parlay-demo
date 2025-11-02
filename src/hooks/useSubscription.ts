'use client';

import { useState, useEffect } from 'react';
import { supabase, Subscription } from '@/lib/supabaseClient';
import { useSession } from 'next-auth/react';
import { isPlaceholderMode, mockSubscription } from '@/lib/mockData';

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

    // Only set up realtime listener if not in placeholder mode
    if (!isPlaceholderMode()) {
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
    }
  }, [session?.user?.id]);

  const fetchSubscription = async () => {
    if (!session?.user?.id) return;

    // Use mock subscription in placeholder mode
    if (isPlaceholderMode()) {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 300));
      setSubscription(mockSubscription as Subscription);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', session.user.id)
        .eq('status', 'active')
        .single();

      if (error && error.code !== 'PGRST116') {
        console.warn('Subscription fetch error (placeholder mode fallback):', error.message);
        setSubscription(null);
      } else {
        setSubscription(data || null);
      }
    } catch (error: any) {
      console.warn('Subscription fetch error (placeholder mode fallback):', error.message);
      setSubscription(null);
    } finally {
      setLoading(false);
    }
  };

  const hasActiveSubscription = (): boolean => {
    if (isPlaceholderMode()) {
      // In placeholder mode, allow access for demo purposes
      return true;
    }
    return subscription?.status === 'active' || false;
  };

  const hasProSubscription = (): boolean => {
    if (isPlaceholderMode()) {
      // In placeholder mode, return true for demo
      return true;
    }
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
