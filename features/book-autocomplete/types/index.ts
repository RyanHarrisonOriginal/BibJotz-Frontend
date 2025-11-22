
// Types
export type BibleBook = {
    name: string;
    code: string;
    numberOfChapters: number;
  };
  
  export type Chapter = {
    number: number;
    [key: string]: unknown;
  };
  
  export type Verse = {
    number: number;
    [key: string]: unknown;
  };
  
  export type VerseText = {
    text: string;
    [key: string]: unknown;
  };
  
  