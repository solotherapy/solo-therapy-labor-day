import React from 'react';
import { AbsoluteFill } from 'remotion';

export const GlobalFilmOverlay: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        pointerEvents: 'none',
      }}
    >
      {/* Film grain */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" result="noise" /><feColorMatrix in="noise" type="saturate" values="0.3" /><feComponentTransfer in="noise"><feFuncA type="linear" slope="0.05"/></feComponentTransfer></filter><rect width="100" height="100" fill="rgba(0,0,0,0.03)" filter="url(%23noise)"/></svg>')`,
          opacity: 0.3,
        }}
      />

      {/* Soft vignette */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.15) 100%)`,
          opacity: 0.6,
        }}
      />

      {/* Warm overlay tint */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(214, 180, 140, 0.03)',
          opacity: 0.5,
        }}
      />
    </AbsoluteFill>
  );
};
