// API-related exports for book-autocomplete feature
// This can be used for feature-specific API calls or types

import { BookInfo, BookChapterInfo, Verse, VerseText, BibleTranslation } from '@/domain/bible/types';


export class TranslationApiService {
  private static readonly BASE_URL = 'http://localhost:3000/translations';
  static async fetchBibleTranslations(): Promise<BibleTranslation[]> {
    const response = await fetch(`${this.BASE_URL}`);
    if (!response.ok) {
      throw new Error('Failed to fetch bible translations');
    }
    return response.json();
  }
}

export class BibleApiService {
  private static readonly BASE_URL = 'http://localhost:3000/books';
  static async fetchBooks(translation: string = 'BSB'): Promise<BookInfo[]> {
    try {
      const response = await fetch(`${this.BASE_URL}?translation=${translation}`, {
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

  static async fetchBookChapterInfo(bookName: string, chapterNumber: number): Promise<BookChapterInfo> {
    const response = await fetch(`${this.BASE_URL}/${bookName}/chapters/${chapterNumber}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch chapters for ${bookName}`);
    }
    return response.json();
  }

  static async fetchBookInfo(bookName: string): Promise<BookInfo> {
    const response = await fetch(`${this.BASE_URL}/${bookName}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch book info for ${bookName}`);
    }
    return response.json();
  }

  static async fetchVerses(
    bookName: string,
    chapterNumber: number,
  ): Promise<Verse[]> {
    const response = await fetch(
      `${this.BASE_URL}/${bookName}/chapters/${chapterNumber}/verses`
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
    translation: string|undefined = undefined,
    start: number | undefined = undefined,
    end: number | undefined = undefined,
  ): Promise<VerseText> {
    const params = new URLSearchParams({
      translation: translation || '',
    });
    if (start) {
      params.set('start', start.toString());
    }
    if (end) {
      params.set('end', end.toString());
    }
    const response = await fetch(
      `${this.BASE_URL}/${bookName}/chapters/${chapterNumber}/verses?${params.toString()}`
    );
    if (!response.ok) {
      throw new Error(
        `Failed to fetch verse text for ${bookName} chapter ${chapterNumber}`
      );
    }
    return response.json();
  }

}

