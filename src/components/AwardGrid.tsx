"use client";

import { useEffect, useRef, useState } from "react";

interface AwardGridProps {
  section: "tribe" | "hustle";
  containerRef?: React.RefObject<HTMLDivElement | null>;
}

// Tribe awards with specific grid positions
// Only TC and Complex have links in the original
const tribeAwards = [
  { 
    src: "/images/awards/Award-logo---FC.png", 
    width: 180, 
    link: null,
    gridArea: "1 / 1 / 2 / 2",
    placeSelf: "center start"
  },
  { 
    src: "/images/awards/Award-logo---Apple.png", 
    width: 156, 
    link: null,
    gridArea: "2 / 1 / 3 / 2",
    placeSelf: "center start"
  },
  { 
    src: "/images/awards/Award-logo---Google.png", 
    width: 153, 
    link: null,
    gridArea: "1 / 3 / 2 / 4",
    placeSelf: "center end"
  },
  { 
    src: "/images/awards/Award-logo---Time.png", 
    width: 130, 
    link: null,
    gridArea: "2 / 3 / 3 / 4",
    placeSelf: "center end"
  },
  { 
    src: "/images/awards/TC.svg", 
    width: 70, 
    link: "https://techcrunch.com/2016/10/12/augmented-chat/",
    gridArea: "3 / 1 / 4 / 2",
    justifySelf: "start"
  },
  { 
    src: "/images/awards/Shape.svg", 
    width: 100, 
    link: "https://www.youtube.com/watch?v=EnwRu20HOTQ",
    gridArea: "3 / 3 / 4 / 4",
    justifySelf: "end"
  },
];

// Hustle awards - ALL have links in the original
const hustleAwards = [
  { 
    src: "/images/awards/BBC.svg", 
    width: 80, 
    link: "https://twitter.com/MarxMedia/status/497380416501084160",
    gridArea: "1 / 1 / 2 / 2",
    justifySelf: "start"
  },
  { 
    src: "/images/awards/Vice.svg", 
    width: 80, 
    link: "https://motherboard.vice.com/en_us/article/qkvjjq/why-anonymous-messaging-services-are-full-of-bitching-and-flirting",
    gridArea: "1 / 2 / 2 / 3",
    placeSelf: "start center"
  },
  { 
    src: "/images/awards/tnw.svg", 
    width: 80, 
    link: "https://thenextweb.com/socialmedia/2014/07/28/leak-lets-send-nearly-anonymous-emails-friends-family-enemies/",
    gridArea: "1 / 3 / 2 / 4",
    justifySelf: "end"
  },
  { 
    src: "/images/awards/Vogue.svg", 
    width: 100, 
    link: "https://www.vogue.ru/fashion/news/balencyoga_gibkiy_otvet_balenciaga/",
    gridArea: "2 / 1 / 3 / 2",
    justifySelf: "start"
  },
  { 
    src: "/images/awards/Combined-Shape_1.svg", 
    width: 140, 
    link: "https://hypebeast.kr/2017/7/balencyoga-balenciaga-parody-collection",
    gridArea: "2 / 3 / 3 / 4",
    justifySelf: "end"
  },
  { 
    src: "/images/awards/Combined-Shape.svg", 
    width: 64, 
    link: "https://twitter.com/justleakit/status/496255472820039680",
    gridArea: "3 / 1 / 4 / 2",
    justifySelf: "start"
  },
  { 
    src: "/images/awards/Washington-Post.svg", 
    width: 160, // Made bigger
    link: "https://www.washingtonpost.com/news/the-intersect/wp/2014/07/29/a-new-app-will-let-you-send-anonymous-e-mail-to-anyone-which-sounds-like-a-disaster-waiting-to-happen/",
    gridArea: "3 / 2 / 4 / 3",
    placeSelf: "center center", // Changed to center for better positioning
    customOffset: 10 // Move it down a bit
  },
  { 
    src: "/images/awards/Mashable.svg", 
    width: 100, 
    link: "http://mashable.com/2014/08/04/leak-anonymous-email/",
    gridArea: "3 / 3 / 4 / 4",
    justifySelf: "end"
  },
];

export default function AwardGrid({ section, containerRef }: AwardGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('translateY(0px)');
  const awards = section === "tribe" ? tribeAwards : hustleAwards;

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const container = containerRef?.current || document.querySelector('.overflow-y-auto');
      if (!container) return;
      
      // Get section's position relative to viewport
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how much the section is in view
      // When section enters from bottom: 0
      // When section is centered: 0.5  
      // When section exits to top: 1
      const sectionProgress = 1 - ((rect.top + rect.height) / (windowHeight + rect.height));
      
      // Apply parallax effect - background moves slower than foreground
      // Increased multiplier for more visible effect
      const parallaxOffset = sectionProgress * 150 - 50; // Increased for more visible parallax, shifted up 50px
      
      setTransform(`translateY(${parallaxOffset}px)`);
    };

    // Listen to both window scroll and container scroll
    const container = containerRef?.current || document.querySelector('.overflow-y-auto');
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true });
    }
    
    handleScroll(); // Initial calculation
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [containerRef]);

  return (
    <div ref={sectionRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      <div 
        ref={gridRef}
        className="award-grid"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 3,
          display: 'grid',
          gridTemplateColumns: section === 'tribe' ? '1fr 1fr 1fr' : 'repeat(3, 1fr)',
          gridTemplateRows: section === 'tribe' ? 'auto auto auto' : 'repeat(3, 1fr)',
          gridColumnGap: '16px',
          gridRowGap: '16px',
          padding: section === 'tribe' ? '10% 10%' : '10% 10%',
          height: '100vh',
          alignItems: 'center',
          justifyContent: 'stretch',
          willChange: 'transform',
          transform,
          transition: 'transform 0.15s ease-out',
        }}
      >
        {awards.map((award, index) => {
          const hasLink = award.link !== null;
          const AwardElement = hasLink ? 'a' : 'div';
          const props = hasLink ? { 
            href: award.link, 
            target: "_blank", 
            rel: "noopener noreferrer"
          } : {};
          
          // Build positioning style
          const positionStyle: React.CSSProperties = {
            gridArea: award.gridArea,
            filter: 'brightness(0.2) contrast(1.4) saturate(0.8)',
            transition: 'all 0.2s',
            cursor: hasLink ? 'pointer' : 'default',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: hasLink ? 'auto' : 'none',
            padding: '10px', // Add padding for better hover area
          };
          
          // Apply specific positioning
          if (award.placeSelf) {
            positionStyle.placeSelf = award.placeSelf;
          } else if (award.justifySelf) {
            positionStyle.justifySelf = award.justifySelf;
            positionStyle.alignSelf = 'center';
          }
          
          // Apply custom offset if specified (for Washington Post)
          if ('customOffset' in award && award.customOffset) {
            positionStyle.transform = `translateY(${award.customOffset}px)`;
          }
          
          return (
            <AwardElement 
              key={index} 
              {...props}
              className="award-item"
              style={positionStyle}
              onMouseEnter={(e) => {
                if (hasLink) {
                  (e.currentTarget as HTMLElement).style.filter = 'brightness(0.4) contrast(1.4) saturate(0.8)';
                }
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.filter = 'brightness(0.2) contrast(1.4) saturate(0.8)';
              }}
            >
              <img 
                src={award.src} 
                alt=""
                style={{ 
                  width: `${award.width}px`,
                  height: 'auto',
                  maxWidth: '100%',
                }}
              />
            </AwardElement>
          );
        })}
      </div>
    </div>
  );
}