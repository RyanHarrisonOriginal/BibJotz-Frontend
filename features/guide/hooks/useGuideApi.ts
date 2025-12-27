import { useCallback } from "react";
import { GuideApiService } from "../api";
import { Guide } from "../types";
import { useMutation, useQuery } from "@tanstack/react-query";


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