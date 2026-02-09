"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { useGetGuides } from "@/domain/guide/hooks/useGuideApi";
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
  const { data: guidesPayload, isLoading: guidesLoading } = useGetGuides();
  const guides = guidesPayload?.guides ?? [];

  const guideId = searchParams.get("guideId") ?? "";
  const journeyName = searchParams.get("journeyName") ?? "";

  const guide = useMemo(
    () => guides.find((g) => String(g.id) === guideId),
    [guides, guideId]
  );
  const sections = useMemo(
    () => (guide ? sectionsFromGuide(guide) : []),
    [guide]
  );
  const guideTitle = guide?.name ?? "";

  const [bibleReaderOpen, setBibleReaderOpen] = useState(false);
  const [documentContent, setDocumentContent] = useState("");

  const hasParams = Boolean(guideId && journeyName);
  const hasValidState = Boolean(hasParams && guide);
  const stillLoading = hasParams && guidesLoading;

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
      />
    </div>
  );
}
