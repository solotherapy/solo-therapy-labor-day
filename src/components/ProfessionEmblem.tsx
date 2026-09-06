import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';

interface ProfessionEmblemProps {
  seed: string;
}

const STROKE = '#F4EFE7';

// Each emblem is minimal line-work inside a 200x200 viewBox, matched to a
// clip filename. Strokes only — no fills — so they sit lightly on the field.
const ICONS: { match: string; paths: React.ReactNode }[] = [
  {
    match: 'opening',
    paths: (
      <>
        {/* Sunrise */}
        <line x1="40" y1="128" x2="160" y2="128" />
        <path d="M 68 128 A 32 32 0 0 1 132 128" />
        <line x1="100" y1="72" x2="100" y2="56" />
        <line x1="64" y1="86" x2="53" y2="75" />
        <line x1="136" y1="86" x2="147" y2="75" />
      </>
    ),
  },
  {
    match: 'worker-nurse',
    paths: (
      <>
        {/* Stethoscope */}
        <path d="M 78 44 C 78 44 78 92 100 104" />
        <path d="M 122 44 C 122 44 122 92 100 104" />
        <line x1="100" y1="104" x2="100" y2="126" />
        <circle cx="100" cy="142" r="13" />
        <circle cx="100" cy="142" r="4" />
        <circle cx="78" cy="40" r="5" />
        <circle cx="122" cy="40" r="5" />
      </>
    ),
  },
  {
    match: 'worker-teacher',
    paths: (
      <>
        {/* Open book */}
        <path d="M 100 72 C 82 60 62 60 46 68 L 46 122 C 62 114 82 114 100 124" />
        <path d="M 100 72 C 118 60 138 60 154 68 L 154 122 C 138 114 118 114 100 124" />
        <line x1="100" y1="72" x2="100" y2="124" />
      </>
    ),
  },
  {
    match: 'worker-construction',
    paths: (
      <>
        {/* Hard hat */}
        <path d="M 56 118 C 56 80 82 62 100 62 C 118 62 144 80 144 118" />
        <path d="M 42 120 Q 100 134 158 120" />
        <line x1="100" y1="62" x2="100" y2="80" />
      </>
    ),
  },
  {
    match: 'worker-chef',
    paths: (
      <>
        {/* Chef's toque */}
        <path d="M 62 96 C 52 72 72 58 84 64 C 88 48 112 48 116 64 C 128 58 148 72 138 96 L 138 112 L 62 112 Z" />
        <line x1="62" y1="128" x2="138" y2="128" />
        <line x1="62" y1="112" x2="62" y2="128" />
        <line x1="138" y1="112" x2="138" y2="128" />
        <line x1="88" y1="114" x2="88" y2="126" />
        <line x1="112" y1="114" x2="112" y2="126" />
      </>
    ),
  },
  {
    match: 'hands-farmer',
    paths: (
      <>
        {/* Wheat */}
        <line x1="100" y1="150" x2="100" y2="54" />
        <path d="M 100 78 Q 84 72 80 56 Q 96 60 100 78" />
        <path d="M 100 78 Q 116 72 120 56 Q 104 60 100 78" />
        <path d="M 100 102 Q 84 96 80 80 Q 96 84 100 102" />
        <path d="M 100 102 Q 116 96 120 80 Q 104 84 100 102" />
        <path d="M 100 126 Q 84 120 80 104 Q 96 108 100 126" />
        <path d="M 100 126 Q 116 120 120 104 Q 104 108 100 126" />
      </>
    ),
  },
  {
    match: 'hands-firefighter',
    paths: (
      <>
        {/* Flame */}
        <path d="M 100 52 C 119 76 133 90 133 114 A 33 33 0 1 1 67 114 C 67 90 81 76 100 52 Z" />
        <path d="M 100 98 C 108 107 114 113 114 124 A 14 14 0 1 1 86 124 C 86 113 92 107 100 98 Z" />
      </>
    ),
  },
  {
    match: 'hands-hairstylist',
    paths: (
      <>
        {/* Scissors */}
        <line x1="63" y1="56" x2="126" y2="119" />
        <line x1="137" y1="56" x2="74" y2="119" />
        <circle cx="66" cy="130" r="13" />
        <circle cx="134" cy="130" r="13" />
        <circle cx="100" cy="88" r="4" />
      </>
    ),
  },
  {
    match: 'hands-delivery',
    paths: (
      <>
        {/* Package */}
        <path d="M 56 82 L 100 62 L 144 82 L 144 128 L 100 148 L 56 128 Z" />
        <path d="M 56 82 L 100 100 L 144 82" />
        <line x1="100" y1="100" x2="100" y2="148" />
        <path d="M 80 71 L 122 90" />
      </>
    ),
  },
  {
    match: 'hands-business',
    paths: (
      <>
        {/* Briefcase */}
        <rect x="55" y="86" width="90" height="54" rx="9" />
        <path d="M 86 86 C 86 70 114 70 114 86" />
        <line x1="55" y1="110" x2="145" y2="110" />
        <circle cx="100" cy="110" r="4" />
      </>
    ),
  },
  {
    match: 'hands-therapist',
    paths: (
      <>
        {/* Heart held by hands */}
        <path d="M 100 122 C 66 96 76 64 100 80 C 124 64 134 96 100 122 Z" />
        <path d="M 56 116 Q 74 140 100 144" />
        <path d="M 144 116 Q 126 140 100 144" />
      </>
    ),
  },
  {
    match: 'emotion-smile',
    paths: (
      <>
        {/* Smile */}
        <circle cx="100" cy="100" r="44" />
        <path d="M 78 106 Q 100 126 122 106" />
        <circle cx="86" cy="88" r="4" />
        <circle cx="114" cy="88" r="4" />
      </>
    ),
  },
  {
    match: 'emotion-teacher',
    paths: (
      <>
        {/* Open book — a story */}
        <path d="M 100 72 C 82 60 62 60 46 68 L 46 122 C 62 114 82 114 100 124" />
        <path d="M 100 72 C 118 60 138 60 154 68 L 154 122 C 138 114 118 114 100 124" />
        <line x1="100" y1="72" x2="100" y2="124" />
      </>
    ),
  },
  {
    match: 'emotion-care',
    paths: (
      <>
        {/* Heart */}
        <path d="M 100 138 C 56 106 68 62 100 84 C 132 62 144 106 100 138 Z" />
      </>
    ),
  },
  {
    match: 'closing',
    paths: (
      <>
        {/* Sunset */}
        <line x1="40" y1="112" x2="160" y2="112" />
        <path d="M 68 112 A 32 32 0 0 1 132 112" />
        <line x1="60" y1="132" x2="88" y2="132" />
        <line x1="112" y1="132" x2="140" y2="132" />
      </>
    ),
  },
];

const pickIcon = (seed: string): React.ReactNode | null => {
  const hit = ICONS.find(i => seed.includes(i.match));
  return hit ? hit.paths : null;
};

export const ProfessionEmblem: React.FC<ProfessionEmblemProps> = ({ seed }) => {
  const frame = useCurrentFrame();
  const paths = pickIcon(seed);

  if (!paths) {
    return null;
  }

  const opacity = interpolate(frame, [6, 20], [0, 0.95], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const scale = interpolate(frame, [6, 24], [0.9, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const bob = Math.sin(frame * 0.05) * 4;

  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        top: 610,
        transform: `translate(-50%, -50%) translateY(${bob}px) scale(${scale})`,
        opacity,
        filter: 'drop-shadow(0 4px 24px rgba(0, 0, 0, 0.35))',
      }}
    >
      <svg
        width="330"
        height="330"
        viewBox="0 0 200 200"
        fill="none"
        stroke={STROKE}
        strokeWidth="5.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="100" cy="100" r="93" strokeWidth="2.5" opacity="0.55" />
        {paths}
      </svg>
    </div>
  );
};
