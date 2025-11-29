'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/Card/card';
import { Separator } from '@/components/ui/separator';
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { BiblicalReferenceList, type BiblicalReference } from './BiblicalReferenceList';

export type GuideSection = {
  title: string;
  description: string;
  ordinalPosition: number;
  biblicalReferences: BiblicalReference[];
};

type GuideSectionsProps = {
  guideSections: GuideSection[];
  expandedSections: Set<number>;
  onAddSection: () => void;
  onRemoveSection: (index: number) => void;
  onUpdateSection: (index: number, field: 'title' | 'description', value: string) => void;
  onToggleSectionReferences: (index: number) => void;
  onAddSectionReference: (sectionIndex: number) => void;
  onRemoveSectionReference: (sectionIndex: number, refIndex: number) => void;
  onUpdateSectionReference: (sectionIndex: number, refIndex: number, field: keyof BiblicalReference, value: string | number) => void;
};

export function GuideSections({
  guideSections,
  expandedSections,
  onAddSection,
  onRemoveSection,
  onUpdateSection,
  onToggleSectionReferences,
  onAddSectionReference,
  onRemoveSectionReference,
  onUpdateSectionReference,
}: GuideSectionsProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-serif font-semibold">Study Sections</h2>
          <p className="text-sm text-muted-foreground">
            Break down your guide into focused sections
          </p>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onAddSection}
          className="gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Section
        </Button>
      </div>

      <div className="space-y-6">
        {guideSections.map((section, sectionIndex) => (
          <Card key={sectionIndex} className="p-6 hover:border-primary/50 transition-colors">
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-4">
                  <input
                    value={section.title}
                    onChange={(e) => onUpdateSection(sectionIndex, 'title', e.target.value)}
                    placeholder="Section title"
                    className="w-full border-0 bg-transparent text-2xl font-semibold font-serif outline-none placeholder:text-muted-foreground/40"
                    suppressHydrationWarning
                  />

                  <textarea
                    value={section.description}
                    onChange={(e) => onUpdateSection(sectionIndex, 'description', e.target.value)}
                    placeholder="Describe this section..."
                    className="w-full resize-none border-0 bg-transparent text-base outline-none placeholder:text-muted-foreground/40 min-h-[60px]"
                    suppressHydrationWarning
                  />
                </div>

                {guideSections.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => onRemoveSection(sectionIndex)}
                  >
                    <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                  </Button>
                )}
              </div>

              <Separator className="my-4" />

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => onToggleSectionReferences(sectionIndex)}
                    className="gap-2 h-auto p-0 hover:bg-transparent"
                  >
                    <p className="text-sm font-medium text-muted-foreground">References</p>
                    {expandedSections.has(sectionIndex) ? (
                      <ChevronUp className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => onAddSectionReference(sectionIndex)}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>

                {expandedSections.has(sectionIndex) && (
                  <BiblicalReferenceList
                    biblicalReferences={section.biblicalReferences}
                    onRemoveReference={(refIndex) => onRemoveSectionReference(sectionIndex, refIndex)}
                    onUpdateReference={(refIndex, field, value) => onUpdateSectionReference(sectionIndex, refIndex, field, value)}
                    variant="inline"
                  />
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

