/**
 * Formats a date as a relative time string (e.g. "2 hours ago", "just now").
 * Used for reflection entry timestamps.
 */
export function formatRelativeTime(date: Date): string {
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
  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
  }).format(date);
}

export interface EntryFormattedDates {
  timeAgo: string;
  fullDate: string;
  time: string;
  shortDate: string;
  dateTime: string;
}

/**
 * Formats an entry's createdAt for display in the reflection entry UI.
 */
export function formatEntryDates(createdAt: Date): EntryFormattedDates {
  return {
    timeAgo: formatRelativeTime(createdAt),
    fullDate: new Intl.DateTimeFormat(undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(createdAt),
    time: new Intl.DateTimeFormat(undefined, {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(createdAt),
    shortDate: new Intl.DateTimeFormat(undefined, {
      month: "short",
      day: "numeric",
    }).format(createdAt),
    dateTime: createdAt.toISOString(),
  };
}
