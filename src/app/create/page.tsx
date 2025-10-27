'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/hooks/useUser';
import { usePosts } from '@/hooks/usePosts';
import Link from 'next/link';

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [sport, setSport] = useState('');
  const [teams, setTeams] = useState('');
  const [price, setPrice] = useState(0);
  const [isPremium, setIsPremium] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { user, isLoggedIn, isAnalyst } = useUser();
  const { createPost } = usePosts();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn || !isAnalyst) {
      router.push('/login');
    }
  }, [isLoggedIn, isAnalyst, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!title.trim() || !sport.trim() || !content.trim()) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    try {
      const teamsArray = teams
        .split(',')
        .map((t) => t.trim())
        .filter((t) => t);

      const newPost = createPost({
        title: title.trim(),
        content: content.trim(),
        preview: content.trim().substring(0, 150) + '...',
        authorId: user!.id,
        author: user!,
        sport: sport.trim(),
        teams: teamsArray,
        price: isPremium ? price : 0,
        isPremium,
        imageUrl:
          imageUrl.trim() ||
          'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=400&fit=crop',
      });

      router.push('/feed');
    } catch (err) {
      setError('Failed to create post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isLoggedIn || !isAnalyst) {
    return (
      <div className="min-h-screen bg-[#0B132B] flex items-center justify-center">
        <div className="text-center">
          <div className="text-white text-xl mb-4">Access Denied</div>
          <p className="text-gray-300 mb-6">Only analysts can create posts</p>
          <Link
            href="/login"
            className="bg-gradient-ember text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Login as Analyst
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B132B]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Create New Analysis</h1>
          <p className="text-gray-300 text-lg">Share your sports insights with the community</p>
        </div>

        {/* Form */}
        <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
                Analysis Title *
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="e.g., Manchester United vs Arsenal: Premier League Analysis"
                required
              />
            </div>

            {/* Sport and Teams */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="sport" className="block text-sm font-medium text-gray-300 mb-2">
                  Sport *
                </label>
                <select
                  id="sport"
                  value={sport}
                  onChange={(e) => setSport(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                >
                  <option value="">Select Sport</option>
                  <option value="Football">Football</option>
                  <option value="Basketball">Basketball</option>
                  <option value="Tennis">Tennis</option>
                  <option value="Hockey">Hockey</option>
                  <option value="Baseball">Baseball</option>
                  <option value="Soccer">Soccer</option>
                </select>
              </div>

              <div>
                <label htmlFor="teams" className="block text-sm font-medium text-gray-300 mb-2">
                  Teams/Players
                </label>
                <input
                  type="text"
                  id="teams"
                  value={teams}
                  onChange={(e) => setTeams(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="e.g., Manchester United, Arsenal (comma separated)"
                />
              </div>
            </div>

            {/* Premium Settings */}
            <div className="bg-gray-700/50 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="isPremium"
                  checked={isPremium}
                  onChange={(e) => setIsPremium(e.target.checked)}
                  className="w-4 h-4 text-orange-500 bg-gray-600 border-gray-500 rounded focus:ring-orange-500 focus:ring-2"
                />
                <label htmlFor="isPremium" className="ml-3 text-sm font-medium text-gray-300">
                  Make this a premium analysis
                </label>
              </div>

              {isPremium && (
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-300 mb-2">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    id="price"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-3 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="0.00"
                    required={isPremium}
                  />
                </div>
              )}
            </div>

            {/* Image URL */}
            <div>
              <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-300 mb-2">
                Image URL
              </label>
              <input
                type="url"
                id="imageUrl"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="https://example.com/image.jpg (optional)"
              />
            </div>

            {/* Content */}
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-300 mb-2">
                Analysis Content *
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={8}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Write your detailed analysis here..."
                required
              />
            </div>

            {error && <div className="text-red-400 text-sm text-center">{error}</div>}

            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gradient-ember text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating...' : 'Create Analysis'}
              </button>

              <Link
                href="/feed"
                className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
