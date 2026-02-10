"use client";

import { useReflectionEntry } from "../hooks/useReflectionEntry";
import { ReflectionEntryViewMode } from "./ReflectionEntryViewMode";
import { ReflectionEntryEditMode } from "./ReflectionEntryEditMode";

export interface Entry {
  id: string;
  content: string;
  createdAt: Date;
}

/** Props: data (entry) and callbacks (onUpdate, onDelete). Local UI state (edit/view mode) is internal. */
interface ReflectionEntryProps {
  entry: Entry;
  onUpdate: (content: string) => void;
  onDelete: () => void;
  isNew?: boolean;
  entryNumber?: number;
}

/**
 * A single reflection entry: view mode (read-only card) or edit mode (editor + toolbar).
 * Composes useReflectionEntry with view/edit subcomponents.
 */
export function ReflectionEntry({
  entry,
  onUpdate,
  onDelete,
  isNew = false,
}: ReflectionEntryProps) {
  const {
    editor,
    isEditing,
    hasContent,
    wordCount,
    formattedDates,
    enterEditMode,
  } = useReflectionEntry({ entry, onUpdate, isNew });

  const { shortDate, time, timeAgo, fullDate, dateTime } = formattedDates;

  if (!isEditing && hasContent) {
    return (
      <ReflectionEntryViewMode
        editor={editor}
        wordCount={wordCount}
        shortDate={shortDate}
        time={time}
        timeAgo={timeAgo}
        onEnterEditMode={enterEditMode}
        onDelete={onDelete}
      />
    );
  }

  return (
    <ReflectionEntryEditMode
      editor={editor}
      isNew={isNew}
      hasContent={hasContent}
      fullDate={fullDate}
      time={time}
      dateTime={dateTime}
      onDelete={onDelete}
    />
  );
}
