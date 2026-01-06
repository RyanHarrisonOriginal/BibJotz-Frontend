import { createContext, useContext, useState, useEffect, useRef, useMemo } from "react";
import { useCallback } from "react";
  
const GuideMetaDataContext = createContext<GuideMetaDataContextType | undefined>(undefined);

type GuideMetaDataSnapshot = {
    name: string;
    description: string;
    isPublic: boolean;
}

type GuideMetaDataContextType = {
    name: string;
    description: string;
    isPublic: boolean;
    updateName: (name: string) => void;
    updateDescription: (description: string) => void;
    setIsPublic: (isPublic: boolean) => void;
    reset: () => void;
    applySnapshot: (snapshot: GuideMetaDataSnapshot) => void;
}

export function GuideMetaDataProvider({ children }: { children: React.ReactNode }) {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [isPublic, setIsPublic] = useState(true);


    const updateName = useCallback((name: string) => {
        setName(name);
    }, []);

    const updateDescription = useCallback((description: string) => {
        setDescription(description);
    }, []);

    const reset = useCallback(() => {
        setName(prev => prev === '' ? prev : '');
        setDescription(prev => prev === '' ? prev : '');
        setIsPublic(prev => prev === true ? prev : true);
    }, []);

    const applySnapshot = useCallback((s: GuideMetaDataSnapshot) => {
        setName(prev => prev === s.name ? prev : s.name);
        setDescription(prev => prev === s.description ? prev : s.description);
        setIsPublic(prev => prev === s.isPublic ? prev : s.isPublic);
    }, []);

    // setIsPublic from useState is stable, but we don't need it in dependencies
    // Only include the actual state values and callbacks
    const value = useMemo(
        () => ({
            name, 
            description, 
            isPublic, 
            updateName, 
            updateDescription, 
            setIsPublic, 
            reset, 
            applySnapshot 
        }),
        [name, description, isPublic, updateName, updateDescription, reset, applySnapshot]
    );

    return (
        <GuideMetaDataContext.Provider value={value}>
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