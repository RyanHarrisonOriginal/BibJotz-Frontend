import type { LibraryJourney } from "../types";

/** API may return an array or a wrapper like { journeys: LibraryJourney[] }. */
export type LibraryResponse = LibraryJourney[] | { journeys: LibraryJourney[] };

export function toJourneyArray(response: LibraryResponse): LibraryJourney[] {
  if (Array.isArray(response)) return response;
  if (response && typeof response === "object" && "journeys" in response) {
    return Array.isArray(response.journeys) ? response.journeys : [];
  }
  return [];
}
