import React from 'react';
import { TPost } from '@/zod/post.typeschema';
import { TResponse } from '@/zod/response.typeschema';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import ItemActions from '@/components/ui/item-actions';
import { Button } from '@/components/ui/button';
import { ArrowLeft, FileText } from 'lucide-react';

export default async function BlogPage() {
  const url = process.env.NEXT_PUBLIC_BACKEND_URL;

  // Fetch all blog posts
  const res = await fetch(`${url}/api/posts/get-all`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    next: { revalidate: 60, tags: ['posts'] },
  });

  const resData: TResponse<TPost[]> = await res.json();

  if (!resData.data) return notFound();

  return (
    <section className="p-8 min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
    <div className="flex items-center gap-4">
  <Link href="/dashboard">
    <Button variant="outline" className="flex items-center gap-2">
      <ArrowLeft className="w-4 h-4" />
      Dashboard
    </Button>
  </Link>
</div>


        <h1 className="text-3xl font-bold text-gray-900">Blog Management</h1>
        <Button variant="outline" asChild>
          <Link href="/dashboard/blog/create">Create New Post</Link>
        </Button>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6 bg-white shadow rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <FileText className="w-6 h-6 text-blue-500" />
            <div>
              <p className="text-gray-500 text-sm">Total Posts</p>
              <p className="text-gray-900 font-bold text-xl">{resData.data.length}</p>
            </div>
          </div>
        </Card>
        {/* You can add more cards like total views or comments here */}
      </div>

      {/* Recent Blog Posts */}
      <div className="grid grid-cols-1 gap-6">
        {resData.data.map((post) => (
          <Card
            key={post.id}
            className="p-6 bg-white shadow rounded-lg border border-gray-200 hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">{post.title}</h2>
                <p className="text-gray-500 text-sm">
                  Published{' '}
                  {new Date(post.createdAt ?? new Date()).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
              <ItemActions
                id={String(post.id)}
                type="post"
                viewHref={`/blog/${post.id}`}
                editHref={`/dashboard/blog/edit/${post.id}`}
              />
            </div>
          </Card>
        ))}

        {resData.data.length === 0 && (
          <p className="text-center text-gray-500">No blog posts available.</p>
        )}
      </div>
    </section>
  );
}
