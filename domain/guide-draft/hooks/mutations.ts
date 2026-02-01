/**
 * Guide-draft mutations: single module for all mutation hooks in this domain.
 * Import from here or from the entry point useDraftsApi.
 */

export { useSaveDraftMutation } from "./useSaveDraftMutation";
export type { SaveDraftParams } from "./useSaveDraftMutation";

export { usePublishDraftMutation } from "./usePublishDraftMutation";

export { useDebouncedAutosave } from "./useDebouncedAutosave";

import { useDebouncedAutosave } from "./useDebouncedAutosave";

/** Composes debounced autosave with draftKey cleanup. */
export const useAutoSaveDraft = (draftKey: string | null) => {
  const autosave = useDebouncedAutosave(draftKey);
  return { autosave };
};
