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
            onError={(e) => {
              console.log('Image failed to load:', e);
              e.currentTarget.style.display = 'none';
            }}
            onLoad={() => console.log('Image loaded successfully')}
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
              onError={(e) => {
                e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjU0YTIzIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj7wn5GAPC90ZXh0Pjwvc3ZnPg==';
              }}
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
