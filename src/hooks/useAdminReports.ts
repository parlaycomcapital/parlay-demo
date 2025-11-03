'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { createAuditLog } from '@/lib/admin';
import { useSupabaseAuth } from './useSupabaseAuth';

export interface Report {
  id: string;
  target_type: 'post' | 'comment' | 'user' | 'group';
  target_id: string;
  reason: string | null;
  details: string | null;
  status: 'open' | 'review' | 'resolved' | 'rejected';
  reporter_id: string | null;
  created_at: string;
  reporter?: {
    full_name: string;
    avatar_url: string;
  };
}

export function useAdminReports() {
  const { user } = useSupabaseAuth();
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'open' | 'review' | 'resolved' | 'rejected'>('all');

  const fetchReports = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('reports')
        .select('*, reporter:profiles!reports_reporter_id_fkey(full_name, avatar_url)')
        .order('created_at', { ascending: false });

      if (filter !== 'all') {
        query = query.eq('status', filter);
      }

      const { data, error } = await query;

      if (error) throw error;
      setReports((data as Report[]) || []);
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, [filter]);

  const updateReportStatus = async (
    reportId: string,
    status: 'open' | 'review' | 'resolved' | 'rejected'
  ) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('reports')
        .update({ status })
        .eq('id', reportId);

      if (error) throw error;

      await createAuditLog(
        user.id,
        `updated_report_${status}`,
        'report',
        reportId,
        { status }
      );

      fetchReports();
    } catch (error) {
      console.error('Error updating report:', error);
      throw error;
    }
  };

  return {
    reports,
    loading,
    filter,
    setFilter,
    updateReportStatus,
    refresh: fetchReports,
  };
}

