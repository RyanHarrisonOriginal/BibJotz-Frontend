/**
 * Guide-draft API: single entry point for all draft operations (mutations + queries).
 *
 * Project standard: each domain has one entry-point API hook that exposes all
 * mutations and queries. Prefer useDraftsApi({ draftKey, userId }) and use
 * .mutations and .queries; individual hooks are re-exported for backward compatibility.
 */

import {
  useAutoSaveDraft,
  usePublishDraftMutation,
} from "./mutations";
import { useGetDraft, useGetUserDrafts } from "./queries";

export type UseDraftsApiOptions = {
  draftKey?: string | null;
  userId?: number;
};

const DEFAULT_USER_ID = 0;

export function useDraftsApi(options: UseDraftsApiOptions = {}) {
  const { draftKey = null, userId = DEFAULT_USER_ID } = options;
  const effectiveDraftKey = draftKey ?? null;
  const effectiveUserId = userId ?? DEFAULT_USER_ID;

  const { autosave } = useAutoSaveDraft(effectiveDraftKey);
  const publishDraftMutation = usePublishDraftMutation(effectiveDraftKey ?? "");
  const draftQuery = useGetDraft(effectiveDraftKey ?? "");
  const userDraftsQuery = useGetUserDrafts(effectiveUserId);

  return {
    mutations: {
      autosave,
      publishDraft: publishDraftMutation,
    },
    queries: {
      draft: draftQuery,
      userDrafts: userDraftsQuery,
    },
  };
}

// --- Backward compatibility: re-export individual hooks ---

export { useAutoSaveDraft, usePublishDraftMutation as usePublishDraft } from "./mutations";
export { useGetDraft, useGetUserDrafts } from "./queries";
