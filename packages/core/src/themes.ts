import type { ThemeColors, ThemeName } from './types.js';

/**
 * Predefined theme configurations
 */
export const themes: Record<ThemeName, ThemeColors> = {
  github: {
    background: '#ffffff',
    empty: '#ebedf0',
    levels: ['#9be9a8', '#40c463', '#30a14e', '#216e39', '#0d4429'],
  },
  dark: {
    background: '#0d1117',
    empty: '#161b22',
    levels: ['#0e4429', '#006d32', '#26a641', '#39d353', '#57e36e'],
  },
  light: {
    background: '#ffffff',
    empty: '#f0f0f0',
    levels: ['#c6e48b', '#7bc96f', '#49af5d', '#2e8840', '#196127'],
  },
};

/**
 * Get theme colors by name
 */
export function getTheme(name: ThemeName): ThemeColors {
  return themes[name];
}

/**
 * Determine the color level based on contribution count
 * Uses GitHub's algorithm: 0, 1-3, 4-6, 7-9, 10+
 */
export function getColorLevel(count: number): number {
  if (count === 0) return -1; // Use empty color
  if (count <= 3) return 0;
  if (count <= 6) return 1;
  if (count <= 9) return 2;
  if (count <= 12) return 3;
  return 4;
}
