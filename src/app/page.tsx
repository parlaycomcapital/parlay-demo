'use client';

import Link from 'next/link';
import { mockPosts } from '@/data/mockData';
import Logo from '@/components/ui/Logo';

export default function Home() {
  // Featured posts for homepage
  const featuredPosts = mockPosts.slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center min-h-screen bg-gradient-to-br from-navy via-slate to-navy px-4 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-radial from-amber/20 via-ember/10 to-transparent"></div>
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-amber/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-ember/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Parlay Logo */}
          <Logo variant="transparent" size={100} className="mb-8 md:size-[140px]" />

          <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.9] mb-6 tracking-tight">
            <span className="block">Analytics</span>
            <span className="block bg-gradient-to-r from-ember to-amber bg-clip-text text-transparent">
              Meets Adrenaline
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mb-12 font-medium leading-relaxed">
            Join the Parlay community — where insights ignite results.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/feed"
              className="group px-8 py-4 rounded-2xl bg-gradient-ember text-white font-bold text-lg hover:scale-105 hover:shadow-2xl hover:shadow-ember/25 transition-all duration-300"
            >
              <span className="flex items-center justify-center gap-2">
                Browse Feed
                <span className="group-hover:translate-x-1 transition-transform duration-200">
                  →
                </span>
              </span>
            </Link>
            <Link
              href="/login"
              className="px-8 py-4 rounded-2xl border-2 border-amber/50 text-amber font-bold text-lg hover:bg-amber/10 hover:border-amber hover:scale-105 transition-all duration-300"
            >
              Login
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Why Choose Parlay?</h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto font-body">
              The only platform where sports analysis meets social networking
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-2xl bg-slate/50 hover:bg-slate/70 transition-all duration-300 hover:scale-105 hover:shadow-ember/20">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-heading font-semibold mb-3">Expert Analysis</h3>
              <p className="text-white/80 font-body">
                Get insights from professional sports analysts with years of experience and proven
                track records.
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-slate/50 hover:bg-slate/70 transition-all duration-300 hover:scale-105 hover:shadow-ember/20">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-xl font-heading font-semibold mb-3">Community Driven</h3>
              <p className="text-white/80 font-body">
                Join discussions, share your own insights, and connect with fellow sports
                enthusiasts.
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-slate/50 hover:bg-slate/70 transition-all duration-300 hover:scale-105 hover:shadow-ember/20">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-heading font-semibold mb-3">Data-Driven</h3>
              <p className="text-white/80 font-body">
                Access comprehensive statistics, trends, and data-backed predictions for informed
                decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Analyses</h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Discover the latest insights from our top analysts
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredPosts.map((post) => (
              <div
                key={post.id}
                className="bg-gray-800/50 rounded-2xl overflow-hidden hover:bg-gray-800/70 transition-colors"
              >
                <div className="relative h-48">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                  {post.isPremium && (
                    <div className="absolute top-4 right-4 bg-gradient-ember text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Premium
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <img
                      src={post.author.avatar}
                      alt={post.author.username}
                      className="w-8 h-8 rounded-full mr-3"
                    />
                    <div>
                      <p className="text-sm text-gray-300">{post.author.username}</p>
                      <p className="text-xs text-gray-400">{post.sport}</p>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 line-clamp-2">{post.title}</h3>
                  <p className="text-gray-300 text-sm mb-4 line-clamp-3">{post.preview}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <span>👀 {post.views}</span>
                      <span>❤️ {post.likes}</span>
                      <span>💬 {post.comments}</span>
                    </div>
                    <Link
                      href={`/post/${post.id}`}
                      className="bg-gradient-ember text-white px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
                    >
                      {post.isPremium ? `$${post.price}` : 'Read'}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/feed"
              className="bg-gradient-ember text-white px-8 py-3 rounded-2xl font-semibold hover:opacity-90 transition-opacity shadow-lg"
            >
              View All Analyses
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-ember">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Ready to Join the Community?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Start sharing your insights or discover expert analyses today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/create"
              className="bg-white text-[#0B132B] px-8 py-3 rounded-2xl font-semibold hover:bg-gray-100 transition-colors shadow-lg"
            >
              Start Creating
            </Link>
            <Link
              href="/feed"
              className="border-2 border-white text-white px-8 py-3 rounded-2xl font-semibold hover:bg-white hover:text-[#0B132B] transition-colors"
            >
              Browse Feed
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
