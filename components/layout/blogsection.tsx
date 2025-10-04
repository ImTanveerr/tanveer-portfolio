import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { TPost } from '@/zod/post.typeschema';
import { TResponse } from '@/zod/response.typeschema';
import Link from 'next/link';

export async function BlogSection() {
  const url = process.env.NEXT_PUBLIC_BACKEND_URL;
  const res = await fetch(`${url}/api/posts/get-all`, {
    method: 'GET',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
    next: { tags: ['posts'] },
  });
  const resData: TResponse<TPost[]> = await res.json();
 return (
  <section id="blog" className="bg-muted/30 px-6 py-20">
    <div className="mx-auto max-w-6xl container">
      {/* Section header */}
      <div className="mb-16 text-center">
        <h2 className="mb-4 font-extrabold text-3xl md:text-5xl text-blue-600">
          My Blogs
        </h2>
      </div>

     {/* Blog posts grid */}
<div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
  {resData.data.map((post) => (
    <Card
      key={post.id}
      className="group border border-slate-200 bg-white hover:shadow-xl transform transition-all duration-300 overflow-hidden"
    >
      {/* Blog post image */}
      <div className="relative overflow-hidden h-48">
        <Image
          src={post.thumbnailUrl || '/placeholder.png'}
          alt={post.title}
          fill
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
        />

        <div className="top-4 left-4 absolute">
          <Badge
            variant="secondary"
            className="bg-background/90 text-foreground"
          >
            Blog
          </Badge>
        </div>
      </div>

      <CardHeader className="pb-3">
        <div className="flex items-center gap-2 mb-2 text-slate-500 text-sm">
          <Calendar size={14} />
          <span>
            {new Date(post.createdAt ?? new Date()).toLocaleDateString(
              'en-US',
              { year: 'numeric', month: 'long', day: 'numeric' }
            )}
          </span>
          <span>•</span>
          <span>{`1 Minutes`}</span>
        </div>
        <CardTitle className="text-slate-900 text-lg md:text-xl leading-tight group-hover:text-blue-600 transition-colors duration-200">
          {post.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-0">
        <CardDescription className="mb-4 text-slate-600 leading-relaxed">
          {post.description}
        </CardDescription>

        {/* Read More button below */}
        <div className="mt-2">
          <Link
            href={`/blog/${post.id}`}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            Read More <ArrowRight size={18} />
          </Link>
        </div>
      </CardContent>
    </Card>
  ))}
</div>


 
{/* View all posts button */}
        <div className='mt-12 text-center'>
          <Button
            variant="outline"
            size="lg"
            className="border-blue-600 text-blue-600 hover:bg-blue-50"
            asChild
          >
            <Link href='/blog'>View All Posts</Link>
          </Button>
        </div>
    </div>
  </section>
);

}


