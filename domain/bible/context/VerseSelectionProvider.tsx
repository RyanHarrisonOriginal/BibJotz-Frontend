import { createContext, useContext, useMemo } from "react";
import { SelectedReadingPanelVerse } from "../components/BibleReader/types";
import { useVerseSelection } from "../hooks/useVerseSelection";

type VerseSelectionContextType = {
    verseSelection: { 
        data: SelectedReadingPanelVerse[], 
        meta: { 
            rangeStart: SelectedReadingPanelVerse | null, 
        }, 
        actions: { 
            toggleVerse: (verse: SelectedReadingPanelVerse, isShiftKey: boolean) => void, 
            clear: () => void,
            remove: (verse: SelectedReadingPanelVerse) => void,
        };
    };
    selectors: {
        isVerseSelected: (verse: SelectedReadingPanelVerse) => boolean;
    };
    version: number;
}

const VerseSelectionContext = createContext<VerseSelectionContextType | undefined>(undefined);

export function VerseSelectionProvider({ children }: { children: React.ReactNode }) {

    const { verseSelection, selectors, version } = useVerseSelection();
    
    // Memoize context value to prevent unnecessary re-renders
    const contextValue = useMemo(() => ({
        verseSelection,
        selectors,
        version,
    }), [verseSelection, selectors, version]);
    
    return (
        <VerseSelectionContext.Provider value={contextValue}>
            {children}
        </VerseSelectionContext.Provider>
    );
}


export function useVerseSelectionContext() {
    const context = useContext(VerseSelectionContext);
    if (!context) {
        throw new Error('useVerseSelection must be used within a VerseSelectionProvider');
    }
    return context;
}
