import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { GuideSection } from "@/features/guide/types";
import { BiblicalReference } from "@/features/guide/types";

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
    reset: () => void;
    applySnapshot: (snapshot: GuideSection[]) => void;
}

export function GuideSectionProvider({ children }: { children: React.ReactNode }) {
    const blankSection: GuideSection = {
      title: '',
      description: '',
      ordinalPosition: 1,
      biblicalReferences: [],
    };
  
    const [guideSections, setGuideSections] = useState<GuideSection[]>([blankSection]);
    const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set());
  
    /* ---------------- actions ---------------- */
  
    const add = useCallback(() => {
      setGuideSections(prev => [...prev, { ...blankSection }]);
    }, []);
  
    const remove = useCallback((index: number) => {
      setGuideSections(prev => prev.filter((_, i) => i !== index));
    }, []);
  
    const update = useCallback((index: number, field: 'title' | 'description', value: string) => {
      setGuideSections(prev =>
        prev.map((s, i) => i === index ? { ...s, [field]: value } : s)
      );
    }, []);
  
    /* -------- biblical reference actions -------- */
  
    const addBiblicalReference = useCallback((index: number) => {
      setGuideSections(prev =>
        prev.map((s, i) =>
          i === index
            ? {
                ...s,
                biblicalReferences: [
                  ...s.biblicalReferences,
                  { book: '', chapter: 1, startVerse: 1, endVerse: 1 },
                ],
              }
            : s
        )
      );
    }, []);
  
    const addBiblicalReferences = useCallback((index: number, references: BiblicalReference[]) => {
      setGuideSections(prev =>
        prev.map((s, i) =>
          i === index
            ? { ...s, biblicalReferences: [...s.biblicalReferences, ...references] }
            : s
        )
      );
    }, []);
  
    const removeBiblicalReference = useCallback((index: number, refIndex: number) => {
      setGuideSections(prev =>
        prev.map((s, i) =>
          i === index
            ? {
                ...s,
                biblicalReferences: s.biblicalReferences.filter((_, r) => r !== refIndex),
              }
            : s
        )
      );
    }, []);
  
    const updateBiblicalReference = useCallback((index: number, refIndex: number, field: keyof BiblicalReference, value: string | number) => {
      setGuideSections(prev =>
        prev.map((s, i) =>
          i === index
            ? {
                ...s,
                biblicalReferences: s.biblicalReferences.map((r, ri) =>
                  ri === refIndex ? { ...r, [field]: value } : r
                ),
              }
            : s
        )
      );
    }, []);
  
    const toggleReferences = useCallback((index: number) => {
      setExpandedSections(prev => {
        const next = new Set(prev);
        next.has(index) ? next.delete(index) : next.add(index);
        return next;
      });
    }, []);
  
    /* ---------------- hydration ---------------- */
  
    const reset = useCallback(() => {
      setGuideSections(prev =>
        prev.length === 1 && prev[0].title === '' ? prev : [blankSection]
      );
      setExpandedSections(prev => (prev.size === 0 ? prev : new Set()));
    }, []);
  
    const applySnapshot = useCallback((sections: GuideSection[]) => {
      setGuideSections(prev =>
        prev === sections ? prev : sections.length ? sections : [blankSection]
      );
    }, []);
  
    /* ---------------- provider value ---------------- */
  
    const value = useMemo(
      () => ({
        guideSections,
        expandedSections,
        guideSectionActions: { add, remove, update },
        guideBiblicalReferenceActions: {
          addBiblicalReference,
          addBiblicalReferences,
          removeBiblicalReference,
          updateBiblicalReference,
          toggleReferences,
        },
        reset,
        applySnapshot,
      }),
      [
        guideSections,
        expandedSections,
        add,
        remove,
        update,
        addBiblicalReference,
        addBiblicalReferences,
        removeBiblicalReference,
        updateBiblicalReference,
        toggleReferences,
        reset,
        applySnapshot,
      ]
    );
  
    return (
      <GuideSectionContext.Provider value={value}>
        {children}
      </GuideSectionContext.Provider>
    );
  }
  
export function useGuideSection() {
    const context = useContext(GuideSectionContext);
    if (!context) {
        throw new Error('useGuideSection must be used within a GuideSectionProvider');
    }
    return context;
}