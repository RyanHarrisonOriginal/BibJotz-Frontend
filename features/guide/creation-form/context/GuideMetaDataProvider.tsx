import { createContext, useContext, useState } from "react";
import { useCallback } from "react";

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

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [isPublic, setIsPublic] = useState(true);

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