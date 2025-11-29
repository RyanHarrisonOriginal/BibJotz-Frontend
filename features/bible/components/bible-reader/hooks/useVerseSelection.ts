import { useState, useCallback } from "react";
import { SelectedVerse } from "@/features/bible/types";

export function useVerseSelection() {
  const [selectedVerses, setSelectedVerses] = useState<Set<SelectedVerse>>(new Set());
  const [rangeStart, setRangeStart] = useState<SelectedVerse | null>(null);

  const verseIsInArray = useCallback((arr: SelectedVerse[], obj: SelectedVerse): boolean => {
    return arr.some(item => item.book === obj.book && item.chapter === obj.chapter && item.verse === obj.verse);
  }, []);

  const removeVerseFromArray = useCallback((arr: SelectedVerse[], obj: SelectedVerse): Set<SelectedVerse> => {
    let filteredArr = arr.filter(item => item.book !== obj.book || item.chapter !== obj.chapter || item.verse !== obj.verse);
    return new Set(filteredArr);
  }, []);

  const handleVerseClick = useCallback((verse: SelectedVerse, isShiftKey: boolean) => {
    setSelectedVerses(prevSelected => {
      let newSelected = new Set(prevSelected);

      if (isShiftKey && rangeStart !== null) {
        // Range selection
        const start = Math.min(rangeStart.verse, verse.verse);
        const end = Math.max(rangeStart.verse, verse.verse);
        for (let i = start; i <= end; i++) {
          newSelected.add({ book: verse.book, chapter: verse.chapter, verse: i });
        }
        setRangeStart(null);
      } else {
        // Single selection or start of range
        if (verseIsInArray(Array.from(newSelected), verse)) {
          newSelected = removeVerseFromArray(Array.from(newSelected), verse);
          setRangeStart(null);
        } else {
          newSelected.add(verse);
          setRangeStart(verse);
        }
      }
      return newSelected;
    });
  }, [rangeStart, verseIsInArray, removeVerseFromArray]);

  const clearSelection = useCallback(() => {
    setSelectedVerses(new Set());
    setRangeStart(null);
  }, []);

  return {
    selectedVerses,
    rangeStart,
    handleVerseClick,
    clearSelection,
    verseIsInArray,
    setSelectedVerses,
  };
}

