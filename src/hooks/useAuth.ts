'use client';

import { useState, useCallback } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useSupabaseAuth } from './useSupabaseAuth';

export function useAuth() {
  const { user, profile, loading, isAuthenticated, signOut, updateProfile } = useSupabaseAuth();
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const signInWithEmail = useCallback(async (email: string, role?: 'creator' | 'follower') => {
    setAuthLoading(true);
    setAuthError(null);

    try {
      const origin = typeof window !== 'undefined' ? window.location.origin : process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${origin}/onboarding`,
          data: role ? {
            role,
            full_name: email.split('@')[0],
          } : undefined,
        },
      });

      if (error) throw error;
      return { success: true };
    } catch (error: any) {
      setAuthError(error.message || 'Failed to send magic link');
      throw error;
    } finally {
      setAuthLoading(false);
    }
  }, []);

  const signInWithGoogle = useCallback(async (role?: 'creator' | 'follower') => {
    setAuthLoading(true);
    setAuthError(null);

    try {
      const origin = typeof window !== 'undefined' ? window.location.origin : process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${origin}/onboarding`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });

      if (error) throw error;
      // Note: OAuth redirect happens, so we don't return here
    } catch (error: any) {
      setAuthError(error.message || 'Failed to sign in with Google');
      setAuthLoading(false);
      throw error;
    }
  }, []);

  return {
    user,
    profile,
    loading: loading || authLoading,
    isAuthenticated,
    error: authError,
    signInWithEmail,
    signInWithGoogle,
    signOut,
    updateProfile,
    clearError: () => setAuthError(null),
  };
}
