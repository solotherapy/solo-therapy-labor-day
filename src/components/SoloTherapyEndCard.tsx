import React from 'react';
import {
  AbsoluteFill,
  Img,
  interpolate,
  random,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { STYLE } from '../config';
import { hasLogo, getLogoPath } from '../lib/asset';

interface SoloTherapyEndCardProps {
  startFrame: number;
  endFrame: number;
}

export const SoloTherapyEndCard: React.FC<SoloTherapyEndCardProps> = ({
  startFrame,
  endFrame,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const frameInSequence = Math.max(0, frame - startFrame);
  const sequenceDuration = endFrame - startFrame;

  // Background
  const bgOpacity = interpolate(
    frameInSequence,
    [0, 15],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Text phases
  const greeting1Opacity = interpolate(
    frameInSequence,
    [0, 30, 60, 80],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const greeting2Opacity = interpolate(
    frameInSequence,
    [40, 60, 100, 130],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const taglineOpacity = interpolate(
    frameInSequence,
    [80, 100],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Logo reveal - scale and fade
  const logoScale = interpolate(
    frameInSequence,
    [100, 120],
    [0.8, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const logoOpacity = interpolate(
    frameInSequence,
    [100, 120],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const handleleOpacity = interpolate(
    frameInSequence,
    [130, 150],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const hasLogoFile = hasLogo();

  return (
    <AbsoluteFill style={{ backgroundColor: '#000' }}>
      {/* Animated background */}
      <svg
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: bgOpacity,
        }}
        viewBox="0 0 1080 1920"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <filter id="blur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
          </filter>
        </defs>

        {/* Background gradient */}
        <rect
          width="1080"
          height="1920"
          fill={STYLE.colors.cream}
        />

        {/* Organic botanical shapes */}
        <g opacity="0.4" filter="url(#blur)">
          <ellipse
            cx="200"
            cy="300"
            rx="150"
            ry="250"
            fill={STYLE.colors.mutedSage}
            opacity="0.3"
          />
          <ellipse
            cx="900"
            cy="500"
            rx="180"
            ry="280"
            fill={STYLE.colors.warmBeige}
            opacity="0.25"
          />
          <path
            d="M 0 1000 Q 270 950 540 1000 T 1080 1000 L 1080 1920 L 0 1920 Z"
            fill={STYLE.colors.mutedSage}
            opacity="0.2"
          />
          <circle
            cx="600"
            cy="1400"
            r="200"
            fill={STYLE.colors.warmBrown}
            opacity="0.15"
          />
        </g>

        {/* Subtle particles */}
        {[...Array(8)].map((_, i) => (
          <circle
            key={i}
            cx={random(`px-${i}`) * 1080}
            cy={random(`py-${i}`) * 1920}
            r={random(`pr-${i}`) * 3}
            fill={STYLE.colors.deepOlive}
            opacity={0.1 + random(`po-${i}`) * 0.15}
          />
        ))}
      </svg>

      {/* Content overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          opacity: bgOpacity,
        }}
      />

      {/* Text content */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '60px 40px',
          textAlign: 'center',
          color: STYLE.colors.deepOlive,
          fontFamily: STYLE.fonts.serif,
        }}
      >
        {/* Greeting 1 */}
        <div
          style={{
            opacity: greeting1Opacity,
            fontSize: 96,
            fontWeight: 'bold',
            lineHeight: 1.1,
            marginBottom: 60,
            letterSpacing: '-0.02em',
          }}
        >
          HAPPY
          <br />
          LABOR DAY
        </div>

        {/* Greeting 2 */}
        <div
          style={{
            opacity: greeting2Opacity,
            fontSize: 42,
            fontWeight: 'normal',
            lineHeight: 1.6,
            marginBottom: 80,
            maxWidth: 800,
            fontFamily: STYLE.fonts.serif,
          }}
        >
          To everyone who builds,<br />
          teaches, heals, creates,<br />
          serves and cares —<br />
          today we celebrate you.
        </div>

        {/* Logo area */}
        {hasLogoFile && (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: `translate(-50%, -50%) scale(${logoScale})`,
              opacity: logoOpacity,
              transition: 'none',
            }}
          >
            <Img
              src={getLogoPath()}
              style={{
                maxWidth: 300,
                maxHeight: 300,
                filter: 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.2))',
              }}
            />
          </div>
        )}

        {!hasLogoFile && (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: `translate(-50%, -50%) scale(${logoScale})`,
              opacity: logoOpacity,
              backgroundColor: STYLE.colors.warmBeige,
              width: 280,
              height: 280,
              borderRadius: 20,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 48,
              fontFamily: STYLE.fonts.serif,
              color: STYLE.colors.deepOlive,
              fontWeight: 'bold',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
            }}
          >
            SOLO<br />
            THERAPY
          </div>
        )}

        {/* Tagline */}
        <div
          style={{
            opacity: taglineOpacity,
            fontSize: 28,
            fontWeight: 'normal',
            marginTop: 200,
            fontFamily: STYLE.fonts.serif,
          }}
        >
          Care for the person<br />
          behind the work.
        </div>

        {/* Instagram handle */}
        <div
          style={{
            opacity: handleleOpacity,
            fontSize: 24,
            fontWeight: 'normal',
            marginTop: 40,
            fontFamily: STYLE.fonts.sans,
            letterSpacing: '0.05em',
          }}
        >
          @solotherapy
        </div>
      </div>
    </AbsoluteFill>
  );
};
