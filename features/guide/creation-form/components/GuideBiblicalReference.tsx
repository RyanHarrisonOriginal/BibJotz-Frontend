'use client';

import { BiblicalReferenceList, type BiblicalReference } from './BiblicalReferenceList';
import { BibleReaderModal } from '@/features/bible/components/bible-reader/components/BibleReaderModal';
import * as React from 'react';
import { GuideBiblicalReferenceHeader } from './GuideBiblicalReferenceHeader';
import { EmptyBiblicalReferenceCard } from '@/features/guide/creation-form/components/EmptyBiblicalReferenceCard';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useCallback } from 'react';
import { SelectedReadingPanelVerses } from '@/features/bible/components/bible-reader/types';
import { useTypeMappers } from '@/features/bible/hooks/useTypeMappers';

type GuideBiblicalReferenceProps = {
  biblicalReferences: BiblicalReference[];
  onAddReference: (reference: BiblicalReference) => void;
  onRemoveReference: (index: number) => void;
  onUpdateReference: (index: number, field: keyof BiblicalReference, value: string | number) => void;
  addBiblicalReferences: (references: BiblicalReference[]) => void;
};

const ActionButtonComponent = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button
      type="button"
      onClick={onClick}
      size="sm"
      className="gap-2 shadow-lg hover:shadow-xl transition-all hover:scale-105">
      <Plus className="h-4 w-4" />
      Add to Guide
    </Button>
  )
}

export function GuideBiblicalReference({
  biblicalReferences,
  onAddReference,
  onRemoveReference,
  onUpdateReference,
  addBiblicalReferences,
}: GuideBiblicalReferenceProps) {

  const [bibleReaderOpen, setBibleReaderOpen] = React.useState<boolean>(false);
  const { mapSelectedReadingPanelVersesToBiblicalReferences } = useTypeMappers();
  const handleActionButtonCallback = useCallback((verses: SelectedReadingPanelVerses) => {
    const biblicalReferences = mapSelectedReadingPanelVersesToBiblicalReferences(verses);
    addBiblicalReferences(biblicalReferences);
    setBibleReaderOpen(false)
  }, [addBiblicalReferences]);



  return (
    <div className="space-y-4">
      {bibleReaderOpen && (
        <BibleReaderModal
          open={bibleReaderOpen}
          onOpenChange={setBibleReaderOpen}
          actionButtonCallback={handleActionButtonCallback}
          ActionButtonComponent={ActionButtonComponent}
        />
      )}
      <GuideBiblicalReferenceHeader
        openBibleReader={() => setBibleReaderOpen(true)}
        onAddReference={onAddReference} />


      <BiblicalReferenceList
        EmptyBiblicalReferenceComponent={
          <EmptyBiblicalReferenceCard
            openBibleReader={() => setBibleReaderOpen(true)}
            onAddReference={onAddReference} />}
        biblicalReferences={biblicalReferences}
        onRemoveReference={onRemoveReference}
        onUpdateReference={onUpdateReference}
        variant="card"
      />
    </div>
  );
}

