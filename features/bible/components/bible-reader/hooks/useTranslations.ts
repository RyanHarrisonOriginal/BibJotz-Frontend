import { useState, useEffect } from "react";
import { BibleTranslation } from "@/features/bible/types";
import { useBibleTranslations } from "@/features/bible/hooks/useBibleApi";

export function useTranslations() {
  const { data: bibleTranslations } = useBibleTranslations();
  const [panelTranslations, setPanelTranslations] = useState<BibleTranslation[]>(bibleTranslations || []);

  useEffect(() => {
    if (bibleTranslations) {
      setPanelTranslations(bibleTranslations);
    }
  }, [bibleTranslations]);

  return {
    panelTranslations,
  };
}

