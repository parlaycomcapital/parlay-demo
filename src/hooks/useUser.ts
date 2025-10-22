'use client';

import { useState, useEffect } from 'react';
import { getUser, setUser, removeUser, User } from '@/lib/localStorage';

export const useUser = () => {
  const [user, setUserState] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = getUser();
    setUserState(currentUser);
    setLoading(false);
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    setUserState(userData);
  };

  const logout = () => {
    removeUser();
    setUserState(null);
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      setUserState(updatedUser);
    }
  };

  return {
    user,
    loading,
    login,
    logout,
    updateUser,
    isLoggedIn: !!user,
    isAnalyst: user?.role === 'analyst' || user?.isAnalyst,
    isAdmin: user?.role === 'admin' || user?.isAdmin,
  };
};
