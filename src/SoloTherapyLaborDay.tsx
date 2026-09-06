import React from 'react';
import { AbsoluteFill, useVideoConfig, Audio } from 'remotion';
import { VIDEO_CONFIG, PATHS } from './config.js';
import { OpeningScene } from './scenes/OpeningScene.js';
import { WorkersScene } from './scenes/WorkersScene.js';
import { HandsScene } from './scenes/HandsScene.js';
import { HumanStoryScene } from './scenes/HumanStoryScene.js';
import { ClosingScene } from './scenes/ClosingScene.js';
import { EndCardScene } from './scenes/EndCardScene.js';
import { GlobalFilmOverlay } from './components/GlobalFilmOverlay.js';
import { hasMusic } from './lib/asset.js';

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
          src={PATHS.music}
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
