'use client';

import { EditPostAction } from '@/actions/EditPostAction';
import UploadWidget from '@/components/features/imageupload/upload-widget';
import RichTextEditor from '@/components/features/text-editor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TPost } from '@/zod/post.typeschema';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { toast } from 'sonner';

export default function BlogEditForm({ postData }: { postData: TPost }) {
  const router = useRouter();
  const [title, setTitle] = useState(postData.title);
  const [description, setDescription] = useState(postData.description ?? '');
  const [imageUrl, setImageUrl] = useState(postData.thumbnailUrl ?? '');
  const [content, setContent] = useState(postData.content);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!imageUrl) {
      toast.error('Please upload a thumbnail image');
      return;
    }
    setIsSubmitting(true);

    const response = await EditPostAction({
      id: postData.id,
      title,
      description,
      content,
      thumbnailUrl: imageUrl,
    });

    if (response.succes) {
      toast.success('Post created successfully!');
      router.push('/dashboard/blog');
      router.refresh();
    }
    setIsSubmitting(false);
  };

  return (
    <section className="mx-auto px-4 py-20 max-w-7xl">
      {/* Back Button */}
      <div className="mb-6">
        <Link href={`/dashboard/blog`}>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <ArrowLeft size={16} /> Back
          </Button>
        </Link>
      </div>

      <h1 className="mb-10 text-3xl md:text-4xl font-bold text-blue-600">Edit Post</h1>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Form */}
        <div className="flex-1">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-1">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter post title"
                className="bg-slate-50 rounded-md focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter post description"
                className="bg-slate-50 rounded-md focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="space-y-1">
              <Label >Upload  Thumbnail</Label>
              <div className="border-2 border-blue-200 rounded-md p-2">
                <UploadWidget onUploadComplete={setImageUrl} />
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor="content">Content</Label>
              <RichTextEditor content={content} onChange={setContent} />
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Updating...' : 'Edit Post'}
            </Button>
          </form>
        </div>

        {/* Thumbnail Preview */}
        <div className="w-full lg:w-1/3 flex flex-col items-center gap-4">
          <Label>Thumbnail Preview</Label>
          {imageUrl ? (
            <div className="relative w-full min-h-[250px] border border-slate-200 rounded-lg overflow-hidden">
              <Image
                src={imageUrl}
                alt="Thumbnail"
                fill
                className="object-contain"
              />

            </div>

          ) : (
            <div className="w-full min-h-[250px] flex items-center justify-center border border-dashed border-slate-300 rounded-lg text-slate-400">
              No image uploaded
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
