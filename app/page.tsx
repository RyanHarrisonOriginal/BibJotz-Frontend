import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background" >
      <div className="max-w-6xl mx-auto px-6 py-8 space-y-12">
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-serif font-bold text-foreground">
            Explore New Guides
          </h2>
          <Button asChild className="gap-2">
            <Link href="/create-guide">
              <Plus className="h-4 w-4" />
              Create Guide
            </Link>
          </Button>
        </div>
      </section>

      </div>
      <div>

      </div>
      
    </div>
  );
}
