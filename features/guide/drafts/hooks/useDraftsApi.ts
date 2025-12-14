import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DraftApiService } from "../api";
import { Guide } from "../../types";
import { useCallback, useEffect, useRef } from "react";
import { getDraftKey } from "../utility";
import { useDebouncedCallback } from "use-debounce";
import { Draft } from "../types";

type SaveGuideDraftParams = {
    userId: number;
    payload: Guide;
    draftKey: string;
};


export const useAutoSaveDraft = (draftKey: string | null) => {
  const queryClient = useQueryClient();
    const mutation = useMutation({
      mutationFn: ({ userId, payload, draftKey }: { userId: number; payload: Guide; draftKey: string }) =>
        DraftApiService.saveDraft(userId, payload, draftKey),
      onSuccess: (savedDraft) => {
        // Update cache only if the draft data actually changed
        queryClient.setQueryData(['userDrafts', 1], (old: Partial<Draft>[] = []) => {
          const draftIndex = old.findIndex(d => d.draftKey === savedDraft.draftKey);
          
          // If draft not found, return old (shouldn't happen, but safe)
          if (draftIndex === -1) return old;
          
          const existingDraft = old[draftIndex];
          
          // Check if name or updatedAt actually changed
          const nameChanged = existingDraft.name !== savedDraft.name;
          const updatedAtChanged = existingDraft.updatedAt?.toString() !== savedDraft.updatedAt?.toString();
          
          // If nothing changed, return the same reference (prevents rerender)
          if (!nameChanged && !updatedAtChanged) {
            return old;
          }
          
          // Only create new array if something changed
          const updated = [...old];
          updated[draftIndex] = {
            ...existingDraft,
            name: savedDraft.name,
            updatedAt: savedDraft.updatedAt,
          };
          
          return updated;
        });
        // Don't invalidate - we've already updated the cache optimistically
        // This prevents unnecessary refetches and rerenders
      },
    });

    
  
    const autosave = useDebouncedCallback(
      (payload: Guide) => {
        if (!draftKey) return;
        mutation.mutate({ userId: 1, payload, draftKey });
      },
      1000,
      // 👇 THIS MATTERS
      { maxWait: 2000 }
    );
  
    // Cancel pending saves when switching drafts
    useEffect(() => {
      autosave.cancel();
      mutation.reset();
    }, [draftKey]);
  
    return { autosave };
  };

  export const useGetDraft = (draftKey: string) =>
    useQuery({
      queryKey: ['draft', draftKey],
      queryFn: () => DraftApiService.getDraft(draftKey),
      enabled: !!draftKey,
      staleTime: 0,
      refetchOnMount: 'always',     // 🔑
      refetchOnWindowFocus: false,
    });

    
export const useGetUserDrafts = (userId: number) => {
    const query = useQuery({
        queryKey: ['userDrafts', userId],
        queryFn: () => DraftApiService.getUserDrafts(userId),
        staleTime: 0, // Always consider data stale
        gcTime: 0, // Don't cache data
        refetchOnMount: 'always', // Always refetch when component mounts
        refetchOnWindowFocus: true, // Refetch when window regains focus
        refetchOnReconnect: true, // Refetch when network reconnects
        // React Query uses structural sharing by default - it will only update if data reference changes
    });
    return query;
};