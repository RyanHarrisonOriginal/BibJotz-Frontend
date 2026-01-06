// context/ReferenceListsProvider.tsx
import { createContext, useContext, useState, useCallback, useMemo, useRef, useEffect } from "react";
import { BiblicalReference } from "@/domain/guide/types";

type GuideBiblicalReferencesListsStore = Record<string, BiblicalReference[]>;

type GuideBiblicalReferencesListsContextValue = {
    store: GuideBiblicalReferencesListsStore;
    getList: (key: string) => BiblicalReference[];
    add: (key: string, ref: BiblicalReference) => void;
    remove: (key: string, index: number) => void;
    update: (key: string, index: number, field: keyof BiblicalReference, value: any) => void;
    batchAdd: (key: string, refs: BiblicalReference[]) => void;
    reset: () => void;
    applySnapshot: (snapshot: GuideBiblicalReferencesListsStore) => void;
};

const GuideBiblicalReferencesListsContext = createContext<GuideBiblicalReferencesListsContextValue | null>(null);

export function GuideBiblicalReferencesListsProvider({ children }: { children: React.ReactNode }) {
  const [store, setStore] = useState<GuideBiblicalReferencesListsStore>({});
  const storeRef = useRef(store);
  
  // Keep ref in sync with state
  useEffect(() => {
    storeRef.current = store;
  }, [store]);

  const getList = useCallback(
    (key: string) => store[key] ?? [],
    [store] // Use state so components re-render when store changes
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

  const reset = useCallback(() => {
    setStore(prev => {
      if (Object.keys(prev).length === 0) return prev; // 🔑 NO-OP if already empty
      return {};
    });
  }, []);
  
  const applySnapshot = useCallback((snapshot: GuideBiblicalReferencesListsStore) => {
    setStore(prev => {
       if (prev === snapshot) return prev;
      return snapshot;
    });
  }, []);

  const value = useMemo(() => ({
      getList,
      add,
      remove,
      update,
      batchAdd,
      store,
      reset,
      applySnapshot,
    }), [getList, add, remove, update, batchAdd, store, reset, applySnapshot]);
  

  return (
    <GuideBiblicalReferencesListsContext.Provider value={value}>
      {children}
    </GuideBiblicalReferencesListsContext.Provider>
  );
}

export function useGuideBiblicalReferencesLists() {
  const ctx = useContext(GuideBiblicalReferencesListsContext);
  if (!ctx) throw new Error("useGuideBiblicalReferencesLists must be inside GuideBiblicalReferencesListsProvider");
  return ctx;
}
