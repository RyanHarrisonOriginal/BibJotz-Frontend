import { createContext, useContext, useEffect, useRef, useState } from "react";
import { BiblicalReference } from "@/features/guide/types";

const GuideBiblicalReferencesContext = createContext<GuideBiblicalReferencesContextType | undefined>(undefined);

type GuideBiblicalReferencesContextType = {
}

export function GuideBiblicalReferencesProvider({ children }: { children: React.ReactNode }) {

    const [biblicalReferences, setBiblicalReferences] = useState<BiblicalReference[]>([]);

    const addBiblicalRef = (ref: BiblicalReference) => setBiblicalReferences((prev) => [...prev, ref]);
    const addBiblicalRefs = (refs: BiblicalReference[]) => setBiblicalReferences((prev) => [...prev, ...refs]);
    const removeBiblicalRef = (index: number) => setBiblicalReferences((prev) => prev.filter((_, i) => i !== index));
    const updateGuideReference = (index: number, field: keyof BiblicalReference, value: string | number) => {
        setBiblicalReferences((prev) => {
          const updated = [...prev];
          updated[index] = { ...updated[index], [field]: value };
          return updated;
        });
      };

    return (
        <GuideBiblicalReferencesContext.Provider 
        value={{ biblicalReferences, addBiblicalRef, addBiblicalRefs, removeBiblicalRef, updateGuideReference }}>
            {children}
        </GuideBiblicalReferencesContext.Provider>
    )
}

export function useGuideBiblicalReferences() {
    const context = useContext(GuideBiblicalReferencesContext);
    if (!context) {
        throw new Error('useGuideBiblicalReferences must be used within a GuideBiblicalReferencesProvider');
    }
    return context;
}