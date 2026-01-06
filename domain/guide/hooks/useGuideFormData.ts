import { useGuideMetaData } from "../context/GuideMetaData/Provider";
import { useGuideSection } from "../context/GuideSection/Provider"
import { useGuideBiblicalReferencesLists } from "../context/GuideBiblicalReferencesLists/Provider";
import { BiblicalReference } from "@/domain/guide/types";
import { GuideSection } from "@/domain/guide/types";
import { useCallback, useMemo, useState } from "react";
import { useAutoSaveDraft } from "../../guide-draft/hooks/useDraftsApi";
import { useEffect } from "react";
import { useGuideBiblicalReferences } from "../context/GuideBiblicalReferences/Provider";
import { usePublishDraft } from "../../guide-draft/hooks/useDraftsApi";
import { useRouter } from "next/navigation";

export type GuideFormData = {
    name: string;
    description: string;
    isPublic: boolean;
    biblicalReferences: BiblicalReference[];
    guideSections: GuideSection[];
};

export type ValidationErrors = {
    name?: string;
    description?: string;
};

export function useGuideFormData(draftKey: string) {
    const metaData = useGuideMetaData();
    const { getList: getBiblicalReferences, store } = useGuideBiblicalReferencesLists();
    const { mutate: publishGuideMutation } = usePublishDraft(draftKey);
    const router = useRouter();
    
    const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

    const sectionsStore = useGuideSection();

    const mapGuideSections = useCallback((sections: GuideSection[]) => {
        return sections.map((section, index) => ({
            ...section,
            biblicalReferences: getBiblicalReferences(`SECTION_${index}`),
            ordinalPosition: index + 1
        }));
    }, [getBiblicalReferences]);

    const guideFormData = useMemo<GuideFormData>(() => ({
        name: metaData.name,
        description: metaData.description,
        isPublic: metaData.isPublic,
        biblicalReferences: getBiblicalReferences('GUIDE'),
        guideSections: mapGuideSections(sectionsStore.guideSections),
        authorId: 1,
      }), [
        metaData.name,
        metaData.description,
        metaData.isPublic,
        sectionsStore.guideSections,
        store, // Include store so guideFormData updates when biblical references change
        getBiblicalReferences, // Include function dependency (it depends on store)
        mapGuideSections
      ]);
      


    const { autosave } = useAutoSaveDraft(draftKey);

    useEffect(() => {
        autosave(guideFormData);
    }, [guideFormData, autosave]);

    const submitGuide = useCallback(() => {
        // console.log('Guide data:', guideFormData);
        // TODO: Implement API call to submit guide
    }, [guideFormData]);

    const validateForm = useCallback((data: GuideFormData): ValidationErrors => {
        const errors: ValidationErrors = {};
        
        if (!data.name || data.name.trim() === '') {
            errors.name = 'Name is required';
        }
        
        if (!data.description || data.description.trim() === '') {
            errors.description = 'Description is required';
        }
        
        return errors;
    }, []);

    const publishGuide = useCallback(() => {
        const errors = validateForm(guideFormData);
        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return;
        }
        setValidationErrors({});
        publishGuideMutation();
    }, [publishGuideMutation, guideFormData, validateForm, router]);

    // Clear validation errors when fields are updated
    useEffect(() => {
        if (validationErrors.name && metaData.name.trim() !== '') {
            setValidationErrors(prev => {
                const { name, ...rest } = prev;
                return rest;
            });
        }
    }, [metaData.name, validationErrors.name]);

    useEffect(() => {
        if (validationErrors.description && metaData.description.trim() !== '') {
            setValidationErrors(prev => {
                const { description, ...rest } = prev;
                return rest;
            });
        }
    }, [metaData.description, validationErrors.description]);

    return {
        guideFormData,
        submitGuide,
        publishGuide,
        validationErrors,
    };
}