import { useState, useCallback, useEffect, useMemo, Ref } from "react";
import { VersionPanel } from "@/features/bible/components/bible-reader/types";
import { useBibleTranslations, useBooks, useVerses, useVerseText } from "@/features/bible/hooks/useBibleApi";
import { BibleTranslation, BookInfo, SelectedVerse } from "@/features/bible/types";


export function useBibleReader() {

  const [selectedVerses, setSelectedVerses] = useState<Set<SelectedVerse>>(new Set());
  const [rangeStart, setRangeStart] = useState<SelectedVerse | null>(null);
  const [fontSize, setFontSize] = useState<number>(14); // Default font size in pixels  
  const { data: bibleTranslations } = useBibleTranslations();
  const [translations, setTranslations] = useState<BibleTranslation[]>(bibleTranslations || []);
  // Initialize with stable default to avoid hydration mismatch
  const [panels, setPanels] = useState<VersionPanel[]>([
    {
      id: "1",
      version: "BSB",
      book: "GEN",
      chapter: "1"
    }
  ]);

  const defaultVersion = bibleTranslations?.[0]?.code || "BSB";
  const panel0Version = panels[0]?.version || defaultVersion;
  const panel1Version = panels[1]?.version || defaultVersion;
  const panel2Version = panels[2]?.version || defaultVersion;

  const { data: books0 } = useBooks(true, panel0Version);
  const { data: books1 } = useBooks(true, panel1Version);
  const { data: books2 } = useBooks(true, panel2Version);

  // Convert book codes to book names for API calls
  const panel0BookCode = panels[0]?.book || "";
  const panel1BookCode = panels[1]?.book || "";
  const panel2BookCode = panels[2]?.book || "";

  const panel0BookName = useMemo(() => {
    const book = books0?.find(b => b.code === panel0BookCode);
    return book?.name || panel0BookCode;
  }, [books0, panel0BookCode]);

  const panel1BookName = useMemo(() => {
    const book = books1?.find(b => b.code === panel1BookCode);
    return book?.name || panel1BookCode;
  }, [books1, panel1BookCode]);

  const panel2BookName = useMemo(() => {
    const book = books2?.find(b => b.code === panel2BookCode);
    return book?.name || panel2BookCode;
  }, [books2, panel2BookCode]);

  const panel0Chapter = parseInt(panels[0]?.chapter || "1");
  const panel1Chapter = parseInt(panels[1]?.chapter || "1");
  const panel2Chapter = parseInt(panels[2]?.chapter || "1");

  const { data: versesText0 } = useVerseText(panel0BookName, panel0Chapter, undefined, undefined, panel0Version);
  const { data: versesText1 } = useVerseText(panel1BookName, panel1Chapter, undefined, undefined, panel1Version);
  const { data: versesText2 } = useVerseText(panel2BookName, panel2Chapter, undefined, undefined, panel2Version);

  const panelBooks = useMemo(() => {
    return panels.map((_, index) => {
      if (index === 0) return books0 || [];
      if (index === 1) return books1 || [];
      if (index === 2) return books2 || [];
      return [];
    });
  }, [panels, books0, books1, books2]);

  const panelVersesText = useMemo(() => {
    return panels.map((_, index) => {
      if (index === 0) return versesText0 || undefined;
      if (index === 1) return versesText1 || undefined;
      if (index === 2) return versesText2 || undefined;
      return undefined;
    });
  }, [panels, versesText0, versesText1, versesText2]);

  useEffect(() => {
    if (bibleTranslations) {
      setTranslations(bibleTranslations);
      // Update first panel version when translations load to avoid hydration mismatch
      setPanels(prevPanels => {
        if (prevPanels.length > 0 && prevPanels[0].version === "BSB" && bibleTranslations[0]?.code) {
          return prevPanels.map((panel, index) =>
            index === 0
              ? { ...panel, version: bibleTranslations[0].code }
              : panel
          );
        }
        return prevPanels;
      });
    }
  }, [bibleTranslations]);



  const addPanel = useCallback(() => {
    setPanels(prevPanels => {
      if (prevPanels.length < 3) {
        return [...prevPanels, {
          id: Date.now().toString(),
          version: bibleTranslations?.find(
            translation => !prevPanels.map(panel => panel.version).
              includes(translation.code))?.code || "BSB",
          book: prevPanels[0].book,
          chapter: prevPanels[0].chapter
        }];
      }
      return prevPanels;
    });
  }, [bibleTranslations]);

  const removePanel = useCallback((id: string) => {
    setPanels(prevPanels => {
      if (prevPanels.length > 1) {
        return prevPanels.filter(p => p.id !== id);
      }
      return prevPanels;
    });
  }, []);

  const updatePanel = useCallback((id: string, field: keyof VersionPanel, value: string) => {
    setPanels(prevPanels => prevPanels.map(p => p.id === id ? { ...p, [field]: value } : p));
  }, []);

  const handleVerseClick = useCallback((verse: SelectedVerse, isShiftKey: boolean) => {
    setSelectedVerses(prevSelected => {
      const newSelected = new Set(prevSelected);

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
        if (newSelected.has(verse)) {
          newSelected.delete(verse);
          setRangeStart(null);
        } else {
          newSelected.add(verse);
          setRangeStart(verse);
        }
      }
      return newSelected;
    });
  }, [rangeStart]);

  const clearSelection = useCallback(() => {
    setSelectedVerses(new Set());
    setRangeStart(null);
  }, []);

  type SelectedVerseGrouped = {
    book: string;
    chapter: number;
    verses: number[];
  }

  const groupByBookChapter = useCallback((refs: SelectedVerse[]): SelectedVerseGrouped[] => {
    const map = new Map<string, Set<number>>();

    for (const r of refs) {
      const key = `${r.book}:${r.chapter}`;
      if (!map.has(key)) map.set(key, new Set());
      map.get(key)!.add(r.verse);
    }

    // convert to a nicer structure
    return Array.from(map.entries()).map(([key, verses]) => {
      const [book, chapter] = key.split(":");
      return {
        book,
        chapter: Number(chapter),
        verses: Array.from(verses).sort((a, b) => a - b),
      };
    });
  }, []);

  const handleParseSelectedVerses = useCallback((selection: SelectedVerseGrouped) => {
    // Find consecutive ranges
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

  const getSelectedReference = useCallback(() => {
    if (selectedVerses.size === 0) return "";
    const selectedVersesGrouped = groupByBookChapter(Array.from(selectedVerses));
    return selectedVersesGrouped.map(selection => handleParseSelectedVerses(selection)) || [];
  }, [selectedVerses, handleParseSelectedVerses]);

  const handleAddToGuide = useCallback(() => {
    setSelectedVerses(prevSelected => {
      if (prevSelected.size === 0 || !panels[0].book) return prevSelected;

      const verses = Array.from(prevSelected).sort((a, b) => a.verse - b.verse);
      const reference = {
        book: panels[0].book,
        chapter: parseInt(panels[0].chapter),
        startVerse: verses[0],
        endVerse: verses[verses.length - 1],
      };
      return new Set();
    });
    setRangeStart(null);
  }, [panels]);

  const increaseFontSize = useCallback(() => {
    setFontSize(prev => Math.min(prev + 2, 24)); // Max 24px
  }, []);

  const decreaseFontSize = useCallback(() => {
    setFontSize(prev => Math.max(prev - 2, 10)); // Min 10px
  }, []);

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
    handleAddToGuide,
    increaseFontSize,
    decreaseFontSize,
  }
}