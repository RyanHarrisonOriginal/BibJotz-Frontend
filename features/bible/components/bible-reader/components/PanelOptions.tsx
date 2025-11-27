import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select/select";
import { ScrollArea } from "@/components/ui/ScrollArea/scroll-area";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { BOOKS } from "./test-constants";
import { BibleTranslation, BookInfo } from "@/features/bible/types";
import { useCallback, memo } from "react";
import { useBooks } from "@/features/bible/hooks/useBibleApi";

interface TranslationSelectProps {
    version: string;
    translations: BibleTranslation[];
    updatePanel: (value: string) => void;
}

interface BookSelectProps {
    book: string;
    books: BookInfo[];
    updatePanel: (value: string) => void;
}

interface ChapterSelectProps {
    chapter: string;
    maxChapters: number;
    updatePanel: (value: string) => void;
}

interface DeletePanelButtonProps {
    removePanel: (id: string) => void;
    includeRemoveButton: boolean;
    id: string;
}

export const TranslationSelect = memo(({ version, translations, updatePanel }: TranslationSelectProps) => {
    return (
        <Select
            value={version}
            onValueChange={updatePanel}
        >
            <SelectTrigger className="h-9 font-medium border-primary/20 hover:border-primary/40 transition-colors">
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                {translations.map((version: BibleTranslation) => (
                    <SelectItem key={version.code} value={version.code}>
                        {version.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
});
TranslationSelect.displayName = "TranslationSelect";

export const BookSelect = memo(({ book, updatePanel, books }: BookSelectProps) => {
    return (
        <Select
            value={book}
            onValueChange={updatePanel}
        >
            <SelectTrigger className="h-9 flex-1 border-border/50 hover:border-primary/30 transition-colors">
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                <ScrollArea className="h-[300px]">
                    {books?.map((book: BookInfo) => (
                        <SelectItem key={book.code} value={book.code}>
                            {book.name}
                        </SelectItem>
                    ))}
                </ScrollArea>
            </SelectContent>
        </Select>
    )
});
BookSelect.displayName = "BookSelect";


export const ChapterSelect = memo(({ chapter, maxChapters, updatePanel }: ChapterSelectProps) => {
    const CHAPTER_NUMBERS = Array.from({ length: maxChapters }, (_, i) => i + 1);
    return (
        <Select
            value={chapter}
            onValueChange={updatePanel}
        >
            <SelectTrigger className="h-9 w-24 border-border/50 hover:border-primary/30 transition-colors">
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                <ScrollArea className="h-[200px]">
                    {CHAPTER_NUMBERS.map((num: number) => (
                        <SelectItem key={num} value={num.toString()}>
                            Ch {num}
                        </SelectItem>
                    ))}
                </ScrollArea>
            </SelectContent>
        </Select>
    )
});
ChapterSelect.displayName = "ChapterSelect";

export const DeletePanelButton = memo(({ removePanel, includeRemoveButton, id }: DeletePanelButtonProps) => {
    const handleClick = useCallback(() => {
        removePanel(id);
    }, [removePanel, id]);

    if (!includeRemoveButton) return null;

    return (

        <Button
            variant="ghost"
            size="sm"
            onClick={handleClick}
            className="h-9 w-9 p-0 hover:bg-destructive/10 hover:text-destructive transition-colors"
        >
            <X className="h-4 w-4" />
        </Button>
    )
});
DeletePanelButton.displayName = "DeletePanelButton";

