import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { STYLE } from '../config';

interface PlaceholderClipProps {
  startFrame: number;
  duration: number;
  text?: string;
}

export const PlaceholderClip: React.FC<PlaceholderClipProps> = ({
  startFrame,
  duration,
  text = 'Scene',
}) => {
  const frame = useCurrentFrame();
  const frameInSequence = Math.max(0, frame - startFrame);
  const progress = Math.min(1, frameInSequence / duration);

  const opacity = interpolate(
    frameInSequence,
    [0, 15, duration - 15, duration],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${STYLE.colors.warmBeige}, ${STYLE.colors.mutedSage})`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        opacity,
      }}
    >
      <div
        style={{
          fontSize: 48,
          fontFamily: STYLE.fonts.serif,
          color: STYLE.colors.deepOlive,
          textAlign: 'center',
          opacity: 0.8,
        }}
      >
        {text}
      </div>
      <div
        style={{
          fontSize: 16,
          fontFamily: STYLE.fonts.sans,
          color: STYLE.colors.charcoal,
          marginTop: 20,
          opacity: 0.6,
        }}
      >
        Generating...
      </div>
    </AbsoluteFill>
  );
};
