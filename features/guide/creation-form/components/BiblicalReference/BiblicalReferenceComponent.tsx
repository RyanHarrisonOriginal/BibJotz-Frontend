'use client';

import { BiblicalReference } from '@/features/guide/creation-form/types/index';
import { BibleReaderModal } from '@/features/bible/components/bible-reader/components/BibleReaderModal';
import * as React from 'react';
import { EmptyBiblicalReferenceCard } from '@/features/guide/creation-form/components/BiblicalReference/EmptyBiblicalReferenceCard';
import { useCallback } from 'react';
import { SelectedReadingPanelVerses } from '@/features/bible/components/bible-reader/types';
import { useTypeMappers } from '@/features/bible/hooks/useTypeMappers';
import { BiblicalReferenceHeader } from './BiblicalReferenceHeader';
import { BiblicalReferenceList } from './BiblicalReferenceList';

type ActionButtonComponentProps = {
  onClick: () => void;
  color?: string;
  text: string;
}

type BiblicalReferenceComponentProps = {
  headerText: string;
  descriptionText: string;
  biblicalReferences: BiblicalReference[];
  onAddReference: (reference: BiblicalReference) => void;
  onRemoveReference: (index: number) => void;
  onUpdateReference: (index: number, field: keyof BiblicalReference, value: string | number) => void;
  addBiblicalReferencesFromBibleReader: (references: BiblicalReference[]) => void;
  actionButtonText: string;
};



export function BiblicalReferenceComponent({
  headerText,
  descriptionText,
  biblicalReferences,
  onAddReference,
  onRemoveReference,
  onUpdateReference,
  addBiblicalReferencesFromBibleReader,
  actionButtonText,
}: BiblicalReferenceComponentProps) {

  const [bibleReaderOpen, setBibleReaderOpen] = React.useState<boolean>(false);
  const { mapSelectedReadingPanelVersesToBiblicalReferences } = useTypeMappers();
  
  const handleActionButtonCallback = useCallback((verses: SelectedReadingPanelVerses) => {
    const biblicalReferences = mapSelectedReadingPanelVersesToBiblicalReferences(verses);
    addBiblicalReferencesFromBibleReader(biblicalReferences);
    setBibleReaderOpen(false)
  }, [addBiblicalReferencesFromBibleReader]);



  return (
    <div className="space-y-4">
      {bibleReaderOpen && (
        <BibleReaderModal
          open={bibleReaderOpen}
          onOpenChange={setBibleReaderOpen}
          actionButtonCallback={handleActionButtonCallback}
          actionButtonText={actionButtonText}
        />
      )}
      <BiblicalReferenceHeader
        openBibleReader={() => setBibleReaderOpen(true)}
        onAddReference={onAddReference}
        headerText={headerText}
        descriptionText={descriptionText}
      />


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

