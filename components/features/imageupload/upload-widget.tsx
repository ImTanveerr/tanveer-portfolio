'use client';
import { Button } from '@/components/ui/button';
import { CldUploadWidget } from 'next-cloudinary';
import { useState } from 'react';

export default function UploadWidget({
  onUploadComplete,
}: {
  onUploadComplete: (imageUrl: string) => void;
}) {
  const [imageUrl, setImageUrl] = useState('');

  return (
    <CldUploadWidget
      uploadPreset='next-prisma-blog'
      onSuccess={(result, { widget }) => {
        //@ts-ignore
        setImageUrl(result.info.secure_url);
        //@ts-ignore
        onUploadComplete(String(result.info.secure_url));
      }}
    >
      {({ open }) => (
        <Button
          type='button'
          onClick={() => open()}
          className='bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md'
        >
          Upload an Image
        </Button>
      )}
    </CldUploadWidget>
  );
}
