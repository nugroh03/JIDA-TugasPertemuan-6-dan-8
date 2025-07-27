'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import Sidebar from '@/components/dashboard/sidebar';
import { useSession } from 'next-auth/react';
import { Loader2 } from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className='text-center py-12'>
        <Loader2 className='h-16 w-16 text-blue-700 mx-auto mb-4 animate-spin' />
        <h3 className='text-xl font-semibold text-gray-900'>Loading...</h3>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return null;
  }

  return (
    <div className='flex h-screen bg-gray-100'>
      <Sidebar />
      <main className='flex-1 overflow-y-auto'>{children}</main>
    </div>
  );
}
