
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
    number: number;
    [key: string]: unknown;
  };
  
  export type VerseText = {
    text: string;
    [key: string]: unknown;
  };
  
  export interface BibleTranslation {
    code: string;
    name: string;
    license: string;
    language: string;
}

  