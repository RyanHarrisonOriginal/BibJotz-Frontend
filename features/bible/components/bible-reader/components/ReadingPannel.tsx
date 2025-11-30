import { ScrollArea } from "@/components/ui/ScrollArea/scroll-area";
import { ReadingPanel, ReadingPanelVerse, SelectedReadingPanelVerse } from "@/features/bible/components/bible-reader/types";
import { TranslationSelect, BookSelect, ChapterSelect, DeletePanelButton } from "./ReadingPanelControls";
import { useCallback } from "react";
import Scriptures from "./Scripures";
import { ScripturePanelSkeleton } from "./ScripturePanelSkeleton";
import { useBibleVersions, useBooks } from "@/features/bible/hooks/useBibleApi";
import { useReadingPanel } from "../hooks/useReadingPanel";
import { useVerseSelection } from "../hooks/useVerseSelection";

interface ReadingPannelProps {
    panel: ReadingPanel;
    index: number;
    onChange: (id: number, field: keyof ReadingPanel, value: ReadingPanel[keyof ReadingPanel]) => void;
    onDelete: (id: number) => void;
    onToggleVerseSelection: (verse: SelectedReadingPanelVerse, isShiftKey: boolean) => void;
    fontSize: number;
}

export const ReadingPannel = ({
    panel,
    index,
    onChange,
    onDelete,
    onToggleVerseSelection,
    fontSize,
    }: ReadingPannelProps) => {

    //TO DO: Get books and translations from Provider
    
    const readingPanelData = useReadingPanel(panel)
    const { isVerseSelected } = useVerseSelection();
     const { data: bibleVersions } = useBibleVersions();   
     const { data: books } = useBooks(true, readingPanelData.version);
    //const { verseSelection } = useVerseSelection();

//    const bookChapterArray = getBookChapterArray(Array.from(selectedVerses));

//    const colorScheme = badgeColorSchemes[bookChapterArray.indexOf(`${panel.book}:${panel.chapter}`) % badgeColorSchemes.length];


   //TO DO: Put these in a hook
    const handleVersionUpdate = useCallback((value: string) => {
        onChange(panel.id, "version", value);
    }, [panel.id, onChange]);

    const handleBookUpdate = useCallback((value: string) => {
        onChange(panel.id, "book", { name: value, numberOfChapters: 50 });
    }, [panel.id, onChange]);

    const handleChapterUpdate = useCallback((value: number) => {
        onChange(panel.id, "chapter", value);
    }, [panel.id, onChange]);

    const handleRemove = useCallback(() => {
        onDelete(panel.id);
    }, [panel.id, onDelete]);



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
                        translations={bibleVersions ?? []}
                        updatePanel={handleVersionUpdate}
                    />
                    <DeletePanelButton
                        removePanel={handleRemove}
                        includeRemoveButton={true}
                        id={panel.id}
                    />
                </div>

                <div className="flex gap-2">
                    <BookSelect
                        book={panel.book.name}
                        books={books ?? []}
                        updatePanel={handleBookUpdate}
                    />
                    <ChapterSelect
                        chapter={panel.chapter}
                        maxChapters={readingPanelData.book.numberOfChapters}
                        updatePanel={handleChapterUpdate}
                    />
                </div>
            </div>

            {/* Panel Content */}
            <div className="flex-1 min-h-0 overflow-hidden">
                <ScrollArea className="h-full p-4">
                    <div className="space-y-3">
                        {readingPanelData.verses.length > 0 ? (
                            readingPanelData.verses.map((v: ReadingPanelVerse) => (
                                <Scriptures
                                    key={`${panel.book.name}-${panel.chapter}-${v.verse}`}
                                    ref={{ book: panel.book.name, chapter: panel.chapter }}
                                    number={v.verse}
                                    text={v.text}
                                    onToggleVerseSelection={onToggleVerseSelection}
                                    isSelected={isVerseSelected({ 
                                        book: panel.book.name, 
                                        chapter: panel.chapter, 
                                        verse: v.verse 
                                    })}
                                    fontSize={fontSize}
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
};
ReadingPannel.displayName = "ReadingPannel";