'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Form/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select/select";
import { useGetGuides } from "@/features/guide/hooks/useGuideApi";
import { GuideListItem } from "@/features/guide/types";
import { ArrowLeft, Compass, PenLine, BookOpen, CheckCircle2, Users, FileText, Globe, Lock, User, ExternalLink } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const PageHeaderToolbar = ({ onBack }: { onBack: () => void }) => {
    return (
        <div className="sticky top-0 z-10 border-b border-border/40 bg-background/80 backdrop-blur-sm">
            <div className="container flex h-14 items-center max-w-7xl mx-auto px-6">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={onBack}
                    className="gap-2 -ml-2"
                >
                    <ArrowLeft className="h-4 w-4" />
                    <span className="text-sm">Back</span>
                </Button>
            </div>
        </div>
    );
};

const GuidePreviewCard = ({ guide }: { guide: GuideListItem }) => {
    return (
        <div className="rounded-xl border border-border/50 bg-card shadow-sm transition-all duration-200 hover:shadow-md overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-border/50">
                <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                            <BookOpen className="h-6 w-6 text-primary" />
                        </div>
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                            <h3 className="text-lg font-semibold">{guide.name}</h3>
                            <div className="flex-shrink-0">
                                {guide.isPublic ? (
                                    <div className="flex items-center gap-1 text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-md">
                                        <Globe className="h-3 w-3" />
                                        <span>Public</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-1 text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-md">
                                        <Lock className="h-3 w-3" />
                                        <span>Private</span>
                                    </div>
                                )}
                            </div>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            {guide.description}
                        </p>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    {/* Sections */}
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 border border-border/30">
                        <div className="flex-shrink-0 mt-0.5">
                            <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center">
                                <CheckCircle2 className="h-4 w-4 text-primary" />
                            </div>
                        </div>
                        <div className="min-w-0">
                            <div className="text-xs text-muted-foreground mb-0.5">Sections</div>
                            <div className="text-base font-semibold">
                                {guide.numberOfSections}
                            </div>
                        </div>
                    </div>

                    {/* Journeys */}
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 border border-border/30">
                        <div className="flex-shrink-0 mt-0.5">
                            <div className="w-8 h-8 rounded-md bg-blue-500/10 flex items-center justify-center">
                                <Users className="h-4 w-4 text-blue-500" />
                            </div>
                        </div>
                        <div className="min-w-0">
                            <div className="text-xs text-muted-foreground mb-0.5">Active Journeys</div>
                            <div className="text-base font-semibold">
                                {guide.numberOfJourneys}
                            </div>
                        </div>
                    </div>

                    {/* Reflections */}
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 border border-border/30">
                        <div className="flex-shrink-0 mt-0.5">
                            <div className="w-8 h-8 rounded-md bg-green-500/10 flex items-center justify-center">
                                <FileText className="h-4 w-4 text-green-500" />
                            </div>
                        </div>
                        <div className="min-w-0">
                            <div className="text-xs text-muted-foreground mb-0.5">Reflections</div>
                            <div className="text-base font-semibold">
                                {guide.numberOfReflections}
                            </div>
                        </div>
                    </div>

                    {/* Author */}
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 border border-border/30">
                        <div className="flex-shrink-0 mt-0.5">
                            <div className="w-8 h-8 rounded-md bg-purple-500/10 flex items-center justify-center">
                                <User className="h-4 w-4 text-purple-500" />
                            </div>
                        </div>
                        <div className="min-w-0">
                            <div className="text-xs text-muted-foreground mb-0.5">Author</div>
                            <div className="text-sm font-medium truncate" title={guide.authorName}>
                                {guide.authorName}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Summary */}
                <div className="pt-2 border-t border-border/30">
                    <p className="text-xs text-muted-foreground leading-relaxed">
                        {guide.numberOfJourneys > 0 
                            ? `This guide has been used by ${guide.numberOfJourneys} ${guide.numberOfJourneys === 1 ? 'person' : 'people'} to create ${guide.numberOfReflections} ${guide.numberOfReflections === 1 ? 'reflection' : 'reflections'}.`
                            : 'Be the first to start a journey with this guide!'}
                    </p>
                </div>
            </div>
        </div>
    );
};

const CreateJourneyPage = () => {
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

    const isFormValid = selectedGuide && journeyName.trim().length > 0;

    return (
        <>
            <style dangerouslySetInnerHTML={{__html: `
                .guide-select-trigger .guide-description {
                    display: none !important;
                }
            `}} />
            <div className="h-screen bg-background flex flex-col overflow-hidden">
                <PageHeaderToolbar onBack={() => router.back()} />

                <div className="flex-1 overflow-y-auto">
                    <div className="container max-w-7xl mx-auto px-6 py-12">
                        <div className="grid lg:grid-cols-2 gap-12 items-start">
                            {/* Left Column - Form */}
                            <div className="space-y-8">
                                {/* Header */}
                                <div>
                                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 mb-4">
                                        <Compass className="h-7 w-7 text-primary" />
                                    </div>
                                    <h1 className="text-4xl font-serif font-semibold tracking-tight mb-3">
                                        Start a New Journey
                                    </h1>
                                    <p className="text-base text-muted-foreground leading-relaxed">
                                        Create a personalized study using a guide template. Select a guide that matches your learning goals, then give your journey a meaningful name.
                                    </p>
                                </div>

                                {/* Form */}
                                <div className="space-y-6">
                                    {/* Guide Selection */}
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <label className="text-sm font-semibold text-foreground">
                                                Choose a Guide Template
                                            </label>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => router.push('/guides')}
                                                className="h-auto py-1 px-2 text-xs text-muted-foreground hover:text-foreground -mr-2"
                                            >
                                                <span>Explore all guides</span>
                                                <ExternalLink className="h-3 w-3 ml-1.5" />
                                            </Button>
                                        </div>
                                        <Select 
                                            value={selectedGuide?.id?.toString()} 
                                            onValueChange={handleGuideSelect}
                                        >
                                            <SelectTrigger className="w-full h-12 guide-select-trigger text-base">
                                                <SelectValue placeholder="Select a guide template..." />
                                            </SelectTrigger>
                                            <SelectContent className="min-w-[var(--radix-select-trigger-width)]">
                                                {guides?.guides.map((guide) => (
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
                                                onChange={(e) => setJourneyName(e.target.value)}
                                                placeholder={getPlaceholder()}
                                                className="pl-11 h-12 text-base"
                                                autoComplete="off"
                                            />
                                        </div>
                                        {selectedGuide && (
                                            <p className="text-sm text-muted-foreground">
                                                {getHelperText()}
                                            </p>
                                        )}
                                    </div>

                                    {/* Submit Button */}
                                    <div className="pt-4">
                                        <Button
                                            onClick={handleStartJourney}
                                            className="w-full h-12 text-base font-medium"
                                            size="lg"
                                            disabled={!isFormValid}
                                        >
                                            Begin Journey
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Guide Preview */}
                            <div className="lg:sticky lg:top-24">
                                {selectedGuide ? (
                                    <GuidePreviewCard guide={selectedGuide} />
                                ) : (
                                    <div className="rounded-xl border border-dashed border-border/50 bg-muted/30 p-12 text-center">
                                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-muted mb-4">
                                            <BookOpen className="h-8 w-8 text-muted-foreground" />
                                        </div>
                                        <h3 className="text-lg font-semibold mb-2 text-muted-foreground">
                                            Select a Guide
                                        </h3>
                                        <p className="text-sm text-muted-foreground mb-6">
                                            Choose a guide template from the dropdown to see details and get started
                                        </p>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => router.push('/guides')}
                                            className="gap-2"
                                        >
                                            <span>Explore all guides</span>
                                            <ExternalLink className="h-4 w-4" />
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreateJourneyPage;