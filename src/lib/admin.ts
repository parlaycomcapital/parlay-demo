import { supabase } from './supabaseClient';

/**
 * Check if a user is an admin
 */
export async function getIsAdmin(userId: string | null): Promise<boolean> {
  if (!userId) return false;

  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', userId)
      .single();

    if (error || !data) return false;
    return data.role === 'admin';
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
}

/**
 * Create an audit log entry
 */
export async function createAuditLog(
  actorId: string,
  action: string,
  entityType?: string,
  entityId?: string,
  meta?: Record<string, any>
) {
  try {
    const { error } = await supabase.from('audit_logs').insert({
      actor_id: actorId,
      action,
      entity_type: entityType,
      entity_id: entityId,
      meta: meta || {},
    });

    if (error) {
      console.error('Error creating audit log:', error);
    }
  } catch (error) {
    console.error('Error creating audit log:', error);
  }
}

/**
 * Get user profile by ID
 */
export async function getUserProfile(userId: string) {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
}

