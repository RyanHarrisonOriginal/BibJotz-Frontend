'use client';

import { BiblicalReference } from '@/domain/guide/types/index';
import { BibleReaderModal } from '@/domain/bible/components/BibleReader/BibleReaderModal';
import * as React from 'react';
import { EmptyBiblicalReferenceCard } from '@/domain/guide/components/CreationForm/BiblicalReference/EmptyBiblicalReferenceCard';
import { useCallback } from 'react';
import { SelectedReadingPanelVerses } from '@/domain/bible/components/BibleReader/types';
import { useTypeMappers } from '@/domain/bible/hooks/useTypeMappers';
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

