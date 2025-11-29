import { ScrollArea } from "@/components/ui/ScrollArea/scroll-area";
import { Button } from "@/components/ui/button";
import { Trash2, Menu } from "lucide-react";
import { SelectedVerse } from "@/features/bible/types";
import { memo, useCallback } from "react";

interface ScriptureSelectionListProps {
    references: { reference: string; colorScheme: { bgColor: string; borderColor: string; textColor: string; hoverColor: string; } }[];
    selectedVerses: Set<SelectedVerse>;
    clearSelection: () => void;
    removeReference: (reference: string) => void;
}

export const ScriptureSelectionList = memo(({
    references,
    selectedVerses,
    clearSelection,
    removeReference
}: ScriptureSelectionListProps) => {
    
    const handleReferenceMenu = useCallback((reference: string) => {
        // Placeholder callback for menu icon
        console.log('Menu clicked for:', reference);
    }, []);

    if (selectedVerses.size === 0) {
        return null;
    }

    return (
        <div className="flex flex-col h-full min-h-0 border-2 border-primary/10 rounded-xl overflow-hidden bg-card/50 backdrop-blur-sm shadow-sm hover:shadow-md hover:border-primary/20 transition-all w-64 flex-shrink-0">
            {/* Header */}
            <div className="flex-shrink-0 p-4 border-b border-border/30 bg-background">
                <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-foreground">Selected References</h3>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearSelection}
                        className="h-7 px-2 text-xs hover:bg-destructive/10 hover:text-destructive transition-colors"
                    >
                        Clear All
                    </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                    {selectedVerses.size} verse{selectedVerses.size !== 1 ? 's' : ''} selected
                </p>
            </div>

            {/* List Content */}
            <div className="flex-1 min-h-0 overflow-hidden">
                <ScrollArea className="h-full">
                    <div className="p-3 space-y-2">
                        {references.map((item, index) => {
                            const { reference, colorScheme } = item;
                            return (
                                <div
                                    key={index}
                                    className="flex items-center gap-2 px-3 py-2 rounded-md border group transition-all hover:shadow-sm"
                                    style={{
                                        backgroundColor: colorScheme.bgColor,
                                        borderColor: colorScheme.borderColor,
                                    }}
                                >
                                    <button
                                        onClick={() => handleReferenceMenu(reference)}
                                        className="rounded p-1 transition-colors flex-shrink-0 hover:bg-black/5"
                                        style={{ color: colorScheme.textColor }}
                                        aria-label={`Menu for ${reference}`}
                                    >
                                        <Menu className="h-3.5 w-3.5" style={{ color: colorScheme.textColor }} />
                                    </button>
                                    <span 
                                        className="text-sm font-medium flex-1 min-w-0 truncate" 
                                        style={{ color: colorScheme.textColor }}
                                        title={reference}
                                    >
                                        {reference}
                                    </span>
                                    <button
                                        onClick={() => removeReference(reference)}
                                        className="rounded-full p-1 transition-all flex-shrink-0 opacity-0 group-hover:opacity-100 hover:bg-black/5"
                                        style={{ color: colorScheme.textColor }}
                                        aria-label={`Remove ${reference}`}
                                    >
                                        <Trash2 className="h-3.5 w-3.5" style={{ color: colorScheme.textColor }} />
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </ScrollArea>
            </div>
        </div>
    );
});
ScriptureSelectionList.displayName = "ScriptureSelectionList";

