import React from 'react';
import { Sequence } from 'remotion';
import { CinematicVideo } from '../components/CinematicVideo';
import { CinematicText } from '../components/CinematicText';
import { SCENE_DURATIONS } from '../config';
import { getGeneratedClipPath } from '../lib/asset';

const durationFrames = SCENE_DURATIONS.opening * 30; // 150 frames = 5 seconds

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
        startFrame={30}
        endFrame={durationFrames - 15}
        fontSize={82}
        fontFamily="serif"
        fadeInDuration={20}
        fadeOutDuration={15}
      />
    </Sequence>
  );
};
