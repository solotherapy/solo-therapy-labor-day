import { STYLE } from '../config';

export const palette = STYLE.colors;

export function withOpacity(color: string, opacity: number): string {
  const hex = color.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

export const gradients = {
  warmToBeige: (opacity: number = 1) =>
    `linear-gradient(135deg, ${withOpacity(palette.warmBrown, opacity)}, ${withOpacity(palette.warmBeige, opacity)})`,
  creamToSage: (opacity: number = 1) =>
    `linear-gradient(135deg, ${withOpacity(palette.cream, opacity)}, ${withOpacity(palette.mutedSage, opacity)})`,
};
