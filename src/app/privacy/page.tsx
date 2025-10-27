import Link from 'next/link';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-[#0B132B]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Privacy Policy</h1>
          <p className="text-gray-300 text-lg">How we handle your data on Parlay.sk</p>
        </div>

        <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
          <div className="space-y-6 text-gray-300">
            <div>
              <h2 className="text-xl font-semibold text-white mb-3">Demo Data Storage</h2>
              <p>
                This demonstration version stores all data locally in your browser using
                localStorage. No data is sent to external servers or stored permanently.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-3">Data Collection</h2>
              <p>
                In this demo, we collect only the information you provide when creating an account
                or posting content. This includes username, role, and any content you create.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-3">Data Usage</h2>
              <p>
                Your data is used solely to provide the platform functionality. We do not share your
                information with third parties in this demonstration.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-3">Data Deletion</h2>
              <p>
                You can clear all your data by using the "Reset Data" function in the admin panel or
                by clearing your browser's localStorage.
              </p>
            </div>

            <div className="pt-6 border-t border-gray-700">
              <Link
                href="/"
                className="bg-gradient-ember text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
