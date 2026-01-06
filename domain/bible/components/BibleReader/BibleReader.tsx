'use client';

import { ReadingPannel } from "@/domain/bible/components/BibleReader/ReadingPanel/ReadingPannel";
import { BibleReaderControls } from "@/domain/bible/components/BibleReader/BibleReaderControls";
import { ScriptureSelectionPanel } from "@/domain/bible/components/BibleReader/ReadingPanel/ScripturePanel/ScriptureSelectionPanel";
import { useEffect, useState } from "react";
import { SelectedVerse } from "@/domain/bible/types";
import { ReadingPanelVerse, ReadingPanel, ReadingPanelActions, SelectedReadingPanelVerses, SelectedReadingPanelVerse } from "@/domain/bible/components/BibleReader/types";
import { useReadingPanels } from "@/domain/bible/hooks/useReadingPanels";
import { useFontSize } from "@/domain/bible/hooks/useFontSize";
import { useVerseSelectionContext } from "../../context/VerseSelectionProvider";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface BibleReaderProps {
  onOpenChange: (open: boolean) => void;
  actionButtonCallback?: (verses: SelectedReadingPanelVerses) => void;
  actionButtonText: string;
}

export function BibleReader({
  onOpenChange,
  actionButtonText,
  actionButtonCallback = () => { },
   }: BibleReaderProps) {

  const { panels } = useReadingPanels();
  const { verseSelection } = useVerseSelectionContext();
  const { fontSize } = useFontSize();


  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);


  if (!mounted) {
    return null;
  }

  const handleActionButton = () => {
    actionButtonCallback(verseSelection.data);
    onOpenChange(false);
  }


  return (
    <div className="flex flex-col h-full min-h-0">
      <BibleReaderControls
        activePanelCount={panels.configs.length}
        addPanel={panels.actions.add}
      />

      <div className="flex gap-6 flex-1 min-h-0 overflow-hidden p-6">

        <ScriptureSelectionPanel/>

        {/* Panels Grid */}
        <div className={
          `grid ${panels.configs.length === 1 ?
            'grid-cols-1' : panels.configs.length === 2 ?
              'grid-cols-2' : 'grid-cols-3'} gap-6 flex-1 min-h-0 overflow-hidden`}
          style={{ gridAutoRows: 'minmax(0, 1fr)' }}>
          {panels.configs.map((panel, index) => (
            <ReadingPannel
              key={panel.id}
              panel={panel}
              index={index}
              onChange={panels.actions.update}
              onDelete={panels.actions.remove}
              fontSize={fontSize}
            />
          ))}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="px-6 py-4 border-t border-border/50 bg-background flex items-center justify-between">
        <p className="text-xs text-muted-foreground font-medium">
          💡 Click verses to select • Hold Shift and click to select a range
        </p>

        {handleActionButton &&
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleActionButton}
            className="gap-2 shadow-lg hover:shadow-xl transition-all hover:scale-105">
            <Plus className="h-4 w-4" />
            {actionButtonText || "Action Button"}
          </Button>
        }

      </div>
    </div>
  );
}
