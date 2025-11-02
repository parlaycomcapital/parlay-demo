'use client';

export default function Composer() {
  return (
    <div className="card card-hover p-4 mb-4">
      <div className="flex gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-ember to-amber" />
        <input className="input" placeholder="Share your analysis or insight…" />
      </div>
      <div className="mt-3 flex justify-end gap-2">
        <button className="icon-btn">🏷️</button>
        <button className="icon-btn">📎</button>
        <button className="btn-grad">Post</button>
      </div>
    </div>
  );
}
