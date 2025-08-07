'use client';

import React, { useEffect, useState, useRef } from 'react';

interface AnimatedTextProps {
  children: React.ReactNode;
  delay?: number;
  sectionIndex?: number;
  isActive?: boolean;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({ children, delay = 50, sectionIndex = 0, isActive = false }) => {
  const [showAnimation, setShowAnimation] = useState(false);
  const hasAnimatedRef = useRef(false);

  // Trigger animation when isActive becomes true
  useEffect(() => {
    if (isActive && !hasAnimatedRef.current) {
      hasAnimatedRef.current = true;
      // Small delay to ensure visibility
      setTimeout(() => {
        setShowAnimation(true);
      }, 500);
    }
  }, [isActive]);

  // Simple opacity animation for the whole block
  return (
    <div 
      style={{
        opacity: showAnimation ? 1 : 0.3,
        transition: `opacity ${delay * 20}ms ease-in-out`,
      }}
    >
      {children}
    </div>
  );
};