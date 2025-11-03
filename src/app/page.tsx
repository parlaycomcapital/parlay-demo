'use client';

import IntroGate from '@/components/ui/IntroGate';
import Hero from '@/components/Hero';
import FeedShowcase from '@/components/Sections/FeedShowcase';
import GroupsShowcase from '@/components/Sections/GroupsShowcase';
import AnalyticsShowcase from '@/components/Sections/AnalyticsShowcase';
import SubscriptionsShowcase from '@/components/Sections/SubscriptionsShowcase';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <IntroGate>
      <main className="relative min-h-screen bg-navy">
        <Hero />
        <FeedShowcase />
        <GroupsShowcase />
        <AnalyticsShowcase />
        <SubscriptionsShowcase />
        <CTA />
        <Footer />
      </main>
    </IntroGate>
  );
}
