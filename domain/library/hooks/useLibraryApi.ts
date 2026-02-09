/**
 * Library API: single entry point for library operations (queries).
 *
 * Project standard: one entry-point API hook. Mutations can be added when
 * library write endpoints exist.
 */

import { useGetLibraryJourneys } from "./queries";

export function useLibraryApi() {
  const libraryJourneysQuery = useGetLibraryJourneys();

  return {
    queries: {
      libraryJourneys: libraryJourneysQuery,
    },
  };
}

export { useGetLibraryJourneys } from "./queries";
