import React from 'react';
import {
  AbsoluteFill,
  Sequence,
  interpolate,
  useCurrentFrame,
} from 'remotion';
import { CinematicVideo } from '../components/CinematicVideo';
import { CinematicText } from '../components/CinematicText';
import { SCENE_DURATIONS } from '../config';
import { getGeneratedClipPath } from '../lib/asset';

const durationFrames = SCENE_DURATIONS.opening * 30; // 150 frames = 5 seconds

const FilmFadeIn: React.FC = () => {
  const frame = useCurrentFrame();
  const darkness = interpolate(frame, [0, 14], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  if (darkness === 0) {
    return null;
  }

  return (
    <AbsoluteFill
      style={{ backgroundColor: '#000', opacity: darkness, pointerEvents: 'none' }}
    />
  );
};

export const OpeningScene: React.FC = () => {
  return (
    <Sequence from={0} durationInFrames={durationFrames}>
      {/* Background video */}
      <CinematicVideo
        src={getGeneratedClipPath('opening-alarm.mp4')}
        startFrame={0}
        duration={durationFrames}
        warmOverlay
      />

      {/* Text overlay */}
      <CinematicText
        text={['Every day begins', 'with someone showing up.']}
        startFrame={24}
        endFrame={durationFrames - 2}
        fontSize={82}
        fontFamily="serif"
        fadeInDuration={12}
        fadeOutDuration={10}
      />

      {/* The film opens from black */}
      <FilmFadeIn />
    </Sequence>
  );
};
