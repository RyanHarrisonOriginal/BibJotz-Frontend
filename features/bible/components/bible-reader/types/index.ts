import { BookInfo } from "@/features/bible/types";

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