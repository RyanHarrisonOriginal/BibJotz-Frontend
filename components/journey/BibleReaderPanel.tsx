"use client";

import { BibleReader } from "@/domain/bible/components/BibleReader/BibleReader";
import { VerseSelectionProvider } from "@/domain/bible/context/VerseSelectionProvider";

interface BibleReaderPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BibleReaderPanel({ isOpen, onClose }: BibleReaderPanelProps) {
  return (
    <div className="h-full flex flex-col min-w-0">
      <VerseSelectionProvider>
        <BibleReader
          onOpenChange={(open) => !open && onClose()}
          actionButtonText="Close"
          actionButtonCallback={() => onClose()}
        />
      </VerseSelectionProvider>
    </div>
  );
}
