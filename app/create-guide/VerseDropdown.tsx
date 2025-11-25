'use client';

import { BookChapterInfo } from '@/features/bible/types';
import { NumberDropdown } from './NumberDropdown';
import { useBookChapterInfo, useVerses } from '@/features/bible/components/book-autocomplete/hooks/useBibleApi';

type VerseDropdownProps = {
  book: string;
  chapter: number;
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
  className?: string;
  fromVerse?: number;
  enabled?: boolean;
};

export function VerseDropdown({
  book,
  chapter,
  value,
  onChange,
  placeholder = 'Verse',
  className,
  fromVerse = 1,
  enabled = true,
}: VerseDropdownProps) {
  const { data: bookChapterInfo = {} as BookChapterInfo } = useBookChapterInfo(book, chapter);
  const numberOfVerses = bookChapterInfo.numberOfVerses;

  return (
    <NumberDropdown
      value={value}
      onChange={onChange}
      minValue={fromVerse}
      maxValue={numberOfVerses}
      placeholder={placeholder}
      className={className}
      columns={2}
      enabled={numberOfVerses > 0 && enabled}
    />
  );
}

