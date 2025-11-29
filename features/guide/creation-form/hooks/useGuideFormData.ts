import { useGuideMetaData } from "../context/GuideMetaDataProvider";
import { useGuideSection } from "../context/GuideSectionProvider"
import { useGuideBiblicalReferencesLists } from "../context/GuideBiblicalReferencesListsProvider";
import { BiblicalReference } from "../components/BiblicalReferenceList";
import { GuideSection } from "../components/GuideSections";
import { useCallback } from "react";

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

    const biblicalReferences = biblicalReferencesLists.getList('GUIDE');

    const guideFormData: GuideFormData = {
        name,
        description,
        isPublic,
        biblicalReferences,
        guideSections,
    };

    const submitGuide = useCallback(() => {
        console.log('Guide data:', guideFormData);
        // TODO: Implement API call to submit guide
    }, [guideFormData]);

    const publishGuide = useCallback(() => {
        console.log('Guide data:', guideFormData);
        // TODO: Implement API call to publish guide
    }, [submitGuide]);

    return {
        guideFormData,
        submitGuide,
        publishGuide,
    };
}