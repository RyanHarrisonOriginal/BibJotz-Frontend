'use client';

import * as React from 'react';
import { Input } from '@/components/ui/Form/input';
import { ChevronDown, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useBookAutocomplete } from '../hooks/useBookAutocomplete';

export type BookAutocompleteProps = Omit<React.ComponentProps<'button'>, 'onChange' | 'value'> & {
  value: string;
  onChange: (value: string) => void;
  onBookSelect?: (book: { code: string; name: string }) => void;
  placeholder?: string;
};

export function BookAutocomplete({
  value,
  onChange,
  onBookSelect,
  className,
  placeholder = 'Select book',
  ...props
}: BookAutocompleteProps) {
  const {
    isOpen,
    searchTerm,
    highlightedIndex,
    filteredBooks,
    loading,
    error,
    buttonRef,
    dropdownRef,
    searchInputRef,
    handleToggle,
    handleSelectBook,
    handleSearchChange,
    handleButtonKeyDown,
    handleDropdownKeyDown,
    handleSearchKeyDown,
  } = useBookAutocomplete({ value, onChange, onBookSelect });

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        type="button"
        onClick={handleToggle}
        onKeyDown={handleButtonKeyDown}
        className={cn(
          'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        {...props}
      >
        <span className={cn('truncate', !value && 'text-muted-foreground')}>
          {value || placeholder}
        </span>
        <ChevronDown
          className={cn(
            'h-4 w-4 shrink-0 text-muted-foreground transition-transform',
            isOpen && 'transform rotate-180'
          )}
        />
      </button>

      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute z-50 w-full mt-1 bg-card border border-border rounded-md shadow-lg"
          style={{ backgroundColor: 'hsl(var(--popover))' }}
          onKeyDown={handleDropdownKeyDown}
        >
          {/* Search input */}
          <div className="p-2 border-b border-border">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                ref={searchInputRef}
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                onKeyDown={handleSearchKeyDown}
                placeholder="Search books..."
                className="pl-8 h-9"
                autoComplete="off"
              />
            </div>
          </div>

          {/* Results list */}
          {loading ? (
            <div className="px-3 py-2 text-sm text-muted-foreground">Loading...</div>
          ) : error ? (
            <div className="px-3 py-2 text-sm text-destructive">
              Error: {error instanceof Error ? error.message : 'Failed to load books'}
            </div>
          ) : filteredBooks.length > 0 ? (
            <div className="max-h-60 overflow-auto" role="listbox">
              {filteredBooks.map((book, index) => (
                 <button
                  key={book.name}
                  type="button"
                  onClick={() => handleSelectBook(book)}
                  className={cn(
                    'w-full text-left px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none transition-colors',
                    index === highlightedIndex && 'bg-accent text-accent-foreground'
                  )}
                  role="option"
                  aria-selected={index === highlightedIndex}
                >
                  <div className="font-medium">{book.name}</div>
                  <div className="text-xs text-muted-foreground">{book.code}</div>
                </button>
              ))}
            </div>
          ) : (
            <div className="px-3 py-2 text-sm text-muted-foreground">No books found</div>
          )}
        </div>
      )}
    </div>
  );
}

