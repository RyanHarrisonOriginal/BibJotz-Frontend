'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/Form/switch';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

type CreateGuideHeaderProps = {
  isPublic: boolean;
  onPublicChange: (checked: boolean) => void;
  onPublish: () => void;
};

export function CreateGuideHeader({ isPublic, onPublicChange, onPublish }: CreateGuideHeaderProps) {
  return (
    <div className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-6xl mx-auto px-6 flex h-14 items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="gap-2"
        >
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
        </Button>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3">
            <Switch
              checked={isPublic}
              onCheckedChange={onPublicChange}
            />
            <div className="w-[280px]">
              {isPublic ? (
                <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  Public guide (shared with your community)
                </span>
              ) : (
                <span className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                  Private guide (personal use only)
                </span>
              )}
            </div>
          </div>
          
          <Button
            onClick={onPublish}
            className="gap-2"
          >
            <CheckCircle2 className="h-4 w-4" />
            Publish Guide
          </Button>
        </div>
      </div>
    </div>
  );
}

