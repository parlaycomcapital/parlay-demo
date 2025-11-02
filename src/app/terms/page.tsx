export default function TermsPage() {
  return (
    <div className="container-narrow py-12">
      <h1 className="text-3xl font-heading font-bold mb-8">Terms of Service</h1>
      
      <div className="prose prose-invert max-w-none space-y-6">
        <section>
          <h2 className="text-xl font-heading font-semibold mb-3">1. Acceptance of Terms</h2>
          <p className="text-slatex-300">
            By accessing or using Parlay ("the Platform"), you agree to be bound by these Terms of Service 
            and all applicable laws and regulations. If you do not agree with any part of these terms, 
            you may not use the Platform.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-heading font-semibold mb-3">2. Description of Service</h2>
          <p className="text-slatex-300">
            Parlay is a social platform connecting sports analysts and enthusiasts. The Platform provides 
            educational insights, analysis, and community features. Parlay does not facilitate gambling, 
            place bets on behalf of users, or guarantee any outcomes.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-heading font-semibold mb-3">3. User Responsibilities</h2>
          <ul className="list-disc list-inside space-y-2 text-slatex-300">
            <li>You must be 18 years or older to use the Platform</li>
            <li>You are responsible for maintaining the confidentiality of your account</li>
            <li>You agree to use the Platform only for lawful purposes</li>
            <li>You must provide accurate and truthful information</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-heading font-semibold mb-3">4. Analyst Content</h2>
          <p className="text-slatex-300">
            Analysts are responsible for their own analysis and predictions. Parlay does not verify, endorse, 
            or guarantee the accuracy of any analysis posted on the Platform. All content is for informational 
            and educational purposes only.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-heading font-semibold mb-3">5. No Gambling</h2>
          <p className="text-slatex-300">
            Parlay is not a gambling platform. The Platform provides educational insights and analysis only. 
            Users are solely responsible for their own betting decisions and any associated risks.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-heading font-semibold mb-3">6. Intellectual Property</h2>
          <p className="text-slatex-300">
            All content on the Platform, including but not limited to text, graphics, logos, and software, 
            is the property of Parlay or its licensors and protected by intellectual property laws.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-heading font-semibold mb-3">7. Limitation of Liability</h2>
          <p className="text-slatex-300">
            Parlay shall not be liable for any indirect, incidental, special, consequential, or punitive 
            damages arising from your use of the Platform or reliance on any analysis or information provided.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-heading font-semibold mb-3">8. Changes to Terms</h2>
          <p className="text-slatex-300">
            Parlay reserves the right to modify these terms at any time. Continued use of the Platform 
            after changes constitutes acceptance of the new terms.
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