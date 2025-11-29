import { useState, useCallback, useEffect } from "react";
import { VersionPanel } from "@/features/bible/components/bible-reader/types";
import { BibleTranslation } from "@/features/bible/types";

export function usePanels(bibleTranslations?: BibleTranslation[]) {
  // Initialize with stable default to avoid hydration mismatch
  const [panels, setPanels] = useState<VersionPanel[]>([
    {
      id: "1",
      version: "BSB",
      book: "GEN",
      chapter: "1"
    }
  ]);

  useEffect(() => {
    if (bibleTranslations) {
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

  return {
    panels,
    addPanel,
    removePanel,
    updatePanel,
  };
}

