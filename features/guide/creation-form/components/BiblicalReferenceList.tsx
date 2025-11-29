'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/Form/input';
import { BookAutocomplete } from '@/features/bible/components/book-autocomplete';
import { Card } from '@/components/ui/Card/card';
import { Trash2, BookOpen } from 'lucide-react';
import { NumberDropdown } from './NumberDropdown';
import { VerseDropdown } from './VerseDropdown';
import { useBooks } from '@/features/bible/hooks/useBibleApi';
import { ChapterDropdown } from './ChapterDropdown';
import { getPassageColorScheme } from '@/features/bible/utils/passageColorSchemes';
import { InlineEditableReference } from './InlineEditableReference';
import * as React from 'react';
import { cn } from '@/lib/utils';

export type BiblicalReference = {
  book: string;
  bookCode?: string;
  chapter: number;
  startVerse: number;
  endVerse: number;
  NoReferenceComponent?: React.ReactNode;
};

type BiblicalReferenceListProps = {
  biblicalReferences: BiblicalReference[];
  onRemoveReference: (index: number) => void;
  onUpdateReference: (index: number, field: keyof BiblicalReference, value: string | number) => void;
  variant?: 'card' | 'inline';
  showRemoveButton?: (index: number, total: number) => boolean;
  EmptyBiblicalReferenceComponent?: React.ReactNode;
};

// Component to track reference changes and apply glow effect
function ReaderButtonWithGlow({ 
  reference, 
  index 
}: { 
  reference: BiblicalReference; 
  index: number;
}) {
  const [isGlowing, setIsGlowing] = React.useState(false);
  const prevRef = React.useRef<BiblicalReference>(reference);

  React.useEffect(() => {
    const hasChanged = 
      prevRef.current.book !== reference.book ||
      prevRef.current.chapter !== reference.chapter ||
      prevRef.current.startVerse !== reference.startVerse ||
      prevRef.current.endVerse !== reference.endVerse;

    if (hasChanged) {
      setIsGlowing(true);
      const timer = setTimeout(() => {
        setIsGlowing(false);
      }, 2000); // Glow for 2 seconds

      prevRef.current = { ...reference };
      return () => clearTimeout(timer);
    } else {
      prevRef.current = { ...reference };
    }
  }, [reference.book, reference.chapter, reference.startVerse, reference.endVerse]);

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={() => {}}
      disabled={!reference.book || reference.chapter === 0}
      title="Open reader"
      className={cn(
        'h-6 w-6 transition-all duration-300',
        isGlowing && 'shadow-lg shadow-primary/50 ring-2 ring-primary/50 ring-offset-1'
      )}
    >
      <BookOpen className={cn(
        'h-2.5 w-2.5 text-muted-foreground hover:text-foreground transition-colors',
        isGlowing && 'text-primary'
      )} />
    </Button>
  );
}

export function BiblicalReferenceList({
  biblicalReferences,
  onRemoveReference,
  onUpdateReference,
  variant = 'card',
  showRemoveButton = (index, total) => total > 0,
  EmptyBiblicalReferenceComponent,
}: BiblicalReferenceListProps) {
  const { data: books = [] } = useBooks();

  console.log('biblicalReferences:', biblicalReferences);

  const handleBookSelect = (index: number, book: { code: string; name: string }, ref: BiblicalReference) => {
    onUpdateReference(index, 'bookCode', book.code);
    const fullBook = books.find((b) => b.name === book.name || b.code === book.code);
    if (fullBook && ref.chapter > fullBook.numberOfChapters) {
      onUpdateReference(index, 'chapter', 1);
    }
  };

  const handleStartVerseSelect = (index: number, value: number, ref: BiblicalReference) => {
    onUpdateReference(index, 'startVerse', value);
    if (value > ref.endVerse) {
      onUpdateReference(index, 'endVerse', value);
    }
  }

  if (variant === 'inline') {
    return (
      <>
        {biblicalReferences.map((ref, index) => {
          return (
            <div key={index} className="group flex items-center gap-1.5 p-1.5 rounded bg-muted/20 hover:bg-muted/30 transition-colors">
              <div className="flex-1 flex items-center gap-1 flex-wrap">
                <BookAutocomplete
                  placeholder="Book"
                  value={ref.book}
                  onChange={(value) => onUpdateReference(index, 'book', value)}
                  onBookSelect={(book ) => handleBookSelect(index, book, ref)}
                  className="h-6 text-xs min-w-[80px] flex-1 max-w-[120px]"
                />
                <ChapterDropdown
                  value={ref.chapter}
                  onChange={(value) => onUpdateReference(index, 'chapter', value)}
                  book={ref.book}
                  placeholder="Ch"
                  className="h-6 w-12 text-xs"
                />
                <span className="text-muted-foreground text-[10px]">:</span>
                <VerseDropdown
                  book={ref.book}
                  chapter={ref.chapter}
                  value={ref.startVerse}
                  onChange={(value) => handleStartVerseSelect(index, value, ref)}
                  placeholder="v"
                  className="h-6 w-12 text-xs"
                />
                {ref.startVerse !== ref.endVerse && (
                  <>
                    <span className="text-muted-foreground text-[10px]">-</span>
                    <VerseDropdown
                      book={ref.book}
                      chapter={ref.chapter}
                      value={ref.endVerse}
                      onChange={(value) => onUpdateReference(index, 'endVerse', value)}
                      placeholder="v"
                      className="h-6 w-12 text-xs"
                    />
                  </>
                )}
              </div>
              <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <ReaderButtonWithGlow reference={ref} index={index} />
                {showRemoveButton(index, biblicalReferences.length) && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => onRemoveReference(index)}
                    className="h-6 w-6"
                  >
                    <Trash2 className="h-2.5 w-2.5 text-muted-foreground hover:text-destructive" />
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </>
    );
  }

  // Card variant (default) - grid layout with color scheme
  // Use the generalized passage color scheme for consistent highlighting

  // Determine grid columns based on count
  const getGridCols = () => {
    if (biblicalReferences.length === 0) return 'grid-cols-1';
    if (biblicalReferences.length === 1) return 'grid-cols-1';
    if (biblicalReferences.length === 2) return 'grid-cols-2';
    return 'grid-cols-2 md:grid-cols-3';
  };

  return (
    <div className={cn('grid gap-1.5', getGridCols())}>
      {biblicalReferences.length === 0 ? (
        <div className="col-span-full">{EmptyBiblicalReferenceComponent}</div>
      ) : (
        biblicalReferences.map((ref, index) => {
          const colorScheme = getPassageColorScheme(index);
          return (
            <InlineEditableReference
              key={index}
              reference={ref}
              index={index}
              colorScheme={colorScheme}
              onUpdateReference={onUpdateReference}
              onRemoveReference={onRemoveReference}
              showRemoveButton={showRemoveButton(index, biblicalReferences.length)}
              onBookSelect={handleBookSelect}
              onStartVerseSelect={handleStartVerseSelect}
            />
          );
        })
      )}
    </div>
  );
}

