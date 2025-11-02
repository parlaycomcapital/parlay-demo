'use client';

export default function ProfilePage() {
  return (
    <div className="container-narrow">
      <div className="card overflow-hidden">
        <div className="h-28 bg-gradient-to-r from-ember/60 to-amber/60" />
        <div className="p-5 -mt-8 flex items-end gap-4">
          <div className="w-20 h-20 rounded-full bg-navy-100 border-4 border-navy-100 shadow-ember" />
          <div>
            <h1 className="text-2xl font-bold">Analyst Name</h1>
            <div className="flex gap-2 mt-1">
              <span className="badge">Analyst</span>
              <span className="badge">Football</span>
              <span className="badge">+12.3% ROI</span>
            </div>
          </div>
        </div>
      </div>

      <section className="mt-6 grid sm:grid-cols-3 gap-4">
        <div className="card p-4">
          <div className="text-slatex-400 text-sm">Followers</div>
          <div className="text-2xl font-semibold mt-1">1,248</div>
        </div>
        <div className="card p-4">
          <div className="text-slatex-400 text-sm">Analyses</div>
          <div className="text-2xl font-semibold mt-1">186</div>
        </div>
        <div className="card p-4">
          <div className="text-slatex-400 text-sm">Premium buyers</div>
          <div className="text-2xl font-semibold mt-1">342</div>
        </div>
      </section>
    </div>
  );
}
