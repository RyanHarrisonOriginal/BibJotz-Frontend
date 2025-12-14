// hooks/useReferenceList.ts

import { useGuideBiblicalReferencesLists } from "../context/GuideBiblicalReferencesLists/Provider";
import { BiblicalReference } from "@/features/guide/types";

export function useGuideBiblicalReferenceList(key: string) {
  const { biblicalReferencesLists } = useGuideBiblicalReferencesLists();

  return {
    references: biblicalReferencesLists.getList(key),
    add: (ref: BiblicalReference) => biblicalReferencesLists.add(key, ref),
    remove: (index: number) => biblicalReferencesLists.remove(key, index),
    update: (idx: number, field: keyof BiblicalReference, value: string | number) => biblicalReferencesLists.update(key, idx, field, value),
    batchAdd: (refs: BiblicalReference[]) => biblicalReferencesLists.batchAdd(key, refs),
  };
}
