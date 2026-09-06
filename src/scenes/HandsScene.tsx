import React from 'react';
import { Sequence } from 'remotion';
import { CinematicVideo } from '../components/CinematicVideo';
import { CinematicText } from '../components/CinematicText';
import { SCENE_DURATIONS } from '../config';
import { getGeneratedClipPath } from '../lib/asset';

const startFrame =
  (SCENE_DURATIONS.opening + SCENE_DURATIONS.workers1) * 30;
const durationFrames = SCENE_DURATIONS.hands * 30; // 420 frames = 14 seconds

export const HandsScene: React.FC = () => {
  const clipDuration = Math.floor(durationFrames / 6);

  return (
    <Sequence from={startFrame} durationInFrames={durationFrames}>
      {/* Farmer */}
      <Sequence from={0} durationInFrames={clipDuration}>
        <CinematicVideo
          src={getGeneratedClipPath('hands-farmer.mp4')}
          startFrame={0}
          duration={clipDuration}
          warmOverlay
          enableZoom
        />
      </Sequence>

      {/* Firefighter */}
      <Sequence from={clipDuration} durationInFrames={clipDuration}>
        <CinematicVideo
          src={getGeneratedClipPath('hands-firefighter.mp4')}
          startFrame={0}
          duration={clipDuration}
          warmOverlay
        />
      </Sequence>

      {/* Hairstylist */}
      <Sequence from={clipDuration * 2} durationInFrames={clipDuration}>
        <CinematicVideo
          src={getGeneratedClipPath('hands-hairstylist.mp4')}
          startFrame={0}
          duration={clipDuration}
          warmOverlay
        />
      </Sequence>

      {/* Delivery */}
      <Sequence from={clipDuration * 3} durationInFrames={clipDuration}>
        <CinematicVideo
          src={getGeneratedClipPath('hands-delivery.mp4')}
          startFrame={0}
          duration={clipDuration}
          warmOverlay
        />
      </Sequence>

      {/* Business */}
      <Sequence from={clipDuration * 4} durationInFrames={clipDuration}>
        <CinematicVideo
          src={getGeneratedClipPath('hands-business.mp4')}
          startFrame={0}
          duration={clipDuration}
          warmOverlay
        />
      </Sequence>

      {/* Therapist */}
      <Sequence from={clipDuration * 5} durationInFrames={clipDuration}>
        <CinematicVideo
          src={getGeneratedClipPath('hands-therapist.mp4')}
          startFrame={0}
          duration={clipDuration}
          warmOverlay
        />
      </Sequence>

      {/* Text overlays - sync with clips */}
      <CinematicText
        text="Hands that build."
        startFrame={22}
        endFrame={110}
        fontSize={72}
        fontFamily="serif"
        fadeInDuration={8}
        fadeOutDuration={8}
      />

      <CinematicText
        text="Hands that heal."
        startFrame={102}
        endFrame={202}
        fontSize={72}
        fontFamily="serif"
        fadeInDuration={8}
        fadeOutDuration={8}
      />

      <CinematicText
        text="Hands that create."
        startFrame={194}
        endFrame={298}
        fontSize={72}
        fontFamily="serif"
        fadeInDuration={8}
        fadeOutDuration={8}
      />

      <CinematicText
        text="Hands that care."
        startFrame={290}
        endFrame={durationFrames}
        fontSize={72}
        fontFamily="serif"
        fadeInDuration={8}
        fadeOutDuration={10}
      />
    </Sequence>
  );
};
