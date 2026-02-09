"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useGetLibraryJourneys } from "@/domain/library/hooks/useLibraryApi";
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

  const { data: journeysData = [] } = useGetLibraryJourneys();

  const filteredJourneys = useMemo(() => {
    if (!searchTerm) return journeysData;

    const term = searchTerm.toLowerCase();
    return journeysData
      .map((journey) => ({
        ...journey,
        reflections: journey.reflections.filter(
          (r) =>
            r.content.toLowerCase().includes(term) ||
            r.sectionTitle.toLowerCase().includes(term)
        ),
      }))
      .filter(
        (journey) =>
          journey.title.toLowerCase().includes(term) ||
          journey.guideTitle.toLowerCase().includes(term) ||
          journey.reflections.length > 0
      );
  }, [journeysData, searchTerm]);

  const totalReflections = journeysData.reduce(
    (acc, j) => acc + j.reflections.length,
    0
  );

  const openJourney = (_journey: LibraryJourney) => {
    router.push("/create-journey");
    // TODO: pass journey context when journey editor supports it
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
