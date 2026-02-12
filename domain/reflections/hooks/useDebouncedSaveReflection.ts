"use client";

import { useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useUpsertReflectionMutation } from "./useSaveReflectionMutation";

const DEBOUNCE_MS = 1000;
const MAX_WAIT_MS = 2000;
const AUTHOR_ID = 1;

export type ReflectionSectionUpdate = {
  entry_key: string;
  guide_section_id: string;
  content: string;
};

/**
 * Returns a debounced function that saves one or more reflection entries
 * for the given journey. Each update is sent as a separate upsert (by entry_key).
 * Flushes pending saves on unmount and when journeyId changes.
 */
export function useDebouncedSaveReflection(journeyId: string | null) {
  const mutation = useUpsertReflectionMutation();

  const debouncedSave = useDebouncedCallback(
    (updates: ReflectionSectionUpdate[]) => {
      if (!journeyId || updates.length === 0) return;
      updates
        .filter((u) => !u.entry_key.startsWith("local-"))
        .forEach(({ entry_key, guide_section_id, content }) => {
          mutation.mutate({
            entry_key,
            journey_id: journeyId,
            guide_section_id,
            content,
            author_id: AUTHOR_ID,
          });
        });
    },
    DEBOUNCE_MS,
    { maxWait: MAX_WAIT_MS }
  );

  useEffect(() => {
    debouncedSave.cancel();
    mutation.reset();
  }, [journeyId]);

  useEffect(() => {
    return () => {
      debouncedSave.flush();
    };
  }, [debouncedSave]);

  return debouncedSave;
}
