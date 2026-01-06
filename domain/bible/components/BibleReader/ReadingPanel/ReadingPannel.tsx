import { ScrollArea } from "@/components/ui/ScrollArea/scroll-area";
import { ReadingPanel, ReadingPanelVerse, SelectedReadingPanelVerse } from "@/domain/bible/components/BibleReader/types";
import { TranslationSelect, BookSelect, ChapterSelect, DeletePanelButton } from "./ReadingPanelControls";
import { useCallback } from "react";
import { useBibleVersions, useBooks } from "@/domain/bible/hooks/useBibleApi";
import { useReadingPanel } from "../../../hooks/useReadingPanel";
import { ReadingPannelContent } from "./ReadingPannelContent";

interface ReadingPannelProps {
    panel: ReadingPanel;
    index: number;
    onChange: (id: number, field: keyof ReadingPanel, value: ReadingPanel[keyof ReadingPanel]) => void;
    onDelete: (id: number) => void;
    fontSize: number;
}

export const ReadingPannel = ({
    panel,
    index,
    onChange,
    onDelete,
    fontSize,
    }: ReadingPannelProps) => {

    //TO DO: Get books and translations from Provider
    
    const readingPanelData = useReadingPanel(panel)
     const { data: bibleVersions } = useBibleVersions();   
     const { data: books } = useBooks(true, readingPanelData.version);

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

    const PanelHeader = () => {
        return (
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
        )
    }


    return (
        <div
            key={panel.id}
            className="flex flex-col h-full min-h-0 border-2 border-primary/10 rounded-xl 
            overflow-hidden bg-card/50 backdrop-blur-sm shadow-sm hover:shadow-md 
            hover:border-primary/20 transition-all animate-enter"
            style={{ animationDelay: `${index * 0.1}s` }}
        >
            <PanelHeader />
            <ReadingPannelContent panel={readingPanelData} fontSize={fontSize} />
        </div>
    )
};
ReadingPannel.displayName = "ReadingPannel";