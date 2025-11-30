import { Button } from "@/components/ui/button"
import { Plus, Minus, Type } from "lucide-react"
import { ReadingPanel } from "@/features/bible/components/bible-reader/types"
import { useFontSize } from "@/features/bible/components/bible-reader/hooks/useFontSize";

interface BibleReaderControlsProps {
    activePanelCount: number;
    addPanel: (panel: Omit<ReadingPanel, 'id'>) => void;
}

export function BibleReaderControls({
    activePanelCount, addPanel
}: BibleReaderControlsProps) {
    const { fontSize, increaseFontSize, decreaseFontSize } = useFontSize();
    const defaultPanel: Omit<ReadingPanel, 'id'> = { version: "BSB", book: { name: "GEN", numberOfChapters: 50 }, chapter: 1, verses: [] };
    return (
        <div className="px-6 py-4 border-b border-border/50 bg-muted/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-muted-foreground">
                    Viewing {activePanelCount} version{activePanelCount > 1 ? 's' : ''}
                </span>
                {activePanelCount < 6 && (
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addPanel(defaultPanel)}
                        className="gap-2 hover:bg-primary/10 hover:border-primary/30 transition-all"
                    >
                        <Plus className="h-3.5 w-3.5" />
                        Add Panel
                    </Button>
                )}
                <div className="flex items-center gap-2 ml-4 pl-4 border-l border-border/50">
                    <Type className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Font:</span>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={decreaseFontSize}
                        className="h-7 w-7 p-0 hover:bg-primary/10 hover:border-primary/30 transition-all"
                        disabled={fontSize <= 10}
                    >
                        <Minus className="h-3.5 w-3.5" />
                    </Button>
                    <span className="text-xs font-medium text-foreground min-w-[2rem] text-center">
                        {fontSize}px
                    </span>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={increaseFontSize}
                        className="h-7 w-7 p-0 hover:bg-primary/10 hover:border-primary/30 transition-all"
                        disabled={fontSize >= 24}
                    >
                        <Plus className="h-3.5 w-3.5" />
                    </Button>
                </div>
            </div>
        </div>
    )
}