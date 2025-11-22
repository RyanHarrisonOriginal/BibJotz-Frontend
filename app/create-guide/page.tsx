'use client';

import { Separator } from '@/components/ui/separator';
import { CreateGuideTitleSectionInput } from './TitleSectionInput';
import { CreateGuideHeader } from './CreateGuideHeader';
import { AddGuideBiblicalReference } from './AddGuideBiblicalReference';
import { AddGuideSection } from './AddGuideSection';
import { useCreateGuideForm } from './useCreateGuideForm';

export default function CreateGuide() {
  const {
    name,
    description,
    isPublic,
    biblicalReferences,
    guideSections,
    expandedSections,
    setIsPublic,
    handleNameChange,
    handleDescriptionChange,
    addReference,
    removeReference,
    updateReference,
    addSection,
    removeSection,
    updateSection,
    addSectionReference,
    removeSectionReference,
    updateSectionReference,
    toggleSectionReferences,
    handleSubmit,
    handlePublish,
  } = useCreateGuideForm();

  return (
    <div className="min-h-screen bg-background">

      <CreateGuideHeader
        isPublic={isPublic}
        onPublicChange={setIsPublic}
        onPublish={handlePublish}
      />

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">

          <CreateGuideTitleSectionInput
            name={name}
            description={description}
            onNameChange={handleNameChange}
            onDescriptionChange={handleDescriptionChange}
          />
          
          <Separator />

          <AddGuideBiblicalReference
            biblicalReferences={biblicalReferences}
            onAddReference={addReference}
            onRemoveReference={removeReference}
            onUpdateReference={updateReference}
          />

          <Separator />

          <AddGuideSection
            guideSections={guideSections}
            expandedSections={expandedSections}
            onAddSection={addSection}
            onRemoveSection={removeSection}
            onUpdateSection={updateSection}
            onToggleSectionReferences={toggleSectionReferences}
            onAddSectionReference={addSectionReference}
            onRemoveSectionReference={removeSectionReference}
            onUpdateSectionReference={updateSectionReference}
          />
        </form>
      </div>
    </div>
  );
}

