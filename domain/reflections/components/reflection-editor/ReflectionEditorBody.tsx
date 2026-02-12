"use client";

import { cn } from "@/public/lib/utils";
import BibleReaderPanel from "@/components/journey/BibleReaderPanel";
import { ReflectionCanvas, type SectionEntries } from "../reflection-canvas";
import type { SectionOption } from "../GuideSectionSelect";

interface ReflectionEditorBodyProps {
  sections: SectionOption[];
  onContentChange: (content: string) => void;
  bibleReaderOpen: boolean;
  onCloseBibleReader: () => void;
  /** Prefill canvas when opening an existing journey. */
  initialSectionEntries?: SectionEntries;
  /** When set, reflections are debounced and saved via saveReflection API. */
  journeyId?: string | null;
}

export function ReflectionEditorBody({
  sections,
  onContentChange,
  bibleReaderOpen,
  onCloseBibleReader,
  initialSectionEntries,
  journeyId = null,
}: ReflectionEditorBodyProps) {
  return (
    <div className="flex-1 flex overflow-hidden">
      <div className="flex-1 overflow-hidden transition-all duration-300 ease-out">
        <ReflectionCanvas
          sections={sections}
          onContentChange={onContentChange}
          initialSectionEntries={initialSectionEntries}
          journeyId={journeyId}
        />
      </div>

      <div
        className={cn(
          "flex-shrink-0 overflow-hidden transition-all duration-300 ease-out border-l",
          bibleReaderOpen
            ? "w-full sm:w-[380px] lg:w-[420px]"
            : "w-0 border-l-0"
        )}
      >
        <BibleReaderPanel
          isOpen={bibleReaderOpen}
          onClose={onCloseBibleReader}
        />
      </div>
    </div>
  );
}
