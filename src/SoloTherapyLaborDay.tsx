import React from 'react';
import { AbsoluteFill, useVideoConfig, Audio } from 'remotion';
import { VIDEO_CONFIG } from './config';
import { OpeningScene } from './scenes/OpeningScene';
import { WorkersScene } from './scenes/WorkersScene';
import { HandsScene } from './scenes/HandsScene';
import { HumanStoryScene } from './scenes/HumanStoryScene';
import { ClosingScene } from './scenes/ClosingScene';
import { EndCardScene } from './scenes/EndCardScene';
import { GlobalFilmOverlay } from './components/GlobalFilmOverlay';
import { hasMusic, getMusicPath } from './lib/asset';

export const SoloTherapyLaborDay: React.FC = () => {
  const { fps } = useVideoConfig();
  const totalFrames = VIDEO_CONFIG.durationInSeconds * fps;
  const hasAudio = hasMusic();

  return (
    <AbsoluteFill style={{ backgroundColor: '#000' }}>
      {/* Main scenes */}
      <OpeningScene />
      <WorkersScene />
      <HandsScene />
      <HumanStoryScene />
      <ClosingScene />
      <EndCardScene />

      {/* Audio */}
      {hasAudio && (
        <Audio
          src={getMusicPath()}
          volume={(frame: number) => {
            // Fade in first 2 seconds (60 frames at 30fps)
            if (frame < 60) {
              return frame / 60;
            }
            // Fade out last 2 seconds
            const fadeOutStart = totalFrames - 60;
            if (frame > fadeOutStart) {
              return (totalFrames - frame) / 60;
            }
            return 1;
          }}
        />
      )}

      {/* Global film overlay */}
      <GlobalFilmOverlay />
    </AbsoluteFill>
  );
};
