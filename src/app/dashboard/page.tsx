'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { Post } from '@/lib/supabaseClient';
import Logo from '@/components/ui/Logo';
import Link from 'next/link';
import { isPlaceholderMode, mockPosts } from '@/lib/mockData';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [sport, setSport] = useState('');
  const [price, setPrice] = useState('');
  const [isPremium, setIsPremium] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (status === 'authenticated' && session?.user?.role !== 'creator') {
      router.push('/feed');
    }
  }, [status, session, router]);

  const loadPosts = async () => {
    if (!session?.user?.id) return;

    // Use mock posts in placeholder mode
    if (isPlaceholderMode()) {
      const userPosts = mockPosts.filter(p => p.author_id === session.user.id);
      setPosts(userPosts as Post[]);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('author_id', session.user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (err: any) {
      console.warn('Failed to load posts (placeholder mode fallback):', err.message);
      // Fallback to mock posts for user
      const userPosts = mockPosts.filter(p => p.author_id === session.user.id);
      setPosts(userPosts as Post[]);
    }
  };

  const createPost = async () => {
    if (!session?.user?.id) return;

    setLoading(true);
    try {
      // Placeholder mode: log and add to local state
      if (isPlaceholderMode()) {
        console.log('Placeholder mode: Post created', { title, content, sport, price, isPremium });
        const newPost = {
          id: `mock-post-${Date.now()}`,
          title,
          content,
          sport,
          price: parseFloat(price) || 0,
          author_id: session.user.id,
          is_premium: isPremium,
          image_url: imageUrl || null,
          likes_count: 0,
          comments_count: 0,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        
        // Reset form
        setTitle('');
        setContent('');
        setSport('');
        setPrice('');
        setIsPremium(false);
        setImageUrl('');

        // Add to local state
        setPosts(prev => [newPost as any, ...prev]);
        setLoading(false);
        return;
      }

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
    } catch (err: any) {
      console.warn('Failed to create post (placeholder mode fallback):', err.message);
      // In placeholder mode, still reset form
      if (isPlaceholderMode()) {
        setTitle('');
        setContent('');
        setSport('');
        setPrice('');
        setIsPremium(false);
        setImageUrl('');
      }
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (postId: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    // Placeholder mode: remove from local state
    if (isPlaceholderMode()) {
      console.log('Placeholder mode: Post deleted', postId);
      setPosts(prev => prev.filter(p => p.id !== postId));
      return;
    }

    try {
      const { error } = await supabase.from('posts').delete().eq('id', postId);

      if (error) throw error;
      loadPosts();
    } catch (err: any) {
      console.warn('Failed to delete post (placeholder mode fallback):', err.message);
      // Fallback: remove from local state
      setPosts(prev => prev.filter(p => p.id !== postId));
    }
  };

  useEffect(() => {
    if (session?.user && session.user.role === 'creator') {
      loadPosts();
    }
  }, [session?.user]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-navy-100 flex items-center justify-center">
        <div className="text-center">
          <Logo size={80} variant="transparent" className="mx-auto mb-6" />
          <p className="text-white text-xl">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session?.user || session.user.role !== 'creator') {
    return (
      <div className="min-h-screen bg-navy-100 flex items-center justify-center">
        <div className="text-center">
          <Logo size={80} variant="transparent" className="mx-auto mb-6" />
          <p className="text-white text-xl mb-4">Access restricted</p>
          <p className="text-slatex-400 mb-6">Only creators can access this dashboard.</p>
          <Link href="/feed" className="btn-grad">
            Go to Feed
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-narrow">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">Creator Dashboard</h1>
        <p className="text-slatex-400">Create and manage your sports analysis posts</p>
      </div>

      {/* Create Post Form */}
      <div className="card p-6 mb-6">
        <h2 className="text-xl font-semibold text-white mb-6">Create New Post</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slatex-300 mb-2">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter post title"
              className="input"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slatex-300 mb-2">Sport</label>
              <select
                value={sport}
                onChange={(e) => setSport(e.target.value)}
                className="input"
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
              <label className="block text-sm font-medium text-slatex-300 mb-2">Price ($)</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0.00"
                step="0.01"
                min="0"
                className="input"
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              checked={isPremium}
              onChange={(e) => setIsPremium(e.target.checked)}
              className="w-4 h-4 text-amber bg-slate-800 border-slate-600 rounded focus:ring-amber"
            />
            <label className="ml-2 text-slatex-300 text-sm">Premium Post</label>
          </div>

          <div>
            <label className="block text-sm font-medium text-slatex-300 mb-2">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your analysis here..."
              rows={6}
              className="input resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slatex-300 mb-2">
              Image URL (Optional)
            </label>
            <input
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="input"
            />
          </div>

          <button
            onClick={createPost}
            disabled={loading || !title || !content || !sport}
            className="btn-grad w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating Post...' : 'Create Post'}
          </button>
        </div>
      </div>

      {/* Your Posts */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Your Posts</h2>

        {posts.length === 0 ? (
          <div className="card p-8 text-center">
            <p className="text-slatex-400">No posts yet. Create your first analysis!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <div key={post.id} className="card p-5">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2">{post.title}</h3>
                    <p className="text-slatex-400 text-sm mb-2">{post.sport}</p>
                    <p className="text-slatex-300 text-sm line-clamp-2 mb-3">{post.content}</p>
                    <div className="flex items-center gap-3">
                      <span className={`badge ${post.is_premium ? 'bg-amber/20 text-amber' : ''}`}>
                        {post.is_premium ? 'Premium' : 'Free'}
                      </span>
                      {post.price > 0 && (
                        <span className="text-amber font-medium">${post.price}</span>
                      )}
                      <span className="text-slatex-500 text-xs">
                        {new Date(post.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => deletePost(post.id)}
                    className="ml-4 text-red-400 hover:text-red-300 text-sm px-3 py-1 rounded-lg hover:bg-red-500/10 transition"
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
  );
}