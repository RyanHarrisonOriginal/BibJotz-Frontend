import { useState, useCallback } from 'react';
import { GuideSection, BiblicalReference } from '@/features/guide/types';
import { getDraftKey } from '../../drafts/utility';
import { useGetDraft } from '../../drafts/hooks/useDraftsApi';

export type CreateGuideFormData = {
  name: string;
  description: string;
  isPublic: boolean;
  biblicalReferences: BiblicalReference[];
  guideSections: GuideSection[];
};

export function useCreateGuideForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [biblicalReferences, setBiblicalReferences] = useState<BiblicalReference[]>([]);


  const [guideSections, setGuideSections] = useState<GuideSection[]>([
    {
      title: '',
      description: '',
      ordinalPosition: 1,
      biblicalReferences: [{ book: '', chapter: 1, startVerse: 1, endVerse: 1 }],
    },
  ]);
  const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set());

  // Title and description handlers
  const handleNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }, []);

  const handleDescriptionChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  }, []);

  // Biblical reference handlers
  const addReference = useCallback((reference: BiblicalReference) => {
    setBiblicalReferences((prev) => [...prev, reference]);
  }, []);

  const addBiblicalReferences = useCallback((references: BiblicalReference[]) => {
    // console.log('References:', references.flat());
    setBiblicalReferences((prev) => [...prev, ...references.flat()]);
  }, []);

  const removeReference = useCallback((index: number) => {
    setBiblicalReferences((prev) => {
      if (prev.length > 0) {
        return prev.filter((_, i) => i !== index);
      }
      return prev;
    });
  }, []);

  const updateGuideReference = useCallback((index: number, field: keyof BiblicalReference, value: string | number) => {
    setBiblicalReferences((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  }, []);

  // Section handlers
  const addSection = useCallback(() => {
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

  const removeSection = useCallback((index: number) => {
    setGuideSections((prev) => {
      if (prev.length > 1) {
        return prev.filter((_, i) => i !== index);
      }
      return prev;
    });
  }, []);

  const updateSection = useCallback((index: number, field: 'title' | 'description', value: string) => {
    setGuideSections((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  }, []);

  // Section reference handlers
  const addSectionReference = useCallback((sectionIndex: number) => {
    setGuideSections((prev) => {
      const updated = [...prev];
      updated[sectionIndex].biblicalReferences.push({ book: '', chapter: 1, startVerse: 1, endVerse: 1 });
      return updated;
    });
  }, []);

  const removeSectionReference = useCallback((sectionIndex: number, refIndex: number) => {
    setGuideSections((prev) => {
      const updated = [...prev];
      if (updated[sectionIndex].biblicalReferences.length > 1) {
        updated[sectionIndex].biblicalReferences = updated[sectionIndex].biblicalReferences.filter((_, i) => i !== refIndex);
      }
      return updated;
    });
  }, []);

  const updateSectionReference = useCallback((sectionIndex: number, refIndex: number, field: keyof BiblicalReference, value: string | number) => {
    setGuideSections((prev) => {
      const updated = [...prev];
      updated[sectionIndex].biblicalReferences[refIndex] = {
        ...updated[sectionIndex].biblicalReferences[refIndex],
        [field]: value,
      };
      return updated;
    });
  }, []);

  const toggleSectionReferences = useCallback((sectionIndex: number) => {
    setExpandedSections((prev) => {
      const updated = new Set(prev);
      if (updated.has(sectionIndex)) {
        updated.delete(sectionIndex);
      } else {
        updated.add(sectionIndex);
      }
      return updated;
    });
  }, []);

  // Form submission
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const formData: CreateGuideFormData = {
      name,
      description,
      isPublic,
      biblicalReferences,
      guideSections,
    };
    // console.log('Guide data:', formData);
    // TODO: Implement API call to submit guide
  }, [name, description, isPublic, biblicalReferences, guideSections]);

  const handlePublish = useCallback(() => {
    const syntheticEvent = {
      preventDefault: () => {},
    } as React.FormEvent;
    handleSubmit(syntheticEvent);
  }, [handleSubmit]);

  return {
    // State
    name,
    description,
    isPublic,
    biblicalReferences,
    guideSections,
    expandedSections,
    
    // Setters
    setName,
    setDescription,
    setIsPublic,
    
    // Handlers
    handleNameChange,
    addBiblicalReferences,
    handleDescriptionChange,
    addReference,
    removeReference,
    updateGuideReference,
    addSection,
    removeSection,
    updateSection,
    addSectionReference,
    removeSectionReference,
    updateSectionReference,
    toggleSectionReferences,
    handleSubmit,
    handlePublish,
  };
}

