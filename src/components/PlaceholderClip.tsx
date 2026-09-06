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
  warmFloor: string;
  orbs: string[];
  glow: string;
  glowWarm: string;
}

// Per-shot palettes, matched by clip filename. Specific entries come before
// generic ones. The film ramps: dark cool dawn -> brightening sage day ->
// warm craft browns -> intimate ember -> darker warm dusk.
const PALETTES: { match: string; palette: Palette }[] = [
  {
    match: 'opening',
    palette: {
      base: '#22261F',
      deep: '#485343',
      warmFloor: '#5C4F3B',
      orbs: ['#87967B', '#D7C6AE', '#8B735F'],
      glow: '#D7C6AE',
      glowWarm: '#8B735F',
    },
  },
  {
    match: 'worker-nurse',
    palette: {
      base: '#2A3226',
      deep: '#485343',
      warmFloor: '#48503C',
      orbs: ['#87967B', '#D7C6AE', '#87967B'],
      glow: '#87967B',
      glowWarm: '#87967B',
    },
  },
  {
    match: 'worker-teacher',
    palette: {
      base: '#3C463A',
      deep: '#5C6B52',
      warmFloor: '#556044',
      orbs: ['#D7C6AE', '#87967B', '#D7C6AE'],
      glow: '#D7C6AE',
      glowWarm: '#D7C6AE',
    },
  },
  {
    match: 'worker-construction',
    palette: {
      base: '#332F27',
      deep: '#4E4536',
      warmFloor: '#5A4C39',
      orbs: ['#8B735F', '#D7C6AE', '#87967B'],
      glow: '#8B735F',
      glowWarm: '#8B735F',
    },
  },
  {
    match: 'worker-chef',
    palette: {
      base: '#3A382C',
      deep: '#5A5240',
      warmFloor: '#6B5C45',
      orbs: ['#D7C6AE', '#8B735F', '#D7C6AE'],
      glow: '#D7C6AE',
      glowWarm: '#8B735F',
    },
  },
  {
    match: 'hands-farmer',
    palette: {
      base: '#35322A',
      deep: '#57483A',
      warmFloor: '#5E4F3D',
      orbs: ['#8B735F', '#D7C6AE', '#87967B'],
      glow: '#8B735F',
      glowWarm: '#8B735F',
    },
  },
  {
    match: 'hands-firefighter',
    palette: {
      base: '#322A24',
      deep: '#544233',
      warmFloor: '#5C4936',
      orbs: ['#8B735F', '#D7C6AE', '#8B735F'],
      glow: '#8B735F',
      glowWarm: '#8B735F',
    },
  },
  {
    match: 'hands-hairstylist',
    palette: {
      base: '#37332B',
      deep: '#5C4E3E',
      warmFloor: '#665744',
      orbs: ['#D7C6AE', '#8B735F', '#D7C6AE'],
      glow: '#D7C6AE',
      glowWarm: '#8B735F',
    },
  },
  {
    match: 'hands-delivery',
    palette: {
      base: '#33352C',
      deep: '#524A39',
      warmFloor: '#5A5040',
      orbs: ['#87967B', '#D7C6AE', '#8B735F'],
      glow: '#8B735F',
      glowWarm: '#8B735F',
    },
  },
  {
    match: 'hands-business',
    palette: {
      base: '#2E2C26',
      deep: '#4C4336',
      warmFloor: '#564B3A',
      orbs: ['#D7C6AE', '#87967B', '#8B735F'],
      glow: '#D7C6AE',
      glowWarm: '#8B735F',
    },
  },
  {
    match: 'hands-therapist',
    palette: {
      base: '#383327',
      deep: '#5E5040',
      warmFloor: '#6B5A45',
      orbs: ['#D7C6AE', '#8B735F', '#D7C6AE'],
      glow: '#D7C6AE',
      glowWarm: '#8B735F',
    },
  },
  {
    match: 'emotion',
    palette: {
      base: '#292420',
      deep: '#4A3A30',
      warmFloor: '#524133',
      orbs: ['#8B735F', '#D7C6AE', '#8B735F'],
      glow: '#D7C6AE',
      glowWarm: '#8B735F',
    },
  },
  {
    match: 'closing',
    palette: {
      base: '#1F221C',
      deep: '#3E3A2F',
      warmFloor: '#4E4232',
      orbs: ['#8B735F', '#D7C6AE', '#87967B'],
      glow: '#8B735F',
      glowWarm: '#8B735F',
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

  // Keep the drifting light masses in the top and bottom thirds so the
  // central text band always sits on evenly dark ground.
  const orbs = [0, 1, 2].map(i => {
    const topBand = random(`${seed}-b${i}`) < 0.5;
    const x0 = random(`${seed}-x${i}`) * 1080;
    const y0 = topBand
      ? 140 + random(`${seed}-y${i}`) * 440
      : 1240 + random(`${seed}-y${i}`) * 420;
    const r = 260 + random(`${seed}-r${i}`) * 240;
    const x = x0 + Math.sin(frame * 0.006 + i * 2.1) * 46;
    const y = y0 + Math.cos(frame * 0.005 + i * 1.35) * 40;
    return { x, y, r, color: palette.orbs[i % palette.orbs.length] };
  });

  return (
    <AbsoluteFill style={{ backgroundColor: '#000' }}>
      <AbsoluteFill
        style={{
          opacity,
          transform: `scale(${scale})`,
          background: `linear-gradient(178deg, ${palette.base} 0%, ${palette.deep} 58%, ${palette.warmFloor} 100%)`,
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
              opacity: 0.3,
              filter: 'blur(110px)',
            }}
          />
        ))}

        {/* Warm horizon glow — rises at dawn, sinks at dusk */}
        <div
          style={{
            position: 'absolute',
            left: -200,
            right: -200,
            top: isClosing ? 1080 : isOpening ? 1020 : 1180,
            height: 1000,
            transform: `translateY(${glowDrift}px)`,
            background: `radial-gradient(ellipse 72% 48% at 50% 45%, ${palette.glow}77 0%, ${palette.glowWarm}44 42%, transparent 72%)`,
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
