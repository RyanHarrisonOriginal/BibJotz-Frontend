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
    authorId?: number;
    ordinalPosition?: number;
  };

  export type GuideListItem = {
    id: number;
    name: string;
    description: string;
    isPublic: boolean;
    authorName: string;
    numberOfSections: number;
    numberOfJourneys: number;
    numberOfReflections: number;
  }

  export interface GuideListPayload {
    guides: GuideListItem[];
    counts: {
        myGuides: number;
        communityGuides: number;
    };
}