import { BiblicalReference, GuideSection, Guide } from "../../guide/types";

export type Draft = {
    id: string;
    name: string;
    userId: number;
    draftContent: Guide;
    draftKey: string;
    createdAt: Date;
    publishedAt: Date;
    updatedAt: Date;
};

export type GuideDraftSnapshot = {
    name: string;
    description: string;
    isPublic: boolean;
    guideSections: GuideSection[];
    biblicalReferences: Record<string, BiblicalReference[]>;
  };