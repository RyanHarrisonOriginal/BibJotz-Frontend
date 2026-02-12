/**
 * Library types: shape returned by the library API (user's journeys with reflections).
 * Reflections are grouped by section.
 */

export type LibraryReflectionEntry = {
  id: string;
  entry_key: string;
  content: string;
  createdAt: string;
};

export type LibrarySectionReflections = {
  sectionId: string;
  sectionTitle: string;
  entries: LibraryReflectionEntry[];
};

export type LibraryJourneySection = {
  id: string;
  title: string;
};

export type LibraryJourney = {
  id: string;
  title: string;
  guideTitle: string;
  sections: LibraryJourneySection[];
  sectionReflections: LibrarySectionReflections[];
};

/** Single journey with sections and reflections (e.g. for editor fetch). Same shape as one library item. */
export type JourneyDetail = LibraryJourney;
