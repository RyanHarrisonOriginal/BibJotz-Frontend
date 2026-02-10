import { useQuery } from "@tanstack/react-query";
import { LibraryApiService } from "../api";
import type { JourneyDetail, LibraryJourney } from "../types";

const LIBRARY_JOURNEYS_QUERY_KEY = ["library", "journeys"] as const;
const JOURNEY_DETAIL_QUERY_KEY = (id: string) =>
  ["library", "journey", id] as const;

export function useGetLibraryJourneys() {
  return useQuery({
    queryKey: LIBRARY_JOURNEYS_QUERY_KEY,
    queryFn: (): Promise<LibraryJourney[]> =>
      LibraryApiService.getLibraryJourneys(),
  });
}

export function useGetJourneyDetail(journeyId: string | null) {
  return useQuery({
    queryKey: JOURNEY_DETAIL_QUERY_KEY(journeyId ?? ""),
    queryFn: (): Promise<JourneyDetail> =>
      LibraryApiService.getJourneyDetail(journeyId!),
    enabled: Boolean(journeyId),
  });
}
