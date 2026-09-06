import React from 'react';
import { Sequence } from 'remotion';
import { CinematicVideo } from '../components/CinematicVideo';
import { CinematicText } from '../components/CinematicText';
import { SCENE_DURATIONS } from '../config';
import { getGeneratedClipPath } from '../lib/asset';

const startFrame =
  (SCENE_DURATIONS.opening +
    SCENE_DURATIONS.workers1 +
    SCENE_DURATIONS.hands +
    SCENE_DURATIONS.emotional) *
  30;
const durationFrames = SCENE_DURATIONS.closing * 30; // 150 frames = 5 seconds

export const ClosingScene: React.FC = () => {
  return (
    <Sequence from={startFrame} durationInFrames={durationFrames}>
      {/* Background video */}
      <CinematicVideo
        src={getGeneratedClipPath('closing-sunset.mp4')}
        startFrame={0}
        duration={durationFrames}
        warmOverlay
        enableZoom
      />

      {/* Text overlays */}
      <CinematicText
        text="Today, we honor the work."
        startFrame={22}
        endFrame={92}
        fontSize={66}
        fontFamily="serif"
        fadeInDuration={8}
        fadeOutDuration={8}
      />

      <CinematicText
        text={['And the people', 'behind it.']}
        startFrame={84}
        endFrame={durationFrames - 8}
        fontSize={66}
        fontFamily="serif"
        fadeInDuration={8}
        fadeOutDuration={12}
      />
    </Sequence>
  );
};
