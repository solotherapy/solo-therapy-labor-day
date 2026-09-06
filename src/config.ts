export const VIDEO_CONFIG = {
  fps: 30,
  width: 1080,
  height: 1920,
  durationInSeconds: 45,
} as const;

export const STYLE = {
  colors: {
    cream: '#F4EFE7',
    warmBeige: '#D7C6AE',
    mutedSage: '#87967B',
    deepOlive: '#485343',
    warmBrown: '#8B735F',
    charcoal: '#252824',
  },
  fonts: {
    serif: 'Georgia, serif',
    sans: 'system-ui, -apple-system, sans-serif',
  },
} as const;

export const SCENE_DURATIONS = {
  opening: 5, // 0-5
  workers1: 7, // 5-12
  hands: 13, // 12-25
  emotional: 8, // 25-33
  closing: 5, // 33-38
  endCard: 7, // 38-45
} as const;

export const PATHS = {
  generatedClips: 'public/assets/generated',
  logo: 'public/assets/solo-therapy-logo.png',
  music: 'public/assets/music.mp3',
  output: 'out/solo-therapy-labor-day.mp4',
} as const;
