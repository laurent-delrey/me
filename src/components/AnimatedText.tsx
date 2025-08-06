'use client';

import React, { useEffect, useState, useRef } from 'react';

interface AnimatedTextProps {
  children: React.ReactNode;
  delay?: number;
  sectionIndex?: number;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({ children, delay = 50, sectionIndex = 0 }) => {
  const [visibleWords, setVisibleWords] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const hasAnimatedRef = useRef(false);

  // Parse children to extract text and links
  const parseContent = (node: React.ReactNode): string[] => {
    const words: string[] = [];
    
    React.Children.forEach(node, (child) => {
      if (typeof child === 'string') {
        // Trim and filter out empty strings
        const childWords = child.trim().split(/\s+/).filter(word => word.length > 0);
        words.push(...childWords);
      } else if (React.isValidElement(child)) {
        const props = child.props as { children?: React.ReactNode };
        if (props.children) {
          words.push(...parseContent(props.children));
        }
      }
    });
    
    return words;
  };

  const words = parseContent(children);

  useEffect(() => {
    if (hasAnimatedRef.current) return;

    const startAnimation = () => {
      if (hasAnimatedRef.current) return;
      hasAnimatedRef.current = true;
      console.log(`Section ${sectionIndex}: Starting animation for ${words.length} words`);
      
      // Animate words one by one
      words.forEach((_, index) => {
        setTimeout(() => {
          setVisibleWords(prev => index + 1);
        }, delay * index);
      });
    };

    // Create observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimatedRef.current) {
            // Add a small delay to ensure the section is properly in view
            setTimeout(() => {
              startAnimation();
            }, 200);
          }
        });
      },
      { 
        threshold: 0.3,  // Increased threshold - more of element must be visible
        rootMargin: '-100px 0px -100px 0px'  // Shrink the root bounds to trigger later
      }
    );

    // Check if already in view when component mounts
    const checkInitialVisibility = () => {
      if (!containerRef.current || hasAnimatedRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const isInView = rect.top < window.innerHeight && rect.bottom > 0;
      
      if (isInView) {
        // If first section, add delay for page load
        if (sectionIndex === 0) {
          setTimeout(startAnimation, 1500);
        } else {
          startAnimation();
        }
      } else {
        // Not in view, start observing
        if (containerRef.current && observerRef.current) {
          observerRef.current.observe(containerRef.current);
        }
      }
    };

    // Wait for next tick to ensure DOM is ready
    const timer = setTimeout(checkInitialVisibility, 100);

    return () => {
      clearTimeout(timer);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []); // Empty deps - only run once on mount

  // Rebuild the content with animated words
  const renderAnimatedContent = () => {
    let wordIndex = 0;
    
    const processNode = (node: React.ReactNode): React.ReactNode => {
      if (typeof node === 'string') {
        // Preserve leading/trailing whitespace but split on internal whitespace
        const trimmed = node.trim();
        if (!trimmed) return node; // Return whitespace as-is if that's all there is
        
        const leadingSpace = node.match(/^\s+/)?.[0] || '';
        const trailingSpace = node.match(/\s+$/)?.[0] || '';
        const nodeWords = trimmed.split(/\s+/);
        
        return (
          <>
            {leadingSpace}
            {nodeWords.map((word, i) => {
              const currentIndex = wordIndex++;
              const isVisible = currentIndex < visibleWords;
              return (
                <React.Fragment key={currentIndex}>
                  <span
                    style={{
                      opacity: isVisible ? 1 : 0.3,
                      transition: 'opacity 0.3s ease-in-out',
                    }}
                  >
                    {word}
                  </span>
                  {i < nodeWords.length - 1 && ' '}
                </React.Fragment>
              );
            })}
            {trailingSpace}
          </>
        );
      } else if (React.isValidElement(node)) {
        const props = node.props as any;
        const childProps = { ...props };
        if (childProps.children) {
          childProps.children = processNode(childProps.children);
        }
        return React.cloneElement(node as any, childProps);
      }
      return node;
    };

    return processNode(children);
  };

  return <div ref={containerRef}>{renderAnimatedContent()}</div>;
};