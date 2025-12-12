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

};


export function GuideSections({
  guideSections,
  onAddSection,
  onRemoveSection,
  onUpdateSection
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
          />
        ))}
      </div>
    </div>
  );
}

