'use client';

import { useSession } from 'next-auth/react';
import { isPlaceholderMode, mockUsers, PLACEHOLDER_AVATAR } from '@/lib/mockData';

export default function ProfilePage() {
  const { data: session } = useSession();
  
  // Use mock user in placeholder mode
  const user = isPlaceholderMode() 
    ? mockUsers[0] 
    : session?.user 
      ? {
          id: session.user.id,
          name: session.user.name || 'User',
          email: session.user.email || '',
          role: session.user.role,
          roi: 12.3,
          win_rate: 68.5,
          followers_count: 1248,
        }
      : null;

  if (!user) {
    return (
      <div className="container-narrow">
        <div className="card p-8 text-center">
          <p className="text-slatex-400">Please sign in to view your profile</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container-narrow">
      <div className="card overflow-hidden">
        <div className="h-28 bg-gradient-to-r from-ember/60 to-amber/60" />
        <div className="p-5 -mt-8 flex items-end gap-4">
                  <div 
                    className="w-20 h-20 rounded-full bg-navy-100 border-4 border-navy-100 shadow-ember flex items-center justify-center"
                    style={{
                      backgroundImage: (user as any).avatar_url || PLACEHOLDER_AVATAR ? `url(${(user as any).avatar_url || PLACEHOLDER_AVATAR})` : 'none',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  >
            {!(user as any).avatar_url && !PLACEHOLDER_AVATAR && (
              <span className="text-2xl font-bold text-amber">
                {(user.name || user.email)[0].toUpperCase()}
              </span>
            )}
          </div>
          <div>
            <h1 className="text-2xl font-bold">{user.name || user.email}</h1>
            <div className="flex gap-2 mt-1">
              <span className="badge capitalize">{user.role}</span>
              <span className="badge">Football</span>
              {user.roi && (
                <span className="badge text-amber">
                  {user.roi > 0 ? '+' : ''}{user.roi.toFixed(1)}% ROI
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <section className="mt-6 grid sm:grid-cols-3 gap-4">
        <div className="card p-4">
          <div className="text-slatex-400 text-sm">Followers</div>
          <div className="text-2xl font-semibold mt-1">
            {isPlaceholderMode() ? user.followers_count?.toLocaleString() || '1,248' : (user.followers_count || 0).toLocaleString()}
          </div>
        </div>
        <div className="card p-4">
          <div className="text-slatex-400 text-sm">Analyses</div>
          <div className="text-2xl font-semibold mt-1">186</div>
        </div>
        <div className="card p-4">
          <div className="text-slatex-400 text-sm">Win Rate</div>
          <div className="text-2xl font-semibold mt-1">
            {user.win_rate ? `${user.win_rate.toFixed(1)}%` : 'N/A'}
          </div>
        </div>
      </section>
    </div>
  );
}
