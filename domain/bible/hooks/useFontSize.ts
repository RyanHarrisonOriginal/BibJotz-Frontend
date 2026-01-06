import { useState, useCallback } from "react";

export function useFontSize(initialSize: number = 14) {
  const [fontSize, setFontSize] = useState<number>(initialSize);

  const increaseFontSize = useCallback(() => {
    setFontSize(prev => Math.min(prev + 2, 24)); // Max 24px
  }, []);

  const decreaseFontSize = useCallback(() => {
    setFontSize(prev => Math.max(prev - 2, 10)); // Min 10px
  }, []);

  return {
    fontSize,
    increaseFontSize,
    decreaseFontSize,
  };
}

