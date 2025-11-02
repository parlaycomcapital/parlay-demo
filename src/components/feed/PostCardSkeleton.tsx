'use client';

export default function PostCardSkeleton() {
  return (
    <div className="card p-5 animate-pulse">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-slate-700" />
        <div className="flex-1">
          <div className="h-4 bg-slate-700 rounded w-3/4 mb-2" />
          <div className="h-3 bg-slate-700 rounded w-1/2" />
        </div>
      </div>
      <div className="space-y-2 mb-4">
        <div className="h-4 bg-slate-700 rounded w-full" />
        <div className="h-4 bg-slate-700 rounded w-5/6" />
        <div className="h-4 bg-slate-700 rounded w-4/6" />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <div className="w-8 h-8 rounded-full bg-slate-700" />
          <div className="w-8 h-8 rounded-full bg-slate-700" />
          <div className="w-8 h-8 rounded-full bg-slate-700" />
        </div>
        <div className="h-8 w-20 bg-slate-700 rounded" />
      </div>
    </div>
  );
}
