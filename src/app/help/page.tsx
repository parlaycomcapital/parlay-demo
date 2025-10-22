import Link from 'next/link';

export default function HelpCenter() {
  return (
    <div className="min-h-screen bg-[#0B132B]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Help Center
          </h1>
          <p className="text-gray-300 text-lg">
            Find answers to common questions about Parlay.sk
          </p>
        </div>

        <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-white mb-3">Getting Started</h2>
              <p className="text-gray-300">
                Welcome to Parlay.sk! This is a demo platform showcasing sports analysis features.
                You can login as different user types to explore the platform.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-3">User Roles</h2>
              <ul className="text-gray-300 space-y-2">
                <li>• <strong>Fans:</strong> Browse and purchase premium analyses</li>
                <li>• <strong>Analysts:</strong> Create and share sports insights</li>
                <li>• <strong>Admins:</strong> Manage platform content and users</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-3">Premium Content</h2>
              <p className="text-gray-300">
                Premium analyses are paid content from expert analysts. In this demo,
                purchases are simulated using localStorage.
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
