import { useMutation, useQuery } from "@tanstack/react-query";
import { DraftApiService } from "../api";
import { Guide } from "../../types";
import { useCallback, useEffect, useRef } from "react";
import { getDraftKey } from "../utility";
import { useDebouncedCallback } from "use-debounce";

type SaveGuideDraftParams = {
    userId: number;
    payload: Guide;
    draftKey: string;
};


export const useAutoSaveDraft = () => {

    const draftKeyRef = useRef<string | null>(null);

    useEffect(() => {
        draftKeyRef.current = getDraftKey('GUIDE');
    }, []);

    const mutation = useMutation({
        mutationFn: ({ userId, payload }: { userId: number, payload: Guide }) =>
            DraftApiService.saveDraft(userId, payload, draftKeyRef.current!),
    });

    const autosave = useDebouncedCallback(
        (payload: Guide) => {
            if (!draftKeyRef.current) return;
            mutation.mutate({ userId: 1, payload });
        },
        1000
    );

    // flush on unmount
    useEffect(() => {
        return () => autosave.flush();
    }, []);

    return {
        autoSave: autosave,
        isSaving: mutation.isPending,
        error: mutation.error,
    };
};

export const useGetDraft = (draftKey: string) => {
    const query = useQuery({
        queryKey: ['draft', draftKey],
        queryFn: () => DraftApiService.getDraft(draftKey),
        refetchOnWindowFocus: true,
        refetchOnMount: 'always',
        staleTime: 0,
        gcTime: 0,
    });
    return query;
};

export const useGetUserDrafts = (userId: number) => {
    const query = useQuery({
        queryKey: ['drafts', userId],
        queryFn: () => DraftApiService.getUserDrafts(userId),
    });
    return query;
};