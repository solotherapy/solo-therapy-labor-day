import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, random } from 'remotion';

interface PlaceholderClipProps {
  startFrame: number;
  duration: number;
  text?: string;
  seed?: string;
}

interface Palette {
  base: string;
  deep: string;
  orbs: string[];
  glow: string;
}

// Scene palettes keyed by clip filename fragments — each chapter of the film
// gets its own cinematic color field, all within the brand palette family.
const PALETTES: { match: string; palette: Palette }[] = [
  {
    match: 'opening',
    palette: {
      base: '#22261F',
      deep: '#485343',
      orbs: ['#D7C6AE', '#87967B', '#8B735F'],
      glow: '#D7C6AE',
    },
  },
  {
    match: 'worker',
    palette: {
      base: '#2E362A',
      deep: '#485343',
      orbs: ['#87967B', '#D7C6AE', '#87967B'],
      glow: '#87967B',
    },
  },
  {
    match: 'hands',
    palette: {
      base: '#332F26',
      deep: '#5A4A3B',
      orbs: ['#8B735F', '#D7C6AE', '#87967B'],
      glow: '#8B735F',
    },
  },
  {
    match: 'emotion',
    palette: {
      base: '#292420',
      deep: '#4A3A30',
      orbs: ['#8B735F', '#D7C6AE', '#8B735F'],
      glow: '#D7C6AE',
    },
  },
  {
    match: 'closing',
    palette: {
      base: '#22261F',
      deep: '#43503F',
      orbs: ['#8B735F', '#D7C6AE', '#87967B'],
      glow: '#D7C6AE',
    },
  },
];

const pickPalette = (seed: string): Palette => {
  const hit = PALETTES.find(p => seed.includes(p.match));
  return hit ? hit.palette : PALETTES[0].palette;
};

export const PlaceholderClip: React.FC<PlaceholderClipProps> = ({
  duration,
  seed = 'scene',
}) => {
  const frame = useCurrentFrame();
  const palette = pickPalette(seed);

  const isOpening = seed.includes('opening');
  const isClosing = seed.includes('closing');

  // Fade the whole film in at the very start and out before the end card.
  const opacity = isOpening
    ? interpolate(frame, [0, 14], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      })
    : isClosing
      ? interpolate(frame, [duration - 14, duration], [1, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        })
      : 1;

  // Slow Ken Burns push-in over the shot.
  const scale = 1 + frame * 0.00018;

  // The glow rises at dawn, sinks at dusk, and breathes gently elsewhere.
  const glowDrift = isClosing ? frame * 0.5 : -frame * 0.35;

  const orbs = [0, 1, 2].map(i => {
    const x0 = random(`${seed}-x${i}`) * 1080;
    const y0 = 200 + random(`${seed}-y${i}`) * 1400;
    const r = 260 + random(`${seed}-r${i}`) * 240;
    const x = x0 + Math.sin(frame * 0.006 + i * 2.1) * 46;
    const y = y0 + Math.cos(frame * 0.005 + i * 1.35) * 56;
    return { x, y, r, color: palette.orbs[i % palette.orbs.length] };
  });

  return (
    <AbsoluteFill style={{ backgroundColor: '#000' }}>
      <AbsoluteFill
        style={{
          opacity,
          transform: `scale(${scale})`,
          background: `linear-gradient(178deg, ${palette.base} 0%, ${palette.deep} 62%, ${palette.base} 100%)`,
        }}
      >
        {/* Drifting light fields */}
        {orbs.map((orb, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: orb.x - orb.r,
              top: orb.y - orb.r,
              width: orb.r * 2,
              height: orb.r * 2,
              borderRadius: '50%',
              backgroundColor: orb.color,
              opacity: 0.26,
              filter: 'blur(90px)',
            }}
          />
        ))}

        {/* Horizon glow — rises at dawn, sinks at dusk */}
        <div
          style={{
            position: 'absolute',
            left: -200,
            right: -200,
            top: isClosing ? 1150 : 1250,
            height: 900,
            transform: `translateY(${glowDrift}px)`,
            background: `radial-gradient(ellipse 70% 45% at 50% 45%, ${palette.glow}55 0%, transparent 70%)`,
          }}
        />

        {/* Soft top shade for text legibility */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(0,0,0,0.22) 0%, rgba(0,0,0,0) 32%)',
          }}
        />

        {/* Vignette */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse 90% 75% at 50% 46%, transparent 45%, rgba(0,0,0,0.38) 100%)',
          }}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
