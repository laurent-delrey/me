'use client';

import React, { useEffect, useState, useRef } from 'react';

interface AnimatedTextProps {
  children: React.ReactNode;
  delay?: number;
  sectionIndex?: number;
  isActive?: boolean;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({ children, delay = 50, sectionIndex = 0, isActive = false }) => {
  const [visibleWords, setVisibleWords] = useState<number>(0);
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

  // Trigger animation when isActive becomes true
  useEffect(() => {
    if (isActive && !hasAnimatedRef.current) {
      hasAnimatedRef.current = true;
      
      // Small delay to ensure visibility
      setTimeout(() => {
        words.forEach((_, index) => {
          setTimeout(() => {
            setVisibleWords(index + 1);
          }, delay * index);
        });
      }, 300);
    }
  }, [isActive, words.length, delay]);

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

  return <div>{renderAnimatedContent()}</div>;
};