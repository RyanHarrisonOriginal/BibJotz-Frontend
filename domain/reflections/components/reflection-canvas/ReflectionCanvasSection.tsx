"use client";

import { ChevronDown, ChevronRight, Plus, MessageSquare } from "lucide-react";
import { cn } from "@/public/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/Collapsible/collapsible";
import { ReflectionEntry, type Entry } from "../reflection-entry";
import { Button } from "@/components/ui/button";

export interface ReflectionCanvasSectionProps {
  section: { id: string; title: string };
  index: number;
  entries: Entry[];
  onAddEntry: () => void;
  onUpdateEntry: (entryId: string, content: string) => void;
  onDeleteEntry: (entryId: string) => void;
  isExpanded: boolean;
  onToggle: () => void;
}

/**
 * One collapsible section: header (expand, number, title, entry count) and body (entries list + Add reflection).
 */
export function ReflectionCanvasSection({
  section,
  index,
  entries,
  onAddEntry,
  onUpdateEntry,
  onDeleteEntry,
  isExpanded,
  onToggle,
}: ReflectionCanvasSectionProps) {
  const hasEntries = entries.length > 0;

  return (
    <Collapsible open={isExpanded} onOpenChange={onToggle}>
      <div className="group">
        <CollapsibleTrigger asChild>
          <button
            type="button"
            className={cn(
              "w-full text-left transition-all duration-200",
              "flex items-center gap-3 py-3 px-4 rounded-lg",
              "hover:bg-muted/50",
              isExpanded && "bg-muted/30"
            )}
          >
            <div className="flex-shrink-0 text-muted-foreground/60">
              {isExpanded ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </div>
            <span
              className={cn(
                "flex-shrink-0 w-6 h-6 rounded-md flex items-center justify-center text-xs font-medium",
                isExpanded
                  ? "bg-primary text-primary-foreground"
                  : hasEntries
                    ? "bg-primary/20 text-primary"
                    : "bg-muted text-muted-foreground"
              )}
            >
              {index + 1}
            </span>
            <span
              className={cn(
                "flex-1 font-medium text-sm transition-colors",
                isExpanded ? "text-foreground" : "text-foreground/80"
              )}
            >
              {section.title}
            </span>
            {hasEntries && (
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <MessageSquare className="w-3 h-3" />
                {entries.length}
              </span>
            )}
          </button>
        </CollapsibleTrigger>

        <CollapsibleContent className="overflow-hidden data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up">
          <div className="pl-14 pr-4 pb-6 pt-2 space-y-3">
            {entries.map((entry, i) => (
              <ReflectionEntry
                key={entry.id}
                entry={entry}
                onUpdate={(content: string) => onUpdateEntry(entry.id, content)}
                onDelete={() => onDeleteEntry(entry.id)}
                isNew={i === entries.length - 1 && entry.content === ""}
              />
            ))}
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onAddEntry();
              }}
              className="w-full h-10 border border-dashed border-border/60 text-muted-foreground hover:text-foreground hover:border-primary/40 hover:bg-primary/5"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add reflection
            </Button>
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}
