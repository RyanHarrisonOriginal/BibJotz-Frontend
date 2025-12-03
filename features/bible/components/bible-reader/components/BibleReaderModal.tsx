'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/Dialogue/dialogue";
import { useEffect, useState } from "react";
import { BibleReader } from "./BibleReader";
import { SelectedReadingPanelVerse, SelectedReadingPanelVerses } from "../types";
import { VerseSelectionProvider } from "../context/VerseSelectionProvider";

type ActionButtonComponentProps = {
    onClick: () => void;
    color?: string;
    text: string;
}

interface BibleReaderModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    verseSelectionCallback?: (verse: SelectedReadingPanelVerse) => void;
    actionButtonCallback?: (verses: SelectedReadingPanelVerses) => void;
    ActionButtonComponent?: React.ComponentType<ActionButtonComponentProps>;
    actionButtonText: string;
}

export function BibleReaderModal({
    open,
    onOpenChange,
    actionButtonText,
    actionButtonCallback = () => { },
     }: BibleReaderModalProps) {
    // Only mount on client to avoid hydration issues
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);


    if (!mounted) {
        return null;
    }


    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-[95vw] max-w-[95vw] h-[95vh] p-0 bg-background">
                <DialogHeader className="p-6 pb-4 border-b border-primary/10 bg-background">
                    <DialogTitle className="text-2xl font-serif text-primary">Bible Reader</DialogTitle>
                    <p className="text-sm text-muted-foreground mt-1">Select verses to add to your guide</p>
                </DialogHeader>
                <VerseSelectionProvider>
                    <BibleReader
                        onOpenChange={onOpenChange}
                        actionButtonText={actionButtonText}
                        actionButtonCallback={actionButtonCallback}
                    />
                </VerseSelectionProvider>
            </DialogContent>
        </Dialog>
    );
}
