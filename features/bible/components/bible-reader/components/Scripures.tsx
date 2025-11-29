import { SelectedVerse } from "@/features/bible/types";
import { memo, useCallback, useMemo, useEffect } from "react";
import { badgeColorSchemes } from "./ScriptureSelectionBadgeColors";


interface ScripturesProps {
    number: number;
    text: string;
    onClick: (verse: SelectedVerse, isShiftKey: boolean) => void;
    fontSize: number;
    book: string;
    chapter: number;
    index: number;
    selectedVerses: Set<SelectedVerse>;
    checkVerseIsInArray: (arr: SelectedVerse[], verse: SelectedVerse) => boolean;
    getBookChapterArray: (refs: SelectedVerse[]) => string[];
    colorScheme: {
        bgColor: string;
        borderColor: string;
        textColor: string;
        hoverColor: string;
    };
}

const Scriptures = memo(({ 
        number, text, onClick, fontSize, 
        book, chapter, index, selectedVerses, 
        checkVerseIsInArray,
        getBookChapterArray,
        colorScheme
    }: ScripturesProps) => {

    const selectedVerse = useMemo(() => ({ book, chapter, verse: number }), [book, chapter, number]);
    
    const isSelected = useMemo(() => {
        return checkVerseIsInArray(Array.from(selectedVerses), selectedVerse);
    }, [selectedVerses, selectedVerse, checkVerseIsInArray]);
    
    const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        onClick(selectedVerse, e.shiftKey);
    }, [onClick, selectedVerse]);

    return (
        <div
            key={number}
            onClick={handleClick}
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