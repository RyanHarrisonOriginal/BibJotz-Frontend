import { Button } from "@/components/ui/button"
import { Plus, Minus, Type } from "lucide-react"
import { VersionPanel } from "@/features/bible/components/bible-reader/types"
import { SelectedVerse } from "@/features/bible/types";
import { ScriptureSelectionBadge } from "./ScriptureSelectionBadge";
import { badgeColorSchemes } from "./ScriptureSelectionBadgeColors";

interface BibleReaderControlsProps {
    panels: VersionPanel[];
    addPanel: () => void;
    clearSelection: () => void;
    getSelectedReference: () => string[];
    selectedVerses: Set<SelectedVerse>;
    fontSize: number;
    increaseFontSize: () => void;
    decreaseFontSize: () => void;
}

const removeReference = (reference: string) => {
    console.log(reference);
}

const handleReferenceMenu = (reference: string) => {
    // Placeholder callback for menu icon
    console.log('Menu clicked for:', reference);
}



export function BibleReaderControls({ 
    panels, addPanel, clearSelection, getSelectedReference, 
    selectedVerses, fontSize, increaseFontSize, decreaseFontSize 
}: BibleReaderControlsProps) {
    return (
        <div className="px-6 py-4 border-b border-border/50 bg-muted/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-muted-foreground">
                    Viewing {panels.length} version{panels.length > 1 ? 's' : ''}
                </span>
                {panels.length < 3 && (
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={addPanel}
                        className="gap-2 hover:bg-primary/10 hover:border-primary/30 transition-all"
                    >
                        <Plus className="h-3.5 w-3.5" />
                        Add Version
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
            {selectedVerses.size > 0 && (
                <div className="flex items-center gap-3">
                    {getSelectedReference().map((reference, index) => {
                        const colorScheme = badgeColorSchemes[index % badgeColorSchemes.length];
                        return (
                            <ScriptureSelectionBadge
                                key={index}
                                reference={reference}
                                colorScheme={colorScheme}
                                index={index}
                                removeReference={() => removeReference(reference)}
                            />
                        );
                    })}
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearSelection}
                        className="hover:bg-destructive/10 hover:text-destructive transition-colors"
                    >
                        Clear
                    </Button>
                </div>
            )}
        </div>
    )
}