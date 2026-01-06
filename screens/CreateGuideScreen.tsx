import { CreateGuideHeader } from "@/domain/guide/components/CreationForm/CreateGuideHeader";
import { TitleSectionInput } from "@/domain/guide/components/CreationForm/TitleSectionInput";
import { GuideBiblicalReference } from "@/domain/guide/components/CreationForm/GuideBiblicalReference";
import { GuideSections } from "@/domain/guide/components/CreationForm/GuideSections";

import { useGuideMetaData } from "@/domain/guide/context/GuideMetaData/Provider";
import { useGuideBiblicalReferencesLists } from "@/domain/guide/context/GuideBiblicalReferencesLists/Provider";
import { useGuideSection } from "@/domain/guide/context/GuideSection/Provider";

import { useGuideFormData } from "@/domain/guide/hooks/useGuideFormData";
import { Separator } from "@/components/ui/separator";
import { useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { useDraftHydration } from "@/domain/guide-draft/hooks/useDraftHydration";
import { EntityNotFound } from "@/domain/EntityNotFound";
import { GuideDraftSnapshot } from "@/domain/guide-draft/types";

export default function CreateGuidePage() {

  const searchParams = useSearchParams();
  const draftKey = searchParams.get('draftKey');

  if (!draftKey) {
    return <EntityNotFound entityType="Guide" message="No draft key specified" />;
  }

  const { 
    name, 
    description, 
    isPublic, 
    setIsPublic, 
    reset: resetMetaData, 
    applySnapshot: applyMetaDataSnapshot, 
    updateName, 
    updateDescription 
  } = useGuideMetaData();

  const { 
    getList: getBiblicalReferences, 
    add: addBiblicalReference, 
    remove: removeBiblicalReference, 
    update: updateBiblicalReference, 
    batchAdd: batchAddBiblicalReferences, 
    reset: resetBiblicalReferences, 
    applySnapshot: applyBiblicalReferencesSnapshot 
  } = useGuideBiblicalReferencesLists();
  
  const { 
    guideSections, 
    guideSectionActions, 
    reset: resetSections, 
    applySnapshot: applySectionsSnapshot 
  } = useGuideSection();

  const { submitGuide, publishGuide, validationErrors } = useGuideFormData(draftKey);

  const guideBiblicalReferences = getBiblicalReferences('GUIDE');

  const resetEditor = useCallback(() => {
    resetMetaData();
    resetBiblicalReferences();
    resetSections();
  }, [resetMetaData, resetBiblicalReferences, resetSections]);

  const applySnapshot = useCallback((snapshot: GuideDraftSnapshot) => {
    applyMetaDataSnapshot({
      name: snapshot.name,
      description: snapshot.description,
      isPublic: snapshot.isPublic,
    });
    applyBiblicalReferencesSnapshot(snapshot.biblicalReferences);
    applySectionsSnapshot(snapshot.guideSections);
  }, [applyMetaDataSnapshot, applyBiblicalReferencesSnapshot, applySectionsSnapshot]);

  useDraftHydration({
    draftKey: draftKey,
    applySnapshot: applySnapshot,
    resetEditor: resetEditor,
  });

  return (
    <div className="min-h-screen bg-background">

      <CreateGuideHeader
        isPublic={isPublic}
        onPublicChange={setIsPublic}
        onPublish={publishGuide}
      />

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <form onSubmit={submitGuide} className="space-y-8" suppressHydrationWarning >

          <TitleSectionInput
            name={name}
            description={description}
            updateName={updateName}
            updateDescription={updateDescription}
            errors={validationErrors}
          />

          <Separator />

          <GuideBiblicalReference
            biblicalReferences={guideBiblicalReferences}
            onAddReference={addBiblicalReference.bind(null, 'GUIDE')}
            onRemoveReference={removeBiblicalReference.bind(null, 'GUIDE')}
            onUpdateReference={updateBiblicalReference.bind(null, 'GUIDE')}
            addBiblicalReferences={batchAddBiblicalReferences.bind(null, 'GUIDE')}
          />

          <Separator />

          <GuideSections
            guideSections={guideSections}
            onAddSection={guideSectionActions.add}
            onRemoveSection={guideSectionActions.remove}
            onUpdateSection={guideSectionActions.update}
          />
        </form>
      </div>
    </div>
  );

}