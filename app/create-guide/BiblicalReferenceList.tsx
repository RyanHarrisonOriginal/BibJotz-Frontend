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
  NoReferenceComponent?: React.ReactNode;
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
        'h-9 w-9 transition-all duration-300',
        isGlowing && 'shadow-lg shadow-primary/50 ring-2 ring-primary/50 ring-offset-2'
      )}
    >
      <BookOpen className={cn(
        'h-4 w-4 text-muted-foreground hover:text-foreground transition-colors',
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
  NoReferenceComponent,
}: BiblicalReferenceListProps) {
  const { data: books = [] } = useBooks();

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
            <div key={index} className="flex items-start gap-2 p-3 bg-muted/30 rounded-lg">
              <div className="flex-1 grid grid-cols-4 gap-2">
                <BookAutocomplete
                  placeholder="Book"
                  value={ref.book}
                  onChange={(value) => onUpdateReference(index, 'book', value)}
                  onBookSelect={(book ) => handleBookSelect(index, book, ref)}
                  className="h-9"
                />
                <ChapterDropdown
                  value={ref.chapter}
                  onChange={(value) => onUpdateReference(index, 'chapter', value)}
                  book={ref.book}
                  placeholder="Ch"
                  className="h-9"
                />
                <VerseDropdown
                  book={ref.book}
                  chapter={ref.chapter}
                  value={ref.startVerse}
                  onChange={(value) => handleStartVerseSelect(index, value, ref)}
                  placeholder="Start"
                  className="h-9"
                />
                <VerseDropdown
                  book={ref.book}
                  chapter={ref.chapter}
                  value={ref.endVerse}
                  onChange={(value) => onUpdateReference(index, 'endVerse', value)}
                  placeholder="End"
                  className="h-9"
                />
              </div>
              <div className="flex items-center gap-1">
                <ReaderButtonWithGlow reference={ref} index={index} />
                {showRemoveButton(index, biblicalReferences.length) && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => onRemoveReference(index)}
                    className="h-9 w-9"
                  >
                    <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </>
    );
  }

  // Card variant (default)
  return (
    <div className="space-y-3">
      {
      
      
      biblicalReferences.length === 0 ? NoReferenceComponent :
      
      
      
      biblicalReferences.map((ref, index) => {
        
        return (
          <Card key={index} className="p-4 hover:border-primary/50 transition-colors">
            <div className="space-y-3">
              <div className="flex items-end gap-3">
                <div className="flex-1 grid grid-cols-4 gap-3">
                  <div className="col-span-2 space-y-1">
                    <label className="text-xs text-muted-foreground font-medium">Book</label>
                    <BookAutocomplete
                      placeholder="Book"
                      value={ref.book}
                      onChange={(value) => onUpdateReference(index, 'book', value)}
                      onBookSelect={(book) => handleBookSelect(index, book, ref)}
                      className="h-9"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-muted-foreground font-medium">Chapter</label>
                    <ChapterDropdown
                      value={ref.chapter}
                      onChange={(value) => onUpdateReference(index, 'chapter', value)}
                      book={ref.book}
                      placeholder="Ch"
                      className="h-9"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-xs text-muted-foreground font-medium">Start</label>
                      <VerseDropdown
                        book={ref.book}
                        chapter={ref.chapter}
                        value={ref.startVerse}
                        onChange={(value) => handleStartVerseSelect(index, value, ref)}
                        placeholder="Verse"
                        className="h-9"
                        enabled={ref.chapter > 0}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-muted-foreground font-medium">End</label>
                      <VerseDropdown
                        book={ref.book}
                        chapter={ref.chapter}
                        value={ref.endVerse}
                        onChange={(value) => onUpdateReference(index, 'endVerse', value)}
                        placeholder="Verse"
                        className="h-9"
                        fromVerse={ref.startVerse}
                        enabled={ref.startVerse > 0}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <ReaderButtonWithGlow reference={ref} index={index} />
                  {showRemoveButton(index, biblicalReferences.length) && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => onRemoveReference(index)}
                    >
                      <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}

