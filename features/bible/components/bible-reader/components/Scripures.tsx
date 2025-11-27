import { SelectedVerse } from "@/features/bible/types";
import { memo, useCallback, useMemo } from "react";


interface ScripturesProps {
    number: number;
    text: string;
    isSelected: boolean;
    onClick: (verse: SelectedVerse, isShiftKey: boolean) => void;
    fontSize: number;
    book: string;
    chapter: number;
}

const Scriptures = memo(({ number, text, isSelected, onClick, fontSize, book, chapter }: ScripturesProps) => {
    
    const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        onClick({ book: book, chapter: chapter, verse: number }, e.shiftKey);
    }, [number, book, chapter, onClick]);

    const className = useMemo(() =>
        `group cursor-pointer p-2 rounded transition-colors ${isSelected
            ? 'bg-primary/10 border border-primary/10'
            : 'hover:bg-muted/50'
        }`,
        [isSelected]
    );

    return (
        <div
            key={number}
            onClick={handleClick}
            className={`group cursor-pointer p-3 my-3 rounded-lg transition-all duration-200 ${isSelected
                ? 'bg-primary/15 border-2 border-primary shadow-sm scale-[1.00]'
                : 'hover:bg-muted/50 border-2 border-transparent hover:border-border/30'
                }`}
        >
            <div className="flex items-start gap-3">
                <span
                    className="inline-flex items-center justify-center w-7 h-7 
                    rounded-full bg-primary/10 text-primary font-bold text-xs flex-shrink-0 mt-0.5"
                >

                    {number}
                </span>
                <span className="font-serif leading-relaxed text-foreground" style={{ fontSize: `${fontSize}px` }}>
                    {text}
                </span>
            </div>
        </div>

    );
});
Scriptures.displayName = "Scriptures";
export default Scriptures;