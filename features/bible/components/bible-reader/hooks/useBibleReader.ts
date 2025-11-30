import { useCallback } from "react";
import { usePanels } from "./useReadingPanel";
import { useVerseSelection } from "./useVerseSelection";
import { useReferenceFormatting } from "./useVersSelectionDisplay";
import { useFontSize } from "./useFontSize";
import { usePanelData } from "./usePanelData";
import { useTranslations } from "./useTranslations";

export function useBibleReader() {
  const { selectedTranslations, bibleTranslations } = useTranslations();
  const { panels } = usePanels(bibleTranslations);
  const { verseSelection } = useVerseSelection();
  const { fontSize, increaseFontSize, decreaseFontSize } = useFontSize();
  const { panelBooks, panelVersesText } = usePanelData(panels.data, bibleTranslations);
  const { biblicalReferenceFormatting } = useReferenceFormatting();

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
    verseSelection.setSelectedVerses(prevSelected => {
      const newSelected = new Set(prevSelected);
      verseNumbers.forEach(verse => {
        newSelected.delete({ book, chapter, verse });
      });
      return newSelected;
    });
  }, [verseSelection.setSelectedVerses]);

  const handleAddToGuide = useCallback(() => {
    if (verseSelection.selectedVerses.size === 0 || !panels.data[0]?.book) return;

    const verses = Array.from(verseSelection.selectedVerses).sort((a, b) => a.verse - b.verse);
    const reference = {
      book: panels.data[0].book,
      chapter: parseInt(panels.data[0].chapter),
      startVerse: verses[0].verse,
      endVerse: verses[verses.length - 1].verse,
    };
    // TODO: Handle adding reference to guide
    verseSelection.clearSelection();
  }, [panels, verseSelection.selectedVerses, verseSelection.clearSelection]);

  return {
    panels,
    verseSelection,
    selectedTranslations,
    fontSize,
    panelBooks,
    panelVersesText,
    removeReference,
    increaseFontSize,
    decreaseFontSize,
    biblicalReferenceFormatting,
  };
}