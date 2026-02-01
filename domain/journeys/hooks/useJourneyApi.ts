/**
 * Journey API: single entry point for all journey operations (mutations + queries).
 *
 * Project standard: each domain has one entry-point API hook that exposes all
 * mutations and queries. Prefer useJourneyApi() and use .mutations (and .queries when added).
 */

import { useCreateJourneyMutation } from "./mutations";

export function useJourneyApi() {
  const createJourneyMutation = useCreateJourneyMutation();

  return {
    mutations: {
      createJourney: createJourneyMutation,
    },
  };
}

// --- Re-export individual hooks ---

export { useCreateJourneyMutation } from "./mutations";
