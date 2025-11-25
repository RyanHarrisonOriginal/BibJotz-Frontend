import { ScrollArea } from "@/components/ui/ScrollArea/scroll-area";
import { BOOKS, mockVerses } from "./test-constants";
import { VersionPanel } from "@/features/bible/components/bible-reader/types";
import { TranslationSelect, BookSelect, ChapterSelect, DeletePanelButton } from "./PanelSelects";
import { BibleTranslation, BookInfo } from "@/features/bible/types";
import { useMemo, useCallback, memo } from "react";
import { BookAutocomplete } from "../../book-autocomplete/component/BookAutocomplete";

interface BibleReaderPannelProps {
    panel: VersionPanel;
    index: number;
    updatePanel: (id: string, field: keyof VersionPanel, value: string) => void;
    removePanel: (id: string) => void;
    handleVerseClick: (verseNum: number, isShiftKey: boolean) => void;
    selectedVerses: Set<number>;
    includeRemoveButton?: boolean;
    translations: BibleTranslation[];
    fontSize: number;
    books: BookInfo[];
}

interface VerseItemProps {
    verse: { number: number; text: string };
    isSelected: boolean;
    onClick: (verseNum: number, isShiftKey: boolean) => void;
    fontSize: number;
}

const VerseItem = memo(({ verse, isSelected, onClick, fontSize }: VerseItemProps) => {
    const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        onClick(verse.number, e.shiftKey);
    }, [verse.number, onClick]);

    const className = useMemo(() =>
        `group cursor-pointer p-2 rounded transition-colors ${isSelected
            ? 'bg-primary/10 border border-primary/10'
            : 'hover:bg-muted/50'
        }`,
        [isSelected]
    );

    return (
                <div
                    key={verse.number}
                    onClick={handleClick}
                    className={`group cursor-pointer p-3 my-3 rounded-lg transition-all duration-200 ${isSelected
                            ? 'bg-primary/15 border-2 border-primary shadow-sm scale-[1.00]'
                            : 'hover:bg-muted/50 border-2 border-transparent hover:border-border/30'
                        }`}
                >
                    <div className="flex items-start gap-3">
                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary/10 text-primary font-bold text-xs flex-shrink-0 mt-0.5">
                            {verse.number}
                        </span>
                        <span className="font-serif leading-relaxed text-foreground" style={{ fontSize: `${fontSize}px` }}>
                            {verse.text}
                        </span>
                    </div>
                </div>
       
    );
});
VerseItem.displayName = "VerseItem";

export const BibleReaderPannel = memo(({ 
    panel, index, updatePanel, removePanel, handleVerseClick, translations, selectedVerses, includeRemoveButton = true, fontSize, books }: BibleReaderPannelProps) => {
    const handleVersionUpdate = useCallback((value: string) => {
        updatePanel(panel.id, "version", value);
    }, [panel.id, updatePanel]);

    const handleBookUpdate = useCallback((value: string) => {
        updatePanel(panel.id, "book", value);
    }, [panel.id, updatePanel]);

    const handleChapterUpdate = useCallback((value: string) => {
        updatePanel(panel.id, "chapter", value);
    }, [panel.id, updatePanel]);

    const handleRemove = useCallback(() => {
        removePanel(panel.id);
    }, [panel.id, removePanel]);

    return (
        <div
            key={panel.id}
            className="flex flex-col h-full min-h-0 border-2 border-primary/10 rounded-xl overflow-hidden bg-card/50 backdrop-blur-sm shadow-sm hover:shadow-md hover:border-primary/20 transition-all animate-enter"
            style={{ animationDelay: `${index * 0.1}s` }}
        >{/* Panel Header */}
            <div className="flex-shrink-0 p-4 border-b border-border/30 bg-gradient-to-b from-muted/30 to-transparent space-y-3">
                <div className="flex items-center justify-between gap-2">
                    <TranslationSelect
                        version={panel.version}
                        translations={translations}
                        updatePanel={handleVersionUpdate}
                    />
                    <DeletePanelButton
                        removePanel={handleRemove}
                        includeRemoveButton={includeRemoveButton}
                        id={panel.id}
                    />
                </div>

                <div className="flex gap-2">
                    <BookSelect
                        book={panel.book}
                        books={books}
                        updatePanel={handleBookUpdate}
                    />
                    <ChapterSelect
                        chapter={panel.chapter}
                        chapters={Array.from({ length: 50 }, (_, i) => i + 1)}
                        updatePanel={handleChapterUpdate}
                    />
                </div>
            </div>

            {/* Panel Content */}
            <div className="flex-1 min-h-0 overflow-hidden">
                <ScrollArea className="h-full p-4">
                    <div className="space-y-3">
                    {mockVerses.map((verse: { number: number; text: string }) => (
                        <VerseItem
                            key={verse.number}
                            verse={verse}
                            isSelected={selectedVerses.has(verse.number)}
                            onClick={handleVerseClick}
                            fontSize={fontSize}
                        />
                    ))}
                    </div>
                </ScrollArea>
            </div>
        </div>
    )
});
BibleReaderPannel.displayName = "BibleReaderPannel";