import { useCallback } from "react";
import { GuideApiService } from "../api";
import { Guide } from "../types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


export function useGuideApi() {
   const mutation = useMutation({
    mutationFn: (guide: Guide) => GuideApiService.publishGuide(guide),
   });

   return mutation;
}

export function useGetGuides() {
    const query = useQuery({
        queryKey: ['guides'],
        queryFn: () => GuideApiService.getGuides(),
    });
    return query;
}

export function useDeleteGuide() {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: (guideId: number) => GuideApiService.deleteGuide(guideId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['guides'] });
        },
    });
    return mutation;
}