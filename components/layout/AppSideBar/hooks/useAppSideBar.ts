import { useQueryClient } from "@tanstack/react-query";
import { useSideBar } from "@/components/ui/SideBar/sidebarProvider";
import { useGetUserDrafts } from "@/features/guide/drafts/hooks/useDraftsApi";
import { useMemo, useEffect, useCallback } from "react";
import { createNewDraftKey } from "@/features/guide/drafts/utility";
import { Draft } from "@/features/guide/drafts/types";
import { useRouter } from "next/navigation";
import { DraftApiService } from "@/features/guide/drafts/api";

export const useAppSideBar = () => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const { open } = useSideBar();
  
    const { data: userDrafts = [], refetch: refetchDrafts } = useGetUserDrafts(1);
  
    const memoizedDrafts = useMemo(() => userDrafts, [userDrafts]);
  
    useEffect(() => {
      if (open) {
        refetchDrafts();
      }
    }, [open, refetchDrafts]);
  
    const handleCreateDraft = () => {
      const draftKey = createNewDraftKey("GUIDE");
      if (!draftKey) return; 
      const now = new Date();
      queryClient.setQueryData<Partial<Draft>[]>(['userDrafts', 1], (oldDrafts = []) => {
        const optimisticDraft: Partial<Draft> = {
          id: `temp-${draftKey}`,
          name: '',
          draftKey: draftKey,
          createdAt: now,
          updatedAt: now,
        };
        return [optimisticDraft, ...oldDrafts];
      });
      router.push(`/create-guide?draftKey=${draftKey}`);
    };
  
    const handleDraftClick = useCallback(async (draftKey: string) => {
      queryClient.cancelQueries({ 
        queryKey: ['draft'], 
        predicate: (query) => {
          const queryDraftKey = query.queryKey[1];
          return queryDraftKey !== draftKey;
        }
      });
      await queryClient.fetchQuery({
        queryKey: ['draft', draftKey],
        queryFn: () => DraftApiService.getDraft(draftKey),
      });
      router.push(`/create-guide?draftKey=${draftKey}`);
    }, [queryClient, router]);
    
    return {
        memoizedDrafts,
        handleCreateDraft,
        handleDraftClick,
    };
}