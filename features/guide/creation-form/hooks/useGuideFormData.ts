import { useGuideMetaData } from "../context/GuideMetaData/Provider";
import { useGuideSection } from "../context/GuideSection/Provider"
import { useGuideBiblicalReferencesLists } from "../context/GuideBiblicalReferencesLists/Provider";
import { BiblicalReference } from "@/features/guide/types";
import { GuideSection } from "@/features/guide/types";
import { useCallback, useMemo } from "react";
import { useAutoSaveDraft } from "../../drafts/hooks/useDraftsApi";
import { useEffect } from "react";
import { useGuideBiblicalReferences } from "../context/GuideBiblicalReferences/Provider";

export type GuideFormData = {
    name: string;
    description: string;
    isPublic: boolean;
    biblicalReferences: BiblicalReference[];
    guideSections: GuideSection[];
};

export function useGuideFormData(draftKey: string) {
    const metaData = useGuideMetaData();
    const { getList: getBiblicalReferences, store } = useGuideBiblicalReferencesLists();

    const sectionsStore = useGuideSection();

    const guideFormData = useMemo<GuideFormData>(() => ({
        name: metaData.name,
        description: metaData.description,
        isPublic: metaData.isPublic,
        biblicalReferences: getBiblicalReferences('GUIDE'),
        guideSections: sectionsStore.guideSections.map((section, index) => ({
          ...section,
          biblicalReferences: getBiblicalReferences(`SECTION_${index}`)
        })),
      }), [
        metaData.name,
        metaData.description,
        metaData.isPublic,
        sectionsStore.guideSections,
        store, // Include store so guideFormData updates when biblical references change
        getBiblicalReferences // Include function dependency (it depends on store)
      ]);
      


    const { autosave } = useAutoSaveDraft(draftKey);

    useEffect(() => {
        autosave(guideFormData);
    }, [guideFormData, autosave]);

    const submitGuide = useCallback(() => {
        // console.log('Guide data:', guideFormData);
        // TODO: Implement API call to submit guide
    }, [guideFormData]);

    const publishGuide = useCallback(() => {
        // console.log('Guide data:', guideFormData);
        // TODO: Implement API call to publish guide
    }, [submitGuide]);

    return {
        guideFormData,
        submitGuide,
        publishGuide,
    };
}