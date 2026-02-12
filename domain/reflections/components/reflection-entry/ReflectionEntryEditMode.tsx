"use client";

import { EditorContent } from "@tiptap/react";
import { Calendar, Clock, Feather } from "lucide-react";
import { cn } from "@/public/lib/utils";
import { ReflectionEntryFormattingToolbar } from "./ReflectionEntryFormattingToolbar";
import type { Editor } from "@tiptap/core";

export interface ReflectionEntryEditModeProps {
  editor: Editor | null;
  isNew: boolean;
  hasContent: boolean;
  fullDate: string;
  time: string;
  dateTime: string;
  onDelete: () => void;
}

/**
 * Edit mode for a reflection entry: header with title and date,
 * formatting toolbar, editor area, and footer hint.
 */
export function ReflectionEntryEditMode({
  editor,
  isNew,
  hasContent,
  fullDate,
  time,
  dateTime,
  onDelete,
}: ReflectionEntryEditModeProps) {
  return (
    <div
      className={cn(
        "group relative",
        "bg-card rounded-2xl border-2 border-primary/20",
        "shadow-lg shadow-primary/5",
        "ring-2 ring-primary/10 ring-offset-2 ring-offset-background",
        "transition-all duration-300"
      )}
    >
      <div className="absolute -left-1 top-6 bottom-6 w-1 rounded-full bg-primary animate-pulse" />

      <div className="flex items-start justify-between px-6 py-4 border-b border-border/30">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/15">
              <Feather className="w-3 h-3 text-primary" />
            </div>
            <span className="text-sm font-medium text-foreground/80">
              {isNew && !hasContent ? "New reflection" : "Editing..."}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground pl-8">
            <Calendar className="w-3 h-3" />
            <time dateTime={dateTime}>{fullDate}</time>
            <span className="text-muted-foreground/40">·</span>
            <Clock className="w-3 h-3" />
            <span>{time}</span>
          </div>
        </div>

        <ReflectionEntryFormattingToolbar editor={editor} onDelete={onDelete} />
      </div>

      <div className="px-6 py-5 min-h-[100px]">
        <div className="prose-entry">
          {editor && <EditorContent editor={editor} />}
        </div>
      </div>

      <div className="px-6 pb-3">
        <p className="text-xs text-muted-foreground/40 italic">
          Click outside to save • Your thoughts are preserved
        </p>
      </div>
    </div>
  );
}
