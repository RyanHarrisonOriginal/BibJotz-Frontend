"use client";

import { useReflectionEntry } from "../../hooks/useReflectionEntry";
import { ReflectionEntryEditMode } from "./ReflectionEntryEditMode";

export interface Entry {
  id: string;
  content: string;
  createdAt: Date;
}

/** Props: data (entry) and callbacks (onUpdate, onDelete). */
interface ReflectionEntryProps {
  entry: Entry;
  onUpdate: (content: string) => void;
  onDelete: () => void;
  isNew?: boolean;
  entryNumber?: number;
}

/**
 * A single reflection entry: always editable (editor + toolbar).
 */
export function ReflectionEntry({
  entry,
  onUpdate,
  onDelete,
  isNew = false,
}: ReflectionEntryProps) {
  const { editor, hasContent, formattedDates } = useReflectionEntry({
    entry,
    onUpdate,
    isNew,
  });

  const { fullDate, time, dateTime } = formattedDates;

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
