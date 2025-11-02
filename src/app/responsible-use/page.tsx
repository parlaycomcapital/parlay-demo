export default function ResponsibleUsePage() {
  return (
    <div className="container-narrow py-12">
      <h1 className="text-3xl font-heading font-bold mb-8">Responsible Use</h1>
      
      <div className="prose prose-invert max-w-none space-y-6">
        <section>
          <div className="card p-6 bg-amber/10 border-amber/30 mb-8">
            <h2 className="text-xl font-heading font-semibold mb-2 text-amber">⚠️ Important Notice</h2>
            <p className="text-slatex-300">
              Parlay is an educational platform for sports analysis and insights. We do not facilitate 
              gambling or place bets on your behalf. All betting decisions are yours alone, and you must 
              bet responsibly within your means.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-heading font-semibold mb-3">Responsible Betting Guidelines</h2>
          <ul className="list-disc list-inside space-y-2 text-slatex-300">
            <li>Only bet what you can afford to lose</li>
            <li>Never chase losses</li>
            <li>Set limits on time and money spent</li>
            <li>Don't bet under the influence of alcohol or drugs</li>
            <li>Take breaks and maintain perspective</li>
            <li>Keep sports betting fun, not a source of income</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-heading font-semibold mb-3">Risk of Harm</h2>
          <p className="text-slatex-300 mb-2">
            Problem gambling can lead to serious consequences including:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slatex-300">
            <li>Financial difficulties and debt</li>
            <li>Relationship strain and isolation</li>
            <li>Mental health issues (anxiety, depression)</li>
            <li>Legal problems</li>
            <li>Loss of employment or career</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-heading font-semibold mb-3">Warning Signs</h2>
          <p className="text-slatex-300 mb-2">You may have a gambling problem if you:</p>
          <ul className="list-disc list-inside space-y-2 text-slatex-300">
            <li>Bet more than you can afford</li>
            <li>Feel the need to hide your betting activity</li>
            <li>Chase losses by betting more</li>
            <li>Neglect responsibilities due to betting</li>
            <li>Feel restless when trying to stop</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-heading font-semibold mb-3">Get Help</h2>
          <p className="text-slatex-300 mb-4">
            If you or someone you know has a gambling problem, help is available:
          </p>
          
          <div className="space-y-3">
            <div className="card p-4 border-amber/30">
              <h3 className="font-semibold text-white mb-2">🆘 24/7 Helpline</h3>
              <p className="text-slatex-300 text-sm">
                National Problem Gambling Helpline: <strong>1-800-522-4700</strong>
              </p>
            </div>

            <div className="card p-4 border-slate-700">
              <h3 className="font-semibold text-white mb-2">🌐 Online Resources</h3>
              <ul className="text-slatex-300 text-sm space-y-1">
                <li>• Gamblers Anonymous: gamblersanonymous.org</li>
                <li>• National Council on Problem Gambling: ncpgambling.org</li>
                <li>• BeGambleAware: begambleaware.org</li>
              </ul>
            </div>

            <div className="card p-4 border-slate-700">
              <h3 className="font-semibold text-white mb-2">🔒 Self-Exclusion</h3>
              <p className="text-slatex-300 text-sm">
                Contact us at support@parlay.app to request account suspension or self-exclusion.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-heading font-semibold mb-3">18+ Only</h2>
          <p className="text-slatex-300">
            You must be 18 years or older to use Parlay. Underage gambling is illegal and strictly 
            prohibited. We reserve the right to verify age and terminate accounts of underage users.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-heading font-semibold mb-3">Our Commitment</h2>
          <p className="text-slatex-300">
            Parlay is committed to promoting responsible gambling practices. We provide educational 
            resources, support tools, and work with responsible gambling organizations to protect our users.
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
