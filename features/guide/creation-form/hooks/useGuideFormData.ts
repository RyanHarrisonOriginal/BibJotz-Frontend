import { useGuideMetaData } from "../context/GuideMetaData/Provider";
import { useGuideSection } from "../context/GuideSection/Provider"
import { useGuideBiblicalReferencesLists } from "../context/GuideBiblicalReferencesLists/Provider";
import { BiblicalReference } from "@/features/guide/types";
import { GuideSection } from "@/features/guide/types";
import { useCallback } from "react";
import { useAutoSaveDraft, useGetDraft } from "../../drafts/hooks/useDraftsApi";
import { useEffect } from "react";
import { getDraftKey } from "../../drafts/utility";

export type GuideFormData = {
    name: string;
    description: string;
    isPublic: boolean;
    biblicalReferences: BiblicalReference[];
    guideSections: GuideSection[];
};

export function useGuideFormData() {
    const { name, description, isPublic } = useGuideMetaData();
    const { biblicalReferencesLists } = useGuideBiblicalReferencesLists();
    const { guideSections } = useGuideSection();



    const guideFormData: GuideFormData = {
        name,
        description,
        isPublic,
        biblicalReferences: biblicalReferencesLists.getList('GUIDE'),
        guideSections: guideSections.map((section, index) => ({
            ...section,
            biblicalReferences: biblicalReferencesLists.getList(`SECTION_${index}`)
        })),
    };

    // console.log('Guide form data:', guideFormData);
    // console.log('Biblical references:', biblicalReferencesLists.getList('SECTION_0'));
    // console.log('Biblical references:', biblicalReferencesLists.getList('SECTION_1'));


    const { autoSave, isSaving, error } = useAutoSaveDraft();

    useEffect(() => {
        autoSave(guideFormData);
    }, [guideFormData]);

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