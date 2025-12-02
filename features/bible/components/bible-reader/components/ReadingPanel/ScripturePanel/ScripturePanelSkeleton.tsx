import { memo } from "react";

export const ScripturePanelSkeleton = memo(({ fontSize }: { fontSize: number }) => {
    // Calculate line height based on fontSize to match the actual verse text
    const lineHeight = fontSize * 1.5; // leading-relaxed is approximately 1.5

    return (
        <div className="p-3 my-3 rounded-lg border-2 border-transparent">
            <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-muted animate-pulse flex-shrink-0 mt-0.5" />
                <div className="flex-1 space-y-2">
                    <div
                        className="w-full bg-muted rounded animate-pulse font-serif"
                        style={{
                            height: `${lineHeight}px`,
                            width: '650px',
                        }}
                    />
                    <div
                        className="w-full bg-muted rounded animate-pulse font-serif"
                        style={{
                            height: `${lineHeight}px`,
                            width: '650px',
                        }}
                    />
                </div>
            </div>
        </div>
    );
});
ScripturePanelSkeleton.displayName = "ScripturePanelSkeleton";
