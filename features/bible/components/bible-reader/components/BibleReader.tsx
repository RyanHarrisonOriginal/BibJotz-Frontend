'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/Dialogue/dialogue";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useBibleReader } from "@/features/bible/components/bible-reader/hooks/useBibleReader";
import { ScripturePannel } from "@/features/bible/components/bible-reader/components/ScripturePannel";
import { BibleReaderControls } from "@/features/bible/components/bible-reader/components/BibleReaderControls";
import { ScriptureSelectionList } from "@/features/bible/components/bible-reader/components/ScriptureSelectionList";
import { useEffect, useState } from "react";
import { SelectedVerse } from "@/features/bible/types";
import { BiblicalReference } from "@/features/guide/creation-form/components/BiblicalReferenceList";

interface BibleReaderModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectReference?: (reference: { book: string; chapter: number; startVerse: number; endVerse: number }) => void;
  verseSelectionCallback?: (verse: SelectedVerse) => void;
  actionButtonCallback?: (verses: BiblicalReference[]) => void;
  ActionButtonComponent?: React.ComponentType<{
    onClick: () => void;
    color?: string;
  }>;
}




export function BibleReaderModal({
  open,
  onOpenChange,
  verseSelectionCallback = () => { },
  actionButtonCallback = () => { },
  ActionButtonComponent }: BibleReaderModalProps) {
  // Only mount on client to avoid hydration issues
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const {
    panels,
    selectedVerses,
    rangeStart,
    translations,
    panelBooks,
    panelVersesText,
    fontSize,
    addPanel,
    removePanel,
    updatePanel,
    handleVerseClick,
    clearSelection,
    getSelectedReference,
    getSelectedReferenceObjects,
    removeReference,
    increaseFontSize,
    decreaseFontSize,
    verseIsInArray,
    getBookChapterArray
  } = useBibleReader();

  if (!mounted) {
    return null;
  }

  const onVerseSelect = (verse: SelectedVerse, isShiftKey: boolean) => {
    handleVerseClick(verse, isShiftKey);
    verseSelectionCallback(verse);
  }

  const handleActionButton = () => {
    const bibleReaderReferenceObjects = getSelectedReferenceObjects(selectedVerses);
    actionButtonCallback(bibleReaderReferenceObjects);
  }

   return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[80vw] max-w-[80vw] h-[85vh] p-0 bg-background">
        <DialogHeader className="p-6 pb-4 border-b border-primary/10 bg-background">
          <DialogTitle className="text-2xl font-serif text-primary">Bible Reader</DialogTitle>
          <p className="text-sm text-muted-foreground mt-1">Select verses to add to your guide</p>
        </DialogHeader>

        <div className="flex flex-col h-full min-h-0">
          <BibleReaderControls
            panels={panels}
            addPanel={addPanel}
            fontSize={fontSize}
            increaseFontSize={increaseFontSize}
            decreaseFontSize={decreaseFontSize}
          />

          {/* Panels and Selection List */}
          <div className="flex gap-6 flex-1 min-h-0 overflow-hidden p-6">
            {/* Selection List - shown next to first panel */}
            {selectedVerses.size > 0 && (
              <ScriptureSelectionList
                references={getSelectedReference()}
                selectedVerses={selectedVerses}
                clearSelection={clearSelection}
                removeReference={removeReference}
              />
            )}

            {/* Panels Grid */}
            <div className={
              `grid ${panels.length === 1 ?
                'grid-cols-1' : panels.length === 2 ?
                  'grid-cols-2' : 'grid-cols-3'} gap-6 flex-1 min-h-0 overflow-hidden`}
              style={{ gridAutoRows: 'minmax(0, 1fr)' }}>
              {panels.map((panel, index) => (
                <ScripturePannel
                  key={panel.id}
                  panel={panel}
                  index={index}
                  versesText={panelVersesText[index] || undefined}
                  updatePanel={updatePanel}
                  removePanel={removePanel}
                  handleVerseClick={onVerseSelect}
                  includeRemoveButton={panels.length > 1}
                  translations={translations}
                  books={panelBooks[index] || []}
                  fontSize={fontSize}
                  selectedVerses={selectedVerses}
                  checkVerseIsInArray={verseIsInArray}
                  getBookChapterArray={getBookChapterArray}
                />
              ))}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="px-6 py-4 border-t border-border/50 bg-background flex items-center justify-between">
            <p className="text-xs text-muted-foreground font-medium">
              💡 Click verses to select • Hold Shift and click to select a range
            </p>

            {ActionButtonComponent &&
              <ActionButtonComponent 
              onClick={handleActionButton} 
              color="primary" />}

          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
