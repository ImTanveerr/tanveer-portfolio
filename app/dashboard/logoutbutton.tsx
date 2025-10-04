'use client';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function LogoutButton() {
  const [loading, setIsLoading] = useState(false);
  const router = useRouter();
  return (
    <Button
      disabled={loading}
      variant='destructive'
      onClick={async () => {
        setIsLoading(true);

        await signOut();
        router.refresh();
      }}
    >
      {loading && <Loader2 className='animate-spin' />}
      Log Out
    </Button>
  );
}
