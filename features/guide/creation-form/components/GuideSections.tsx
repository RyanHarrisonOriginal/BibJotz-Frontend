'use client';

import { BiblicalReference } from '@/features/guide/creation-form/types';
import GuideSectionCard from './GuideSectionCard';
import GuideHeader from './GuideHeader';

export type GuideSection = {
  title: string;
  description: string;
  ordinalPosition: number;
  biblicalReferences: BiblicalReference[];
};

type GuideSectionsProps = {
  guideSections: GuideSection[];
  onAddSection: () => void;
  onRemoveSection: (index: number) => void;
  onUpdateSection: (index: number, field: 'title' | 'description', value: string) => void;
  onToggleSectionReferences: (index: number) => void;
  onAddSectionReference: (reference: BiblicalReference) => void;
  onRemoveSectionReference: (index: number) => void;
  onUpdateSectionReference: (index: number, field: keyof BiblicalReference, value: string | number) => void;
  addBiblicalReferencesFromBibleReader: (references: BiblicalReference[]) => void;
};


export function GuideSections({
  guideSections,
  onAddSection,
  onRemoveSection,
  onUpdateSection,
  onAddSectionReference,
  onRemoveSectionReference,
  onUpdateSectionReference,
  addBiblicalReferencesFromBibleReader,
}: GuideSectionsProps) {
  return (
    <div className="space-y-4">
      <GuideHeader 
        actionButtonCallback={onAddSection} 
        actionButtonText="Add Section" 
        title="Study Sections" 
        description="Break down your guide into focused sections" />

      <div className="space-y-6">
        {guideSections.map((section, sectionIndex) => (
          <GuideSectionCard
            key={sectionIndex}
            section={section}
            sectionIndex={sectionIndex}
            onUpdateSection={onUpdateSection}
            onRemoveSection={onRemoveSection}
            onAddSectionReference={onAddSectionReference}
            onRemoveSectionReference={onRemoveSectionReference}
            onUpdateSectionReference={onUpdateSectionReference}
            addBiblicalReferencesFromBibleReader={addBiblicalReferencesFromBibleReader}
          />
        ))}
      </div>
    </div>
  );
}

