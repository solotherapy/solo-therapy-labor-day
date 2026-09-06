import React from 'react';
import { Sequence } from 'remotion';
import { SoloTherapyEndCard } from '../components/SoloTherapyEndCard.js';
import { SCENE_DURATIONS } from '../config.js';

const startFrame =
  (SCENE_DURATIONS.opening +
    SCENE_DURATIONS.workers1 +
    SCENE_DURATIONS.hands +
    SCENE_DURATIONS.emotional +
    SCENE_DURATIONS.closing) *
  30;
const durationFrames = SCENE_DURATIONS.endCard * 30; // 150 frames = 5 seconds

export const EndCardScene: React.FC = () => {
  return (
    <Sequence from={startFrame} durationInFrames={durationFrames}>
      <SoloTherapyEndCard startFrame={startFrame} endFrame={startFrame + durationFrames} />
    </Sequence>
  );
};
