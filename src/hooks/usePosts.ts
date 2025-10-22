'use client';

import { useState, useEffect } from 'react';
import { getPosts, addPost, updatePost, deletePost, Post } from '@/lib/localStorage';

export const usePosts = () => {
  const [posts, setPostsState] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const allPosts = getPosts();
    setPostsState(allPosts);
    setLoading(false);
  }, []);

  const createPost = (post: Omit<Post, 'id' | 'createdAt' | 'likes' | 'comments' | 'views'>) => {
    const newPost: Post = {
      ...post,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      likes: 0,
      comments: 0,
      views: 0,
    };
    
    addPost(newPost);
    setPostsState(prev => [newPost, ...prev]);
    return newPost;
  };

  const editPost = (postId: string, updates: Partial<Post>) => {
    updatePost(postId, updates);
    setPostsState(prev => 
      prev.map(post => 
        post.id === postId ? { ...post, ...updates } : post
      )
    );
  };

  const removePost = (postId: string) => {
    deletePost(postId);
    setPostsState(prev => prev.filter(post => post.id !== postId));
  };

  const getPostById = (id: string): Post | undefined => {
    return posts.find(post => post.id === id);
  };

  const getPostsByAuthor = (authorId: string): Post[] => {
    return posts.filter(post => post.authorId === authorId);
  };

  const getFreePosts = (): Post[] => {
    return posts.filter(post => !post.isPremium);
  };

  const getPremiumPosts = (): Post[] => {
    return posts.filter(post => post.isPremium);
  };

  return {
    posts,
    loading,
    createPost,
    editPost,
    removePost,
    getPostById,
    getPostsByAuthor,
    getFreePosts,
    getPremiumPosts,
  };
};
