import { useMemo } from "react";
import { useVerseText } from "@/domain/bible/hooks/useBibleApi";
import { ReadingPanel } from "@/domain/bible/components/BibleReader/types";

export function useReadingPanel({id, book, chapter, version}: ReadingPanel): ReadingPanel {
  const { data } = useVerseText(
    book.name, 
    chapter, 
    undefined, 
    undefined, 
    version
  );

  const verses = useMemo(() => {
    return data?.verses.map(v => ({
      verse: v.verse,
      text: v.texts[0].text
    })) ?? [];
  }, [data]);

  const readingPanelData = useMemo(() => ({
    id,
    book,
    chapter,
    version,
    verses: verses
  }), [id, book, chapter, version, verses]);

  return readingPanelData;
}
