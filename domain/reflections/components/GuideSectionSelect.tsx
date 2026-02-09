"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select/select";
import { GuideListItem } from "@/domain/guide/types";

export type SectionOption = { id: string; title: string };

/** Generate placeholder sections when API does not return section list (e.g. Section 1, Section 2). */
export function sectionsFromGuide(guide: GuideListItem): SectionOption[] {
  return Array.from({ length: guide.numberOfSections }, (_, i) => ({
    id: `${guide.id}-${i + 1}`,
    title: `Section ${i + 1}`,
  }));
}

interface GuideSectionSelectProps {
  guides: GuideListItem[] | undefined;
  selectedGuideId: string;
  selectedSectionId: string;
  onGuideChange: (guideId: string) => void;
  onSectionChange: (sectionId: string) => void;
  isLoading?: boolean;
}

export function GuideSectionSelect({
  guides,
  selectedGuideId,
  selectedSectionId,
  onGuideChange,
  onSectionChange,
  isLoading,
}: GuideSectionSelectProps) {
  const selectedGuide = guides?.find(
    (g) => String(g.id) === selectedGuideId
  );
  const sections = selectedGuide
    ? sectionsFromGuide(selectedGuide)
    : [];

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">
          Guide
        </label>
        <Select
          value={selectedGuideId}
          onValueChange={onGuideChange}
          disabled={isLoading}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a guide..." />
          </SelectTrigger>
          <SelectContent>
            {guides?.map((guide) => (
              <SelectItem
                key={guide.id}
                value={String(guide.id)}
              >
                {guide.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">
          Section
        </label>
        <Select
          value={selectedSectionId}
          onValueChange={onSectionChange}
          disabled={!selectedGuideId}
        >
          <SelectTrigger>
            <SelectValue
              placeholder={
                selectedGuideId
                  ? "Select a section..."
                  : "Select guide first"
              }
            />
          </SelectTrigger>
          <SelectContent>
            {sections.map((section) => (
              <SelectItem key={section.id} value={section.id}>
                {section.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
