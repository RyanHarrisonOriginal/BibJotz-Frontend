import { useCallback } from "react";
import { usePanels } from "./usePanels";
import { useVerseSelection } from "./useVerseSelection";
import { useReferenceFormatting } from "./useReferenceFormatting";
import { useFontSize } from "./useFontSize";
import { usePanelData } from "./usePanelData";
import { useTranslations } from "./useTranslations";
import { SelectedVerse } from "@/features/bible/types";

export function useBibleReader() {
  const { translations, bibleTranslations } = useTranslations();
  const { panels, addPanel, removePanel, updatePanel } = usePanels(bibleTranslations);
  const { selectedVerses, rangeStart, handleVerseClick, clearSelection, verseIsInArray, setSelectedVerses } = useVerseSelection();
  const { fontSize, increaseFontSize, decreaseFontSize } = useFontSize();
  const { panelBooks, panelVersesText } = usePanelData(panels, bibleTranslations);
  const { getSelectedReference: getSelectedReferenceInternal, getSelectedReferenceObjects, bookChapterMap, getBookChapterArray } = useReferenceFormatting();

  const getSelectedReference = useCallback(() => {
    return getSelectedReferenceInternal(selectedVerses);
  }, [selectedVerses, getSelectedReferenceInternal]);

  const removeReference = useCallback((referenceString: string) => {
    // Parse reference string like "GEN 1:1-5" or "GEN 1:1, 3-5"
    const match = referenceString.match(/^(\w+)\s+(\d+):(.+)$/);
    if (!match) return;

    const [, book, chapterStr, versesStr] = match;
    const chapter = parseInt(chapterStr);
    const verseNumbers = new Set<number>();

    // Parse verse ranges like "1-5" or "1, 3-5"
    versesStr.split(',').forEach(part => {
      part = part.trim();
      if (part.includes('-')) {
        const [start, end] = part.split('-').map(v => parseInt(v.trim()));
        for (let i = start; i <= end; i++) {
          verseNumbers.add(i);
        }
      } else {
        verseNumbers.add(parseInt(part));
      }
    });

    // Remove all matching verses from selectedVerses
    setSelectedVerses(prevSelected => {
      const newSelected = new Set(prevSelected);
      verseNumbers.forEach(verse => {
        newSelected.delete({ book, chapter, verse });
      });
      return newSelected;
    });
  }, [setSelectedVerses]);

  const handleAddToGuide = useCallback(() => {
    if (selectedVerses.size === 0 || !panels[0]?.book) return;

    const verses = Array.from(selectedVerses).sort((a, b) => a.verse - b.verse);
    const reference = {
      book: panels[0].book,
      chapter: parseInt(panels[0].chapter),
      startVerse: verses[0].verse,
      endVerse: verses[verses.length - 1].verse,
    };
    // TODO: Handle adding reference to guide
    clearSelection();
  }, [panels, selectedVerses, clearSelection]);

  return {
    panels,
    selectedVerses,
    rangeStart,
    translations,
    fontSize,
    panelBooks,
    panelVersesText,
    addPanel,
    removePanel,
    updatePanel,
    handleVerseClick,
    clearSelection,
    getSelectedReference,
    removeReference,
    getSelectedReferenceObjects,
    increaseFontSize,
    decreaseFontSize,
    verseIsInArray,
    bookChapterMap,
    getBookChapterArray,
  };
}