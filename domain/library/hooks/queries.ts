import { useQuery } from "@tanstack/react-query";
import { LibraryApiService } from "../api";
import type { LibraryJourney } from "../types";

const LIBRARY_JOURNEYS_QUERY_KEY = ["library", "journeys"] as const;

export function useGetLibraryJourneys() {
  return useQuery({
    queryKey: LIBRARY_JOURNEYS_QUERY_KEY,
    queryFn: (): Promise<LibraryJourney[]> =>
      LibraryApiService.getLibraryJourneys(),
  });
}
