"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import { trpc } from '@/lib/trpc/trpc-client';
import Loader from '@/components/Loaer';
import FormEditPost from '@/components/dashboard/pages/post/FormEditPost';

interface Category {
  id: string;
  name: string;
  description: string;
  slug: string;
  createdAt: string | null;
}

interface PostCategory {
  postId: string;
  categoryId: string;
  category: Category;
}

interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  published: boolean;
  createdAt: string | null;
  categories: Category[];
  postCategories: PostCategory[];
}


const Page = () => {
  const { id } = useParams<{ id: string }>();
  const { data: post, isLoading } = trpc.post.getById.useQuery({ id });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
            <Loader message="Please wait fetching post...." />
      </div>
    )
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Edit Post</h1>
      <FormEditPost post={post} />
    </div>
  )
}

export default Page