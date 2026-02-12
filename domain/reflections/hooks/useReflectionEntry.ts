"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { useEditor } from "@tiptap/react";
import type { Editor } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import type { Entry } from "../components/reflection-entry";
import { formatEntryDates, type EntryFormattedDates } from "../utils/formatDate";

const EDITOR_PLACEHOLDER =
  "What's on your heart? Write your thoughts, questions, or insights...";

export interface UseReflectionEntryParams {
  /** The reflection entry data. */
  entry: Entry;
  /** Called when the user edits content. */
  onUpdate: (content: string) => void;
  /** When true, starts in edit mode and focuses the editor. */
  isNew?: boolean;
}

export interface UseReflectionEntryReturn {
  /** TipTap editor instance. May be null before first paint. */
  editor: Editor | null;
  /** True when the user is in edit mode (editing or empty new entry). */
  isEditing: boolean;
  /** True when the entry has any text content. */
  hasContent: boolean;
  /** Word count derived from entry content. */
  wordCount: number;
  /** Pre-formatted date strings for the entry header. */
  formattedDates: EntryFormattedDates;
  /** Call to switch to edit mode and focus the end of the editor. */
  enterEditMode: () => void;
}

/**
 * Encapsulates state and behavior for a single reflection entry:
 * - TipTap editor lifecycle and content sync
 * - Edit vs view mode (based on blur and hasContent)
 * - Word count and formatted timestamps
 *
 * Use with ReflectionEntry component; the hook owns logic, the component owns layout.
 */
export function useReflectionEntry({
  entry,
  onUpdate,
  isNew = false,
}: UseReflectionEntryParams): UseReflectionEntryReturn {
  const [isEditing, setIsEditing] = useState(isNew);
  const [hasContent, setHasContent] = useState(false);

  const onUpdateRef = useRef(onUpdate);
  onUpdateRef.current = onUpdate;

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({ heading: false }),
      Placeholder.configure({
        placeholder: EDITOR_PLACEHOLDER,
        emptyEditorClass: "is-editor-empty",
      }),
    ],
    content: entry.content,
    onUpdate: ({ editor: ed }) => {
      const html = ed.getHTML();
      onUpdateRef.current(html);
      const text = ed.getText().trim();
      setHasContent(text.length > 0);
    },
    onBlur: ({ editor: ed }) => {
      const text = ed.getText().trim();
      if (text.length > 0) {
        setHasContent(true);
        setIsEditing(false);
      }
    },
    editorProps: {
      attributes: {
        class: "entry-editor-content focus:outline-none",
      },
    },
    autofocus: isNew ? "end" : false,
  });

  // Sync hasContent when entry content changes (e.g. initial load or external update).
  useEffect(() => {
    if (!editor) return;
    const text = editor.getText().trim();
    setHasContent(text.length > 0);
  }, [editor, entry.content]);

  // Reflection entry is always editable on this screen.
  useEffect(() => {
    if (!editor) return;
    editor.setEditable(true);
  }, [editor]);

  const wordCount = useMemo(() => {
    const raw = (entry.content ?? "").replace(/<[^>]*>/g, " ");
    const text = raw.replace(/\s+/g, " ").trim();
    return text ? text.split(/\s+/).length : 0;
  }, [entry.content]);

  const formattedDates = useMemo(
    () => formatEntryDates(entry.createdAt),
    [entry.createdAt]
  );

  const enterEditMode = useCallback(() => {
    setIsEditing(true);
    setTimeout(() => {
      editor?.commands.focus("end");
    }, 0);
  }, [editor]);

  return {
    editor,
    isEditing,
    hasContent,
    wordCount,
    formattedDates,
    enterEditMode,
  };
}
