import { Guide } from "../../types";

export type Draft = {
    id: string;
    name: string;
    userId: number;
    draftContent: Guide;
    draftKey: string;
    createdAt: Date;
    updatedAt: Date;
};