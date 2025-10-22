import Link from "next/link";
import Image from "next/image";
import { mockPosts } from "@/data/mockData";

export default function Home() {
  // Featured posts for homepage
  const featuredPosts = mockPosts.slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Hero Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/brand/hero-banner.png"
            alt="Parlay Hero Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-navy/60"></div>
        </div>
        
        {/* Pattern Overlay */}
        <div className="absolute inset-0 z-10 opacity-5">
          <Image
            src="/assets/brand/pattern.png"
            alt="Parlay Pattern"
            fill
            className="object-cover"
          />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            {/* Parlay Logo */}
            <div className="mb-8">
              <Image
                src="/assets/brand/logo.png"
                alt="Parlay Logo"
                width={120}
                height={120}
                className="mx-auto mb-4"
              />
            </div>
            
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
              <span className="text-white">Smart Sports.</span>
              <br />
              <span className="text-gradient-ember">Smarter Minds.</span>
            </h1>
            
            <div className="text-sm text-amber mb-4">
              🚀 Interactive Demo - Login to explore all features!
            </div>
            
            <div className="mb-6">
              <Link
                href="/feed"
                className="inline-block bg-slate text-white px-6 py-3 rounded-xl font-body font-semibold hover:bg-slate/80 transition-colors mr-4"
              >
                Browse Feed (No Login Required)
              </Link>
              <Link
                href="/login"
                className="inline-block bg-gradient-ember text-white px-6 py-3 rounded-xl font-body font-semibold hover:opacity-90 transition-opacity"
              >
                Login for Full Access
              </Link>
            </div>
            
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto font-body">
              Connect with expert sports analysts, share insights, and discover the smartest predictions in sports. 
              Join the community where knowledge meets passion.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/feed"
                className="bg-gradient-ember text-white px-8 py-4 rounded-xl font-heading font-semibold hover:opacity-90 transition-opacity shadow-lg"
              >
                Explore Analyses
              </Link>
              <Link
                href="/create"
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-heading font-semibold hover:bg-white hover:text-navy transition-colors"
              >
                Join Now
              </Link>
            </div>
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
                Get insights from professional sports analysts with years of experience and proven track records.
              </p>
            </div>
            
            <div className="text-center p-6 rounded-2xl bg-slate/50 hover:bg-slate/70 transition-all duration-300 hover:scale-105 hover:shadow-ember/20">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-xl font-heading font-semibold mb-3">Community Driven</h3>
              <p className="text-white/80 font-body">
                Join discussions, share your own insights, and connect with fellow sports enthusiasts.
              </p>
            </div>
            
            <div className="text-center p-6 rounded-2xl bg-slate/50 hover:bg-slate/70 transition-all duration-300 hover:scale-105 hover:shadow-ember/20">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-heading font-semibold mb-3">Data-Driven</h3>
              <p className="text-white/80 font-body">
                Access comprehensive statistics, trends, and data-backed predictions for informed decisions.
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
              <div key={post.id} className="bg-gray-800/50 rounded-2xl overflow-hidden hover:bg-gray-800/70 transition-colors">
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
