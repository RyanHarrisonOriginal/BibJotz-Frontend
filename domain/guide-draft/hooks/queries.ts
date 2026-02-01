import { useQuery } from "@tanstack/react-query";
import { DraftApiService } from "../api";

/**
 * Guide-draft queries: single module for all query hooks in this domain.
 */

export const useGetDraft = (draftKey: string) =>
  useQuery({
    queryKey: ["draft", draftKey],
    queryFn: () => DraftApiService.getDraft(draftKey),
    enabled: !!draftKey,
    staleTime: 0,
    refetchOnMount: "always",
    refetchOnWindowFocus: false,
  });

export const useGetUserDrafts = (userId: number) =>
  useQuery({
    queryKey: ["userDrafts", userId],
    queryFn: () => DraftApiService.getUserDrafts(userId),
    enabled: userId > 0,
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });
