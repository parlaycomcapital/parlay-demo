import { redirect } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { getIsAdmin } from '@/lib/admin';
import AdminShell from '@/components/admin/AdminShell';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Check authentication
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth?redirect=/admin');
  }

  // Check admin role
  const isAdmin = await getIsAdmin(user.id);

  if (!isAdmin) {
    redirect('/');
  }

  return <AdminShell>{children}</AdminShell>;
}

