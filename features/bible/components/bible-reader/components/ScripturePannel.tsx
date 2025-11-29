import { ScrollArea } from "@/components/ui/ScrollArea/scroll-area";
import { VersionPanel } from "@/features/bible/components/bible-reader/types";
import { TranslationSelect, BookSelect, ChapterSelect, DeletePanelButton } from "./PanelOptions";
import { BibleTranslation, BookInfo, SelectedVerse, Verse, VerseText } from "@/features/bible/types";
import { useMemo, useCallback, memo } from "react";
import { BookAutocomplete } from "../../book-autocomplete/component/BookAutocomplete";
import Scriptures from "./Scripures";
import { ScripturePanelSkeleton } from "./ScripturePanelSkeleton";
import { badgeColorSchemes } from "./ScriptureSelectionBadgeColors";

interface ScripturePannelProps {
    panel: VersionPanel;
    index: number;
    updatePanel: (id: string, field: keyof VersionPanel, value: string) => void;
    removePanel: (id: string) => void;
    handleVerseClick: (verse: SelectedVerse, isShiftKey: boolean) => void;
    includeRemoveButton?: boolean;
    translations: BibleTranslation[];
    fontSize: number;
    books: BookInfo[];
    versesText: VerseText | undefined;
    selectedVerses: Set<SelectedVerse>;
    checkVerseIsInArray: (arr: SelectedVerse[], verse: SelectedVerse) => boolean;
    getBookChapterArray: (refs: SelectedVerse[]) => string[];
}

export const ScripturePannel = memo(({
    panel,
    index,
    updatePanel,
    removePanel,
    handleVerseClick,
    translations,
    includeRemoveButton = true,
    fontSize,
    books,
    versesText,
    selectedVerses,
    checkVerseIsInArray,
    getBookChapterArray }: ScripturePannelProps) => {

    const bookChapterArray = getBookChapterArray(Array.from(selectedVerses));

    const colorScheme = badgeColorSchemes[bookChapterArray.indexOf(`${panel.book}:${panel.chapter}`) % badgeColorSchemes.length];


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

    const getMaxChapters = useCallback((panelBook: string) => {
        return books.find((book: BookInfo) => book.code === panelBook)?.numberOfChapters || 0;
    }, [books]);
    return (
        <div
            key={panel.id}
            className="flex flex-col h-full min-h-0 border-2 border-primary/10 rounded-xl 
            overflow-hidden bg-card/50 backdrop-blur-sm shadow-sm hover:shadow-md 
            hover:border-primary/20 transition-all animate-enter"
            style={{ animationDelay: `${index * 0.1}s` }}
        >{/* Panel Header */}
            <div className="flex-shrink-0 p-4 border-b border-border/30 bg-background space-y-3">
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
                        maxChapters={getMaxChapters(panel.book)}
                        updatePanel={handleChapterUpdate}
                    />
                </div>
            </div>

            {/* Panel Content */}
            <div className="flex-1 min-h-0 overflow-hidden">
                <ScrollArea className="h-full p-4">
                    <div className="space-y-3">
                        {versesText?.verses ? (
                            versesText.verses.map((v: Verse) => (
                                <Scriptures
                                    key={v.verse}
                                    number={v.verse}
                                    text={v.texts[0]?.text || ''}
                                    onClick={handleVerseClick}
                                    fontSize={fontSize}
                                    book={panel.book}
                                    chapter={parseInt(panel.chapter)}
                                    index={index}
                                    selectedVerses={selectedVerses}
                                    checkVerseIsInArray={checkVerseIsInArray}
                                    getBookChapterArray={getBookChapterArray}
                                    colorScheme={colorScheme}
                                />
                            ))
                        ) : (
                            Array.from({ length: 15 }).map((_, index) => (
                                <ScripturePanelSkeleton key={index} fontSize={fontSize} />
                            ))
                        )}
                    </div>
                </ScrollArea>
            </div>
        </div>
    )
});
ScripturePannel.displayName = "ScripturePannel";