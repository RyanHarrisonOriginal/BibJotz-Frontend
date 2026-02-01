/**
 * Bible API: single entry point for all bible operations (queries only).
 *
 * Project standard: each domain has one entry-point API hook. For bible, each
 * query takes different params (bookName, chapterNumber, etc.), so consumers
 * typically use the re-exported hooks directly with their params. This file
 * re-exports all query hooks for backward compatibility.
 */

export {
  useBooks,
  useBookChapterInfo,
  useBookInfo,
  useVerses,
  useVerseText,
  useBibleVersions,
} from "./queries";
