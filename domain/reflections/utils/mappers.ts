import type { Entry } from "../components/reflection-entry";
import type { SectionEntries } from "../components/reflection-canvas";
import type { JourneyDetail } from "@/domain/library/types";

function parseCreatedAt(createdAt: string): Date {
  if (/^\d{4}-\d{2}-\d{2}/.test(createdAt)) {
    const d = new Date(createdAt);
    if (!Number.isNaN(d.getTime())) return d;
  }
  return new Date();
}

/**
 * Maps a journey detail (sections + sectionReflections) to initial section entries
 * for the reflection canvas. Uses sectionReflections grouped by section; entry id = entry_key.
 */
export function mapJourneyDetailToSectionEntries(
  journey: JourneyDetail
): SectionEntries {
  const result: SectionEntries = {};
  const sectionReflections = journey.sectionReflections ?? [];
  for (const section of journey.sections) {
    const sr = sectionReflections.find(
      (s) => String(s.sectionId) === String(section.id)
    );
    const entries: Entry[] = (sr?.entries ?? []).map((e) => ({
      id: e.entry_key ?? e.id,
      content: e.content,
      createdAt: parseCreatedAt(e.createdAt),
    }));
    result[section.id] = entries;
  }
  return result;
}
