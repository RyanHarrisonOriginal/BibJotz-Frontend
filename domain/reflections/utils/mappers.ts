import type { Entry } from "../components/ReflectionEntry";
import type { SectionEntries } from "../components/ReflectionCanvas";
import type { JourneyDetail } from "@/domain/library/types";

function parseCreatedAt(createdAt: string): Date {
  if (/^\d{4}-\d{2}-\d{2}/.test(createdAt)) {
    const d = new Date(createdAt);
    if (!Number.isNaN(d.getTime())) return d;
  }
  return new Date();
}

/**
 * Maps a journey detail (sections + reflections) to initial section entries
 * for the reflection canvas. Groups reflections by section title.
 */
export function mapJourneyDetailToSectionEntries(
  journey: JourneyDetail
): SectionEntries {
  const result: SectionEntries = {};
  for (const section of journey.sections) {
    const entries: Entry[] = journey.reflections
      .filter((r) => r.sectionTitle === section.title)
      .map((r) => ({
        id: r.id,
        content: r.content,
        createdAt: parseCreatedAt(r.createdAt),
      }));
    result[section.id] = entries;
  }
  return result;
}
