"use client";

import { EditorContent } from "@tiptap/react";
import { Button } from "@/components/ui/button";
import { BookMarked, Feather, Trash2 } from "lucide-react";
import { cn } from "@/public/lib/utils";
import type { Editor } from "@tiptap/react";

export interface ReflectionEntryViewModeProps {
  editor: Editor | null;
  wordCount: number;
  shortDate: string;
  time: string;
  timeAgo: string;
  onEnterEditMode: () => void;
  onDelete: () => void;
}

/**
 * Read-only view of a reflection entry: card with timestamp header,
 * word count, edit hint, delete, and non-editable editor content.
 */
export function ReflectionEntryViewMode({
  editor,
  wordCount,
  shortDate,
  time,
  timeAgo,
  onEnterEditMode,
  onDelete,
}: ReflectionEntryViewModeProps) {
  return (
    <div
      className="group relative cursor-pointer"
      onClick={onEnterEditMode}
    >
      <div
        className={cn(
          "relative overflow-hidden",
          "bg-gradient-to-br from-card via-card to-secondary/5",
          "rounded-2xl border border-border/40",
          "shadow-sm",
          "transition-all duration-300 ease-out",
          "hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20",
          "hover:-translate-y-0.5"
        )}
      >
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/40 via-primary/20 to-secondary/30" />
        <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-muted/50 to-transparent" />

        <div className="pl-5 pr-6">
          <div className="flex items-center justify-between py-3 border-b border-border/20">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-7 h-7 rounded-full bg-primary/10 text-primary">
                <BookMarked className="w-3.5 h-3.5" />
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="font-medium text-foreground/80">{shortDate}</span>
                <span className="text-muted-foreground/40">·</span>
                <span className="text-muted-foreground">{time}</span>
                <span className="text-muted-foreground/40">·</span>
                <span className="text-muted-foreground/60 italic text-xs">
                  {timeAgo}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground/50">
                {wordCount} {wordCount === 1 ? "word" : "words"}
              </span>
              <div className="flex items-center gap-1.5 text-xs text-primary/60 opacity-0 group-hover:opacity-100 transition-opacity">
                <Feather className="w-3 h-3" />
                <span>Edit</span>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete();
                }}
                className="h-7 w-7 p-0 rounded-lg text-muted-foreground/50 hover:text-destructive hover:bg-destructive/10 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>

          <div className="py-5 entry-view-content select-text cursor-text">
            <div className="prose-logged text-foreground/85 leading-relaxed font-serif">
              {editor && <EditorContent editor={editor} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
