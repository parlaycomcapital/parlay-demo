'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { supabase } from '@/lib/supabaseClient';
import { Post } from '@/lib/supabaseClient';
import Link from 'next/link';
import ParlayLogo from '@/components/ParlayLogo';
import { withRole } from '@/utils/withRole';

function Dashboard() {
  const { data: session } = useSession();
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [sport, setSport] = useState('');
  const [price, setPrice] = useState('');
  const [isPremium, setIsPremium] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const loadPosts = async () => {
    if (!session?.user?.id) return;

    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('author_id', session.user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (err) {
      console.error('Failed to load posts:', err);
    }
  };

  const createPost = async () => {
    if (!session?.user?.id) return;

    setLoading(true);
    try {
      const { error } = await supabase.from('posts').insert([
        {
          author_id: session.user.id,
          title,
          content,
          sport,
          price: parseFloat(price) || 0,
          is_premium: isPremium,
          image_url: imageUrl || null,
        },
      ]);

      if (error) throw error;

      // Reset form
      setTitle('');
      setContent('');
      setSport('');
      setPrice('');
      setIsPremium(false);
      setImageUrl('');

      // Reload posts
      loadPosts();
    } catch (err) {
      console.error('Failed to create post:', err);
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (postId: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      const { error } = await supabase.from('posts').delete().eq('id', postId);

      if (error) throw error;
      loadPosts();
    } catch (err) {
      console.error('Failed to delete post:', err);
    }
  };

  useEffect(() => {
    if (session?.user) {
      loadPosts();
    }
  }, [session?.user]);

  if (!session?.user) {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center">
        <div className="text-center">
          <ParlayLogo size={80} className="mb-6" />
          <p className="text-white text-xl mb-4">Please log in</p>
          <Link
            href="/login"
            className="bg-gradient-ember text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  if (session.user.role !== 'analyst' && session.user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center">
        <div className="text-center">
          <ParlayLogo size={80} className="mb-6" />
          <p className="text-white text-xl mb-4">Access restricted</p>
          <p className="text-slate-300 mb-6">Only analysts and admins can access this dashboard.</p>
          <Link
            href="/feed"
            className="bg-gradient-ember text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity"
          >
            Go to Feed
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-navy">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
            Analyst Dashboard
          </h1>
          <p className="text-gray-300 text-lg">Create and manage your sports analysis posts</p>
        </div>

        {/* Create Post Form */}
        <div className="bg-slate/50 rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-heading font-semibold text-white mb-6">Create New Post</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-white mb-2">Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter post title"
                className="w-full px-4 py-3 bg-slate/30 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-amber focus:ring-amber"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Sport</label>
              <select
                value={sport}
                onChange={(e) => setSport(e.target.value)}
                className="w-full px-4 py-3 bg-slate/30 border border-slate-600 rounded-xl text-white focus:outline-none focus:border-amber focus:ring-amber"
              >
                <option value="">Select Sport</option>
                <option value="football">Football</option>
                <option value="basketball">Basketball</option>
                <option value="tennis">Tennis</option>
                <option value="esports">Esports</option>
                <option value="baseball">Baseball</option>
                <option value="soccer">Soccer</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Price ($)</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0.00"
                step="0.01"
                min="0"
                className="w-full px-4 py-3 bg-slate/30 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-amber focus:ring-amber"
              />
            </div>

            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={isPremium}
                  onChange={(e) => setIsPremium(e.target.checked)}
                  className="w-4 h-4 text-amber bg-slate-600 border-slate-500 rounded focus:ring-amber focus:ring-2"
                />
                <span className="ml-2 text-white">Premium Post</span>
              </label>
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-white mb-2">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your analysis here..."
              rows={6}
              className="w-full px-4 py-3 bg-slate/30 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-amber focus:ring-amber"
            />
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-white mb-2">
              Image URL (Optional)
            </label>
            <input
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-3 bg-slate/30 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-amber focus:ring-amber"
            />
          </div>

          <button
            onClick={createPost}
            disabled={loading || !title || !content || !sport}
            className="mt-6 bg-gradient-ember text-white px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 hover:shadow-2xl hover:shadow-ember/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Creating Post...
              </span>
            ) : (
              'Create Post'
            )}
          </button>
        </div>

        {/* Your Posts */}
        <div>
          <h2 className="text-2xl font-heading font-semibold text-white mb-6">Your Posts</h2>

          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-white/60 text-lg">No posts yet. Create your first analysis!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <div key={post.id} className="bg-slate/50 rounded-xl p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-2">{post.title}</h3>
                      <p className="text-slate-300 text-sm mb-2">{post.sport}</p>
                      <p className="text-slate-400 text-sm line-clamp-2">{post.content}</p>
                      <div className="flex items-center space-x-4 mt-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${post.is_premium ? 'bg-amber text-navy' : 'bg-green-500 text-white'}`}
                        >
                          {post.is_premium ? 'Premium' : 'Free'}
                        </span>
                        <span className="text-amber font-medium">${post.price}</span>
                        <span className="text-slate-400 text-sm">
                          {new Date(post.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => deletePost(post.id)}
                      className="ml-4 bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-500 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default withRole(Dashboard, ['analyst', 'admin']);
