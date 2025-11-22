import * as React from 'react';
import { useBooks } from '@/features/book-autocomplete/hooks/useBibleApi';
import { BibleBook } from '@/features/book-autocomplete/types';

export type UseBookAutocompleteProps = {
  value: string;
  onChange: (value: string) => void;
  onBookSelect?: (book: { code: string; name: string }) => void;
};

export function useBookAutocomplete({
  value,
  onChange,
  onBookSelect,
}: UseBookAutocompleteProps) {
  const { data: books = [], isLoading: loading, error } = useBooks();
  const [isOpen, setIsOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [highlightedIndex, setHighlightedIndex] = React.useState(-1);

  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const searchInputRef = React.useRef<HTMLInputElement>(null);
   // Filter books based on search term
  const filteredBooks = React.useMemo(() => {
    if (!searchTerm.trim()) return books;
    const term = searchTerm.toLowerCase();
    return books.filter(
      (book) =>
        book.name.toLowerCase().includes(term) ||
        book.code.toLowerCase().includes(term)
    );
  }, [books, searchTerm]);

  const reset = React.useCallback(() => {
    setIsOpen(false);
    setSearchTerm('');
    setHighlightedIndex(-1);
  }, []);

  // Handle book selection
  const handleSelectBook = React.useCallback(
    (book: BibleBook) => {
      onChange(book.name);
      onBookSelect?.({ code: book.code, name: book.name });
      reset();
      buttonRef.current?.focus();
    },
    [onChange, onBookSelect, reset]
  );

  // Handle toggle dropdown
  const handleToggle = React.useCallback(() => {
    setIsOpen((prev) => !prev);
    if (!isOpen) {
      setSearchTerm('');
      setHighlightedIndex(-1);
    }
  }, [isOpen]);

  // Handle search input change
  const handleSearchChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
      setHighlightedIndex(-1);
    },
    []
  );

  // Handle keyboard navigation on button
  const handleButtonKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleToggle();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setIsOpen(true);
        setHighlightedIndex(0);
      }
    },
    [handleToggle]
  );

  // Handle keyboard navigation in dropdown
  const handleDropdownKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < filteredBooks.length - 1 ? prev + 1 : prev
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : -1));
      } else if (e.key === 'Enter' && highlightedIndex >= 0) {
        e.preventDefault();
        handleSelectBook(filteredBooks[highlightedIndex]);
      } else if (e.key === 'Escape') {
        e.preventDefault();
        reset();
        buttonRef.current?.focus();
      }
    },
    [filteredBooks, highlightedIndex, handleSelectBook, reset]
  );

  // Handle search input key down
  const handleSearchKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        e.stopPropagation();
        setHighlightedIndex((prev) =>
          prev < filteredBooks.length - 1 ? prev + 1 : prev
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        e.stopPropagation();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : -1));
      } else if (e.key === 'Enter' && highlightedIndex >= 0) {
        e.preventDefault();
        e.stopPropagation();
        handleSelectBook(filteredBooks[highlightedIndex]);
      } else if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        reset();
        buttonRef.current?.focus();
      }
    },
    [filteredBooks, highlightedIndex, handleSelectBook, reset]
  );

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        reset();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // Focus search input when dropdown opens
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 0);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, reset]);

  // Scroll highlighted item into view
  React.useEffect(() => {
    if (highlightedIndex >= 0 && dropdownRef.current) {
      const listElement = dropdownRef.current.querySelector('[role="listbox"]');
      if (listElement) {
        const highlightedElement = listElement.children[highlightedIndex] as HTMLElement;
        if (highlightedElement) {
          highlightedElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        }
      }
    }
  }, [highlightedIndex]);

  return {
    // State
    isOpen,
    searchTerm,
    highlightedIndex,
    filteredBooks,
    loading,
    error,
    // Refs
    buttonRef,
    dropdownRef,
    searchInputRef,
    // Handlers
    handleToggle,
    handleSelectBook,
    handleSearchChange,
    handleButtonKeyDown,
    handleDropdownKeyDown,
    handleSearchKeyDown,
  };
}

