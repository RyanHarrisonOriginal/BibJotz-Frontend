import { useQuery } from '@tanstack/react-query';
import { BibleApiService } from '@/features/book-autocomplete/api';

// Hooks
export function useBooks() {
  return useQuery({
    queryKey: ['books'],
    queryFn: () => BibleApiService.fetchBooks(),
  });
}

export function useChapters(bookName: string) {
  return useQuery({
    queryKey: ['chapters', bookName],
    queryFn: () => BibleApiService.fetchChapters(bookName),
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

