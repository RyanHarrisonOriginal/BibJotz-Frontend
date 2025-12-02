import { SelectedReadingPanelVerse, SelectedReadingPanelVerses } from "../components/bible-reader/types";
import { BiblicalReference } from "@/features/guide/creation-form/components/BiblicalReferenceList";


export function useTypeMappers() {
    return {
        mapSelectedReadingPanelVersesToBiblicalReferences: (verses: SelectedReadingPanelVerses): BiblicalReference[] => {
            if (!verses || verses.length === 0) return [];

            // Group verses by book and chapter
            const groups = new Map<string, SelectedReadingPanelVerse[]>();
            
            for (const verse of verses) {
                const key = `${verse.book}:${verse.chapter}`;
                if (!groups.has(key)) {
                    groups.set(key, []);
                }
                groups.get(key)!.push(verse);
            }

            // Convert each group to a BiblicalReference
            return Array.from(groups.values()).map((groupVerses): BiblicalReference => {
                // Sort verses by verse number
                const sortedVerses = [...groupVerses].sort((a, b) => a.verse - b.verse);
                const firstVerse = sortedVerses[0];
                const lastVerse = sortedVerses[sortedVerses.length - 1];

                return {
                    book: firstVerse.book,
                    chapter: firstVerse.chapter,
                    startVerse: firstVerse.verse,
                    endVerse: lastVerse.verse,
                };
            });
        }
    }
}