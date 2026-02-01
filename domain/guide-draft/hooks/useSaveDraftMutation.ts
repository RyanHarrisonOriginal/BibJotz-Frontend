import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DraftApiService } from "../api";
import { Guide } from "../../guide/types";
import { Draft } from "../types";
import { mergeSavedDraftIntoUserDrafts } from "../utils/draftCacheUtils";

const USER_DRAFTS_QUERY_KEY = ["userDrafts", 1] as const;

export type SaveDraftParams = {
  userId: number;
  payload: Guide;
  draftKey: string;
};

export function useSaveDraftMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, payload, draftKey }: SaveDraftParams) =>
      DraftApiService.saveDraft(userId, payload, draftKey),
    onSuccess: (savedDraft) => {
      queryClient.setQueryData<Partial<Draft>[]>(
        USER_DRAFTS_QUERY_KEY,
        (old = []) => mergeSavedDraftIntoUserDrafts(old, savedDraft)
      );
    },
  });
}
