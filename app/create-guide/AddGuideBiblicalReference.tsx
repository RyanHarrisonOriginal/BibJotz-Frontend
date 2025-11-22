'use client';

import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { BiblicalReferenceList, type BiblicalReference } from './BiblicalReferenceList';

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
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-serif font-semibold">Biblical Foundation</h2>
          <p className="text-sm text-muted-foreground">
            Primary scripture references for this guide
          </p>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onAddReference}
          className="gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Reference
        </Button>
      </div>

      <BiblicalReferenceList
        biblicalReferences={biblicalReferences}
        onRemoveReference={onRemoveReference}
        onUpdateReference={onUpdateReference}
        variant="card"
      />
    </div>
  );
}

