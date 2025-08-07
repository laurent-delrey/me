'use client';

import React, { useEffect, useState, useRef } from 'react';

interface AnimatedTextProps {
  children: React.ReactNode;
  delay?: number;
  sectionIndex?: number;
  isActive?: boolean;
  textColor?: string;
  linkColor?: string;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({ children, delay = 50, sectionIndex = 0, isActive = false, textColor = '#ffffff', linkColor }) => {
  const [visibleWords, setVisibleWords] = useState<number>(0);
  const [words, setWords] = useState<string[]>([]);
  const hasAnimatedRef = useRef(false);

  // Parse children to extract text and links - handle on mount
  useEffect(() => {
    const parseContent = (node: React.ReactNode): string[] => {
      const words: string[] = [];
      
      const processNode = (n: React.ReactNode): void => {
        if (typeof n === 'string') {
          // Trim and filter out empty strings
          const nodeWords = n.trim().split(/\s+/).filter(word => word.length > 0);
          words.push(...nodeWords);
        } else if (React.isValidElement(n)) {
          // Process children of React elements recursively
          React.Children.forEach((n as any).props.children, (child: React.ReactNode) => {
            processNode(child);
          });
        } else if (Array.isArray(n)) {
          n.forEach(processNode);
        }
      };
      
      React.Children.forEach(node, processNode);
      return words;
    };

    setWords(parseContent(children));
  }, [children]);

  // Trigger animation when isActive changes
  useEffect(() => {
    if (isActive && words.length > 0 && !hasAnimatedRef.current) {
      // Mark as animated
      hasAnimatedRef.current = true;
      
      // Reset animation
      setVisibleWords(0);
      
      // Longer delay for first section to ensure page is loaded
      const initialDelay = sectionIndex === 0 ? 2000 : 300;
      
      setTimeout(() => {
        words.forEach((_, index) => {
          setTimeout(() => {
            setVisibleWords(prev => index + 1);
          }, delay * index);
        });
      }, initialDelay);
    } else if (!isActive) {
      // Reset when leaving section
      setVisibleWords(0);
      hasAnimatedRef.current = false;
    }
  }, [isActive, words, delay, sectionIndex]);

  // Rebuild the content with animated words
  const renderAnimatedContent = () => {
    let wordIndex = 0;
    
    const processNode = (node: React.ReactNode): React.ReactNode => {
      if (typeof node === 'string') {
        const trimmed = node.trim();
        if (!trimmed) return node;
        
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
                <React.Fragment key={`${sectionIndex}-${currentIndex}`}>
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
        // Clone element and process its children
        const element = node as React.ReactElement<any>;
        const newProps = { ...element.props };
        
        if (element.props.children) {
          newProps.children = React.Children.map(element.props.children, processNode);
        }
        
        return React.cloneElement(element, newProps);
      }
      return node;
    };

    return React.Children.map(children, processNode);
  };

  return <div>{renderAnimatedContent()}</div>;
};