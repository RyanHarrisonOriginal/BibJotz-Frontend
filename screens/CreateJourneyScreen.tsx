'use client';

import { PageHeaderToolbar } from "@/components/layout/PageHeaderToolbar";
import { CreateJourneyHeader } from "@/domain/journeys/creation-form/CreateJourneyHeader";
import { CreateJourneyForm } from "@/domain/journeys/creation-form/CreateJourneyForm";
import { GuidePreviewCard } from "@/domain/guide/components/GuideCard/GuidePreviewCard";
import { NoGuidesFound } from "@/domain/guide/components/GuideCard/NoGuidesFound";
import { useGetGuides } from "@/domain/guide/hooks/useGuideApi";
import { GuideListItem } from "@/domain/guide/types";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const CreateJourneyScreen = () => {
    const router = useRouter();
    const { data: guides } = useGetGuides();
    const [selectedGuide, setSelectedGuide] = useState<GuideListItem | null>(null);
    const [journeyName, setJourneyName] = useState('');

    const handleGuideSelect = (guideId: string) => {
        const guide = guides?.guides.find((g) => g?.id?.toString() === guideId);
        if (guide) {
            setSelectedGuide(guide);
        }
    };

    const handleStartJourney = () => {
        console.log('Start Journey');
    };

    const isFormValid = Boolean(selectedGuide && journeyName.trim().length > 0);

    return (
        <div className="h-screen bg-background flex flex-col overflow-hidden">
            <PageHeaderToolbar onBack={() => router.back()} />

            <div className="flex-1 overflow-y-auto">
                <div className="container max-w-7xl mx-auto px-6 py-12">
                    <div className="grid lg:grid-cols-2 gap-12 items-start">
                        {/* Left Column - Form */}
                        <div className="space-y-8">
                            <CreateJourneyHeader />
                            <CreateJourneyForm
                                guides={guides}
                                selectedGuide={selectedGuide}
                                journeyName={journeyName}
                                onGuideSelect={handleGuideSelect}
                                onJourneyNameChange={setJourneyName}
                                onSubmit={handleStartJourney}
                                isFormValid={isFormValid}
                            />
                        </div>

                        {/* Right Column - Guide Preview */}
                        <div className="lg:sticky lg:top-24">
                            {selectedGuide ? (
                                <GuidePreviewCard guide={selectedGuide} />
                            ) : (
                                <NoGuidesFound />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

