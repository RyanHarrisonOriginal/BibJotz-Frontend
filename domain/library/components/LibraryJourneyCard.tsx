"use client";

import { BookOpen, ArrowRight, MessageSquare } from "lucide-react";
import type { LibraryJourney } from "../types";

interface LibraryJourneyCardProps {
  journey: LibraryJourney;
  onOpen: (journey: LibraryJourney) => void;
}

const PREVIEW_SECTIONS_LIMIT = 3;

/** User-friendly date/time: "Today at 2:30 PM", "Yesterday at 9:00 AM", "Jan 15", etc. */
function formatFriendlyDate(isoString: string): string {
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return isoString;
  const now = new Date();
  const sameDay =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  const isYesterday =
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear();

  const timeStr = new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);

  if (sameDay) return `Today at ${timeStr}`;
  if (isYesterday) return `Yesterday at ${timeStr}`;
  const thisYear = date.getFullYear() === now.getFullYear();
  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    ...(thisYear ? {} : { year: "numeric" }),
  }).format(date);
}

export function LibraryJourneyCard({ journey, onOpen }: LibraryJourneyCardProps) {
  const sectionReflections = journey.sectionReflections ?? [];
  const totalEntries = sectionReflections.reduce(
    (sum, sr) => sum + sr.entries.length,
    0
  );
  const hasReflections = totalEntries > 0;
  const previewSections = sectionReflections.slice(0, PREVIEW_SECTIONS_LIMIT);
  const remainingSections = sectionReflections.length - PREVIEW_SECTIONS_LIMIT;

  return (
    <div className="border rounded-xl overflow-hidden bg-card shadow-sm">
      {/* Journey header - clickable to open */}
      <button
        type="button"
        onClick={() => onOpen(journey)}
        className="w-full p-4 sm:p-5 flex items-center justify-between hover:bg-muted/50 transition-colors text-left gap-3"
      >
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <BookOpen className="h-5 w-5 text-primary" />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="font-semibold text-foreground truncate text-base">
              {journey.title}
            </h2>
            <p className="text-sm text-muted-foreground truncate mt-0.5">
              {journey.guideTitle}
              <span className="mx-1.5">·</span>
              <span className="inline-flex items-center gap-1">
                <MessageSquare className="h-3.5 w-3.5" />
                {totalEntries} reflection
                {totalEntries !== 1 ? "s" : ""}
              </span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm font-medium text-primary shrink-0">
          <span className="hidden sm:inline">Continue</span>
          <ArrowRight className="h-4 w-4" />
        </div>
      </button>

      {/* Reflections preview grouped by section, or empty state */}
      {hasReflections ? (
        <div className="border-t bg-muted/20">
          {previewSections.map((section) => (
            <div
              key={section.sectionId}
              className="border-b border-border/40 last:border-b-0"
            >
              <div className="px-4 sm:px-5 pt-3 pb-2">
                <span className="text-xs font-semibold text-foreground/90 uppercase tracking-wide">
                  {section.sectionTitle}
                </span>
              </div>
              <div className="px-2 pb-2 sm:px-3 sm:pb-3 space-y-1">
                {section.entries.map((entry) => (
                  <button
                    key={entry.id}
                    type="button"
                    className="w-full rounded-lg px-3 py-2.5 sm:px-4 sm:py-3 hover:bg-background/80 transition-colors cursor-pointer text-left border border-transparent hover:border-border/50"
                    onClick={() => onOpen(journey)}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <div
                          className="library-reflection-preview text-sm text-foreground/90 line-clamp-2 [&_p]:my-0 [&_p:first-child]:mt-0 [&_p:last-child]:mb-0 [&_ul]:list-disc [&_ul]:pl-4 [&_ol]:list-decimal [&_ol]:pl-4"
                          dangerouslySetInnerHTML={{
                            __html: entry.content || "",
                          }}
                        />
                        <p className="text-xs text-muted-foreground mt-1.5">
                          {formatFriendlyDate(entry.createdAt)}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
          {remainingSections > 0 && (
            <button
              type="button"
              onClick={() => onOpen(journey)}
              className="w-full px-4 sm:px-5 py-3 text-sm font-medium text-primary hover:bg-muted/30 transition-colors"
            >
              +{remainingSections} more section
              {remainingSections !== 1 ? "s" : ""}
            </button>
          )}
        </div>
      ) : (
        <button
          type="button"
          onClick={() => onOpen(journey)}
          className="w-full border-t px-4 sm:px-5 py-4 text-sm text-muted-foreground hover:bg-muted/30 transition-colors text-left"
        >
          No reflections yet.{" "}
          <span className="text-primary font-medium">Start writing →</span>
        </button>
      )}
    </div>
  );
}
