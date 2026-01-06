/**
 * Color scheme configurations for scripture selection badges
 * 
 * Uses the generalized passage color scheme generator for consistency
 * across the application.
 */

import { bibleBookColorSchemes, type PassageColorScheme } from '@/domain/bible/utils/passageColorSchemes';

/**
 * Pre-generated color schemes for 66 books of the Bible
 * @deprecated Use bibleBookColorSchemes from @/features/bible/utils/passageColorSchemes instead
 */
export const badgeColorSchemes: PassageColorScheme[] = bibleBookColorSchemes;

// Re-export for convenience
export { bibleBookColorSchemes, type PassageColorScheme } from '@/domain/bible/utils/passageColorSchemes';