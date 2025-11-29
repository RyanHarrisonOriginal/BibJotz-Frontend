import { useCallback } from "react";
import { SelectedVerse } from "@/features/bible/types";
import { badgeColorSchemes } from "../components/ScriptureSelectionBadgeColors";
import { BiblicalReference } from "@/features/guide/creation-form/hooks/useCreateGuideForm";

type SelectedVerseGrouped = {
  book: string;
  chapter: number;
  verses: number[];
};

export function useReferenceFormatting() {

  const bookChapterMap = useCallback((refs: SelectedVerse[]): Map<string, Set<number>> => {
    const map = new Map<string, Set<number>>();
    for (const r of refs) {
      const key = `${r.book}:${r.chapter}`;
      if (!map.has(key)) map.set(key, new Set());
      map.get(key)!.add(r.verse);
    }
    return map;
  }, []);

  const getBookChapterArray = useCallback((refs: SelectedVerse[]): string[] => {
    const array = [];
    for (const r of refs) {
      array.push(`${r.book}:${r.chapter}`);
    }
    return array;
  }, []);

  const groupByBookChapter = useCallback((refs: SelectedVerse[]): SelectedVerseGrouped[] => {
    const map = bookChapterMap(refs);
    return Array.from(map.entries()).map(([key, verses]) => {
      const [book, chapter] = key.split(":");
      return {
        book,
        chapter: Number(chapter),
        verses: Array.from(verses).sort((a, b) => a - b),
      };
    });
  }, []);


  const handleParseSelectedVerses = useCallback((selection: SelectedVerseGrouped, returnType: 'string' | 'object' = 'string'): string | BiblicalReference => {
    const ranges: string[] = [];
    let start = selection.verses[0];
    let end = selection.verses[0];
    for (let i = 1; i < selection.verses.length; i++) {
      if (selection.verses[i] === end + 1) {
        end = selection.verses[i];
      } else {
        ranges.push(start === end ? `${start}` : `${start}-${end}`);
        start = selection.verses[i];
        end = selection.verses[i];
      }
    }
    ranges.push(start === end ? `${start}` : `${start}-${end}`);


    if (returnType === 'string') {
      return `${selection.book} ${selection.chapter}:${ranges.join(", ")}`;
    } else {
      const referenceObjects = ranges.map(range => {
        return {
          book: selection.book,
          chapter: selection.chapter,
          startVerse: range.split('-')[0],
          endVerse: range.split('-')[1],
        };
      });
      return referenceObjects as unknown as BiblicalReference;
    }
  }, []);


  const getSelectedReference = useCallback((selectedVerses: Set<SelectedVerse>) => {
    if (selectedVerses.size === 0) return [];
    const selectedVersesGrouped = groupByBookChapter(Array.from(selectedVerses));
    const bookChapterArray = getBookChapterArray(Array.from(selectedVerses));
    return selectedVersesGrouped.map(selection => {
      return {
        reference: handleParseSelectedVerses(selection),
        colorScheme: badgeColorSchemes[bookChapterArray.indexOf(`${selection.book}:${selection.chapter}`) % badgeColorSchemes.length],
      }
    }
    );
  }, [groupByBookChapter, handleParseSelectedVerses]);

  const getSelectedReferenceObjects = useCallback((selectedVerses: Set<SelectedVerse>): BiblicalReference[] => {
    if (selectedVerses.size === 0) return [];
    const selectedVersesGrouped = groupByBookChapter(Array.from(selectedVerses));
    return selectedVersesGrouped.map(selection => {
      return handleParseSelectedVerses(selection, 'object') as BiblicalReference;
    }
    );
  }, [groupByBookChapter, handleParseSelectedVerses]);

  return {
    getSelectedReference,
    bookChapterMap,
    getBookChapterArray,
    getSelectedReferenceObjects,
  };
}

