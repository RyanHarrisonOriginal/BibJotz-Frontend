import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DraftApiService } from "../api";
import { Draft } from "../types";
import { useRouter } from "next/navigation";
import { removeDraftFromUserDrafts } from "../utils/draftCacheUtils";

const USER_DRAFTS_QUERY_KEY = ["userDrafts", 1] as const;
const GUIDES_PATH = "/guides";

export function usePublishDraftMutation(draftKey: string) {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: () => DraftApiService.publishDraft(draftKey),
    onSuccess: () => {
      queryClient.setQueryData<Partial<Draft>[]>(USER_DRAFTS_QUERY_KEY, (old = []) =>
        removeDraftFromUserDrafts(old, draftKey)
      );
      router.push(GUIDES_PATH);
    },
    onError: (error) => {
      console.error("Failed to publish draft:", error);
    },
  });
}
