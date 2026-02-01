import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GuideApiService } from "../api";

const GUIDES_QUERY_KEY = ["guides"] as const;

export function useDeleteGuideMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (guideId: number) => GuideApiService.deleteGuide(guideId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: GUIDES_QUERY_KEY });
    },
  });
}
