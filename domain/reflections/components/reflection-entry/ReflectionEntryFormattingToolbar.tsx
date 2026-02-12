"use client";

import { Button } from "@/components/ui/button";
import { Bold, Italic, List, Quote, Trash2 } from "lucide-react";
import { cn } from "@/public/lib/utils";
import type { Editor } from "@tiptap/core";

export interface ReflectionEntryFormattingToolbarProps {
  editor: Editor | null;
  onDelete: () => void;
}

/**
 * Toolbar for reflection entry edit mode: bold, italic, list, quote, and delete.
 */
export function ReflectionEntryFormattingToolbar({
  editor,
  onDelete,
}: ReflectionEntryFormattingToolbarProps) {
  if (!editor) {
    return (
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        className="h-8 w-8 p-0 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-1">
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={cn(
          "h-8 w-8 p-0 rounded-lg",
          editor.isActive("bold") && "bg-primary/10 text-primary"
        )}
      >
        <Bold className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={cn(
          "h-8 w-8 p-0 rounded-lg",
          editor.isActive("italic") && "bg-primary/10 text-primary"
        )}
      >
        <Italic className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={cn(
          "h-8 w-8 p-0 rounded-lg",
          editor.isActive("bulletList") && "bg-primary/10 text-primary"
        )}
      >
        <List className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={cn(
          "h-8 w-8 p-0 rounded-lg",
          editor.isActive("blockquote") && "bg-primary/10 text-primary"
        )}
      >
        <Quote className="h-4 w-4" />
      </Button>
      <div className="w-px h-5 bg-border mx-1" />
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        className="h-8 w-8 p-0 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
