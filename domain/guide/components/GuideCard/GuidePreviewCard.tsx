import { GuideListItem } from "@/domain/guide/types";
import { BookOpen, CheckCircle2, Users, FileText, Globe, Lock, User } from "lucide-react";

interface GuidePreviewCardProps {
    guide: GuideListItem;
}

export const GuidePreviewCard = ({ guide }: GuidePreviewCardProps) => {
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

