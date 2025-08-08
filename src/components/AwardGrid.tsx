"use client";

import { useEffect, useRef } from "react";

interface AwardGridProps {
  section: "tribe" | "hustle";
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

export default function AwardGrid({ section }: AwardGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const awards = section === "tribe" ? tribeAwards : hustleAwards;

  useEffect(() => {
    const handleScroll = () => {
      if (!gridRef.current) return;
      
      // Get the grid's position relative to viewport
      const rect = gridRef.current.getBoundingClientRect();
      const scrollProgress = -rect.top / window.innerHeight;
      
      // Apply parallax effect to the grid
      const translateY = scrollProgress * 50; // Adjust multiplier for parallax intensity
      gridRef.current.style.transform = `translateY(${translateY}px)`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial position
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
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
        gap: '16px',
        padding: '0 5%',
        height: '100vh',
        alignItems: 'center',
        justifyItems: 'center',
        pointerEvents: 'none',
        willChange: 'transform',
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
              opacity: 0.5,
              transition: 'opacity 0.2s',
              cursor: award.link ? 'pointer' : 'default',
            }}
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
  );
}