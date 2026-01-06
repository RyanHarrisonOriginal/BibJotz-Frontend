import { useState, useCallback } from "react";
import { ReadingPanel } from "@/domain/bible/components/BibleReader/types";

export function useReadingPanels() {

  const [readingPannels, setReadingPanels] = useState<ReadingPanel[]>([
    {
      id: 1,
      version: "BSB",
      book: { name: "LEV", numberOfChapters: 50 },
      chapter: 1,
      verses: [],
    },
  ]);

  const add = useCallback((panel: Omit<ReadingPanel, 'id'>) => {
    setReadingPanels(prev => [...prev, { id: prev.length + 1, ...panel }]);
  }, []);

  const remove = useCallback((id: number) => {
    setReadingPanels(prev => prev.filter(panel => panel.id !== id));
  }, []);

  const update = useCallback(
    <T extends keyof ReadingPanel>(id: number, field: T, value: ReadingPanel[T]) =>{
    setReadingPanels(prev => prev.map(panel => panel.id === id ? { ...panel, [field]: value } : panel));
  }, []);


  return {
    panels: {
        configs: readingPannels,
        actions: {
            add,
            remove,
            update,
        }
    }
  };
}

