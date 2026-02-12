"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { useGetGuides } from "@/domain/guide/hooks/useGuideApi";
import { useGetJourneyDetail } from "@/domain/library/hooks/useLibraryApi";
import { mapJourneyDetailToSectionEntries } from "@/domain/reflections/utils/mappers";
import {
  sectionsFromGuide,
  ReflectionEditorHeader,
  ReflectionEditorNoData,
  ReflectionEditorLoading,
  ReflectionEditorBody,
} from "@/domain/reflections/components";

export function ReflectionEditorScreen() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const journeyId = searchParams.get("journeyId");
  const guideId = searchParams.get("guideId") ?? "";
  const journeyNameParam = searchParams.get("journeyName") ?? "";

  const { data: journeyDetail, isLoading: journeyLoading } =
    useGetJourneyDetail(journeyId);
  const { data: guidesPayload, isLoading: guidesLoading } = useGetGuides();
  const guides = guidesPayload?.guides ?? [];

  const guide = useMemo(
    () => guides.find((g) => String(g.id) === guideId),
    [guides, guideId]
  );

  const sections = useMemo(() => {
    if (journeyDetail) return journeyDetail.sections;
    if (guide) return sectionsFromGuide(guide);
    return [];
  }, [journeyDetail, guide]);

  const guideTitle = journeyDetail?.guideTitle ?? guide?.name ?? "";
  const journeyName = journeyDetail?.title ?? journeyNameParam;

  const initialSectionEntries = useMemo(
    () => (journeyDetail ? mapJourneyDetailToSectionEntries(journeyDetail) : undefined),
    [journeyDetail]
  );

  const [bibleReaderOpen, setBibleReaderOpen] = useState(false);
  const [documentContent, setDocumentContent] = useState("");

  const isJourneyPath = Boolean(journeyId);
  const isGuidePath = Boolean(guideId && journeyNameParam);
  const stillLoading =
    (isJourneyPath && journeyLoading) || (isGuidePath && guidesLoading);
  const hasValidState =
    (isJourneyPath && journeyDetail) || (isGuidePath && guide);

  if (stillLoading) {
    return <ReflectionEditorLoading />;
  }

  if (!hasValidState) {
    return (
      <ReflectionEditorNoData
        onStartJourney={() => router.push("/create-journey")}
      />
    );
  }

  const handleSubmit = () => {
    const hasContent =
      documentContent &&
      documentContent
        .replace(/<div[^>]*data-section-header[^>]*>.*?<\/div>/g, "")
        .replace(/<p><\/p>/g, "")
        .trim().length > 0;

    if (!hasContent) {
      toast.error("Please write at least some reflections");
      return;
    }

    toast.success(`Journey "${journeyName}" saved!`);
    router.push("/library");
  };

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      <ReflectionEditorHeader
        onBack={() => router.push("/library")}
        guideTitle={guideTitle}
        journeyName={journeyName}
        bibleReaderOpen={bibleReaderOpen}
        onToggleBibleReader={() => setBibleReaderOpen(!bibleReaderOpen)}
        onSave={handleSubmit}
      />

      <ReflectionEditorBody
        sections={sections}
        onContentChange={setDocumentContent}
        bibleReaderOpen={bibleReaderOpen}
        onCloseBibleReader={() => setBibleReaderOpen(false)}
        initialSectionEntries={initialSectionEntries}
        journeyId={journeyId}
      />
    </div>
  );
}
