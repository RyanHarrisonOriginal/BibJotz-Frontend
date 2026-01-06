'use client';

import * as React from 'react';
import { BookAutocomplete } from '@/domain/bible/components/BookAutoComplete';
import { ChapterDropdown } from './Inputs/ChapterDropdown';
import { VerseDropdown } from './Inputs/VerseDropdown';
import { Button } from '@/components/ui/button';
import { Trash2, BookOpen, Edit2 } from 'lucide-react';
import { BiblicalReference } from '@/domain/guide/types';

interface InlineEditableReferenceProps {
  reference: BiblicalReference;
  index: number;
  colorScheme: {
    bgColor: string;
    borderColor: string;
    textColor: string;
    hoverColor: string;
  };
  onUpdateReference: (index: number, field: keyof BiblicalReference, value: string | number) => void;
  onRemoveReference: (index: number) => void;
  showRemoveButton: boolean;
  onBookSelect: (index: number, book: { code: string; name: string }, ref: BiblicalReference) => void;
  onStartVerseSelect: (index: number, value: number, ref: BiblicalReference) => void;
}

/**
 * Formats a biblical reference for display
 */
function formatReference(ref: BiblicalReference): string {
  if (!ref.book || ref.chapter === 0) {
    return 'Select reference...';
  }
  
  const verseRange = ref.startVerse === ref.endVerse 
    ? `${ref.startVerse}` 
    : `${ref.startVerse}-${ref.endVerse}`;
  
  return `${ref.book} ${ref.chapter}:${verseRange}`;
}

/**
 * Inline editable biblical reference component
 * 
 * Displays as read-only by default, switches to edit mode on click,
 * and returns to read-only on blur or click outside.
 */
export function InlineEditableReference({
  reference,
  index,
  colorScheme,
  onUpdateReference,
  onRemoveReference,
  showRemoveButton,
  onBookSelect,
  onStartVerseSelect,
}: InlineEditableReferenceProps) {
  const [isEditing, setIsEditing] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Handle click outside to exit edit mode
  React.useEffect(() => {
    if (!isEditing) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsEditing(false);
      }
    };

    // Use setTimeout to avoid immediate trigger on the click that opened edit mode
    const timeoutId = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
    }, 0);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isEditing]);

  // Handle escape key to exit edit mode
  React.useEffect(() => {
    if (!isEditing) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsEditing(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isEditing]);

  const handleClick = React.useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleBlur = React.useCallback((e: React.FocusEvent) => {
    // Only blur if focus is moving outside the container
    if (containerRef.current && !containerRef.current.contains(e.relatedTarget as Node)) {
      setIsEditing(false);
    }
  }, []);

  // Read-only view
  if (!isEditing) {
    return (
      <div
        ref={containerRef}
        onClick={handleClick}
        className="group relative flex items-center gap-1.5 p-1.5 rounded border transition-all cursor-pointer"
        style={{
          backgroundColor: colorScheme.bgColor,
          borderColor: colorScheme.borderColor,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = colorScheme.hoverColor;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = colorScheme.bgColor;
        }}
        role="button"
        tabIndex={0}
        aria-label={`Edit reference: ${formatReference(reference)}`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick();
          }
        }}
      >
        <span 
          className="flex-1 text-xs font-medium truncate"
          style={{ color: colorScheme.textColor }}
        >
          {formatReference(reference)}
        </span>
        
        {/* Action buttons - shown on hover */}
        <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              handleClick();
            }}
            className="h-6 w-6"
            aria-label="Edit reference"
          >
            <Edit2 className="h-2.5 w-2.5" style={{ color: colorScheme.textColor }} />
          </Button>
          {showRemoveButton && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                onRemoveReference(index);
              }}
              className="h-6 w-6"
              aria-label="Remove reference"
            >
              <Trash2 className="h-2.5 w-2.5 text-muted-foreground hover:text-destructive" />
            </Button>
          )}
        </div>
      </div>
    );
  }

  // Edit mode
  return (
    <div
      ref={containerRef}
      onBlur={handleBlur}
      className="relative flex items-center gap-1.5 p-1.5 rounded border transition-all"
      style={{
        backgroundColor: colorScheme.bgColor,
        borderColor: colorScheme.borderColor,
      }}
    >
      {/* Ultra-compact horizontal layout */}
      <BookAutocomplete
        placeholder="Book"
        value={reference.book}
        onChange={(value) => onUpdateReference(index, 'book', value)}
        onBookSelect={(book) => onBookSelect(index, book, reference)}
        className="h-6 text-xs flex-1 min-w-[80px] max-w-[120px]"
        autoFocus
      />
      <ChapterDropdown
        value={reference.chapter}
        onChange={(value) => onUpdateReference(index, 'chapter', value)}
        book={reference.book}
        placeholder="Ch"
        className="h-6 w-12 text-xs"
      />
      <span className="text-muted-foreground text-[10px]">:</span>
      <VerseDropdown
        book={reference.book}
        chapter={reference.chapter}
        value={reference.startVerse}
        onChange={(value) => onStartVerseSelect(index, value, reference)}
        placeholder="v"
        className="h-6 w-12 text-xs"
        enabled={reference.chapter > 0}
      />
      {reference.startVerse !== reference.endVerse && (
        <>
          <span className="text-muted-foreground text-[10px]">-</span>
          <VerseDropdown
            book={reference.book}
            chapter={reference.chapter}
            value={reference.endVerse}
            onChange={(value) => onUpdateReference(index, 'endVerse', value)}
            placeholder="v"
            className="h-6 w-12 text-xs"
            fromVerse={reference.startVerse}
            enabled={reference.startVerse > 0}
          />
        </>
      )}
      
      {/* Action buttons */}
      <div className="flex items-center gap-0.5 ml-auto">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => setIsEditing(false)}
          className="h-6 w-6"
          aria-label="Done editing"
          title="Done (Esc)"
        >
          <BookOpen className="h-2.5 w-2.5 text-muted-foreground hover:text-foreground" />
        </Button>
        {showRemoveButton && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => onRemoveReference(index)}
            className="h-6 w-6"
            aria-label="Remove reference"
          >
            <Trash2 className="h-2.5 w-2.5 text-muted-foreground hover:text-destructive" />
          </Button>
        )}
      </div>
    </div>
  );
}

