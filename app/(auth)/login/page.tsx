'use client';

import { Suspense } from 'react';
import { SignIn } from '@clerk/nextjs';
import { Compass } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

function LoginContent() {
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect_url') || '/';

  return (
    <div className="max-w-md w-full px-6 space-y-8">
      {/* Logo and Welcome Section */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <Compass className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-serif font-bold text-foreground">
            BibJotz
          </h1>
        </div>
        <p className="text-muted-foreground">
          Welcome back. Sign in to continue your journey.
        </p>
      </div>

      {/* Clerk Sign In Component */}
      <div className="flex justify-center">
        <SignIn 
          afterSignInUrl={redirectUrl}
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "shadow-none border-2",
            },
          }}
        />
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="max-w-md w-full px-6 space-y-8">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Compass className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-serif font-bold text-foreground">
              BibJotz
            </h1>
          </div>
        </div>
      </div>
    }>
      <LoginContent />
    </Suspense>
  );
}

