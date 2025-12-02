import { ScrollArea } from "@/components/ui/ScrollArea/scroll-area"
import { memo } from "react";
import { ReadingPanelVerse } from "../../types";
import Scriptures from "./ScripturePanel/Scripures";
import { ScripturePanelSkeleton } from "./ScripturePanel/ScripturePanelSkeleton";
import { ReadingPanel } from "../../types";
import { useVerseSelectionContext } from "../../context/VerseSelectionProvider";

interface ReadingPannelContentProps {
    panel: ReadingPanel;
    fontSize: number;
}

export const ReadingPannelContent = memo(({ panel, fontSize }: ReadingPannelContentProps) => {

    const { selectors, verseSelection } = useVerseSelectionContext();
    return (
        <div className="flex-1 min-h-0 overflow-hidden">
            <ScrollArea className="h-full p-4">
                <div className="space-y-3">
                    {panel.verses.length > 0 ? (
                        panel.verses.map((v: ReadingPanelVerse) => (
                            <Scriptures
                                key={`${panel.book.name}-${panel.chapter}-${v.verse}`}
                                ref={{ book: panel.book.name, chapter: panel.chapter }}
                                number={v.verse}
                                text={v.text}
                                onToggleVerseSelection={verseSelection.actions.toggleVerse}
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
    )
})
ReadingPannelContent.displayName = "ReadingPannelContent";