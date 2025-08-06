'use client';

import React, { useEffect, useState, useRef } from 'react';

interface AnimatedTextProps {
  children: React.ReactNode;
  delay?: number;
  sectionIndex?: number;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({ children, delay = 50, sectionIndex = 0 }) => {
  const [visibleWords, setVisibleWords] = useState<number>(0);
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  // Parse children to extract text and links
  const parseContent = (node: React.ReactNode): string[] => {
    const words: string[] = [];
    
    React.Children.forEach(node, (child) => {
      if (typeof child === 'string') {
        words.push(...child.split(' '));
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

  // Set mounted state
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || hasAnimated.current) return;

    const checkVisibility = () => {
      if (!containerRef.current || hasAnimated.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const isInView = rect.top < window.innerHeight && rect.bottom > 0;
      
      if (isInView) {
        hasAnimated.current = true;
        // Animate words one by one
        words.forEach((_, index) => {
          setTimeout(() => {
            setVisibleWords(index + 1);
          }, delay * index);
        });
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            // Animate words one by one
            words.forEach((_, index) => {
              setTimeout(() => {
                setVisibleWords(index + 1);
              }, delay * index);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    // Wait a bit for page to settle, then check visibility
    // Add extra delay for first sections to ensure page is fully loaded
    const initialDelay = sectionIndex === 0 ? 2000 : 1000 + (sectionIndex * 100);
    const timer = setTimeout(() => {
      checkVisibility();
      
      // If not animated yet, observe for scroll
      if (!hasAnimated.current && containerRef.current) {
        observer.observe(containerRef.current);
      }
    }, initialDelay);

    return () => {
      clearTimeout(timer);
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [words.length, delay, isMounted, sectionIndex]);

  // Rebuild the content with animated words
  const renderAnimatedContent = () => {
    let wordIndex = 0;
    
    const processNode = (node: React.ReactNode): React.ReactNode => {
      if (typeof node === 'string') {
        const nodeWords = node.split(' ');
        return nodeWords.map((word, i) => {
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
        });
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