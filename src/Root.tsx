import React from 'react';
import { Composition } from 'remotion';
import { SoloTherapyLaborDay } from './SoloTherapyLaborDay';
import { VIDEO_CONFIG } from './config';

export const Root: React.FC = () => {
  return (
    <Composition
      id="SoloTherapyLaborDay"
      component={SoloTherapyLaborDay}
      durationInFrames={VIDEO_CONFIG.durationInSeconds * VIDEO_CONFIG.fps}
      fps={VIDEO_CONFIG.fps}
      width={VIDEO_CONFIG.width}
      height={VIDEO_CONFIG.height}
      defaultProps={{}}
    />
  );
};
