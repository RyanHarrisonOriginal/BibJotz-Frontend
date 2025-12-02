/**
 * Generalized passage highlighting color scheme generator
 * 
 * Generates color schemes for highlighting passages, references, and other biblical content.
 * Uses HSL color space with consistent brightness for visual harmony.
 */

export interface PassageColorScheme {
  /** Background color with opacity */
  bgColor: string;
  /** Border color with opacity */
  borderColor: string;
  /** Text color (typically uses CSS variable for theme consistency) */
  textColor: string;
  /** Hover state background color with opacity */
  hoverColor: string;
}

export interface PassageColorSchemeOptions {
  /** Number of color schemes to generate */
  count?: number;
  /** Base saturation percentage (default: 80) */
  baseSaturation?: number;
  /** Saturation variation range (default: 3) */
  saturationVariation?: number;
  /** Base lightness percentage (default: 60) */
  baseLightness?: number;
  /** Lightness variation range (default: 3) */
  lightnessVariation?: number;
  /** Background opacity (default: 0.15) */
  bgOpacity?: number;
  /** Border opacity (default: 0.30) */
  borderOpacity?: number;
  /** Hover opacity (default: 0.25) */
  hoverOpacity?: number;
  /** Custom text color (default: uses CSS variable) */
  textColor?: string;
}

/**
 * Generates color schemes for passage highlighting
 * 
 * @param options Configuration options for color scheme generation
 * @returns Array of color scheme objects
 * 
 * @example
 * ```ts
 * const schemes = generatePassageColorSchemes({ count: 10 });
 * const firstScheme = schemes[0]; // Use for first passage
 * ```
 */
export function generatePassageColorSchemes(
  options: PassageColorSchemeOptions = {}
): PassageColorScheme[] {
  const {
    count = 66,
    baseSaturation = 80,
    saturationVariation = 3,
    baseLightness = 60,
    lightnessVariation = 3,
    bgOpacity = 0.15,
    borderOpacity = 0.30,
    hoverOpacity = 0.25,
    textColor = 'hsl(var(--foreground))',
  } = options;

  const schemes: PassageColorScheme[] = [];
  const hueStep = 360 / count; // Evenly distribute hues across the color wheel

  for (let i = 0; i < count; i++) {
    const hue = Math.round(i * hueStep) % 360;
    // Vary saturation and lightness for visual interest while maintaining consistency
    const saturation = baseSaturation + (i % 3) * saturationVariation;
    const lightness = baseLightness + (i % 2) * lightnessVariation;
    
    const colorValue = `${hue} ${saturation}% ${lightness}%`;
    
    schemes.push({
      bgColor: `hsl(${colorValue} / ${bgOpacity})`,
      borderColor: `hsl(${colorValue} / ${borderOpacity})`,
      textColor,
      hoverColor: `hsl(${colorValue} / ${hoverOpacity})`,
    });
  }

  return schemes;
}

/**
 * Gets a color scheme by index, cycling through available schemes
 * 
 * @param index The index of the item
 * @param schemes Array of color schemes (defaults to 66 schemes)
 * @returns A color scheme object
 * 
 * @example
 * ```ts
 * const scheme = getPassageColorScheme(0); // First scheme
 * const scheme2 = getPassageColorScheme(67); // Cycles back to first scheme
 * ```
 */
export function getPassageColorScheme(
  index: number,
  schemes: PassageColorScheme[] = generatePassageColorSchemes()
): PassageColorScheme {
  return schemes[index % schemes.length];
}

/**
 * Pre-generated color schemes for 66 books of the Bible
 * This is a convenience export for backward compatibility
 */
export const bibleBookColorSchemes = generatePassageColorSchemes({ count: 66 });



