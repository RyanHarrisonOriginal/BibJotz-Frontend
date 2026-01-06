import { GuideSection } from "./GuideSections";
import { BiblicalReference } from "@/domain/guide/types";
import { Card } from "@/components/ui/Card/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { BiblicalReferenceComponent } from "./BiblicalReference/BiblicalReferenceComponent";
import { Plus } from "lucide-react";
import { useGuideBiblicalReferencesLists } from "../../context/GuideBiblicalReferencesLists/Provider";

type GuideSectionCardProps = {

  section: GuideSection;
  sectionIndex: number;
  onUpdateSection: (index: number, field: 'title' | 'description', value: string) => void;
  onRemoveSection: (index: number) => void;
}



const GuideSectionCard = ({ 
    section, 
    sectionIndex, 
    onUpdateSection, 
    onRemoveSection
  }: GuideSectionCardProps) => {

    const { getList: getBiblicalReferences, add: addBiblicalReference, remove: removeBiblicalReference, update: updateBiblicalReference, batchAdd: batchAddBiblicalReferences, reset: resetBiblicalReferences, applySnapshot: applyBiblicalReferencesSnapshot } = useGuideBiblicalReferencesLists();
    const sectionBiblicalReferences = getBiblicalReferences(`SECTION_${sectionIndex}`);
    // console.log('Section biblical references:', sectionBiblicalReferences);
    const addBiblicalReferencesFromBibleReader = batchAddBiblicalReferences.bind(null, `SECTION_${sectionIndex}`);
    return (

      <Card key={sectionIndex} className="p-6 hover:border-primary/50 transition-colors">
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-4">
                    <input
                      value={section.title}
                      onChange={(e) => onUpdateSection(sectionIndex, 'title', e.target.value)}
                      placeholder="Section title"
                      className="w-full border-0 bg-transparent text-2xl font-semibold font-serif outline-none placeholder:text-muted-foreground/40"
                      suppressHydrationWarning
                    />
  
                    <textarea
                      value={section.description}
                      onChange={(e) => onUpdateSection(sectionIndex, 'description', e.target.value)}
                      placeholder="Describe this section..."
                      className="w-full resize-none border-0 bg-transparent text-base outline-none placeholder:text-muted-foreground/40 min-h-[60px]"
                      suppressHydrationWarning
                    />
                  </div>
  
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => onRemoveSection(sectionIndex)}
                    >
                      <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                    </Button>
                
                </div>
  
                <Separator className="my-4" />
  
                <div className="space-y-3">
                  <div className="flex items-center justify-end">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => addBiblicalReference.bind(null, `SECTION_${sectionIndex}`)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
  
                  <BiblicalReferenceComponent
                    headerText="Biblical Foundation"
                    descriptionText="Primary scripture references for this section"
                    biblicalReferences={sectionBiblicalReferences}
                    onAddReference={addBiblicalReference.bind(null, `SECTION_${sectionIndex}`)}
                    onRemoveReference={removeBiblicalReference.bind(null, `SECTION_${sectionIndex}`)}
                    onUpdateReference={updateBiblicalReference.bind(null, `SECTION_${sectionIndex}`)}
                    addBiblicalReferencesFromBibleReader={addBiblicalReferencesFromBibleReader}
                    actionButtonText={`Add Reference to ${section.title || 'this section'}`}
                  />
                </div>
              </div>
            </Card>
    )
  }
  

export default GuideSectionCard;