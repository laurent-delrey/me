'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export function IPadCursor() {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const [hoveredElement, setHoveredElement] = useState<HTMLElement | null>(null);
  const [elementBounds, setElementBounds] = useState<DOMRect | null>(null);
  const [isPointer, setIsPointer] = useState(false);

  // Spring config for smooth animations
  const springConfig = { stiffness: 500, damping: 28 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Hide default cursor
    document.body.style.cursor = 'none';

    // Track mouse movement
    const updatePosition = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    // Detect hoverable elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check if element is clickable (button, link, or has onClick)
      const isClickable = 
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.style.cursor === 'pointer' ||
        target.onclick !== null;

      if (isClickable) {
        const clickableElement = 
          target.closest('button') || 
          target.closest('a') || 
          target;
        
        setHoveredElement(clickableElement as HTMLElement);
        const bounds = (clickableElement as HTMLElement).getBoundingClientRect();
        setElementBounds(bounds);
        setIsPointer(true);
        
        // Hide default cursor on hover
        (clickableElement as HTMLElement).style.cursor = 'none';
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const relatedTarget = e.relatedTarget as HTMLElement;
      
      // Check if we're leaving a clickable element
      if (!relatedTarget?.closest('button') && !relatedTarget?.closest('a')) {
        setHoveredElement(null);
        setElementBounds(null);
        setIsPointer(false);
      }
    };

    // Add event listeners
    document.addEventListener('mousemove', updatePosition);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    // Cleanup
    return () => {
      document.body.style.cursor = 'auto';
      document.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [cursorX, cursorY]);

  // Calculate cursor size and shape based on hover state
  const cursorSize = isPointer && elementBounds ? {
    width: elementBounds.width + 16,
    height: elementBounds.height + 8,
  } : {
    width: 12,
    height: 12,
  };

  const cursorPosition = isPointer && elementBounds ? {
    x: elementBounds.left + elementBounds.width / 2,
    y: elementBounds.top + elementBounds.height / 2,
  } : {
    x: cursorXSpring,
    y: cursorYSpring,
  };

  return (
    <motion.div
      className="pointer-events-none fixed z-[9999] mix-blend-difference"
      style={{
        left: 0,
        top: 0,
        x: cursorPosition.x,
        y: cursorPosition.y,
        translateX: '-50%',
        translateY: '-50%',
      }}
      animate={{
        width: cursorSize.width,
        height: cursorSize.height,
        borderRadius: isPointer ? '8px' : '50%',
      }}
      transition={{
        type: 'spring',
        stiffness: 500,
        damping: 28,
      }}
    >
      <div 
        className="w-full h-full bg-white"
        style={{
          opacity: isPointer ? 0.8 : 1,
        }}
      />
    </motion.div>
  );
}