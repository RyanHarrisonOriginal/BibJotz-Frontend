'use client';

import { usePathname } from 'next/navigation';
import { AppSideBar } from '@/components/layout/AppSideBar';
import { AppHeader } from '@/components/layout/AppHeader';

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname?.startsWith('/login') || pathname?.startsWith('/signup') || pathname?.startsWith('/forgot-password');

  if (isAuthPage) {
    return <div className="w-full">{children}</div>;
  }

  return (
    <div className="min-h-screen flex w-full">
      <AppSideBar />
      <div className="flex-1 flex flex-col">
        <AppHeader />
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}

