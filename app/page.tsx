'use client';

import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { createNewDraftKey } from "@/features/guide/drafts/utility";
import { handleCreateGuide } from "@/features/guide/drafts/utility";

export default function Home() {
  const router = useRouter();


  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-6 py-8 space-y-12">
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-serif font-bold text-foreground">
              Explore New Guides
            </h2>

            <Button onClick={() => handleCreateGuide(router)} className="gap-2">
              <Plus className="h-4 w-4" />
              Create Guide
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
