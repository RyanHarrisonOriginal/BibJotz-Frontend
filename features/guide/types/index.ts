export type BiblicalReference = {
    book: string;
    bookCode?: string;
    chapter: number;
    startVerse: number;
    endVerse: number;
    NoReferenceComponent?: React.ReactNode;
  };

  export type GuideSection = {
    id?: string;
    title: string;
    description: string;
    ordinalPosition: number;
    biblicalReferences: BiblicalReference[];
  };


  export type Guide = {
    id?: string;
    name: string;
    description: string;
    isPublic: boolean;
    biblicalReferences: BiblicalReference[];
    guideSections: GuideSection[];
  };