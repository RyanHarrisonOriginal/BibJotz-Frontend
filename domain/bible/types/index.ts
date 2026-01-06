
// Types
export type BookInfo = {
    name: string;
    code: string;
    numberOfChapters: number;  
  };
  
  export type BookChapterInfo = {
    book: string;
    chapter: number;
    numberOfVerses: number;
  };
  
  export type Verse = {
    verse: number;
    texts: VerseTextTranslation[];
  };

  export type VerseTextTranslation = {
    translation: string;
    text: string;
  };
  
  export type VerseText = {
    book: string;
    bookshortName: string;
    chapter: number;
    translations: BibleTranslation[];
    verses: Verse[];
  };
  
  export interface BibleTranslation {
    code: string;
    name: string;
    license: string;
    language: string;
}

export interface SelectedVerse {
  book: string;
  chapter: number;
  verse: number;
}

export interface ReadingPanelVerse {
  verse: number;
  text: string;
}

export interface ReadingPanelBook {
  name: string;
  numberOfChapters: number;
}

export interface ReadingPanel {
    id: number;
    version: string;
    book: ReadingPanelBook;
    chapter: number;
    verses: ReadingPanelVerse[];
  }

export interface ReadingPanelActions {
  add: (panel: ReadingPanel) => void;
  update: (id: string, field: keyof ReadingPanel, value: string) => void;
  remove: (id: string) => void;
}

export interface SelectedReadingPanelVerse {
  book: string;
  chapter: number;
  verse: number;
}

export interface SelectedReadingPanelVerseGrouped {
  book: string;
  chapter: number;
  verses: number[];
}

export type SelectedReadingPanelVerses = SelectedReadingPanelVerse[];