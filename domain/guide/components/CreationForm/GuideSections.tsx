'use client';

import { BiblicalReference } from '@/domain/guide/types';
import GuideSectionCard from './GuideSectionCard';
import GuideHeader from './GuideHeader';
import { AddSectionButton } from './AddSectionButton';

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
          <div key={sectionIndex} className="space-y-6">
            <GuideSectionCard
              section={section}
              sectionIndex={sectionIndex}
              onUpdateSection={onUpdateSection}
              onRemoveSection={onRemoveSection}
            />
            <AddSectionButton onClick={onAddSection} />
          </div>
        ))}
      </div>
    </div>
  );
}

