'use client';

import { useState, useEffect } from 'react';
import { supabase, Purchase } from '@/lib/supabaseClient';
import { useSession } from 'next-auth/react';

export function useSupabasePurchases() {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user?.id) {
      fetchPurchases();
    }
  }, [session?.user?.id]);

  const fetchPurchases = async () => {
    if (!session?.user?.id) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('purchases')
        .select(`
          *,
          post:posts(*)
        `)
        .eq('user_id', session.user.id);

      if (error) throw error;
      setPurchases(data || []);
    } catch (err) {
      console.error('Failed to fetch purchases:', err);
    } finally {
      setLoading(false);
    }
  };

  const buyPost = async (postId: string) => {
    if (!session?.user?.id) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('purchases')
      .insert({
        user_id: session.user.id,
        post_id: postId,
      })
      .select(`
        *,
        post:posts(*)
      `)
      .single();

    if (error) throw error;
    setPurchases(prev => [data, ...prev]);
    return data;
  };

  const isPostPurchased = (postId: string): boolean => {
    return purchases.some(purchase => purchase.post_id === postId);
  };

  return {
    purchases,
    loading,
    buyPost,
    isPostPurchased,
    refetch: fetchPurchases,
  };
}
