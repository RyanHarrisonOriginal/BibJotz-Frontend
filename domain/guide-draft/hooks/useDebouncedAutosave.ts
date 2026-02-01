import { Guide } from "../../guide/types";
import { useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useSaveDraftMutation } from "./useSaveDraftMutation";

const DEBOUNCE_MS = 1000;
const MAX_WAIT_MS = 2000;
const DEFAULT_USER_ID = 1;

export function useDebouncedAutosave(draftKey: string | null) {
  const mutation = useSaveDraftMutation();

  const autosave = useDebouncedCallback(
    (payload: Guide) => {
      if (!draftKey) return;
      mutation.mutate({ userId: DEFAULT_USER_ID, payload, draftKey });
    },
    DEBOUNCE_MS,
    { maxWait: MAX_WAIT_MS }
  );

  useEffect(() => {
    autosave.cancel();
    mutation.reset();
  }, [draftKey]);

  return autosave;
}
