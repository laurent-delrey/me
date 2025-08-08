"use client";

import { useEffect, useRef, useState } from "react";

interface AwardGridProps {
  section: "tribe" | "hustle";
  containerRef?: React.RefObject<HTMLDivElement | null>;
}

const tribeAwards = [
  { src: "/images/awards/Award-logo---FC.png", width: 180, link: null },
  { src: "/images/awards/Award-logo---Apple.png", width: 156, link: null },
  { src: "/images/awards/Award-logo---Google.png", width: 153, link: null },
  { src: "/images/awards/Award-logo---Time.png", width: 130, link: null },
  { src: "/images/awards/TC.svg", width: 70, link: "https://techcrunch.com/2016/10/12/augmented-chat/" },
  { src: "/images/awards/Shape.svg", width: 100, link: "https://www.youtube.com/watch?v=EnwRu20HOTQ" },
];

const hustleAwards = [
  { src: "/images/awards/Combined-Shape.svg", width: 64, link: "https://twitter.com/justleakit/status/496255472820039680" },
  { src: "/images/awards/Vogue.svg", width: 100, link: "https://www.vogue.ru/fashion/news/balencyoga_gibkiy_otvet_balenciaga/" },
  { src: "/images/awards/Washington-Post.svg", width: 120, link: "https://www.washingtonpost.com/news/the-intersect/wp/2014/07/29/a-new-app-will-let-you-send-anonymous-e-mail-to-anyone-which-sounds-like-a-disaster-waiting-to-happen/" },
  { src: "/images/awards/tnw.svg", width: 80, link: "https://thenextweb.com/socialmedia/2014/07/28/leak-lets-send-nearly-anonymous-emails-friends-family-enemies/" },
  { src: "/images/awards/Mashable.svg", width: 100, link: "http://mashable.com/2014/08/04/leak-anonymous-email/" },
  { src: "/images/awards/Combined-Shape_1.svg", width: 140, link: "https://hypebeast.kr/2017/7/balencyoga-balenciaga-parody-collection" },
  { src: "/images/awards/Vice.svg", width: 80, link: "https://motherboard.vice.com/en_us/article/qkvjjq/why-anonymous-messaging-services-are-full-of-bitching-and-flirting" },
  { src: "/images/awards/BBC.svg", width: 80, link: "https://twitter.com/MarxMedia/status/497380416501084160" },
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
      
      // Calculate how much the section is in view (-1 to 1)
      // -1 = section is below viewport, 0 = section is centered, 1 = section is above viewport
      const viewProgress = -rect.top / windowHeight;
      
      // Apply parallax effect - slower movement for background elements
      // Multiply by a smaller factor for subtle parallax
      const parallaxOffset = viewProgress * 100; // Adjust this value to control parallax intensity
      
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
          gridTemplateRows: 'repeat(3, auto)',
          gap: '32px',
          padding: '10% 5%',
          height: '100vh',
          alignItems: 'center',
          justifyItems: 'center',
          willChange: 'transform',
          transform,
          transition: 'transform 0.1s linear',
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
          
          return (
            <AwardElement 
              key={index} 
              {...props}
              className="award-item"
              style={{
                opacity: 0.3,
                transition: 'opacity 0.2s',
                cursor: award.link ? 'pointer' : 'default',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onMouseEnter={(e) => {
                if (award.link) {
                  (e.currentTarget as HTMLElement).style.opacity = '0.8';
                }
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.opacity = '0.3';
              }}
            >
              <img 
                src={award.src} 
                alt=""
                style={{ 
                  width: `${award.width}px`,
                  height: 'auto',
                  maxWidth: '100%',
                  filter: 'brightness(0.9)',
                }}
              />
            </AwardElement>
          );
        })}
      </div>
    </div>
  );
}