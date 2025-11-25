'use client';

import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { BiblicalReferenceList, type BiblicalReference } from './BiblicalReferenceList';
import { BookOpen } from 'lucide-react';
import { Card } from '@/components/ui/Card/card';
import { BibleReaderModal } from '@/features/bible/components/bible-reader/components/Reader';
import * as React from 'react';

type AddGuideBiblicalReferenceProps = {
  biblicalReferences: BiblicalReference[];
  onAddReference: () => void;
  onRemoveReference: (index: number) => void;
  onUpdateReference: (index: number, field: keyof BiblicalReference, value: string | number) => void;
};

export function AddGuideBiblicalReference({
  biblicalReferences,
  onAddReference,
  onRemoveReference,
  onUpdateReference,
}: AddGuideBiblicalReferenceProps) {



  const GuideReferenceHeader = ({ openBibleReader }: { openBibleReader: () => void }) => {
    return (
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-serif font-semibold">Biblical Foundation</h2>
          <p className="text-sm text-muted-foreground">
            Primary scripture references for this guide
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={openBibleReader}
            className="gap-2"
          >
            <BookOpen className="h-4 w-4" />
            Select from Bible
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onAddReference}
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Manually
          </Button>
        </div>
      </div>
    )
  }

  const NoReferencesCard = ({ openBibleReader }: { openBibleReader: () => void }) => {
    return (
      <Card className="p-8 border-dashed border-2 bg-muted/20">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
            <BookOpen className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="font-medium mb-1">No biblical references yet</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Select verses from the Bible reader or add them manually
            </p>
            <div className="flex gap-2 justify-center">
              <Button
                type="button"
                onClick={openBibleReader}
                className="gap-2"
              >
                <BookOpen className="h-4 w-4" />
                Select from Bible
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={onAddReference}
                className="gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Manually
              </Button>
            </div>
          </div>
        </div>
      </Card>
    )
  }

  const [bibleReaderOpen, setBibleReaderOpen] = React.useState<boolean>(false);

  const handleSelectReference = (reference: { book: string; chapter: number; startVerse: number; endVerse: number }) => {
    console.log('handleSelectReference', reference);
  }

  return (
    <div className="space-y-4">

      <BibleReaderModal
        open={bibleReaderOpen}
        onOpenChange={setBibleReaderOpen}
        onSelectReference={handleSelectReference}
      />
      <GuideReferenceHeader openBibleReader={() => setBibleReaderOpen(true)} />


      <BiblicalReferenceList
        NoReferenceComponent={<NoReferencesCard openBibleReader={() => setBibleReaderOpen(true)} />}
        biblicalReferences={biblicalReferences}
        onRemoveReference={onRemoveReference}
        onUpdateReference={onUpdateReference}
        variant="card"
      />
    </div>
  );
}

