'use client';

import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { BiblicalReference } from '@/domain/guide/types';
import { BiblicalReferenceComponent } from './BiblicalReference/BiblicalReferenceComponent';

type GuideBiblicalReferenceProps = {
  biblicalReferences: BiblicalReference[];
  onAddReference: (reference: BiblicalReference) => void;
  onRemoveReference: (index: number) => void;
  onUpdateReference: (index: number, field: keyof BiblicalReference, value: string | number) => void;
  addBiblicalReferences: (references: BiblicalReference[]) => void;
};



export function GuideBiblicalReference({
  biblicalReferences,
  onAddReference,
  onRemoveReference,
  onUpdateReference,
  addBiblicalReferences,
}: GuideBiblicalReferenceProps) {


  return (
    <div className="space-y-4">
     <BiblicalReferenceComponent
      headerText="Biblical Foundation"
      descriptionText="Primary scripture references for this guide"
      biblicalReferences={biblicalReferences}
      onAddReference={onAddReference}
      onRemoveReference={onRemoveReference}
      onUpdateReference={onUpdateReference}
      addBiblicalReferencesFromBibleReader={addBiblicalReferences}
      actionButtonText="Add to Guide"
     />
    </div>
  );
}

