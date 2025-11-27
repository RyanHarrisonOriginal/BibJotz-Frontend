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
}

export function ScriptureSelectionBadge({ reference, colorScheme, index, removeReference }: ScriptureSelectionBadgeProps) {
    return (
        <div
            key={index}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border"
            style={{
                backgroundColor: colorScheme.bgColor,
                borderColor: colorScheme.borderColor,
            }}
        >
            <button
                className="rounded p-0.5 transition-colors"
                style={{
                    color: colorScheme.textColor,
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = colorScheme.hoverColor;
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                }}
                aria-label={`Menu for ${reference}`}
            >
                <Menu className="h-3.5 w-3.5" style={{ color: colorScheme.textColor }} />
            </button>
            <span className="text-sm font-medium" style={{ color: colorScheme.textColor }}>
                {reference}
            </span>
            <button
                onClick={removeReference}
                className="ml-1 rounded-full p-0.5 transition-colors"
                style={{
                    color: colorScheme.textColor,
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = colorScheme.hoverColor;
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                }}
                aria-label={`Remove ${reference}`}
            >
                <Trash className="h-3.5 w-3.5" style={{ color: "var(--bright-rose)" }} />
            </button>
        </div>
    )
}