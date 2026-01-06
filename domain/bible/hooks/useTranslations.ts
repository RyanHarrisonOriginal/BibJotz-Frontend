import { useState, useEffect } from "react";
import { BibleTranslation } from "@/domain/bible/types";
import { useBibleTranslations } from "@/domain/bible/hooks/useBibleApi";

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

