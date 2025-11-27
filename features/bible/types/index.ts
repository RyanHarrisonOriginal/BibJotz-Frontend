
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