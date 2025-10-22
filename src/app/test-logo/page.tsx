'use client';

export default function TestLogo() {
  return (
    <div className="min-h-screen bg-navy text-white p-8">
      <h1 className="text-3xl font-bold mb-8">Logo Test Page</h1>
      
      <div className="space-y-8">
        <div>
          <h2 className="text-xl mb-4">Direct Image Tag:</h2>
          <img 
            src="/logo.png" 
            alt="Parlay Logo" 
            width="200" 
            height="200"
            className="border border-white"
          />
        </div>

        <div>
          <h2 className="text-xl mb-4">With Error Handling:</h2>
          <div className="border border-white p-4">
            <img 
              src="/logo.png" 
              alt="Parlay Logo" 
              width="200" 
              height="200"
            />
          </div>
        </div>

        <div>
          <h2 className="text-xl mb-4">File Info:</h2>
          <p>Logo should be at: /public/logo.png</p>
          <p>Direct URL: <a href="/logo.png" className="text-amber hover:underline" target="_blank">/logo.png</a></p>
        </div>
      </div>
    </div>
  );
}
