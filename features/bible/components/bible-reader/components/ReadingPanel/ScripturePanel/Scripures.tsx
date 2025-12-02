import { memo, useCallback, useMemo, useState, useEffect } from "react";
import { SelectedReadingPanelVerse } from "../../../types";
import { getPassageColorScheme } from "@/features/bible/utils/passageColorSchemes";
import { useVerseSelectionContext } from "../../../context/VerseSelectionProvider";


interface ScripturesProps {
    number: number;
    text: string;
    key: string;
    ref: { book: string, chapter: number };
    onToggleVerseSelection: (verse: SelectedReadingPanelVerse, isShiftKey: boolean) => void;
    fontSize: number;
    
}

const Scriptures = memo(({ 
        number, 
        text, 
        ref,
        onToggleVerseSelection, 
        fontSize, 
    }: ScripturesProps) => {

    const { selectors, version } = useVerseSelectionContext();
    
    const verseObj = useMemo(() => ({ book: ref.book, chapter: ref.chapter, verse: number }), [ref.book, ref.chapter, number]);
    
    const isSelected = useMemo(() => {
        return selectors.isVerseSelected(verseObj);
    }, [version, selectors, verseObj]);
    
    const [isGlowing, setIsGlowing] = useState(false);

    const handleToggleVerseSelection = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsGlowing(true);
        onToggleVerseSelection(verseObj, e.shiftKey);
    }, [onToggleVerseSelection, verseObj]);

    const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        // Prevent text selection when shift-clicking
        if (e.shiftKey) {
            e.preventDefault();
        }
    }, []);

    useEffect(() => {
        if (isGlowing) {
            const timer = setTimeout(() => {
                setIsGlowing(false);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [isGlowing]);

    return (
        <div
            key={number}
            onClick={handleToggleVerseSelection}
            onMouseDown={handleMouseDown}
            className={`group cursor-pointer p-3 my-3 rounded-lg transition-all duration-200 border-2 select-none ${
                isSelected ? 'shadow-sm scale-[1.00]' : 'border-transparent hover:bg-muted/50 hover:border-border/30'
            }`}
            style={useMemo(() => ({
                ...(isSelected ? {
                    backgroundColor: 'hsl(var(--primary) / 0.1)',
                    borderColor: 'hsl(var(--primary) / 0.3)',
                } : {}),
                ...(isGlowing ? {
                    boxShadow: `0 0 20px hsl(var(--primary) / 0.3), 0 0 10px hsl(var(--primary) / 0.3)`,
                    borderColor: 'hsl(var(--primary) / 0.3)',
                } : {})
            }), [isSelected, isGlowing])}
        >
            <div className="flex items-start gap-3">
                <span
                    className="inline-flex items-center justify-center w-7 h-7 
                    rounded-full font-bold text-xs flex-shrink-0 mt-0.5"
                    style={isSelected ? {
                        backgroundColor: 'hsl(var(--primary) / 0.1)',
                        color: 'hsl(var(--primary))',
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
                        color: isSelected ? 'hsl(var(--primary))' : 'hsl(var(--foreground))'
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