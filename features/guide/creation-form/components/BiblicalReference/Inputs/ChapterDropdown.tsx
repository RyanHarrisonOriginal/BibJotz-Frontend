import { NumberDropdown } from '@/features/guide/creation-form/components/BiblicalReference/Inputs/NumberDropdown';
import { useBookInfo } from '@/features/bible/hooks/useBibleApi';
import { BookInfo } from '@/features/bible/types';

type ChapterDropdownProps = {   
  value: number;
  onChange: (value: number) => void;
  book: string;
  placeholder?: string;
  className?: string;
};

export function ChapterDropdown({ 
    value, 
    onChange, 
    book, 
    placeholder = 'Ch', 
    className 
}: ChapterDropdownProps) {

    const { data = {} as BookInfo } = useBookInfo(book);
    const numberOfChapters = data.numberOfChapters;

  return (
    <NumberDropdown
      value={value}
      onChange={onChange}
      maxValue={numberOfChapters}
      columns={3}
      enabled={numberOfChapters > 0}
      placeholder={placeholder}
      className={className}
    />
  );
}

