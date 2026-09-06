import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  spring,
} from 'remotion';
import { STYLE } from '../config.js';

interface CinematicTextProps {
  text: string | string[];
  startFrame: number;
  endFrame: number;
  fontSize?: number;
  fontFamily?: 'serif' | 'sans';
  color?: string;
  align?: 'center' | 'left' | 'right';
  fadeInDuration?: number;
  fadeOutDuration?: number;
  motionOffset?: number;
}

export const CinematicText: React.FC<CinematicTextProps> = ({
  text,
  startFrame,
  endFrame,
  fontSize = 72,
  fontFamily = 'serif',
  color = '#F4EFE7',
  align = 'center',
  fadeInDuration = 15,
  fadeOutDuration = 15,
  motionOffset = 20,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const frameInSequence = frame - startFrame;
  const sequenceDuration = endFrame - startFrame;

  const isVisible = frame >= startFrame && frame < endFrame;

  if (!isVisible) {
    return null;
  }

  const fadeInProgress = Math.min(1, frameInSequence / fadeInDuration);
  const fadeOutStart = sequenceDuration - fadeOutDuration;
  const fadeOutProgress = Math.max(
    0,
    (frameInSequence - fadeOutStart) / fadeOutDuration
  );

  const opacity = Math.max(0, 1 - fadeOutProgress) * fadeInProgress;
  const yOffset = interpolate(fadeInProgress, [0, 1], [motionOffset, 0]);

  const fontFamily_ = fontFamily === 'serif' ? STYLE.fonts.serif : STYLE.fonts.sans;

  const textLines = Array.isArray(text) ? text : [text];

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0 40px',
      }}
    >
      <div
        style={{
          textAlign: align,
          opacity,
          transform: `translateY(${yOffset}px)`,
          transition: 'none',
        }}
      >
        {textLines.map((line, idx) => (
          <div
            key={idx}
            style={{
              fontSize: `${fontSize}px`,
              fontFamily: fontFamily_,
              color,
              fontWeight: fontFamily === 'serif' ? 400 : 500,
              lineHeight: 1.2,
              margin: '0.3em 0',
              letterSpacing: fontFamily === 'serif' ? '-0.02em' : '0.01em',
            }}
          >
            {line}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
