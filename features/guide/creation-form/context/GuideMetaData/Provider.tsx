import { createContext, useContext, useState, useEffect, useRef } from "react";
import { useCallback } from "react";
import { useGetDraft } from "../../../drafts/hooks/useDraftsApi";
import { getDraftKey } from "../../../drafts/utility";

const GuideMetaDataContext = createContext<GuideMetaDataContextType | undefined>(undefined);

type GuideMetaDataContextType = {
    name: string;
    description: string;
    isPublic: boolean;
    updateName: (name: string) => void;
    updateDescription: (description: string) => void;
    setIsPublic: (isPublic: boolean) => void;
}

export function GuideMetaDataProvider({ children }: { children: React.ReactNode }) {

    const { data: draft, isSuccess } = useGetDraft(getDraftKey('GUIDE'));
    const hasLoadedInitialDraft = useRef(false);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [isPublic, setIsPublic] = useState(true);

    // Reset the flag when component mounts (page navigation)
    useEffect(() => {
        hasLoadedInitialDraft.current = false;
    }, []);

    // Load draft data from DB only once when it's first successfully fetched after mount
    // The query is invalidated on page mount, ensuring fresh data from DB
    useEffect(() => {
        if (isSuccess && draft?.draftContent && !hasLoadedInitialDraft.current) {
            setName(draft.draftContent.name || '');
            setDescription(draft.draftContent.description || '');
            setIsPublic(draft.draftContent.isPublic ?? true);
            hasLoadedInitialDraft.current = true;
        }
    }, [isSuccess, draft]);

    const updateName = useCallback((name: string) => {
        setName(name);
    }, []);

    const updateDescription = useCallback((description: string) => {
        setDescription(description);
    }, []);

    return (
        <GuideMetaDataContext.Provider 
            value={{ 
                name, description, isPublic, 
                updateName, updateDescription, setIsPublic }}>
            {children}
        </GuideMetaDataContext.Provider>
    )

}

export function useGuideMetaData() {
    const context = useContext(GuideMetaDataContext);
    if (!context) {
        throw new Error('useGuideMetaData must be used within a GuideMetaDataProvider');
    }
    return context;
}