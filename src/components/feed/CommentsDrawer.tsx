'use client';

import { useState } from 'react';

export default function CommentsDrawer({ postId }: { postId: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-3">
      <button
        onClick={() => setOpen(!open)}
        className="text-amber hover:underline text-sm"
        aria-label={open ? 'Hide comments' : 'Show comments'}
      >
        {open ? 'Hide' : 'Show'} comments
      </button>
      {open && (
        <div className="mt-3 rounded-xl border border-slate-800 bg-white/5 p-3">
          <div className="text-slatex-400 text-sm">Comments coming soon…</div>
        </div>
      )}
    </div>
  );
}