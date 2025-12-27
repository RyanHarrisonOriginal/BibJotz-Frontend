import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DraftApiService } from "../api";
import { Guide } from "../../types";
import { useCallback, useEffect, useRef } from "react";
import { getDraftKey } from "../utility";
import { useDebouncedCallback } from "use-debounce";
import { Draft } from "../types";
import { useRouter } from "next/navigation";

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
      queryClient.setQueryData(['userDrafts', 1], (old: Partial<Draft>[] = []) => {
        const draftIndex = old.findIndex(d => d.draftKey === savedDraft.draftKey);
        if (draftIndex === -1) return old;
        const existingDraft = old[draftIndex];
        const nameChanged = existingDraft.name !== savedDraft.name;
        const updatedAtChanged = existingDraft.updatedAt?.toString() !== savedDraft.updatedAt?.toString();
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
      });
    },
  });
  const autosave = useDebouncedCallback(
    (payload: Guide) => {
      if (!draftKey) return;
      mutation.mutate({ userId: 1, payload, draftKey });
    },
    1000,
    { maxWait: 2000 }
  );
  useEffect(() => {
    autosave.cancel();
    mutation.reset();
  }, [draftKey]);

  return { autosave };
};

export const usePublishDraft = (draftKey: string) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: () => {
      console.log('Publishing draft:', draftKey);
      return DraftApiService.publishDraft(draftKey);
    },
    onSuccess: () => {
      console.log('Draft published successfully:', draftKey);
      queryClient.setQueryData(['userDrafts', 1], (old: Partial<Draft>[] = []) => {
        const filtered = old.filter(d => d.draftKey !== draftKey);
        if (filtered.length === old.length) {
          return old;
        }
        return filtered;
      });
      router.push('/guides');
    },
    onError: (error) => {
      console.error('Failed to publish draft:', error);
    },
  });
  return mutation;
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