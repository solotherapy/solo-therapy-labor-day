// Easing functions for animations
export const easing = {
  in: (x: number) => x * x,
  out: (x: number) => 1 - (1 - x) * (1 - x),
  inOut: (x: number) => (x < 0.5 ? 2 * x * x : -1 + (4 - 2 * x) * x),
  smooth: (x: number) => x * x * (3 - 2 * x),
};

// Animation timing constants
export const fade = {
  duration: 15, // frames at 30fps = 0.5s
};

export const zoom = {
  duration: 120, // frames = 4s for slow cinematic zoom
  scale: 1.05,
};
