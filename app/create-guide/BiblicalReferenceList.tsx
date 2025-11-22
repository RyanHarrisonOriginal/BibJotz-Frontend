'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/Form/input';
import { BookAutocomplete } from '@/features/book-autocomplete';
import { Card } from '@/components/ui/Card/card';
import { Trash2 } from 'lucide-react';

export type BiblicalReference = {
  book: string;
  chapter: number;
  startVerse: number;
  endVerse: number;
};

type BiblicalReferenceListProps = {
  biblicalReferences: BiblicalReference[];
  onRemoveReference: (index: number) => void;
  onUpdateReference: (index: number, field: keyof BiblicalReference, value: string | number) => void;
  variant?: 'card' | 'inline';
  showRemoveButton?: (index: number, total: number) => boolean;
};

export function BiblicalReferenceList({
  biblicalReferences,
  onRemoveReference,
  onUpdateReference,
  variant = 'card',
  showRemoveButton = (index, total) => total > 1,
}: BiblicalReferenceListProps) {
  if (variant === 'inline') {
    return (
      <>
        {biblicalReferences.map((ref, index) => (
          <div key={index} className="flex items-start gap-2 p-3 bg-muted/30 rounded-lg">
            <div className="flex-1 grid grid-cols-4 gap-2">
              <BookAutocomplete
                placeholder="Book"
                value={ref.book}
                onChange={(value) => onUpdateReference(index, 'book', value)}
                className="h-9"
              />
              <Input
                type="number"
                placeholder="Ch"
                min="1"
                value={ref.chapter}
                onChange={(e) => onUpdateReference(index, 'chapter', Number(e.target.value))}
                className="h-9"
              />
              <Input
                type="number"
                placeholder="Start"
                min="1"
                value={ref.startVerse}
                onChange={(e) => onUpdateReference(index, 'startVerse', Number(e.target.value))}
                className="h-9"
              />
              <Input
                type="number"
                placeholder="End"
                min="1"
                value={ref.endVerse}
                onChange={(e) => onUpdateReference(index, 'endVerse', Number(e.target.value))}
                className="h-9"
              />
            </div>
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
        ))}
      </>
    );
  }

  // Card variant (default)
  return (
    <div className="space-y-3">
      {biblicalReferences.map((ref, index) => (
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
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-muted-foreground font-medium">Chapter</label>
                  <Input
                    type="number"
                    placeholder="Ch"
                    min="1"
                    value={ref.chapter}
                    onChange={(e) => onUpdateReference(index, 'chapter', Number(e.target.value))}
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-xs text-muted-foreground font-medium">Start</label>
                    <Input
                      type="number"
                      placeholder="Verse"
                      min="1"
                      value={ref.startVerse}
                      onChange={(e) => onUpdateReference(index, 'startVerse', Number(e.target.value))}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-muted-foreground font-medium">End</label>
                    <Input
                      type="number"
                      placeholder="Verse"
                      min="1"
                      value={ref.endVerse}
                      onChange={(e) => onUpdateReference(index, 'endVerse', Number(e.target.value))}
                    />
                  </div>
                </div>
              </div>
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
        </Card>
      ))}
    </div>
  );
}

