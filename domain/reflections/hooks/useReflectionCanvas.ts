"use client";

import { useState, useCallback, useEffect } from "react";
import { useDebouncedSaveReflection } from "./useDebouncedSaveReflection";
import type { Entry } from "@/domain/reflections/components/reflection-entry";

export interface Section {
  id: string;
  title: string;
}

export interface SectionEntries {
  [sectionId: string]: Entry[];
}

export interface UseReflectionCanvasParams {
  sections: Section[];
  /** Prefill when opening an existing journey. */
  initialSectionEntries?: SectionEntries;
  /** Called when combined section HTML changes (for submit/preview). */
  onContentChange: (content: string) => void;
  /** When set, section content is debounced and sent to saveReflection API. */
  journeyId?: string | null;
}

export interface UseReflectionCanvasReturn {
  sectionEntries: SectionEntries;
  expandedSections: Set<string>;
  toggleSection: (sectionId: string) => void;
  handleSectionClick: (sectionId: string) => void;
  addEntry: (sectionId: string) => void;
  updateEntry: (sectionId: string, entryId: string, content: string) => void;
  deleteEntry: (sectionId: string, entryId: string) => void;
}

function entriesToHtml(entries: Entry[]): string {
  return entries
    .map(
      (e) =>
        `<div class="entry" data-entry-id="${e.id}" data-created="${e.createdAt.toISOString()}">${e.content}</div>`
    )
    .join("");
}

function buildCombinedHtml(
  sections: Section[],
  sectionEntries: SectionEntries
): string {
  return sections
    .map((s) => {
      const entries = sectionEntries[s.id] || [];
      return `<section data-id="${s.id}"><h2>${s.title}</h2>${entriesToHtml(entries)}</section>`;
    })
    .join("");
}

function buildSaveUpdates(
  sections: Section[],
  sectionEntries: SectionEntries
): { entry_key: string; guide_section_id: string; content: string }[] {
  const updates: { entry_key: string; guide_section_id: string; content: string }[] = [];
  for (const s of sections) {
    const entries = sectionEntries[s.id] || [];
    for (const entry of entries) {
      updates.push({
        entry_key: entry.id,
        guide_section_id: s.id,
        content: entry.content,
      });
    }
  }
  return updates;
}

/** Idempotent entry_key: {journeyId}-{sectionId}-{guid}. Use journeyId when available. */
function generateEntryKey(
  journeyId: string | null,
  sectionId: string
): string {
  const guid = crypto.randomUUID();
  if (journeyId) return `${journeyId}-${sectionId}-${guid}`;
  return `local-${sectionId}-${guid}`;
}

/**
 * Encapsulates reflection canvas state and behavior:
 * - Section entries (per-section list of entries)
 * - Expanded sections (collapsible state)
 * - Add/update/delete entry handlers
 * - Sync to onContentChange and debounced saveReflection when entries change
 */
export function useReflectionCanvas({
  sections,
  initialSectionEntries,
  onContentChange,
  journeyId = null,
}: UseReflectionCanvasParams): UseReflectionCanvasReturn {
  const debouncedSaveReflection = useDebouncedSaveReflection(journeyId);

  const [expandedSections, setExpandedSections] = useState<Set<string>>(() => new Set());

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
      if (next.has(sectionId)) next.delete(sectionId);
      else next.add(sectionId);
      return next;
    });
  }, []);

  const handleSectionClick = useCallback((sectionId: string) => {
    setExpandedSections(new Set([sectionId]));
    document.getElementById(`section-${sectionId}`)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, []);

  const addEntry = useCallback(
    (sectionId: string) => {
      const entryKey = generateEntryKey(journeyId ?? null, sectionId);
      setSectionEntries((prev) => ({
        ...prev,
        [sectionId]: [
          ...(prev[sectionId] || []),
          {
            id: entryKey,
            content: "",
            createdAt: new Date(),
          } as Entry,
        ],
      }));
    },
    [journeyId]
  );

  const updateEntry = useCallback(
    (sectionId: string, entryId: string, content: string) => {
      setSectionEntries((prev) => ({
        ...prev,
        [sectionId]: (prev[sectionId] || []).map((e) =>
          e.id === entryId ? { ...e, content } : e
        ),
      }));
    },
    []
  );

  const deleteEntry = useCallback((sectionId: string, entryId: string) => {
    setSectionEntries((prev) => ({
      ...prev,
      [sectionId]: (prev[sectionId] || []).filter((e) => e.id !== entryId),
    }));
  }, []);

  useEffect(() => {
    onContentChange(buildCombinedHtml(sections, sectionEntries));

    if (journeyId) {
      debouncedSaveReflection(buildSaveUpdates(sections, sectionEntries));
    }
  }, [
    sections,
    sectionEntries,
    onContentChange,
    journeyId,
    debouncedSaveReflection,
  ]);

  return {
    sectionEntries,
    expandedSections,
    toggleSection,
    handleSectionClick,
    addEntry,
    updateEntry,
    deleteEntry,
  };
}
