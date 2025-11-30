import { useCallback, useMemo } from "react";
import { badgeColorSchemes } from "../components/ScriptureSelectionBadgeColors";
import { SelectedReadingPanelVerses, SelectedReadingPanelVerseGrouped } from "../types";



export function useVersSelectionDisplay(selectedVerses: SelectedReadingPanelVerses) {


  const mapSelectedVersesToBookChapterMap = useCallback((refs: SelectedReadingPanelVerses): Map<string, Set<number>> => {
    const map = new Map<string, Set<number>>();
    for (const r of refs) {
      const key = `${r.book}:${r.chapter}`;
      if (!map.has(key)) map.set(key, new Set());
      map.get(key)!.add(r.verse);
    }
    return map;
  }, []);

  const mapSelectedVersesToBookChapterArray = useCallback((refs: SelectedReadingPanelVerses): string[] => {
    const array: string[] = [];
    for (const r of refs) {
      array.push(`${r.book}:${r.chapter}`);
    }
    return array;
  }, []);

  const mapSelectedVersesToGroupByBookChapter = useCallback((refs: SelectedReadingPanelVerses): SelectedReadingPanelVerseGrouped[] => {
    const map = mapSelectedVersesToBookChapterMap(refs);
    return Array.from(map.entries()).map(([key, verses]) => {
      const [book, chapter] = key.split(":");
      return {
        book,
        chapter: Number(chapter),
        verses: Array.from(verses).sort((a, b) => a - b),
      };
    });
  }, []);


  const mapSelectedVerseToVersSelectionDisplay = useCallback((selection: SelectedReadingPanelVerseGrouped): string  => {
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


      return `${selection.book} ${selection.chapter}:${ranges.join(", ")}`;
    
  }, []);


  const mapSelectedVersesToVersSelectionDisplay = useCallback((selectedVerses: SelectedReadingPanelVerses) => {
    if (selectedVerses.length === 0) return [];
    const selectedVersesGrouped = mapSelectedVersesToGroupByBookChapter(selectedVerses);
    const bookChapterArray = mapSelectedVersesToBookChapterArray(selectedVerses);
    return selectedVersesGrouped.map(selection => {
      return {
        reference: mapSelectedVerseToVersSelectionDisplay(selection),
        colorScheme: badgeColorSchemes[bookChapterArray.indexOf(`${selection.book}:${selection.chapter}`) % badgeColorSchemes.length],
      }
    }
    );
  }, [mapSelectedVersesToGroupByBookChapter, mapSelectedVersesToBookChapterArray, mapSelectedVerseToVersSelectionDisplay]);

  const versSelectionDisplay = useMemo(() => {
    return mapSelectedVersesToVersSelectionDisplay(selectedVerses);
}, [selectedVerses]);


  return versSelectionDisplay;
}

