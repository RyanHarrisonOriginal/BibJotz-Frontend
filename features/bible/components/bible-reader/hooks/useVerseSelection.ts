import { useCallback, useState, useMemo, useRef } from "react";
import { SelectedReadingPanelVerse } from "@/features/bible/components/bible-reader/types";

export function useVerseSelection() {

  const [selectedMap, setSelectedMap] = useState<Map<string, SelectedReadingPanelVerse>>(() => new Map());
  const [rangeStart, setRangeStart] = useState<SelectedReadingPanelVerse | null>(null);

  const selectedMapRef = useRef<Map<string, SelectedReadingPanelVerse>>(selectedMap);

  selectedMapRef.current = selectedMap;
  const [version, setVersion] = useState(0);

  const verseKey = useCallback((v: SelectedReadingPanelVerse) => {
    return `${v.book}:${v.chapter}:${v.verse}`;
  }, []);

  const isSelected = useCallback((v: SelectedReadingPanelVerse) => {
    return selectedMapRef.current.has(verseKey(v));
  }, [verseKey]);

  const toggleVerse = useCallback((v: SelectedReadingPanelVerse, isShift: boolean) => {
    const key = verseKey(v);

    setSelectedMap(prev => {
      const next = new Map(prev);

      // RANGE MODE
      if (isShift && rangeStart) {
        const start = Math.min(rangeStart.verse, v.verse);
        const end = Math.max(rangeStart.verse, v.verse);

        for (let i = start; i <= end; i++) {
          const verseObj = { book: v.book, chapter: v.chapter, verse: i };
          next.set(`${v.book}:${v.chapter}:${i}`, verseObj);
        }

        setRangeStart(null);
        // Update ref synchronously before state update completes
        selectedMapRef.current = next;
        setVersion(prev => prev + 1);
        return next;
      }

      // NORMAL CLICK
      if (next.has(key)) {
        next.delete(key);
        setRangeStart(null);
      } else {
        next.set(key, v);
        setRangeStart(v);
      }

      // Update ref synchronously before state update completes
      selectedMapRef.current = next;
      setVersion(prev => prev + 1);
      return next;
    });
  }, [rangeStart, verseKey]);

  const clear = useCallback(() => {
    const emptyMap = new Map();
    selectedMapRef.current = emptyMap;
    setSelectedMap(emptyMap);
    setRangeStart(null);
    setVersion(prev => prev + 1);
  }, []);

  const selectedArray = useMemo(() => {
    return Array.from(selectedMap.values());
  }, [selectedMap]);

  const remove = useCallback((v: SelectedReadingPanelVerse) => {
    setSelectedMap(prev => {
      const next = new Map(prev);
      next.delete(verseKey(v));
      // Update ref synchronously before state update completes
      selectedMapRef.current = next;
      setVersion(prev => prev + 1);
      return next;
    });
  }, [verseKey]);

  // Memoize selectors object to keep reference stable
  const selectors = useMemo(() => ({
    isVerseSelected: isSelected,
  }), [isSelected]);

  // Memoize actions object to keep reference stable
  const actions = useMemo(() => ({
    toggleVerse,
    clear,
    remove,
  }), [toggleVerse, clear, remove]);

  return {
    verseSelection: {
      data: selectedArray,
      meta: { rangeStart },
      actions,
    },
    selectors,
    version, // Expose version for optimization
  };
}
