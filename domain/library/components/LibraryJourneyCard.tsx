"use client";

import { BookOpen, ArrowRight } from "lucide-react";
import type { LibraryJourney } from "../types";

interface LibraryJourneyCardProps {
  journey: LibraryJourney;
  onOpen: (journey: LibraryJourney) => void;
}

const PREVIEW_LIMIT = 3;

export function LibraryJourneyCard({ journey, onOpen }: LibraryJourneyCardProps) {
  const hasReflections = journey.reflections.length > 0;
  const previewReflections = journey.reflections.slice(0, PREVIEW_LIMIT);
  const remainingCount = journey.reflections.length - PREVIEW_LIMIT;

  return (
    <div className="border rounded-lg overflow-hidden bg-card">
      {/* Journey header - clickable to open */}
      <button
        type="button"
        onClick={() => onOpen(journey)}
        className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition-colors text-left"
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <BookOpen className="h-4 w-4 text-primary" />
          </div>
          <div className="min-w-0">
            <h2 className="font-medium text-foreground truncate">
              {journey.title}
            </h2>
            <p className="text-xs text-muted-foreground">
              {journey.guideTitle} · {journey.reflections.length} reflections
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-primary shrink-0">
          <span className="hidden sm:inline">Continue</span>
          <ArrowRight className="h-4 w-4" />
        </div>
      </button>

      {/* Reflections preview or empty state */}
      {hasReflections ? (
        <div className="border-t divide-y">
          {previewReflections.map((reflection) => (
            <button
              key={reflection.id}
              type="button"
              className="w-full px-4 py-3 hover:bg-muted/30 transition-colors cursor-pointer text-left"
              onClick={() => onOpen(journey)}
            >
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-xs font-medium text-foreground">
                  {reflection.sectionTitle}
                </span>
                <span className="text-xs text-muted-foreground">
                  {reflection.createdAt}
                </span>
              </div>
              <div
                className="library-reflection-preview text-sm text-muted-foreground line-clamp-2 [&_p]:my-0 [&_p:first-child]:mt-0 [&_p:last-child]:mb-0"
                dangerouslySetInnerHTML={{
                  __html: reflection.content || "",
                }}
              />
            </button>
          ))}

          {remainingCount > 0 && (
            <button
              type="button"
              onClick={() => onOpen(journey)}
              className="w-full px-4 py-2 text-xs text-primary hover:bg-muted/30 transition-colors"
            >
              +{remainingCount} more reflections
            </button>
          )}
        </div>
      ) : (
        <button
          type="button"
          onClick={() => onOpen(journey)}
          className="w-full border-t px-4 py-3 text-sm text-muted-foreground hover:bg-muted/30 transition-colors text-left"
        >
          No reflections yet.{" "}
          <span className="text-primary">Start writing →</span>
        </button>
      )}
    </div>
  );
}
