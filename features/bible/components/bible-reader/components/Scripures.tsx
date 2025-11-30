import { memo, useCallback, useMemo } from "react";
import { SelectedReadingPanelVerse } from "../types";
import { getPassageColorScheme } from "@/features/bible/utils/passageColorSchemes";


interface ScripturesProps {
    number: number;
    text: string;
    key: string;
    ref: { book: string, chapter: number };
    onToggleVerseSelection: (verse: SelectedReadingPanelVerse, isShiftKey: boolean) => void;
    fontSize: number;
    isSelected: boolean;
    
}

const Scriptures = memo(({ 
        number, 
        text, 
        ref,
        onToggleVerseSelection, 
        fontSize, 
        isSelected,
    }: ScripturesProps) => {

    //todo: do this in the hook
    const colorScheme = useMemo(() => {
        return getPassageColorScheme(number);
    }, [number]);

    const handleToggleVerseSelection = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        onToggleVerseSelection({ book: ref.book, chapter: ref.chapter, verse: number }, e.shiftKey);
    }, [onToggleVerseSelection, ref.book, ref.chapter, number]);

    return (
        <div
            key={number}
            onClick={handleToggleVerseSelection}
            className={`group cursor-pointer p-3 my-3 rounded-lg transition-all duration-200 border-2 ${
                isSelected ? 'shadow-sm scale-[1.00]' : 'border-transparent hover:bg-muted/50 hover:border-border/30'
            }`}
            style={isSelected ? {
                backgroundColor: colorScheme.bgColor,
                borderColor: colorScheme.borderColor,
            } : {}}
        >
            <div className="flex items-start gap-3">
                <span
                    className="inline-flex items-center justify-center w-7 h-7 
                    rounded-full font-bold text-xs flex-shrink-0 mt-0.5"
                    style={isSelected ? {
                        backgroundColor: colorScheme.bgColor,
                        color: colorScheme.textColor,
                    } : {
                        backgroundColor: 'hsl(var(--primary) / 0.1)',
                        color: 'hsl(var(--primary))',
                    }}
                >
                    {number}
                </span>
                <span 
                    className="font-serif leading-relaxed" 
                    style={{ 
                        fontSize: `${fontSize}px`,
                        color: isSelected ? colorScheme.textColor : 'hsl(var(--foreground))'
                    }}
                >
                    {text}
                </span>
            </div>
        </div>

    );
});
Scriptures.displayName = "Scriptures";
export default Scriptures;