"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Form/input";
import { Search, Plus } from "lucide-react";

interface LibraryActionsBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onNewJourney: () => void;
}

export function LibraryActionsBar({
  searchTerm,
  onSearchChange,
  onNewJourney,
}: LibraryActionsBarProps) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 h-9"
        />
      </div>

      <Button size="sm" className="gap-2 h-9" onClick={onNewJourney}>
        <Plus className="h-4 w-4" />
        <span className="hidden sm:inline">New Journey</span>
      </Button>
    </div>
  );
}
