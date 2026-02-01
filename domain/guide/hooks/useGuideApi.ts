/**
 * Guide API: single entry point for all guide operations (mutations + queries).
 *
 * Project standard: each domain has one entry-point API hook that exposes all
 * mutations and queries. Prefer useGuideApi() and use .mutations and .queries.
 */

import { usePublishGuideMutation, useDeleteGuideMutation } from "./mutations";
import { useGetGuides, useGetGuideOptions } from "./queries";

export function useGuideApi() {
  const publishGuideMutation = usePublishGuideMutation();
  const deleteGuideMutation = useDeleteGuideMutation();
  const guidesQuery = useGetGuides();
  const guideOptionsQuery = useGetGuideOptions();

  return {
    mutations: {
      publishGuide: publishGuideMutation,
      deleteGuide: deleteGuideMutation,
    },
    queries: {
      guides: guidesQuery,
      guideOptions: guideOptionsQuery,
    },
  };
}

// --- Backward compatibility: re-export individual hooks ---

export { usePublishGuideMutation, useDeleteGuideMutation } from "./mutations";
export { useGetGuides, useGetGuideOptions } from "./queries";
export { useDeleteGuideMutation as useDeleteGuide } from "./mutations";
