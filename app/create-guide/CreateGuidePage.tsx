import { CreateGuideHeader } from "@/features/guide/creation-form/components/CreateGuideHeader";
import { TitleSectionInput } from "@/features/guide/creation-form/components/TitleSectionInput";
import { GuideBiblicalReference } from "@/features/guide/creation-form/components/GuideBiblicalReference";
import { GuideSections } from "@/features/guide/creation-form/components/GuideSections";

import { useGuideMetaData } from "@/features/guide/creation-form/context/GuideMetaDataProvider";
import { useGuideBiblicalReferencesLists } from "@/features/guide/creation-form/context/GuideBiblicalReferencesListsProvider";
import { useGuideSection } from "@/features/guide/creation-form/context/GuideSectionProvider";

import { useGuideFormData } from "@/features/guide/creation-form/hooks/useGuideFormData";
import { Separator } from "@/components/ui/separator";

export default function CreateGuidePage() {

    const { name, description , isPublic, setIsPublic, updateName, updateDescription} = useGuideMetaData();
    const { biblicalReferencesLists } = useGuideBiblicalReferencesLists();
    const { guideSections, expandedSections, guideSectionActions, guideBiblicalReferenceActions } = useGuideSection();
    const { submitGuide, publishGuide } = useGuideFormData();
    const biblicalReferences = biblicalReferencesLists.getList('GUIDE');

    return (
        <div className="min-h-screen bg-background">
    
          <CreateGuideHeader
            isPublic={isPublic}
            onPublicChange={setIsPublic}
            onPublish={publishGuide}
          />
    
          {/* Main Content */}
          <div className="max-w-6xl mx-auto px-6 py-8">
            <form onSubmit={submitGuide} className="space-y-8" suppressHydrationWarning>
    
              <TitleSectionInput
                name={name}
                description={description}
                updateName={updateName}
                updateDescription={updateDescription}
              />
              
              <Separator />
    
              <GuideBiblicalReference
                biblicalReferences={biblicalReferences}
                onAddReference={biblicalReferencesLists.add.bind(null, 'GUIDE')}
                onRemoveReference={biblicalReferencesLists.remove.bind(null, 'GUIDE')}
                onUpdateReference={biblicalReferencesLists.update.bind(null, 'GUIDE')}
                addBiblicalReferences={biblicalReferencesLists.batchAdd.bind(null, 'GUIDE')}
              />
    
              <Separator />
    
              <GuideSections
                guideSections={guideSections}
                expandedSections={expandedSections}
                onAddSection={guideSectionActions.add}
                onRemoveSection={guideSectionActions.remove}
                onUpdateSection={guideSectionActions.update}
                onToggleSectionReferences={guideBiblicalReferenceActions.toggleReferences}
                onAddSectionReference={guideBiblicalReferenceActions.addBiblicalReference}
                onRemoveSectionReference={guideBiblicalReferenceActions.removeBiblicalReference}
                onUpdateSectionReference={guideBiblicalReferenceActions.updateBiblicalReference}
              />
            </form>
          </div>
        </div>
      );

}