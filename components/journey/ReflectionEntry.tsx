"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { Button } from "@/components/ui/button";
import {
  Bold,
  Italic,
  List,
  Quote,
  Trash2,
  Clock,
  Calendar,
  BookMarked,
  Feather,
} from "lucide-react";
import { cn } from "@/public/lib/utils";

function formatRelativeTime(date: Date): string {
  const now = new Date();
  const sec = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (sec < 60) return "just now";
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min} minute${min === 1 ? "" : "s"} ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr} hour${hr === 1 ? "" : "s"} ago`;
  const d = Math.floor(hr / 24);
  if (d < 7) return `${d} day${d === 1 ? "" : "s"} ago`;
  const w = Math.floor(d / 7);
  if (w < 4) return `${w} week${w === 1 ? "" : "s"} ago`;
  return new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric" }).format(date);
}

export interface Entry {
  id: string;
  content: string;
  createdAt: Date;
}

interface ReflectionEntryProps {
  entry: Entry;
  onUpdate: (content: string) => void;
  onDelete: () => void;
  isNew?: boolean;
  entryNumber?: number;
}

const ReflectionEntry = ({
  entry,
  onUpdate,
  onDelete,
  isNew = false,
  entryNumber = 1,
}: ReflectionEntryProps) => {
  const [isEditing, setIsEditing] = useState(isNew);
  const [hasContent, setHasContent] = useState(false);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: false,
      }),
      Placeholder.configure({
        placeholder:
          "What's on your heart? Write your thoughts, questions, or insights...",
        emptyEditorClass: "is-editor-empty",
      }),
    ],
    content: entry.content,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onUpdate(html);
      const text = editor.getText().trim();
      setHasContent(text.length > 0);
    },
    editorProps: {
      attributes: {
        class: "entry-editor-content focus:outline-none",
      },
      handleBlur: (view) => {
        const text = view.state.doc.textContent.trim();
        if (text.length > 0) {
          setHasContent(true);
          setIsEditing(false);
        }
      },
    },
    autofocus: isNew ? "end" : false,
  });

  // Sync hasContent when editor content changes (e.g. from props)
  useEffect(() => {
    if (editor) {
      const text = editor.getText().trim();
      setHasContent(text.length > 0);
    }
  }, [editor, entry.content]);

  // Word count: from editor when editing, from entry.content when in view mode
  const wordCount = useMemo(() => {
    const raw = (entry.content ?? "").replace(/<[^>]*>/g, " ");
    const text = raw.replace(/\s+/g, " ").trim();
    return text ? text.split(/\s+/).length : 0;
  }, [entry.content]);

  const handleEnterEditMode = useCallback(() => {
    setIsEditing(true);
    setTimeout(() => {
      editor?.commands.focus("end");
    }, 0);
  }, [editor]);

  const d = entry.createdAt;
  const timeAgo = formatRelativeTime(d);
  const fullDate = new Intl.DateTimeFormat(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(d);
  const time = new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(d);
  const shortDate = new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
  }).format(d);

  // View Mode - Persisted Journal Entry
  if (!isEditing && hasContent) {
    return (
      <div
        className="group relative cursor-pointer"
        onClick={handleEnterEditMode}
      >
        {/* Persisted entry card with journal-like aesthetic */}
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
          {/* Decorative left accent - like a journal binding */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/40 via-primary/20 to-secondary/30" />

          {/* Subtle corner fold effect */}
          <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-muted/50 to-transparent" />

          {/* Content wrapper */}
          <div className="pl-5 pr-6">
            {/* Compact header for view mode */}
            <div className="flex items-center justify-between py-3 border-b border-border/20">
              <div className="flex items-center gap-3">
                {/* Entry badge */}
                <div className="flex items-center justify-center w-7 h-7 rounded-full bg-primary/10 text-primary">
                  <BookMarked className="w-3.5 h-3.5" />
                </div>

                {/* Timestamp cluster */}
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-medium text-foreground/80">
                    {shortDate}
                  </span>
                  <span className="text-muted-foreground/40">·</span>
                  <span className="text-muted-foreground">{time}</span>
                  <span className="text-muted-foreground/40">·</span>
                  <span className="text-muted-foreground/60 italic text-xs">
                    {timeAgo}
                  </span>
                </div>
              </div>

              {/* Metadata + actions */}
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground/50">
                  {wordCount} {wordCount === 1 ? "word" : "words"}
                </span>

                {/* Edit hint - shows on hover */}
                <div className="flex items-center gap-1.5 text-xs text-primary/60 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Feather className="w-3 h-3" />
                  <span>Edit</span>
                </div>

                {/* Delete - shows on hover */}
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

            {/* The logged thought - non-editable view, styled like a journal entry */}
            <div
              className="py-5 entry-view-content select-text cursor-text"
              contentEditable={false}
              tabIndex={-1}
              suppressContentEditableWarning
            >
              <div
                className="prose-logged text-foreground/85 leading-relaxed font-serif"
                dangerouslySetInnerHTML={{ __html: entry.content }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Edit Mode - Active writing state
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
      {/* Active editing indicator */}
      <div className="absolute -left-1 top-6 bottom-6 w-1 rounded-full bg-primary animate-pulse" />

      {/* Entry Header */}
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
            <time dateTime={entry.createdAt.toISOString()}>{fullDate}</time>
            <span className="text-muted-foreground/40">·</span>
            <Clock className="w-3 h-3" />
            <span>{time}</span>
          </div>
        </div>

        {/* Formatting toolbar */}
        <div className="flex items-center gap-1">
          {editor && (
            <>
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
            </>
          )}
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
      </div>

      {/* Editor Content */}
      <div className="px-6 py-5 min-h-[100px]">
        <div className="prose-entry">
          <EditorContent editor={editor} />
        </div>
      </div>

      {/* Subtle footer hint */}
      <div className="px-6 pb-3">
        <p className="text-xs text-muted-foreground/40 italic">
          Click outside to save • Your thoughts are preserved
        </p>
      </div>
    </div>
  );
};

export default ReflectionEntry;
