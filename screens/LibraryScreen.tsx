"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useLibraryApi } from "@/domain/library/hooks/useLibraryApi";
import type { LibraryJourney } from "@/domain/library/types";
import {
  LibraryPageHeader,
  LibraryActionsBar,
  LibraryJourneyCard,
  LibraryEmptyState,
} from "@/domain/library/components";

export default function LibraryScreen() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const { queries } = useLibraryApi();
  const rawData = queries.libraryJourneys.data;
  const journeysData = Array.isArray(rawData) ? rawData : [];

  const filteredJourneys = useMemo(() => {
    if (!searchTerm) return journeysData;

    const term = searchTerm.toLowerCase();
    return journeysData.filter((journey) => {
      const titleMatch =
        journey.title.toLowerCase().includes(term) ||
        journey.guideTitle.toLowerCase().includes(term);
      if (titleMatch) return true;

      const sectionReflections = journey.sectionReflections ?? [];
      const matchingSectionReflections = sectionReflections
        .map((sr) => ({
          ...sr,
          entries: sr.entries.filter(
            (e) =>
              e.content.toLowerCase().includes(term) ||
              sr.sectionTitle.toLowerCase().includes(term)
          ),
        }))
        .filter((sr) => sr.entries.length > 0);
      return matchingSectionReflections.length > 0;
    }).map((journey) => {
      if (!searchTerm) return journey;
      const term = searchTerm.toLowerCase();
      const titleMatch =
        journey.title.toLowerCase().includes(term) ||
        journey.guideTitle.toLowerCase().includes(term);
      if (titleMatch) return journey;

      const sectionReflections = journey.sectionReflections ?? [];
      const filteredSectionReflections = sectionReflections
        .map((sr) => ({
          ...sr,
          entries: sr.entries.filter(
            (e) =>
              e.content.toLowerCase().includes(term) ||
              sr.sectionTitle.toLowerCase().includes(term)
          ),
        }))
        .filter((sr) => sr.entries.length > 0);
      return { ...journey, sectionReflections: filteredSectionReflections };
    });
  }, [journeysData, searchTerm]);

  const totalReflections = journeysData.reduce(
    (acc, j) =>
      acc +
      (j.sectionReflections ?? []).reduce((s, sr) => s + sr.entries.length, 0),
    0
  );

  const openJourney = (journey: LibraryJourney) => {
    const params = new URLSearchParams({
      journeyId: journey.id,
      journeyName: journey.title,
      guideTitle: journey.guideTitle,
    });
    router.push(`/reflections/create?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <LibraryPageHeader
          journeyCount={journeysData.length}
          reflectionCount={totalReflections}
        />

        <LibraryActionsBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onNewJourney={() => router.push("/create-journey")}
        />

        <div className="space-y-6">
          {filteredJourneys.map((journey) => (
            <LibraryJourneyCard
              key={journey.id}
              journey={journey}
              onOpen={openJourney}
            />
          ))}
        </div>

        {filteredJourneys.length === 0 && (
          <LibraryEmptyState
            hasSearchTerm={searchTerm.length > 0}
            onClearSearch={() => setSearchTerm("")}
            onStartJourney={() => router.push("/create-journey")}
          />
        )}
      </div>
    </div>
  );
}
