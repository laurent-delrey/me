"use client";

import { useEffect, useRef, useState } from "react";

interface AwardGridProps {
  section: "tribe" | "hustle";
  containerRef?: React.RefObject<HTMLDivElement | null>;
}

// Tribe awards with specific grid positions
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

// Hustle awards with specific grid positions
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
    width: 120, 
    link: "https://www.washingtonpost.com/news/the-intersect/wp/2014/07/29/a-new-app-will-let-you-send-anonymous-e-mail-to-anyone-which-sounds-like-a-disaster-waiting-to-happen/",
    gridArea: "3 / 2 / 4 / 3",
    placeSelf: "end center"
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
      // Use a smaller multiplier for subtle effect
      const parallaxOffset = sectionProgress * 80; // Adjust for parallax intensity
      
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
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridTemplateRows: 'repeat(3, 1fr)',
          padding: '5%',
          height: '100vh',
          willChange: 'transform',
          transform,
          transition: 'transform 0.15s ease-out',
        }}
      >
        {awards.map((award, index) => {
          const AwardElement = award.link ? 'a' : 'div';
          const props = award.link ? { 
            href: award.link, 
            target: "_blank", 
            rel: "noopener noreferrer",
            style: { pointerEvents: 'auto' as const }
          } : {};
          
          // Build positioning style
          const positionStyle: React.CSSProperties = {
            gridArea: award.gridArea,
            opacity: 0.5,
            transition: 'opacity 0.2s',
            cursor: award.link ? 'pointer' : 'default',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          };
          
          // Apply specific positioning
          if (award.placeSelf) {
            positionStyle.placeSelf = award.placeSelf;
          } else if (award.justifySelf) {
            positionStyle.justifySelf = award.justifySelf;
            positionStyle.alignSelf = 'center';
          }
          
          return (
            <AwardElement 
              key={index} 
              {...props}
              className="award-item"
              style={positionStyle}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.opacity = '1';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.opacity = '0.5';
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