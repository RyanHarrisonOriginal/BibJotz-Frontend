"use client";

import { useState, useCallback, useEffect } from "react";
import { ChevronDown, ChevronRight, Plus, MessageSquare } from "lucide-react";
import { cn } from "@/public/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/Collapsible/collapsible";
import { ReflectionEntry, type Entry } from "./ReflectionEntry";
import { Button } from "@/components/ui/button";

interface Section {
  id: string;
  title: string;
}

export interface SectionEntries {
  [sectionId: string]: Entry[];
}

interface ReflectionCanvasProps {
  sections: Section[];
  onContentChange: (content: string) => void;
  /** When opening an existing journey, prefill sections with these entries. */
  initialSectionEntries?: SectionEntries;
}

const SectionBlock = ({
  section,
  index,
  entries,
  onAddEntry,
  onUpdateEntry,
  onDeleteEntry,
  isExpanded,
  onToggle,
}: {
  section: Section;
  index: number;
  entries: Entry[];
  onAddEntry: () => void;
  onUpdateEntry: (entryId: string, content: string) => void;
  onDeleteEntry: (entryId: string) => void;
  isExpanded: boolean;
  onToggle: () => void;
}) => {
  const hasEntries = entries.length > 0;

  return (
    <Collapsible open={isExpanded} onOpenChange={onToggle}>
      <div className="group">
        {/* Minimal Section Header */}
        <CollapsibleTrigger asChild>
          <button
            className={cn(
              "w-full text-left transition-all duration-200",
              "flex items-center gap-3 py-3 px-4 rounded-lg",
              "hover:bg-muted/50",
              isExpanded && "bg-muted/30"
            )}
          >
            {/* Expand Icon */}
            <div className="flex-shrink-0 text-muted-foreground/60">
              {isExpanded ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </div>

            {/* Section Number */}
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

            {/* Section Title */}
            <span
              className={cn(
                "flex-1 font-medium text-sm transition-colors",
                isExpanded ? "text-foreground" : "text-foreground/80"
              )}
            >
              {section.title}
            </span>

            {/* Entry Count */}
            {hasEntries && (
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <MessageSquare className="w-3 h-3" />
                {entries.length}
              </span>
            )}
          </button>
        </CollapsibleTrigger>

        {/* Section Content */}
        <CollapsibleContent className="overflow-hidden data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up">
          <div className="pl-14 pr-4 pb-6 pt-2 space-y-3">
            {/* Entries */}
            {entries.map((entry, i) => (
              <ReflectionEntry
                key={entry.id}
                entry={entry}
                onUpdate={(content) => onUpdateEntry(entry.id, content)}
                onDelete={() => onDeleteEntry(entry.id)}
                isNew={
                  i === entries.length - 1 && entry.content === ""
                }
              />
            ))}

            {/* Add Entry */}
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
};

export function ReflectionCanvas({
  sections,
  onContentChange,
  initialSectionEntries,
}: ReflectionCanvasProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(() =>
    new Set(sections.length > 0 ? [sections[0].id] : [])
  );

  const [sectionEntries, setSectionEntries] = useState<SectionEntries>(() => {
    const initial: SectionEntries = {};
    sections.forEach((s) => {
      initial[s.id] =
        initialSectionEntries && Array.isArray(initialSectionEntries[s.id])
          ? initialSectionEntries[s.id]
          : [];
    });
    return initial;
  });

  const toggleSection = useCallback((sectionId: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(sectionId)) {
        next.delete(sectionId);
      } else {
        next.add(sectionId);
      }
      return next;
    });
  }, []);

  const generateEntryId = () =>
    `entry-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  // Sync combined HTML to parent when sectionEntries or sections change.
  // Must run in useEffect to avoid updating parent during this component's render/updater.
  useEffect(() => {
    const combined = sections
      .map((s) => {
        const entries = sectionEntries[s.id] || [];
        const entriesHtml = entries
          .map(
            (e) =>
              `<div class="entry" data-entry-id="${e.id}" data-created="${e.createdAt.toISOString()}">${e.content}</div>`
          )
          .join("");
        return `<section data-id="${s.id}"><h2>${s.title}</h2>${entriesHtml}</section>`;
      })
      .join("");
    onContentChange(combined);
  }, [sections, sectionEntries, onContentChange]);

  const addEntry = useCallback((sectionId: string) => {
    setSectionEntries((prev) => {
      const newEntry: Entry = {
        id: generateEntryId(),
        content: "",
        createdAt: new Date(),
      };
      return {
        ...prev,
        [sectionId]: [...(prev[sectionId] || []), newEntry],
      };
    });
  }, []);

  const updateEntry = useCallback(
    (sectionId: string, entryId: string, content: string) => {
      setSectionEntries((prev) => ({
        ...prev,
        [sectionId]: prev[sectionId].map((e) =>
          e.id === entryId ? { ...e, content } : e
        ),
      }));
    },
    []
  );

  const deleteEntry = useCallback((sectionId: string, entryId: string) => {
    setSectionEntries((prev) => ({
      ...prev,
      [sectionId]: prev[sectionId].filter((e) => e.id !== entryId),
    }));
  }, []);

  const totalEntries = Object.values(sectionEntries).reduce(
    (acc, entries) => acc + entries.length,
    0
  );
  const completedSections = sections.filter((s) =>
    (sectionEntries[s.id] || []).some(
      (e) => e.content.replace(/<[^>]*>/g, "").trim().length > 0
    )
  ).length;

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-3xl mx-auto px-4 py-6">
        {/* Compact Stats Bar */}
        <div className="flex items-center gap-4 mb-6 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            {sections.map((section) => {
              const hasContent = (sectionEntries[section.id] || []).some(
                (e) => e.content.replace(/<[^>]*>/g, "").trim().length > 0
              );
              return (
                <button
                  key={section.id}
                  onClick={() => {
                    setExpandedSections(new Set([section.id]));
                    document
                      .getElementById(`section-${section.id}`)
                      ?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                  }}
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

        {/* Sections */}
        <div className="space-y-1">
          {sections.map((section, index) => (
            <div
              key={section.id}
              id={`section-${section.id}`}
              className="scroll-mt-4"
            >
              <SectionBlock
                section={section}
                index={index}
                entries={sectionEntries[section.id] || []}
                onAddEntry={() => addEntry(section.id)}
                onUpdateEntry={(entryId, content) =>
                  updateEntry(section.id, entryId, content)
                }
                onDeleteEntry={(entryId) => deleteEntry(section.id, entryId)}
                isExpanded={expandedSections.has(section.id)}
                onToggle={() => toggleSection(section.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
