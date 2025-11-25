import { useQuery } from '@tanstack/react-query';
import { BibleApiService, TranslationApiService } from '@/features/bible/api';

// Hooks
export function useBooks(enabled: boolean = true, translation: string = '') {
  return useQuery({
    queryKey: ['books', translation],
    queryFn: () => BibleApiService.fetchBooks(translation),
    enabled: enabled && !!translation,
  });
}

export function useBookChapterInfo(bookName: string, chapterNumber: number) {
  return useQuery({
    queryKey: ['bookChapterInfo', bookName, chapterNumber],
    queryFn: () => BibleApiService.fetchBookChapterInfo(bookName, chapterNumber),
    enabled: !!bookName && !!chapterNumber,
  });
}

export function useBookInfo(bookName: string) {
  return useQuery({
    queryKey: ['bookInfo', bookName],
    queryFn: () => BibleApiService.fetchBookInfo(bookName),
    enabled: !!bookName,
  });
}

export function useVerses(bookName: string, chapterNumber: number) {
  return useQuery({
    queryKey: ['verses', bookName, chapterNumber],
    queryFn: () => BibleApiService.fetchVerses(bookName, chapterNumber),
    enabled: !!bookName && !!chapterNumber,
  });
}

export function useVerseText(
  bookName: string,
  chapterNumber: number,
  start: number,
  end: number,
  translation: string = ''
) {
  return useQuery({
    queryKey: ['verseText', bookName, chapterNumber, start, end, translation],
    queryFn: () =>
      BibleApiService.fetchVerseText(bookName, chapterNumber, start, end, translation),
    enabled: !!bookName && !!chapterNumber && !!start && !!end,
  });
}

export function useBibleTranslations() {
  return useQuery({
    queryKey: ['bibleTranslations'],
    queryFn: () => TranslationApiService.fetchBibleTranslations(),
  });
}
