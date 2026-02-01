import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { JourneyApiService } from "../api";
import { CreateJourneyPayload, Journey } from "../types";

const JOURNEYS_QUERY_KEY = ["journeys"] as const;

export function useCreateJourneyMutation() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: CreateJourneyPayload) =>
      JourneyApiService.createJourney(payload),
    onSuccess: (_data: Journey) => {
      queryClient.invalidateQueries({ queryKey: JOURNEYS_QUERY_KEY });
      router.push("/guides");
    },
    onError: (error) => {
      console.error("Failed to create journey:", error);
    },
  });
}
