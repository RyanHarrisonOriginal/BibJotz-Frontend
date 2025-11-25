import { useState, useCallback, useEffect, useMemo } from "react";
import { VersionPanel } from "@/features/bible/components/bible-reader/types";
import { useBibleTranslations, useBooks } from "@/features/bible/components/book-autocomplete/hooks/useBibleApi";
import { BibleTranslation, BookInfo } from "@/features/bible/types";

  
export function useBibleReader() {  

  const [selectedVerses, setSelectedVerses] = useState<Set<number>>(new Set());
  const [rangeStart, setRangeStart] = useState<number | null>(null);
  const [fontSize, setFontSize] = useState<number>(14); // Default font size in pixels
  const { data: bibleTranslations } = useBibleTranslations();
  const [translations, setTranslations] = useState<BibleTranslation[]>(bibleTranslations || []);
  const [books, setBooks] = useState<BookInfo[]>([]);

  

  const [panels, setPanels] = useState<VersionPanel[]>([
    { 
      id: "1", 
      version: bibleTranslations?.[0]?.code || "BSB", 
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

  const panelBooks = useMemo(() => {
    return panels.map((_, index) => {
      if (index === 0) return books0 || [];
      if (index === 1) return books1 || [];
      if (index === 2) return books2 || [];
      return [];
    });
  }, [panels, books0, books1, books2]);


  useEffect(() => {
    if (bibleTranslations) {
      setTranslations(bibleTranslations);
    }
  }, [bibleTranslations]);



  const addPanel = useCallback(() => {
    setPanels(prevPanels => {
      if (prevPanels.length < 3) {
        return [...prevPanels, { 
          id: Date.now().toString(), 
          version: bibleTranslations?.find(translation => !prevPanels.map(panel => panel.version).includes(translation.code))?.code || "BSB", 
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

  const handleVerseClick = useCallback((verseNum: number, isShiftKey: boolean) => {
    setSelectedVerses(prevSelected => {
      const newSelected = new Set(prevSelected);
      
      if (isShiftKey && rangeStart !== null) {
        // Range selection
        const start = Math.min(rangeStart, verseNum);
        const end = Math.max(rangeStart, verseNum);
        for (let i = start; i <= end; i++) {
          newSelected.add(i);
        }
        setRangeStart(null);
      } else {
        // Single selection or start of range
        if (newSelected.has(verseNum)) {
          newSelected.delete(verseNum);
          setRangeStart(null);
        } else {
          newSelected.add(verseNum);
          setRangeStart(verseNum);
        }
      }
      return newSelected;
    });
  }, [rangeStart]);

  const clearSelection = useCallback(() => {
    setSelectedVerses(new Set());
    setRangeStart(null);
  }, []);

  const getSelectedReference = useCallback(() => {
    if (selectedVerses.size === 0) return "";
    const verses = Array.from(selectedVerses).sort((a, b) => a - b);
    const book = panels[0].book;
    const chapter = panels[0].chapter;
    
    if (verses.length === 1) {
      return `${book} ${chapter}:${verses[0]}`;
    }
    
    // Find consecutive ranges
    const ranges: string[] = [];
    let start = verses[0];
    let end = verses[0];
    
    for (let i = 1; i < verses.length; i++) {
      if (verses[i] === end + 1) {
        end = verses[i];
      } else {
        ranges.push(start === end ? `${start}` : `${start}-${end}`);
        start = verses[i];
        end = verses[i];
      }
    }
    ranges.push(start === end ? `${start}` : `${start}-${end}`);
    
    return `${book} ${chapter}:${ranges.join(", ")}`;
  }, [selectedVerses, panels]);

  const handleAddToGuide = useCallback(() => {
    setSelectedVerses(prevSelected => {
      if (prevSelected.size === 0 || !panels[0].book) return prevSelected;
      
      const verses = Array.from(prevSelected).sort((a, b) => a - b);
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
    books,
    fontSize,
    panelBooks,
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