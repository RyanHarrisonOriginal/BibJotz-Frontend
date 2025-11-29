import { createContext, useCallback, useContext, useState } from "react";
import { GuideSection } from "../components/GuideSections";
import { BiblicalReference } from "../components/BiblicalReferenceList";

const GuideSectionContext = createContext<GuideSectionContextType | undefined>(undefined);

type GuideSectionContextType = {
    guideSections: GuideSection[];
    expandedSections: Set<number>;
    guideSectionActions: {
        add: () => void;
        remove: (index: number) => void;
        update: (index: number, field: 'title' | 'description', value: string) => void;
    };
    guideBiblicalReferenceActions: {
        addBiblicalReference: (index: number) => void;
        addBiblicalReferences: (index: number, references: BiblicalReference[]) => void;
        removeBiblicalReference: (index: number, refIndex: number) => void;
        updateBiblicalReference: (index: number, refIndex: number, field: keyof BiblicalReference, value: string | number) => void;
        toggleReferences: (index: number) => void;
    };
}

export function GuideSectionProvider({ children }: { children: React.ReactNode }) {

    const [guideSections, setGuideSections] = useState<GuideSection[]>([
        {
            title: '',
            description: '',
            ordinalPosition: 1,
            biblicalReferences: [{ book: '', chapter: 1, startVerse: 1, endVerse: 1 }],
        },
    ]);

    const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set());

    const add = useCallback(() => {
        setGuideSections((prev) => [
            ...prev,
            {
                title: '',
                description: '',
                ordinalPosition: prev.length + 1,
                biblicalReferences: [{ book: '', chapter: 1, startVerse: 1, endVerse: 1 }],
            },
        ]);
    }, []);

    const remove = useCallback((index: number) => {
        setGuideSections((prev) => prev.filter((_, i) => i !== index));
    }, []);

    const update = useCallback((index: number, field: 'title' | 'description', value: string) => {
        setGuideSections((prev) => {
            const updated = [...prev];
            updated[index] = { ...updated[index], [field]: value };
            return updated;
        });
    }, []);

    const addBiblicalReference = useCallback((index: number) => {
        setGuideSections((prev) => {
            const updated = [...prev];
            updated[index].biblicalReferences.push({ book: '', chapter: 1, startVerse: 1, endVerse: 1 });
            return updated;
        });
    }, []);

    const addBiblicalReferences = useCallback((index: number, references: BiblicalReference[]) => {
        setGuideSections((prev) => {
            const updated = [...prev];
            updated[index].biblicalReferences.push(...references);
            return updated;
        });
    }, []);

    const removeBiblicalReference = useCallback((index: number, refIndex: number) => {
        setGuideSections((prev) => {
            const updated = [...prev];
            updated[index].biblicalReferences = updated[index].biblicalReferences.filter((_, i) => i !== refIndex);
            return updated;
        });
    }, []);

    const updateBiblicalReference = useCallback((
        index: number, refIndex: number, field: keyof BiblicalReference, value: string | number) => {
        setGuideSections((prev) => {
            const updated = [...prev];
            updated[index].biblicalReferences[refIndex] = { ...updated[index].biblicalReferences[refIndex], [field]: value };
            return updated;
        });
    }, []);

    const toggleReferences = useCallback((index: number) => {
        setExpandedSections((prev) => {
            const updated = new Set(prev);
            updated.has(index) ? updated.delete(index) : updated.add(index);
            return updated;
        });
    }, []);

    return (
        <GuideSectionContext.Provider
            value={{
                guideSections,
                expandedSections,
                guideSectionActions: {
                    add,
                    remove,
                    update,
                },
                guideBiblicalReferenceActions: {
                    addBiblicalReference,
                    addBiblicalReferences,
                    removeBiblicalReference,
                    updateBiblicalReference,
                    toggleReferences
                }
            }}>
            {children}
        </GuideSectionContext.Provider>
    )
}

export function useGuideSection() {
    const context = useContext(GuideSectionContext);
    if (!context) {
        throw new Error('useGuideSection must be used within a GuideSectionProvider');
    }
    return context;
}