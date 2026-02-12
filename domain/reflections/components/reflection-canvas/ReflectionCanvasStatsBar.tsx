"use client";

import { cn } from "@/public/lib/utils";
import type { Entry } from "../reflection-entry";

export interface ReflectionCanvasSectionInfo {
  id: string;
  title: string;
}

export interface ReflectionCanvasStatsBarProps {
  sections: ReflectionCanvasSectionInfo[];
  sectionEntries: Record<string, Entry[]>;
  onSectionClick: (sectionId: string) => void;
}

/**
 * Compact stats bar: section progress dots, completed/total sections, total reflections count.
 */
export function ReflectionCanvasStatsBar({
  sections,
  sectionEntries,
  onSectionClick,
}: ReflectionCanvasStatsBarProps) {
  const completedSections = sections.filter((s) =>
    (sectionEntries[s.id] || []).some(
      (e) => e.content.replace(/<[^>]*>/g, "").trim().length > 0
    )
  ).length;
  const totalEntries = Object.values(sectionEntries).reduce(
    (acc, entries) => acc + entries.length,
    0
  );

  return (
    <div className="flex items-center gap-4 mb-6 text-xs text-muted-foreground">
      <div className="flex items-center gap-1.5">
        {sections.map((section) => {
          const hasContent = (sectionEntries[section.id] || []).some(
            (e) => e.content.replace(/<[^>]*>/g, "").trim().length > 0
          );
          return (
            <button
              key={section.id}
              type="button"
              onClick={() => onSectionClick(section.id)}
              className={cn(
                "w-2 h-2 rounded-full transition-all hover:scale-150",
                hasContent ? "bg-primary" : "bg-border"
              )}
            />
          );
        })}
      </div>
      <span>
        {completedSections}/{sections.length} sections
      </span>
      <span>·</span>
      <span>
        {totalEntries} {totalEntries === 1 ? "reflection" : "reflections"}
      </span>
    </div>
  );
}
