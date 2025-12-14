import { CreateGuideHeader } from "@/features/guide/creation-form/components/CreateGuideHeader";
import { TitleSectionInput } from "@/features/guide/creation-form/components/TitleSectionInput";
import { GuideBiblicalReference } from "@/features/guide/creation-form/components/GuideBiblicalReference";
import { GuideSections } from "@/features/guide/creation-form/components/GuideSections";

import { useGuideMetaData } from "@/features/guide/creation-form/context/GuideMetaData/Provider";
import { useGuideBiblicalReferencesLists } from "@/features/guide/creation-form/context/GuideBiblicalReferencesLists/Provider";
import { useGuideSection } from "@/features/guide/creation-form/context/GuideSection/Provider";

import { useGuideFormData } from "@/features/guide/creation-form/hooks/useGuideFormData";
import { Separator } from "@/components/ui/separator";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { getDraftKey } from "@/features/guide/drafts/utility";

export default function CreateGuidePage() {
    const queryClient = useQueryClient();
    
    // Invalidate and refetch draft on mount to always get fresh data from DB
    useEffect(() => {
        const draftKey = getDraftKey('GUIDE');
        queryClient.invalidateQueries({ queryKey: ['draft', draftKey] });
    }, [queryClient]);

    const { name, description , isPublic, setIsPublic, updateName, updateDescription} = useGuideMetaData();
    const { biblicalReferencesLists: guideBiblicalReferencesLists } = useGuideBiblicalReferencesLists();
    const { guideSections, guideSectionActions } = useGuideSection();
    const { submitGuide, publishGuide } = useGuideFormData();
    const guideBiblicalReferences = guideBiblicalReferencesLists.getList('GUIDE');

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
                biblicalReferences={guideBiblicalReferences}
                onAddReference={guideBiblicalReferencesLists.add.bind(null, 'GUIDE')}
                onRemoveReference={guideBiblicalReferencesLists.remove.bind(null, 'GUIDE')}
                onUpdateReference={guideBiblicalReferencesLists.update.bind(null, 'GUIDE')}
                addBiblicalReferences={guideBiblicalReferencesLists.batchAdd.bind(null, 'GUIDE')}
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