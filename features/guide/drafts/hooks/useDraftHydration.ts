import { useEffect, useRef, useMemo } from "react";
import { useGetDraft } from "./useDraftsApi";
import { BiblicalReference, GuideSection } from "@/features/guide/types";
import { GuideDraftSnapshot } from "../types";

type DraftHydrationProps = {
  draftKey: string;
  applySnapshot: (snapshot: GuideDraftSnapshot) => void;
  resetEditor: () => void;
};

const buildSnapshot = (draft: any): GuideDraftSnapshot => {
  console.log('building snapshot', draft);
  const sections: GuideSection[] = draft.draftContent.guideSections ?? [];
  const sectionBiblicalReferences = sections.reduce(
    (acc, section, index) => {
      acc[`SECTION_${index}`] = section.biblicalReferences ?? [];
      return acc;
    },
    {} as Record<string, BiblicalReference[]>
  )

  const snapshot = {
    name: draft.draftContent.name ?? "",
    description: draft.draftContent.description ?? "",
    isPublic: draft.draftContent.isPublic ?? true,
    guideSections: sections,
    biblicalReferences: {
      GUIDE: draft.draftContent.biblicalReferences ?? [],
      ...sectionBiblicalReferences,
    },
  };
  console.log('snapshot', snapshot);
  return snapshot;
};

/**
 * VERY IMPORTANT:
 * This must change whenever the draft meaningfully changes.
 * Prefer server-provided version / updatedAt if you have it.
 */
const getDraftSignature = (draft: any): string => {
  if (!draft?.draftContent) return "";
  //if (draft.updatedAt) return String(draft.updatedAt);
  return JSON.stringify(draft.draftContent);
};

export const useDraftHydration = ({
  draftKey,
  applySnapshot,
  resetEditor,
}: DraftHydrationProps) => {
  const { data: draft, isSuccess } = useGetDraft(draftKey);

  /**
   * Tracks the last hydrated signature per draftKey.
   * This is the real guard.
   */
  const lastHydratedSigRef = useRef<string | null>(null);
  const lastDraftKeyRef = useRef<string | null>(null);

  const draftSignature = useMemo(
    () => getDraftSignature(draft),
    [draft]
  );

  /**
   * Reset editor ONLY when draftKey changes
   */
  useEffect(() => {
    if (lastDraftKeyRef.current !== draftKey) {
      lastDraftKeyRef.current = draftKey;
      lastHydratedSigRef.current = null;
      resetEditor();
    }
  }, [draftKey, resetEditor]);

  /**
   * Hydrate when content meaningfully changes
   */
  useEffect(() => {
    if (!isSuccess) return;
    if (!draft?.draftContent) return;
    if (!draftSignature) return;

    if (lastHydratedSigRef.current === draftSignature) {
      return; // same content, ignore
    }

    applySnapshot(buildSnapshot(draft));
    lastHydratedSigRef.current = draftSignature;
  }, [isSuccess, draft, draftSignature, applySnapshot]);
};
