/**
 * Library types: shape returned by the library API (user's journeys with reflections).
 * API is assumed to return this shape when wired.
 */

export type LibraryReflection = {
  id: string;
  content: string;
  sectionTitle: string;
  createdAt: string;
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
  reflections: LibraryReflection[];
};

/** Single journey with sections and reflections (e.g. for editor fetch). Same shape as one library item. */
export type JourneyDetail = LibraryJourney;
