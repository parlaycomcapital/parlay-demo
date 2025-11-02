export default function PrivacyPage() {
  return (
    <div className="container-narrow py-12">
      <h1 className="text-3xl font-heading font-bold mb-8">Privacy Policy</h1>
      
      <div className="prose prose-invert max-w-none space-y-6">
        <section>
          <h2 className="text-xl font-heading font-semibold mb-3">1. Introduction</h2>
          <p className="text-slatex-300">
            At Parlay, we respect your privacy and are committed to protecting your personal data. 
            This privacy policy explains how we collect, use, and safeguard your information when you 
            use our Platform.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-heading font-semibold mb-3">2. Information We Collect</h2>
          <h3 className="text-lg font-semibold mb-2">Personal Information</h3>
          <ul className="list-disc list-inside space-y-2 text-slatex-300">
            <li>Email address</li>
            <li>Name and profile information</li>
            <li>Payment information (processed securely by Stripe)</li>
            <li>Account preferences and settings</li>
          </ul>

          <h3 className="text-lg font-semibold mb-2 mt-4">Automatically Collected</h3>
          <ul className="list-disc list-inside space-y-2 text-slatex-300">
            <li>IP address and device information</li>
            <li>Browser type and version</li>
            <li>Usage data and platform interactions</li>
            <li>Cookies and tracking technologies</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-heading font-semibold mb-3">3. How We Use Your Information</h2>
          <ul className="list-disc list-inside space-y-2 text-slatex-300">
            <li>To provide and maintain the Platform</li>
            <li>To process payments and subscriptions</li>
            <li>To communicate with you about your account</li>
            <li>To improve and personalize your experience</li>
            <li>To comply with legal obligations</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-heading font-semibold mb-3">4. Data Protection & Security</h2>
          <p className="text-slatex-300">
            We implement industry-standard security measures to protect your data, including encryption, 
            secure servers, and regular security audits. However, no method of transmission over the 
            internet is 100% secure.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-heading font-semibold mb-3">5. Your Rights (GDPR)</h2>
          <p className="text-slatex-300 mb-2">As a user located in the EEA or UK, you have the right to:</p>
          <ul className="list-disc list-inside space-y-2 text-slatex-300">
            <li>Access your personal data</li>
            <li>Rectify inaccurate data</li>
            <li>Request data deletion</li>
            <li>Object to processing</li>
            <li>Data portability</li>
            <li>Withdraw consent</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-heading font-semibold mb-3">6. Third-Party Services</h2>
          <p className="text-slatex-300">
            We use third-party services including Supabase (database), Stripe (payments), and Vercel 
            (hosting). These services have their own privacy policies governing data handling.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-heading font-semibold mb-3">7. Cookies</h2>
          <p className="text-slatex-300">
            We use cookies to enhance your experience, analyze usage, and assist with authentication. 
            You can control cookies through your browser settings.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-heading font-semibold mb-3">8. Contact Us</h2>
          <p className="text-slatex-300">
            For privacy-related questions or to exercise your rights, contact us at privacy@parlay.app
          </p>
        </section>

        <section className="pt-6 border-t border-slate-800">
          <p className="text-sm text-slatex-500">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </section>
      </div>
    </div>
  );
}