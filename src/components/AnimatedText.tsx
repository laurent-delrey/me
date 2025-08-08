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
  const timersRef = useRef<{ main?: NodeJS.Timeout; words: NodeJS.Timeout[] }>({ words: [] });

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

  // Trigger animation when isActive changes - simplified approach
  useEffect(() => {
    console.log('AnimatedText effect - section:', sectionIndex, 'isActive:', isActive, 'words:', words.length, 'hasAnimated:', hasAnimatedRef.current);
    
    // Clear any existing timers
    if (timersRef.current.main) {
      clearTimeout(timersRef.current.main);
    }
    timersRef.current.words.forEach(timer => clearTimeout(timer));
    timersRef.current.words = [];
    
    if (isActive && words.length > 0 && !hasAnimatedRef.current) {
      console.log('Starting animation for section', sectionIndex);
      hasAnimatedRef.current = true;
      
      // Reset animation
      setVisibleWords(0);
      
      // Simple delay based on section
      const initialDelay = sectionIndex === 0 ? 1500 : 300;
      
      timersRef.current.main = setTimeout(() => {
        console.log('Animation timer triggered for section', sectionIndex);
        words.forEach((_, index) => {
          const wordTimer = setTimeout(() => {
            setVisibleWords(index + 1);
          }, delay * index);
          timersRef.current.words.push(wordTimer);
        });
      }, initialDelay);
    } else if (!isActive) {
      // Reset when leaving section
      setVisibleWords(0);
      hasAnimatedRef.current = false;
    }
    
    // Don't clear timers in cleanup, they're managed above
  }, [isActive]); // Minimal dependencies

  // Helper function to extract text from React nodes
  const extractText = (node: React.ReactNode): string => {
    if (typeof node === 'string') {
      return node;
    } else if (React.isValidElement(node)) {
      return extractText((node as any).props.children);
    } else if (Array.isArray(node)) {
      return node.map(extractText).join(' ');
    }
    return '';
  };

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
        
        // Check if this is a link (anchor tag)
        if (element.type === 'a' && element.props.style) {
          // Get the original color from the style
          const originalColor = element.props.style.color;
          
          // Calculate if this link's words are visible
          const linkText = extractText(element.props.children);
          const linkWordCount = linkText.trim().split(/\s+/).filter(w => w.length > 0).length;
          const linkStartIndex = wordIndex;
          const linkEndIndex = wordIndex + linkWordCount;
          const isLinkAnimated = linkEndIndex <= visibleWords;
          
          // Override the color based on animation state
          newProps.style = {
            ...element.props.style,
            color: isLinkAnimated ? originalColor : 'rgba(255, 255, 255, 0.3)',
            transition: 'color 0.3s ease-in-out'
          };
        }
        
        // Check if this is a span with transparency (for DM section)
        if (element.type === 'span' && element.props.style?.color?.includes('rgba')) {
          const originalColor = element.props.style.color;
          
          // Calculate if this span's words are visible
          const spanText = extractText(element.props.children);
          const spanWordCount = spanText.trim().split(/\s+/).filter(w => w.length > 0).length;
          const spanStartIndex = wordIndex;
          const spanEndIndex = wordIndex + spanWordCount;
          const isSpanAnimated = spanEndIndex <= visibleWords;
          
          // Override the opacity based on animation state
          newProps.style = {
            ...element.props.style,
            color: isSpanAnimated ? originalColor : 'rgba(255, 255, 255, 0.3)',
            transition: 'color 0.3s ease-in-out'
          };
        }
        
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