'use client';

import { ReadingPannel } from "@/features/bible/components/bible-reader/components/ReadingPannel";
import { BibleReaderControls } from "@/features/bible/components/bible-reader/components/BibleReaderControls";
import { ScriptureSelectionPanel } from "@/features/bible/components/bible-reader/components/ScriptureSelectionPanel";
import { useEffect, useState } from "react";
import { SelectedVerse } from "@/features/bible/types";
import { ReadingPanelVerse, ReadingPanel, ReadingPanelActions, SelectedReadingPanelVerses, SelectedReadingPanelVerse } from "@/features/bible/components/bible-reader/types";
import { useReadingPanels } from "@/features/bible/components/bible-reader/hooks/useReadingPanels";
import { useVerseSelection } from "@/features/bible/components/bible-reader/hooks/useVerseSelection";
import { useFontSize } from "@/features/bible/components/bible-reader/hooks/useFontSize";

interface BibleReaderProps {
  onOpenChange: (open: boolean) => void;
  selectCallback?: (verse: SelectedReadingPanelVerse) => void;
  actionButtonCallback?: (verses: SelectedReadingPanelVerses) => void;
  ActionButtonComponent?: React.ComponentType<{
    onClick: () => void;
    color?: string;
  }>;
}

export function BibleReader({
  onOpenChange,
  selectCallback = () => { },
  actionButtonCallback = () => { },
  ActionButtonComponent }: BibleReaderProps) {

  const { panels } = useReadingPanels();
  const { verseSelection } = useVerseSelection();
  const { fontSize } = useFontSize();

  const [mounted, setMounted] = useState(false);
  console.log(panels)

  useEffect(() => {
    setMounted(true);
  }, []);


  if (!mounted) {
    return null;
  }

  const handleToggleVerseSelection = (verse: SelectedReadingPanelVerse, isShiftKey: boolean) => {
    verseSelection.toggleVerseSelection(verse, isShiftKey);
    selectCallback(verse);
  }

  const handleActionButton = () => {
    actionButtonCallback(verseSelection.selectedVerses);
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
              onToggleVerseSelection={handleToggleVerseSelection}
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

        {ActionButtonComponent &&
          <ActionButtonComponent
            onClick={handleActionButton}
            color="primary" />}

      </div>
    </div>
  );
}
