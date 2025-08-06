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
  const getGradient = () => {
    switch (direction) {
      case 'left':
        return 'linear-gradient(to right, rgba(191, 191, 191, 0.95) 0%, rgba(191, 191, 191, 0.7) 30%, rgba(191, 191, 191, 0.3) 70%, rgba(191, 191, 191, 0) 100%)';
      case 'right':
        return 'linear-gradient(to left, rgba(191, 191, 191, 0.95) 0%, rgba(191, 191, 191, 0.7) 30%, rgba(191, 191, 191, 0.3) 70%, rgba(191, 191, 191, 0) 100%)';
      case 'top':
        return 'linear-gradient(to bottom, rgba(191, 191, 191, 0.95) 0%, rgba(191, 191, 191, 0.7) 30%, rgba(191, 191, 191, 0.3) 70%, rgba(191, 191, 191, 0) 100%)';
      case 'bottom':
        return 'linear-gradient(to top, rgba(191, 191, 191, 0.95) 0%, rgba(191, 191, 191, 0.7) 30%, rgba(191, 191, 191, 0.3) 70%, rgba(191, 191, 191, 0) 100%)';
      default:
        return 'linear-gradient(to right, rgba(191, 191, 191, 0.95) 0%, rgba(191, 191, 191, 0) 100%)';
    }
  };

  return (
    <div
      className={className}
      style={{
        ...style,
        background: getGradient(),
        pointerEvents: 'none',
      }}
    />
  );
};