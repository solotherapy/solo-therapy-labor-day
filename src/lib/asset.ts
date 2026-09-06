import { staticFile } from 'remotion';
import manifest from '../clip-manifest.json';

export function getGeneratedClipPath(filename: string): string {
  return staticFile(`assets/generated/${filename}`);
}

export function clipExists(srcOrFilename: string): boolean {
  return manifest.clips.some((clip: string) => srcOrFilename.endsWith(clip));
}

export function hasLogo(): boolean {
  return manifest.hasLogo;
}

export function hasMusic(): boolean {
  return manifest.hasMusic;
}

export function getLogoPath(): string {
  return staticFile('assets/solo-therapy-logo.png');
}

export function getMusicPath(): string {
  return staticFile('assets/music.mp3');
}
