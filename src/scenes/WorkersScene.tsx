import React from 'react';
import { Sequence } from 'remotion';
import { CinematicVideo } from '../components/CinematicVideo';
import { CinematicText } from '../components/CinematicText';
import { SCENE_DURATIONS } from '../config';
import { getGeneratedClipPath } from '../lib/asset';

const startFrame = SCENE_DURATIONS.opening * 30;
const durationFrames = SCENE_DURATIONS.workers1 * 30; // 210 frames = 7 seconds

export const WorkersScene: React.FC = () => {
  const clipDuration = Math.floor(durationFrames / 4);

  return (
    <Sequence from={startFrame} durationInFrames={durationFrames}>
      {/* Nurse */}
      <Sequence from={0} durationInFrames={clipDuration}>
        <CinematicVideo
          src={getGeneratedClipPath('worker-nurse.mp4')}
          startFrame={0}
          duration={clipDuration}
          warmOverlay
        />
      </Sequence>

      {/* Teacher */}
      <Sequence from={clipDuration} durationInFrames={clipDuration}>
        <CinematicVideo
          src={getGeneratedClipPath('worker-teacher.mp4')}
          startFrame={0}
          duration={clipDuration}
          warmOverlay
        />
      </Sequence>

      {/* Construction */}
      <Sequence from={clipDuration * 2} durationInFrames={clipDuration}>
        <CinematicVideo
          src={getGeneratedClipPath('worker-construction.mp4')}
          startFrame={0}
          duration={clipDuration}
          warmOverlay
        />
      </Sequence>

      {/* Chef */}
      <Sequence from={clipDuration * 3} durationInFrames={clipDuration}>
        <CinematicVideo
          src={getGeneratedClipPath('worker-chef.mp4')}
          startFrame={0}
          duration={clipDuration}
          warmOverlay
        />
      </Sequence>

      {/* Text overlays */}
      <CinematicText
        text="Different paths."
        startFrame={22}
        endFrame={90}
        fontSize={76}
        fontFamily="serif"
        fadeInDuration={8}
        fadeOutDuration={8}
      />

      <CinematicText
        text="Different skills."
        startFrame={82}
        endFrame={156}
        fontSize={76}
        fontFamily="serif"
        fadeInDuration={8}
        fadeOutDuration={8}
      />

      <CinematicText
        text="One shared dedication."
        startFrame={148}
        endFrame={durationFrames}
        fontSize={76}
        fontFamily="serif"
        fadeInDuration={8}
        fadeOutDuration={10}
      />
    </Sequence>
  );
};
