'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Form/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select/select";
import { GuideListItem } from "@/domain/guide/types";
import { PenLine, ExternalLink } from "lucide-react";
import { useRouter } from "next/navigation";

interface CreateJourneyFormProps {
    guides: { guides: GuideListItem[] } | undefined;
    selectedGuide: GuideListItem | null;
    journeyName: string;
    onGuideSelect: (guideId: string) => void;
    onJourneyNameChange: (value: string) => void;
    onSubmit: () => void;
    isFormValid: boolean;
}

export const CreateJourneyForm = ({
    guides,
    selectedGuide,
    journeyName,
    onGuideSelect,
    onJourneyNameChange,
    onSubmit,
    isFormValid,
}: CreateJourneyFormProps) => {
    const router = useRouter();

    const getPlaceholder = () => {
        if (selectedGuide?.name === 'Character Study') {
            return 'e.g., Peter, Moses, Ruth...';
        }
        if (selectedGuide?.name === 'Book Study') {
            return 'e.g., Romans, James, Psalms...';
        }
        return 'e.g., Grace, Prayer, Faith...';
    };

    const getHelperText = () => {
        if (selectedGuide?.name === 'Character Study') {
            return 'Enter the name of the character you want to study';
        }
        if (selectedGuide?.name === 'Book Study') {
            return 'Enter the book you want to study';
        }
        return 'Give your journey a meaningful name';
    };

    const ExploreAllGuidesButton = () => {
        return (
            <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push('/guides')}
                className="h-auto py-1 px-2 text-xs text-muted-foreground hover:text-foreground -mr-2"
            >
                <span>Explore all guides</span>
                <ExternalLink className="h-3 w-3 ml-1.5" />
            </Button>
        )
    }

    const GuideSelect = ({ guide }: { guide: GuideListItem }) => {
        return (
            <SelectItem
                key={guide?.id?.toString()}
                value={guide?.id?.toString()}
                className="py-3"
            >
                <div className="flex flex-col items-start w-full min-w-0">
                    <span className="font-medium text-sm leading-tight break-words">
                        {guide?.name}
                    </span>
                    <span className="text-xs text-muted-foreground leading-tight break-words mt-0.5 guide-description">
                        {guide?.description}
                    </span>
                </div>
            </SelectItem>
        )
    };

    const GuideSelectionHelperText = ({ selectedGuide }: { selectedGuide: GuideListItem | null }) => {
        return (
            <>
                {selectedGuide && (
                    <p className="text-sm text-muted-foreground">
                        {getHelperText()}
                    </p>
                )}
            </>
        )
    };

    return (
        <>
            <style dangerouslySetInnerHTML={{
                __html: `
                .guide-select-trigger .guide-description {
                    display: none !important;
                }
            `}} />
            <div className="space-y-6">
                {/* Guide Selection */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-semibold text-foreground">
                            Choose a Guide Template
                        </label>
                        <ExploreAllGuidesButton />
                    </div>
                    <Select
                        value={selectedGuide?.id?.toString()}
                        onValueChange={onGuideSelect}
                    >
                        <SelectTrigger className="w-full h-12 guide-select-trigger text-base">
                            <SelectValue placeholder="Select a guide template..." />
                        </SelectTrigger>
                        <SelectContent className="min-w-[var(--radix-select-trigger-width)]">
                            {guides?.guides.map((guide) => (
                                <GuideSelect key={guide?.id?.toString()} guide={guide} />
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Journey Name */}
                <div className="space-y-3">
                    <label className="text-sm font-semibold text-foreground">
                        Name Your Journey
                    </label>
                    <div className="relative">
                        <PenLine className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                        <Input
                            value={journeyName}
                            onChange={(e) => onJourneyNameChange(e.target.value)}
                            placeholder={getPlaceholder()}
                            className="pl-11 h-12 text-base"
                            autoComplete="off"
                        />
                    </div>
                    <GuideSelectionHelperText selectedGuide={selectedGuide} />
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                    <Button
                        onClick={onSubmit}
                        className="w-full h-12 text-base font-medium"
                        size="lg"
                        disabled={!isFormValid}
                    >
                        Begin Journey
                    </Button>
                </div>
            </div>
        </>
    );
};

