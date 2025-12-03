export type BiblicalReference = {
    book: string;
    bookCode?: string;
    chapter: number;
    startVerse: number;
    endVerse: number;
    NoReferenceComponent?: React.ReactNode;
  };
  