'use client';

import { Button } from "@/components/ui/button";
import { BookOpen, ExternalLink } from "lucide-react";
import { useRouter } from "next/navigation";

export const NoGuidesFound = () => {
    const router = useRouter();
    return (
        <div className="rounded-xl border border-dashed border-border/50 bg-muted/30 p-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-muted mb-4">
                <BookOpen className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-muted-foreground">
                Select a Guide
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
                Choose a guide template from the dropdown to see details and get started
            </p>
            <Button
                variant="outline"
                size="sm"
                onClick={() => router.push('/guides')}
                className="gap-2"
            >
                <span>Explore all guides</span>
                <ExternalLink className="h-4 w-4" />
            </Button>
        </div>
    );
};

