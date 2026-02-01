import { useQuery } from "@tanstack/react-query";
import { GuideApiService } from "../api";
import { GuideListPayload, GuideOptionsListPayload } from "../types";

const GUIDES_QUERY_KEY = ["guides"] as const;
const GUIDE_OPTIONS_QUERY_KEY = ["guideOptions"] as const;

export function useGetGuides() {
  return useQuery({
    queryKey: GUIDES_QUERY_KEY,
    queryFn: (): Promise<GuideListPayload> => GuideApiService.getGuides(),
  });
}

export function useGetGuideOptions() {
  return useQuery({
    queryKey: GUIDE_OPTIONS_QUERY_KEY,
    queryFn: (): Promise<GuideOptionsListPayload> =>
      GuideApiService.getGuideOptions(),
  });
}
