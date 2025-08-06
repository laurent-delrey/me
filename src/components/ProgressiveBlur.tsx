'use client';

import React from 'react';

interface ProgressiveBlurProps {
  className?: string;
  style?: React.CSSProperties;
  direction?: 'left' | 'right' | 'top' | 'bottom';
}

export const ProgressiveBlur: React.FC<ProgressiveBlurProps> = ({
  className = '',
  style = {},
  direction = 'left',
}) => {
  const blurSteps = 6;
  const maxBlur = 8;
  
  const getTransform = (index: number) => {
    const offset = (index * 100) / blurSteps;
    switch (direction) {
      case 'left':
        return `translateX(${offset}%)`;
      case 'right':
        return `translateX(-${offset}%)`;
      case 'top':
        return `translateY(${offset}%)`;
      case 'bottom':
        return `translateY(-${offset}%)`;
      default:
        return '';
    }
  };

  const getMask = () => {
    switch (direction) {
      case 'left':
        return 'linear-gradient(to right, black, transparent)';
      case 'right':
        return 'linear-gradient(to left, black, transparent)';
      case 'top':
        return 'linear-gradient(to bottom, black, transparent)';
      case 'bottom':
        return 'linear-gradient(to top, black, transparent)';
      default:
        return '';
    }
  };

  return (
    <div
      className={className}
      style={{
        ...style,
        position: 'absolute',
        pointerEvents: 'none',
        maskImage: getMask(),
        WebkitMaskImage: getMask(),
      }}
    >
      {Array.from({ length: blurSteps }).map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            inset: 0,
            backdropFilter: `blur(${(maxBlur / blurSteps) * (blurSteps - i)}px)`,
            WebkitBackdropFilter: `blur(${(maxBlur / blurSteps) * (blurSteps - i)}px)`,
            maskImage: getMask(),
            WebkitMaskImage: getMask(),
            transform: getTransform(i),
            opacity: 1 - (i * 0.15),
          }}
        />
      ))}
    </div>
  );
};