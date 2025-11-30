import { useState, useCallback } from "react";
import { SelectedVerse } from "@/features/bible/types";
import { ReadingPanelVerse, SelectedReadingPanelVerse, SelectedReadingPanelVerses } from "@/features/bible/components/bible-reader/types";

export function useVerseSelection() {

  const [selectedVerses, setSelectedVerses] = useState<SelectedReadingPanelVerses>([]);
  const [selectedVersesKeys, setSelectedVersesKeys] = useState<Set<string>>(new Set());
  const [selectedChaptersKeys, setSelectedChaptersKeys] = useState<Set<string>>(new Set());
  const [selectionRangeStart, setSelectionRangeStart] = useState<SelectedReadingPanelVerse | null>(null);

  const verseKey = useCallback(( selectedVerse: SelectedReadingPanelVerse ): string => {
    return `${selectedVerse.book}:${selectedVerse.chapter}:${selectedVerse.verse}`;
  }, []);

  const chapterKey = useCallback(( selectedVerse: SelectedReadingPanelVerse ): string => {
    return `${selectedVerse.book}:${selectedVerse.chapter}`;
  }, []);

  const isVerseSelected = useCallback((selectedVerse: SelectedReadingPanelVerse): boolean => {
    return selectedVersesKeys.has(verseKey(selectedVerse));
  }, []);

  const remove = useCallback((selectedVerse: SelectedReadingPanelVerse) => {
    setSelectedVersesKeys(prevKeys => {
      const newKeys = new Set(prevKeys);
      newKeys.delete(verseKey(selectedVerse));
      return newKeys;
    });
  }, []);

  const add = useCallback((selectedVerse: SelectedReadingPanelVerse) => {
    setSelectedVersesKeys(prevKeys => {
      const newKeys = new Set(prevKeys);
      newKeys.add(verseKey(selectedVerse));
      return newKeys;
    });
  }, []);

  const toggleVerseSelection = useCallback((selectedVerse: SelectedReadingPanelVerse, isShiftKey: boolean) => {
    setSelectedVerses(prevSelected => {
      let newSelected = [...prevSelected];

      if (isShiftKey && selectionRangeStart !== null) {
        // Range selection
        const start = Math.min(selectionRangeStart.verse, selectedVerse.verse);
        const end = Math.max(selectionRangeStart.verse, selectedVerse.verse);
        for (let i = start; i <= end; i++) {
          newSelected.push({ book: selectedVerse.book, chapter: selectedVerse.chapter, verse: i });
        }
        setSelectionRangeStart(null);
      } else {
        // Single selection or start of range
        if (isVerseSelected(selectedVerse)) {
          newSelected = newSelected.filter(verse => verse.book !== selectedVerse.book || verse.chapter !== selectedVerse.chapter || verse.verse !== selectedVerse.verse);
          setSelectionRangeStart(null);
        } else {
          newSelected.push(selectedVerse);
          setSelectionRangeStart(selectedVerse);
        }
      }
      return newSelected;
    });
  }, [selectionRangeStart]);

  const clearSelection = useCallback(() => {
    setSelectedVerses([]);
    setSelectedVersesKeys(new Set());
    setSelectionRangeStart(null);
  }, []);

  return {
    verseSelection: {
      selectedVerses,
      selectionRangeStart,
      toggleVerseSelection,
      clearSelection,
      remove,
      add,
    },
    isVerseSelected,
  };
}

