import React from 'react';
import { Sequence } from 'remotion';
import { CinematicVideo } from '../components/CinematicVideo';
import { CinematicText } from '../components/CinematicText';
import { SCENE_DURATIONS } from '../config';
import { getGeneratedClipPath } from '../lib/asset';

const startFrame =
  (SCENE_DURATIONS.opening +
    SCENE_DURATIONS.workers1 +
    SCENE_DURATIONS.hands) *
  30;
const durationFrames = SCENE_DURATIONS.emotional * 30; // 270 frames = 9 seconds

export const HumanStoryScene: React.FC = () => {
  const clipDuration = Math.floor(durationFrames / 3);

  return (
    <Sequence from={startFrame} durationInFrames={durationFrames}>
      {/* Smile */}
      <Sequence from={0} durationInFrames={clipDuration}>
        <CinematicVideo
          src={getGeneratedClipPath('emotion-smile.mp4')}
          startFrame={0}
          duration={clipDuration}
          warmOverlay
        />
      </Sequence>

      {/* Teacher interaction */}
      <Sequence from={clipDuration} durationInFrames={clipDuration}>
        <CinematicVideo
          src={getGeneratedClipPath('emotion-teacher.mp4')}
          startFrame={0}
          duration={clipDuration}
          warmOverlay
        />
      </Sequence>

      {/* Care moment */}
      <Sequence from={clipDuration * 2} durationInFrames={clipDuration}>
        <CinematicVideo
          src={getGeneratedClipPath('emotion-care.mp4')}
          startFrame={0}
          duration={clipDuration}
          warmOverlay
          darkOverlay
        />
      </Sequence>

      {/* Text sequence */}
      <CinematicText
        text="Behind every job"
        startFrame={22}
        endFrame={88}
        fontSize={72}
        fontFamily="serif"
        fadeInDuration={8}
        fadeOutDuration={8}
      />

      <CinematicText
        text="is a person."
        startFrame={80}
        endFrame={152}
        fontSize={72}
        fontFamily="serif"
        fadeInDuration={8}
        fadeOutDuration={8}
      />

      <CinematicText
        text="A story."
        startFrame={144}
        endFrame={198}
        fontSize={72}
        fontFamily="serif"
        fadeInDuration={8}
        fadeOutDuration={8}
      />

      <CinematicText
        text="A purpose."
        startFrame={190}
        endFrame={durationFrames}
        fontSize={72}
        fontFamily="serif"
        fadeInDuration={8}
        fadeOutDuration={10}
      />
    </Sequence>
  );
};
