"use client";

import { Button } from "@/components/ui/button";

interface LibraryEmptyStateProps {
  hasSearchTerm: boolean;
  onClearSearch: () => void;
  onStartJourney: () => void;
}

export function LibraryEmptyState({
  hasSearchTerm,
  onClearSearch,
  onStartJourney,
}: LibraryEmptyStateProps) {
  return (
    <div className="text-center py-16 text-muted-foreground">
      <p className="mb-4">
        {hasSearchTerm ? "No results found" : "No journeys yet"}
      </p>
      {hasSearchTerm ? (
        <Button variant="outline" size="sm" onClick={onClearSearch}>
          Clear search
        </Button>
      ) : (
        <Button size="sm" onClick={onStartJourney}>
          Start your first journey
        </Button>
      )}
    </div>
  );
}
