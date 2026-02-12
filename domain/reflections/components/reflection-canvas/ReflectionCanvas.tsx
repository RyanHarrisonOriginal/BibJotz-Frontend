"use client";

import {
  useReflectionCanvas,
  type Section,
  type SectionEntries,
} from "../../hooks/useReflectionCanvas";
import { ReflectionCanvasStatsBar } from "./ReflectionCanvasStatsBar";
import { ReflectionCanvasSection } from "./ReflectionCanvasSection";

export type { Section, SectionEntries } from "../../hooks/useReflectionCanvas";

interface ReflectionCanvasProps {
  sections: Section[];
  onContentChange: (content: string) => void;
  /** When opening an existing journey, prefill sections with these entries. */
  initialSectionEntries?: SectionEntries;
  /** When set, section content is debounced and sent to saveReflection API. */
  journeyId?: string | null;
}

export function ReflectionCanvas({
  sections,
  onContentChange,
  initialSectionEntries,
  journeyId = null,
}: ReflectionCanvasProps) {
  const {
    sectionEntries,
    expandedSections,
    toggleSection,
    handleSectionClick,
    addEntry,
    updateEntry,
    deleteEntry,
  } = useReflectionCanvas({
    sections,
    initialSectionEntries,
    onContentChange,
    journeyId,
  });

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-3xl mx-auto px-4 py-6">
        <ReflectionCanvasStatsBar
          sections={sections}
          sectionEntries={sectionEntries}
          onSectionClick={handleSectionClick}
        />

        <div className="space-y-1">
          {sections.map((section, index) => (
            <div
              key={section.id}
              id={`section-${section.id}`}
              className="scroll-mt-4"
            >
              <ReflectionCanvasSection
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
