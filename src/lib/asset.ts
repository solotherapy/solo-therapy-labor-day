import { existsSync } from 'fs';
import { PATHS } from '../config.js';

export function assetExists(path: string): boolean {
  return existsSync(path);
}

export function getGeneratedClipPath(filename: string): string {
  return `${PATHS.generatedClips}/${filename}`;
}

export function hasLogo(): boolean {
  return assetExists(PATHS.logo);
}

export function hasMusic(): boolean {
  return assetExists(PATHS.music);
}

export function getLogoPath(): string {
  return PATHS.logo;
}

export function getMusicPath(): string {
  return PATHS.music;
}
