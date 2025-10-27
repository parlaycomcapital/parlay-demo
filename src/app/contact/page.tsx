import Link from 'next/link';

export default function Contact() {
  return (
    <div className="min-h-screen bg-[#0B132B]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Contact Us</h1>
          <p className="text-gray-300 text-lg">Get in touch with the Parlay.sk team</p>
        </div>

        <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold text-white mb-4">Get in Touch</h2>
              <div className="space-y-4 text-gray-300">
                <div>
                  <strong>Email:</strong> contact@parlay.sk
                </div>
                <div>
                  <strong>Phone:</strong> +1 (555) 123-4567
                </div>
                <div>
                  <strong>Address:</strong> 123 Sports Street, City, State 12345
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-4">Demo Information</h2>
              <p className="text-gray-300 mb-4">
                This is a demonstration of the Parlay.sk platform. All data is stored locally and
                resets when you clear your browser data.
              </p>
              <p className="text-gray-300">
                For real support, please contact us through the channels above.
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-700 mt-8">
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
  );
}
