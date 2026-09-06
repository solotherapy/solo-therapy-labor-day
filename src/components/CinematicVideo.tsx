import React from 'react';
import { AbsoluteFill, Video, useCurrentFrame, interpolate, Img } from 'remotion';
import { STYLE } from '../config.js';
import { PlaceholderClip } from './PlaceholderClip.js';
import { existsSync } from 'fs';

interface CinematicVideoProps {
  src: string;
  startFrame: number;
  duration: number;
  enableZoom?: boolean;
  darkOverlay?: boolean;
  warmOverlay?: boolean;
  fallbackText?: string;
}

export const CinematicVideo: React.FC<CinematicVideoProps> = ({
  src,
  startFrame,
  duration,
  enableZoom = false,
  darkOverlay = false,
  warmOverlay = true,
  fallbackText,
}) => {
  const frame = useCurrentFrame();
  const isVisible = frame >= startFrame && frame < startFrame + duration;

  // Check if file exists
  const fileExists = existsSync(src);

  if (!fileExists) {
    console.warn(`Video file not found: ${src}, using placeholder`);
    return (
      <PlaceholderClip
        startFrame={startFrame}
        duration={duration}
        text={fallbackText}
      />
    );
  }

  const scale = enableZoom ? 1 + (frame - startFrame) * 0.0001 : 1;

  return (
    <AbsoluteFill>
      <div
        style={{
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          backgroundColor: '#000',
        }}
      >
        <Video
          src={src}
          startFrom={0}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: `scale(${scale})`,
            transition: 'none',
          }}
        />

        {warmOverlay && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(214, 180, 140, 0.08)',
              pointerEvents: 'none',
            }}
          />
        )}

        {darkOverlay && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
              pointerEvents: 'none',
            }}
          />
        )}
      </div>
    </AbsoluteFill>
  );
};
