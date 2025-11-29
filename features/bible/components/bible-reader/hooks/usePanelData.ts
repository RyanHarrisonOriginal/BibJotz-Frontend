import { useMemo } from "react";
import { VersionPanel } from "@/features/bible/components/bible-reader/types";
import { useBooks, useVerseText } from "@/features/bible/hooks/useBibleApi";
import { BookInfo, VerseText } from "@/features/bible/types";

export function usePanelData(panels: VersionPanel[], bibleTranslations?: { code: string }[]) {
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

  return {
    panelBooks,
    panelVersesText,
  };
}

