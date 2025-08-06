'use client';

import React from 'react';

const GRADIENT_ANGLES = {
  top: 0,
  right: 90,
  bottom: 180,
  left: 270,
};

interface ProgressiveBlurProps {
  className?: string;
  style?: React.CSSProperties;
  direction?: 'left' | 'right' | 'top' | 'bottom';
  blurLayers?: number;
  blurIntensity?: number;
}

export const ProgressiveBlur: React.FC<ProgressiveBlurProps> = ({
  className = '',
  style = {},
  direction = 'left',
  blurLayers = 8,
  blurIntensity = 0.25,
}) => {
  const layers = Math.max(blurLayers, 2);
  const segmentSize = 1 / (blurLayers + 1);

  return (
    <div 
      className={className}
      style={{
        ...style,
        position: 'relative',
      }}
    >
      {Array.from({ length: layers }).map((_, index) => {
        const angle = GRADIENT_ANGLES[direction];
        const gradientStops = [
          index * segmentSize,
          (index + 1) * segmentSize,
          (index + 2) * segmentSize,
          (index + 3) * segmentSize,
        ].map(
          (pos, posIndex) =>
            `rgba(255, 255, 255, ${posIndex === 1 || posIndex === 2 ? 1 : 0}) ${pos * 100}%`
        );

        const gradient = `linear-gradient(${angle}deg, ${gradientStops.join(', ')})`;

        return (
          <div
            key={index}
            style={{
              pointerEvents: 'none',
              position: 'absolute',
              inset: 0,
              borderRadius: 'inherit',
              maskImage: gradient,
              WebkitMaskImage: gradient,
              backdropFilter: `blur(${index * blurIntensity}px)`,
              WebkitBackdropFilter: `blur(${index * blurIntensity}px)`,
            }}
          />
        );
      })}
    </div>
  );
};