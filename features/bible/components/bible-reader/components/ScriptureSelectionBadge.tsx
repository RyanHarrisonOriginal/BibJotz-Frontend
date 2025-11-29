import { Menu, Trash } from "lucide-react";

interface ScriptureSelectionBadgeProps {
    reference: string;
    index: number;
    colorScheme: {
        bgColor: string;
        borderColor: string;
        textColor: string;
        hoverColor: string;
    };
    removeReference: () => void;
    maxWidth?: number;
}

export function ScriptureSelectionBadge({ 
    reference, 
    colorScheme, 
    index, 
    removeReference,
    maxWidth = 180 
}: ScriptureSelectionBadgeProps) {
    
    return (
        <div
            key={index}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border flex-shrink-0 group relative min-h-[28px]"
            style={{
                backgroundColor: colorScheme.bgColor,
                borderColor: colorScheme.borderColor,
                maxWidth: `${maxWidth}px`,
            }}
        >
            <button
                className="rounded p-0.5 transition-colors flex-shrink-0 hover:bg-black/5"
                style={{
                    color: colorScheme.textColor,
                }}
                aria-label={`Menu for ${reference}`}
            >
                <Menu className="h-3 w-3" style={{ color: colorScheme.textColor }} />
            </button>
            <span 
                className="text-xs font-medium truncate cursor-default flex-1 min-w-0" 
                style={{ color: colorScheme.textColor }}
                title={reference}
            >
                {reference}
            </span>
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    removeReference();
                }}
                className="rounded-full p-0.5 transition-all flex-shrink-0 opacity-0 group-hover:opacity-100 hover:bg-black/5"
                style={{
                    color: colorScheme.textColor,
                }}
                aria-label={`Remove ${reference}`}
            >
                <Trash className="h-3 w-3" style={{ color: colorScheme.textColor }} />
            </button>
        </div>
    )
}