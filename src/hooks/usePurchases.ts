'use client';

import { useState, useEffect } from 'react';
import {
  getPurchases,
  addPurchase,
  hasPurchased,
  getUserPurchases,
  Purchase,
} from '@/lib/localStorage';

export const usePurchases = () => {
  const [purchases, setPurchasesState] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const allPurchases = getPurchases();
    setPurchasesState(allPurchases);
    setLoading(false);
  }, []);

  const buyPost = (postId: string, userId: string) => {
    const purchase: Purchase = {
      postId,
      userId,
      purchasedAt: new Date().toISOString(),
    };

    addPurchase(purchase);
    setPurchasesState((prev) => [...prev, purchase]);
  };

  const checkPurchase = (postId: string, userId: string): boolean => {
    return hasPurchased(postId, userId);
  };

  const getUserPurchasedPosts = (userId: string): string[] => {
    return getUserPurchases(userId);
  };

  const isPostPurchased = (postId: string, userId: string): boolean => {
    return purchases.some((p) => p.postId === postId && p.userId === userId);
  };

  return {
    purchases,
    loading,
    buyPost,
    checkPurchase,
    getUserPurchasedPosts,
    isPostPurchased,
  };
};
