import { Draft } from "../types";

/**
 * Merges a saved draft into the user drafts cache.
 * Only updates if name or updatedAt actually changed to avoid unnecessary re-renders.
 */
export function mergeSavedDraftIntoUserDrafts(
  old: Partial<Draft>[],
  savedDraft: Partial<Draft> & { draftKey: string; name?: string; updatedAt?: Date | string }
): Partial<Draft>[] {
  const draftIndex = old.findIndex((d) => d.draftKey === savedDraft.draftKey);
  if (draftIndex === -1) return old;

  const existingDraft = old[draftIndex];
  const nameChanged = existingDraft.name !== savedDraft.name;
  const updatedAtChanged =
    existingDraft.updatedAt?.toString() !== savedDraft.updatedAt?.toString();

  if (!nameChanged && !updatedAtChanged) {
    return old;
  }

  const updated = [...old];
  updated[draftIndex] = {
    ...existingDraft,
    name: savedDraft.name,
    updatedAt: savedDraft.updatedAt,
  };
  return updated;
}

/**
 * Removes a draft from the user drafts cache by draftKey.
 * Returns the same array reference if the draft was not in the list.
 */
export function removeDraftFromUserDrafts(
  old: Partial<Draft>[],
  draftKey: string
): Partial<Draft>[] {
  const filtered = old.filter((d) => d.draftKey !== draftKey);
  if (filtered.length === old.length) return old;
  return filtered;
}
