import { useMutation } from "@tanstack/react-query";
import { GuideApiService } from "../api";
import { Guide } from "../types";

export function usePublishGuideMutation() {
  return useMutation({
    mutationFn: (guide: Guide) => GuideApiService.publishGuide(guide),
  });
}
