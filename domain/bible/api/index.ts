import { BIBLE_BASE_URL, fetchJson } from "@/lib/api";
import {
  BookInfo,
  BookChapterInfo,
  Verse,
  VerseText,
  BibleTranslation,
} from "@/domain/bible/types";

type RawBook = {
  book: string;
  bookShortName: string;
  numberOfChapters: number;
};

export class TranslationApiService {
  private static readonly BASE_URL = `${BIBLE_BASE_URL}/translations`;

  static async fetchBibleTranslations(): Promise<BibleTranslation[]> {
    return fetchJson<BibleTranslation[]>(this.BASE_URL);
  }
}

export class BibleApiService {
  private static readonly BASE_URL = `${BIBLE_BASE_URL}/books`;

  static async fetchBooks(translation: string = "BSB"): Promise<BookInfo[]> {
    const data = await fetchJson<RawBook[]>(
      `${this.BASE_URL}?translation=${encodeURIComponent(translation)}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    return data.map((book) => ({
      name: book.book,
      code: book.bookShortName,
      numberOfChapters: book.numberOfChapters,
    }));
  }

  static async fetchBookChapterInfo(
    bookName: string,
    chapterNumber: number
  ): Promise<BookChapterInfo> {
    return fetchJson<BookChapterInfo>(
      `${this.BASE_URL}/${encodeURIComponent(bookName)}/chapters/${chapterNumber}`
    );
  }

  static async fetchBookInfo(bookName: string): Promise<BookInfo> {
    return fetchJson<BookInfo>(
      `${this.BASE_URL}/${encodeURIComponent(bookName)}`
    );
  }

  static async fetchVerses(
    bookName: string,
    chapterNumber: number
  ): Promise<Verse[]> {
    return fetchJson<Verse[]>(
      `${this.BASE_URL}/${encodeURIComponent(bookName)}/chapters/${chapterNumber}/verses`
    );
  }

  static async fetchVerseText(
    bookName: string,
    chapterNumber: number,
    translation: string | undefined = undefined,
    start: number | undefined = undefined,
    end: number | undefined = undefined
  ): Promise<VerseText> {
    const params = new URLSearchParams({
      translation: translation || "",
    });
    if (start != null) params.set("start", String(start));
    if (end != null) params.set("end", String(end));
    const url = `${this.BASE_URL}/${encodeURIComponent(bookName)}/chapters/${chapterNumber}/verses?${params.toString()}`;
    return fetchJson<VerseText>(url);
  }
}
