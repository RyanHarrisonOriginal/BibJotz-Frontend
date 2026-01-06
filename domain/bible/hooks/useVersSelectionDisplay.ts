import { useMemo } from "react";
import { badgeColorSchemes } from "../components/BibleReader/ReadingPanel/ScripturePanel/ScriptureSelectionBadgeColors";
import { SelectedReadingPanelVerses, SelectedReadingPanelVerseGrouped } from "../components/BibleReader/types";

export function useVersSelectionDisplay(selectedVerses: SelectedReadingPanelVerses) {
  return useMemo(() => {
    if (!selectedVerses || selectedVerses.length === 0) return [];

    // 1. Group by "book:chapter"
    const groups = new Map<string, SelectedReadingPanelVerseGrouped>();
    const order: string[] = []; // preserve insertion order for color mapping

    for (const r of selectedVerses) {
      const key = `${r.book}:${r.chapter}`;
      if (!groups.has(key)) {
        groups.set(key, { book: r.book, chapter: r.chapter, verses: [] });
        order.push(key);
      }
      groups.get(key)!.verses.push(r.verse);
    }

    // 2. Sort & compress ranges
    const compress = (book: string, chapter: number, verses: number[]) => {
      verses.sort((a, b) => a - b);

      let start = verses[0];
      let end = verses[0];
      const out: string[] = [];

      for (let i = 1; i < verses.length; i++) {
        const v = verses[i];
        if (v === end + 1) {
          end = v;
        } else {
          out.push(start === end ? `${start}` : `${start}-${end}`);
          start = end = v;
        }
      }
      out.push(start === end ? `${start}` : `${start}-${end}`);
      return `${book} ${chapter}:${out.join(", ")}`;
    };

    // 3. Map to final display objects
    const result = [];
    let i = 0;

    for (const [key, g] of groups) {
      result.push({
        reference: compress(g.book, g.chapter, g.verses),
        colorScheme: badgeColorSchemes[i % badgeColorSchemes.length],
        selection: g,
      });
      i++;
    }

    return result;
  }, [selectedVerses]);
}
