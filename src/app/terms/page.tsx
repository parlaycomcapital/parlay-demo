import Link from 'next/link';

export default function Terms() {
  return (
    <div className="min-h-screen bg-[#0B132B]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Terms of Service
          </h1>
          <p className="text-gray-300 text-lg">
            Terms and conditions for using Parlay.sk
          </p>
        </div>

        <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
          <div className="space-y-6 text-gray-300">
            <div>
              <h2 className="text-xl font-semibold text-white mb-3">Demo Platform</h2>
              <p>
                This is a demonstration version of Parlay.sk. All features are simulated
                and data is stored locally in your browser.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-3">User Responsibilities</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Use the platform responsibly and respectfully</li>
                <li>Do not share inappropriate or harmful content</li>
                <li>Respect other users and their opinions</li>
                <li>Follow all applicable laws and regulations</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-3">Content Policy</h2>
              <p>
                All content shared on this platform should be related to sports analysis
                and should not violate any community guidelines.
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
