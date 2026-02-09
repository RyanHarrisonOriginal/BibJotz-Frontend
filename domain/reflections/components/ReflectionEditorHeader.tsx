"use client";

import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  PanelRightClose,
  PanelRightOpen,
} from "lucide-react";

interface ReflectionEditorHeaderProps {
  onBack: () => void;
  guideTitle: string;
  journeyName: string;
  bibleReaderOpen: boolean;
  onToggleBibleReader: () => void;
  onSave: () => void;
}

export function ReflectionEditorHeader({
  onBack,
  guideTitle,
  journeyName,
  bibleReaderOpen,
  onToggleBibleReader,
  onSave,
}: ReflectionEditorHeaderProps) {
  return (
    <div className="flex-shrink-0 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-12 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="gap-2 h-8"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Journey Library</span>
          </Button>

          <div className="h-4 w-px bg-border" />

          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">{guideTitle}</span>
            <span className="text-muted-foreground/50">/</span>
            <span className="font-medium">{journeyName}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={bibleReaderOpen ? "secondary" : "ghost"}
            size="sm"
            className="gap-2 h-8"
            onClick={onToggleBibleReader}
          >
            {bibleReaderOpen ? (
              <PanelRightClose className="h-4 w-4" />
            ) : (
              <PanelRightOpen className="h-4 w-4" />
            )}
            <BookOpen className="h-4 w-4" />
            <span className="hidden sm:inline">Scripture</span>
          </Button>

          <Button onClick={onSave} size="sm" className="gap-2 h-8">
            <CheckCircle2 className="h-4 w-4" />
            <span className="hidden sm:inline">Save</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
