// API-related exports for book-autocomplete feature
// This can be used for feature-specific API calls or types

import { BibleBook, Chapter, Verse, VerseText } from '@/features/book-autocomplete/types';

const BASE_URL = 'http://localhost:3000/books';


export class BibleApiService {
  static async fetchBooks(): Promise<BibleBook[]> {
    try {
      const response = await fetch(BASE_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      return data.map((book: any) => ({
        name: book.book,
        code: book.bookShortName,
        numberOfChapters: book.numberOfChapters,
      }));
    } catch (error) {
      console.error('Error fetching books:', error);
      throw error;
    }
  }

  
  static async fetchChapters(bookName: string): Promise<Chapter[]> {
    const response = await fetch(`${BASE_URL}/${bookName}/chapters`);
    if (!response.ok) {
      throw new Error(`Failed to fetch chapters for ${bookName}`);
    }
    return response.json();
  }
  
  static async fetchVerses(
    bookName: string,
    chapterNumber: number
  ): Promise<Verse[]> {
    const response = await fetch(
      `${BASE_URL}/${bookName}/chapters/${chapterNumber}/verses`
    );
    if (!response.ok) {
      throw new Error(
        `Failed to fetch verses for ${bookName} chapter ${chapterNumber}`
      );
    }
    return response.json();
  }
  
  static async fetchVerseText(
    bookName: string,
    chapterNumber: number,
    start: number,
    end: number,
    translation: string = ''
  ): Promise<VerseText> {
    const params = new URLSearchParams({
      start: start.toString(),
      end: end.toString(),
      translation: translation,
    });
    const response = await fetch(
      `${BASE_URL}/${bookName}/chapters/${chapterNumber}/verses/text?${params.toString()}`
    );
    if (!response.ok) {
      throw new Error(
        `Failed to fetch verse text for ${bookName} chapter ${chapterNumber}`
      );
    }
    return response.json();
  }
}