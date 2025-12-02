// context/ReferenceListsProvider.tsx
import { createContext, useContext, useState, useCallback } from "react";
import { BiblicalReference } from "../components/BiblicalReference/BiblicalReferenceList";

type GuideBiblicalReferencesListsStore = Record<string, BiblicalReference[]>;

type GuideBiblicalReferencesListsContextValue = {
  biblicalReferencesLists: {
    getList: (key: string) => BiblicalReference[];
    add: (key: string, ref: BiblicalReference) => void;
    remove: (key: string, index: number) => void;
    update: (key: string, index: number, field: keyof BiblicalReference, value: any) => void;
    batchAdd: (key: string, refs: BiblicalReference[]) => void;
  };
};

const GuideBiblicalReferencesListsContext = createContext<GuideBiblicalReferencesListsContextValue | null>(null);

export function GuideBiblicalReferencesListsProvider({ children }: { children: React.ReactNode }) {
  const [store, setStore] = useState<GuideBiblicalReferencesListsStore>({});

  const getList = useCallback(
    (key: string) => store[key] ?? [],
    [store]
  );

  const setList = (key: string, updater: (prev: BiblicalReference[]) => BiblicalReference[]) => {
    setStore(prev => ({
      ...prev,
      [key]: updater(prev[key] ?? []),
    }));
  };

  const add = useCallback((key: string, ref: BiblicalReference) => {
    setList(key, prev => [...prev, ref]);
  }, []);

  const batchAdd = useCallback((key: string, refs: BiblicalReference[]) => {
    setList(key, prev => [...prev, ...refs.flat()]);
  }, []);

  const remove = useCallback((key: string, index: number) => {
    setList(key, prev => prev.filter((_, i) => i !== index));
  }, []);

  const update = useCallback(
    (key: string, index: number, field: keyof BiblicalReference, value: any) => {
      setList(key, prev => {
        const copy = [...prev];
        copy[index] = { ...copy[index], [field]: value };
        return copy;
      });
    },
    []
  );

  return (
    <GuideBiblicalReferencesListsContext.Provider value={{ biblicalReferencesLists: { getList, add, remove, update, batchAdd } }}>
      {children}
    </GuideBiblicalReferencesListsContext.Provider>
  );
}

export function useGuideBiblicalReferencesLists() {
  const ctx = useContext(GuideBiblicalReferencesListsContext);
  if (!ctx) throw new Error("useGuideBiblicalReferencesLists must be inside GuideBiblicalReferencesListsProvider");
  return ctx;
}
