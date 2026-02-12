import { useMutation } from "@tanstack/react-query";
import { ReflectionApiService } from "../api";

export type SaveReflectionParams = {
  entry_key: string;
  journey_id: string;
  guide_section_id: string;
  content: string;
  author_id: number;
};

export function useSaveReflectionMutation() {
  return useMutation({
    mutationFn: (params: SaveReflectionParams) =>
      ReflectionApiService.saveReflection(params),
  });
}

/** Uses PUT upsert endpoint (idempotent). Use for debounced save. */
export function useUpsertReflectionMutation() {
  return useMutation({
    mutationFn: (params: SaveReflectionParams) =>
      ReflectionApiService.upsertReflection(params),
  });
}
