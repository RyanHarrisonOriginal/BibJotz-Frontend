'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/Dialogue/dialogue";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useBibleReader } from "@/features/bible/components/bible-reader/hooks/useBibleReader";
import { BibleReaderPannel } from "@/features/bible/components/bible-reader/components/Pannel";
import { BibleReaderControls } from "@/features/bible/components/bible-reader/components/Controls";
import { useEffect, useState } from "react";

interface BibleReaderModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectReference?: (reference: { book: string; chapter: number; startVerse: number; endVerse: number }) => void;
}




export function BibleReaderModal({ open, onOpenChange, onSelectReference }: BibleReaderModalProps) {
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
    handleAddToGuide,
    increaseFontSize,
    decreaseFontSize
  } = useBibleReader();

  if (!mounted) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[80vw] max-w-[80vw] h-[85vh] p-0 bg-gradient-to-br from-background via-background to-muted/30">
        <DialogHeader className="p-6 pb-4 border-b border-primary/10 bg-gradient-to-r from-primary/5 to-transparent">
          <DialogTitle className="text-2xl font-serif text-primary">Bible Reader</DialogTitle>
          <p className="text-sm text-muted-foreground mt-1">Select verses to add to your guide</p>
        </DialogHeader>

        <div className="flex flex-col h-full min-h-0">
          <BibleReaderControls 
          panels={panels} 
          addPanel={addPanel} 
          clearSelection={clearSelection} 
          getSelectedReference={getSelectedReference} 
          selectedVerses={selectedVerses}
          fontSize={fontSize}
          increaseFontSize={increaseFontSize}
          decreaseFontSize={decreaseFontSize}
          />

          {/* Panels */}
          <div className={
              `grid ${panels.length === 1 ? 
              'grid-cols-1' : panels.length === 2 ? 
              'grid-cols-2' : 'grid-cols-3'} gap-6 ${panels.length === 1 ? 
              'p-4' : 'p-6'} flex-1 min-h-0 overflow-hidden`}
              style={{ gridAutoRows: 'minmax(0, 1fr)' }}>
            {panels.map((panel, index) => (
              <BibleReaderPannel 
              key={panel.id} 
              panel={panel} 
              index={index}
              versesText={panelVersesText[index] || undefined}
              updatePanel={updatePanel} 
              removePanel={removePanel} 
              handleVerseClick={handleVerseClick} 
              selectedVerses={selectedVerses} 
              includeRemoveButton={panels.length > 1} 
              translations={translations}
              books={panelBooks[index] || []}
              fontSize={fontSize}
              />
            ))}
          </div>

          {/* Footer Actions */}
          <div className="px-6 py-4 border-t border-border/50 bg-gradient-to-r from-muted/20 to-transparent flex items-center justify-between">
            <p className="text-xs text-muted-foreground font-medium">
              💡 Click verses to select • Hold Shift and click to select a range
            </p>
            {selectedVerses.size > 0 && (
              <Button
                onClick={handleAddToGuide}
                size="sm"
                className="gap-2 shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                <Plus className="h-4 w-4" />
                Add to Guide
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
