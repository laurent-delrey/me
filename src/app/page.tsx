"use client";

import { useState, useEffect, useRef } from "react";
import React from "react";
import dynamic from "next/dynamic";
import { AnimatedText } from "@/components/AnimatedText";
import { VerticalScrollProgress } from "@/components/VerticalScrollProgress";
import { IPadCursor } from "@/components/IPadCursor";

// Dynamic import to avoid SSR issues with Mapbox
const Map = dynamic(() => import("@/components/Map"), { ssr: false });

const sections = [
  { id: "tldr", label: "TL;DR", years: "", location: [-118.5976, 34.0378] as [number, number], zoom: 12.5, city: "topanga, ca" }, // Topanga
  { id: "meta", label: "meta", years: "2025 – ???", location: [-122.1484, 37.4419] as [number, number], zoom: 12.5, city: "menlo park, ca" }, // Menlo Park
  { id: "free", label: "free ideas", years: "2021 – ???", location: [-118.4912, 34.0195] as [number, number], zoom: 12.5, city: "santa monica, ca" }, // Santa Monica
  { id: "snap", label: "Snap, Inc.", years: "2018 – 2023", location: [-118.4691, 33.9871] as [number, number], zoom: 12.5, city: "venice, ca" }, // Venice
  { id: "tribe", label: "A Quest called Tribe", years: "2015 – 2018", location: [-122.4194, 37.7749] as [number, number], zoom: 12, city: "san francisco, ca" }, // SF
  { id: "hustle", label: "Hustling for fun", years: "2012 – 2014", location: [2.3618, 48.8709] as [number, number], zoom: 13.5, city: "paris, france" }, // 10th arrondissement Paris
  { id: "lost", label: "Lost in the game", years: "2007 – 2012", location: [2.2885, 48.8412] as [number, number], zoom: 13.5, city: "paris, france" }, // 15th arrondissement Paris
  { id: "kid", label: "Another Internet Kid", years: "2005 – 2007", location: [2.5185, 48.8407] as [number, number], zoom: 13, city: "suburbs of paris" }, // Bry-sur-Marne
  { id: "social", label: "@ Me", years: "@", location: [-118.5976, 34.0378] as [number, number], zoom: 12.5, city: "" }, // Topanga
];

const getContent = (activeSection: number): Record<string, React.ReactElement> => ({
  tldr: (
    <div style={{ maxWidth: '480px', padding: '0 20px' }}>
      <AnimatedText delay={100} sectionIndex={0} isActive={activeSection === 0}>
        <p style={{ fontSize: '1.125rem', lineHeight: '1.75' }} className="text-white lowercase text-left text-shadow">
          i'm a designer currently living in nyc. i've been designing different type of things for the internet,
          from tiny controversial experiments to larger-scale consumer products through conceptual art images and prototypes i share on <a 
            href="https://x.com/laurentdelrey" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: '#ffffff', textDecoration: 'none' }}
            className="hover:underline"
          >twitter</a>.
        </p>
      </AnimatedText>
    </div>
  ),
  meta: (
    <div style={{ maxWidth: '480px', padding: '0 20px' }}>
      <AnimatedText delay={100} sectionIndex={1} isActive={activeSection === 1}>
        <p style={{ fontSize: '1.125rem', lineHeight: '1.75' }} className="text-white lowercase text-left text-shadow">
          i joined the <a 
            href="https://www.meta.com/superintelligence/?srsltid=AfmBOopHTK7ev-Yn8V8JQUmsakQSZZPMkmujYBP_nwU114z_P0agW6NN" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: '#98E6FC', textDecoration: 'none' }}
            className="hover:underline"
          >meta</a> super intelligence lab in january. since then, i've been playing with frontier models to original design ios experiences at the intersection of social and ai. learning a ton!
        </p>
      </AnimatedText>
    </div>
  ),
  free: (
    <div style={{ maxWidth: '480px', padding: '0 20px' }}>
      <AnimatedText delay={100} sectionIndex={2} isActive={activeSection === 2}>
        <p style={{ fontSize: '1.125rem', lineHeight: '1.75' }} className="text-white lowercase text-left text-shadow">
          i started sharing free ideas organically on <a 
            href="https://twitter.com/laurentdelrey" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: '#ffffff', textDecoration: 'none' }}
            className="hover:underline"
          >twitter</a>, 
          on apr <span style={{ fontWeight: 600 }}>1</span> <span style={{ fontWeight: 600 }}>2021</span>. the first idea was an april fool and i kept going from there. 
          i use interface elements and internet brands to express my emotions and ideas.
        </p>
      </AnimatedText>
    </div>
  ),
  snap: (
    <div style={{ maxWidth: '480px', padding: '0 20px' }}>
      <AnimatedText delay={100} sectionIndex={3} isActive={activeSection === 3}>
        <p style={{ fontSize: '1.125rem', lineHeight: '1.75' }} className="text-white lowercase text-left text-shadow">
          I've been a member of the core product design team at <a 
            href="https://www.snapchat.com" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: '#F5FC98', textDecoration: 'none' }}
            className="hover:underline"
          >snapchat</a>. 
          A small pioneer group of inventors who disrupted the space. 
          I've been honored to contribute to building for chat, calling, minis and the camera.
        </p>
      </AnimatedText>
    </div>
  ),
  tribe: (
    <div style={{ maxWidth: '480px', padding: '0 20px' }}>
      <AnimatedText delay={100} sectionIndex={4} isActive={activeSection === 4}>
        <p style={{ fontSize: '1.125rem', lineHeight: '1.75' }} className="text-white lowercase text-left text-shadow">
          <span style={{ fontWeight: 600 }}>2</span> continents. <span style={{ fontWeight: 600 }}>3</span> cities. <span style={{ fontWeight: 600 }}>4</span> houses. <span style={{ fontWeight: 600 }}>15</span> people. <span style={{ fontWeight: 600 }}>4</span> products. <span style={{ fontWeight: 600 }}>1</span> family. 
          Tribe was a series of social experiments backed by <a 
            href="https://www.sequoiacap.com" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: '#98FCE6', textDecoration: 'none' }}
            className="hover:underline"
          >Sequoia Capital</a> and <a 
            href="https://www.kleinerperkins.com" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: '#98FCE6', textDecoration: 'none' }}
            className="hover:underline"
          >KPCB</a>. 
          A <a 
            href="https://www.producthunt.com/products/tribe-2" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: '#98FCE6', textDecoration: 'none' }}
            className="hover:underline"
          >messaging app</a>, a <a 
            href="https://techcrunch.com/2017/01/10/tribe-voice/" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: '#98FCE6', textDecoration: 'none' }}
            className="hover:underline"
          >calling app</a> and a <a 
            href="https://www.producthunt.com/products/tribe-3" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: '#98FCE6', textDecoration: 'none' }}
            className="hover:underline"
          >gaming app</a>.
        </p>
      </AnimatedText>
    </div>
  ),
  hustle: (
    <div style={{ maxWidth: '480px', padding: '0 20px' }}>
      <AnimatedText delay={100} sectionIndex={5} isActive={activeSection === 5}>
        <p style={{ fontSize: '1.125rem', lineHeight: '1.75' }} className="text-white lowercase text-left text-shadow">
          I've released a bunch of side projects. From an ironic fan brand inspired by <a 
            href="https://www.instagram.com/balencyoga/" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: '#9F98FC', textDecoration: 'none' }}
            className="hover:underline"
          >Balenciaga</a>, 
          the missing "Explore" section of <a 
            href="https://techcrunch.com/2014/10/10/snapcat/" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: '#9F98FC', textDecoration: 'none' }}
            className="hover:underline"
          >Snapchat</a>, or Collectible Cards on the <a 
            href="https://nytimes.com/2014/02/23/business/a-venture-fund-with-plenty-of-virtual-capital-but-no-capitalist.html" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: '#9F98FC', textDecoration: 'none' }}
            className="hover:underline"
          >Ethereum network</a>. 
          The one that blew up the most though was a controversial email-based app called <a 
            href="https://www.producthunt.com/products/leak-3" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: '#9F98FC', textDecoration: 'none' }}
            className="hover:underline"
          >Leak</a>.
        </p>
      </AnimatedText>
    </div>
  ),
  lost: (
    <div style={{ maxWidth: '480px', padding: '0 20px' }}>
      <AnimatedText delay={100} sectionIndex={6} isActive={activeSection === 6}>
        <p style={{ fontSize: '1.125rem', lineHeight: '1.75' }} className="text-white lowercase text-left text-shadow">
          I have a Master Degree in Finance. I've never studied Design at school. 
          During my College years, I created a bunch of <a 
            href="https://www.tumblr.com" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: '#FC98C3', textDecoration: 'none' }}
            className="hover:underline"
          >Tumblrs</a> receiving 100,000+ visits, 
          curated a newsletter of torrent links called Le Video Club (RIP), 
          made merch for several French Colleges, interned at <a 
            href="https://www.leetchi.com" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: '#FC98C3', textDecoration: 'none' }}
            className="hover:underline"
          >Leetchi</a> - the "Hottest Startup #1 in Paris (<a 
            href="https://www.wired.com" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: '#FC98C3', textDecoration: 'none' }}
            className="hover:underline"
          >Wired</a>)" 
          and also created my first social app.
        </p>
      </AnimatedText>
    </div>
  ),
  kid: (
    <div style={{ maxWidth: '480px', padding: '0 20px' }}>
      <AnimatedText delay={100} sectionIndex={7} isActive={activeSection === 7}>
        <p style={{ fontSize: '1.125rem', lineHeight: '1.75' }} className="text-white lowercase text-left text-shadow">
          Born and raised in Paris, France. I started designing at 16 on a cracked version of Photoshop CS2. 
          My first gigs were terrible logos & websites for my <a 
            href="https://en.wikipedia.org/wiki/Counter-Strike" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: '#ffffff', textDecoration: 'none' }}
            className="hover:underline"
          >Counter Strike</a> friends. 
          <a 
            href="https://en.wikipedia.org/wiki/AIM_(software)" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: '#ffffff', textDecoration: 'none' }}
            className="hover:underline"
          >AIM</a>, <a 
            href="https://en.wikipedia.org/wiki/MSN_Messenger" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: '#ffffff', textDecoration: 'none' }}
            className="hover:underline"
          >MSN</a> or <a 
            href="https://en.wikipedia.org/wiki/MIRC" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: '#ffffff', textDecoration: 'none' }}
            className="hover:underline"
          >mIRC</a>. The early days of remote work.
        </p>
      </AnimatedText>
    </div>
  ),
  social: (
    <div style={{ maxWidth: '480px', padding: '0 20px' }}>
      <AnimatedText delay={100} sectionIndex={8} isActive={activeSection === 8}>
        <p style={{ fontSize: '1.125rem', lineHeight: '1.75' }} className="text-white lowercase text-left text-shadow">
          DMs are opened on <a 
            href="https://twitter.com/laurentdelrey" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: '#ffffff', textDecoration: 'none' }}
            className="hover:underline"
          >Twitter</a> and <a 
            href="https://t.me/laurentdelrey" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: '#ffffff', textDecoration: 'none' }}
            className="hover:underline"
          >Telegram</a>. 
          I can do <a 
            href="mailto:laurent.desserrey@gmail.com?subject=Hi%20there" 
            style={{ color: '#ffffff', textDecoration: 'none' }}
            className="hover:underline"
          >email</a> too. 
          Love.
        </p>
      </AnimatedText>
    </div>
  ),
});

export default function Home() {
  const [activeSection, setActiveSection] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const currentSection = sections[activeSection];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollContainerRef.current) return;
      
      const container = scrollContainerRef.current;
      const scrollTop = container.scrollTop;
      const containerHeight = container.clientHeight;
      
      // Calculate which section index we're at based on scroll position
      const sectionHeight = containerHeight;
      const currentSectionIndex = Math.round(scrollTop / sectionHeight);
      
      // Clamp to valid range
      const newActiveSection = Math.max(0, Math.min(sections.length - 1, currentSectionIndex));
      
      if (newActiveSection !== activeSection) {
        console.log('Scroll detected, changing to section:', newActiveSection);
        setActiveSection(newActiveSection);
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true });
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [activeSection]);

  const scrollToSection = (index: number) => {
    setActiveSection(index);
    sectionRefs.current[index]?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'center' 
    });
  };

  return (
    <>
      {/* iPad-style Cursor - only show on desktop */}
      {mounted && typeof window !== 'undefined' && window.innerWidth > 768 && (
        <IPadCursor />
      )}
      
      {/* Map Background */}
      <Map 
        center={currentSection?.location || [-74.006, 40.7128]} 
        zoom={currentSection?.zoom || 11}
        onLoad={() => setMapLoaded(true)}
      />
      
      <main className={`h-screen relative z-10 overflow-hidden ${mounted && mapLoaded ? 'animate-fadeIn' : 'opacity-0'}`}>
        {/* Vertical Scroll Progress */}
        <VerticalScrollProgress containerRef={scrollContainerRef} />
        
        {/* Scrollable Content */}
        <div 
          ref={scrollContainerRef}
          className="h-full overflow-y-auto scroll-smooth hide-scrollbar"
          style={{ 
            scrollSnapType: 'y mandatory'
          }}
        >
          {sections.map((section, index) => (
            <div 
              key={section.id}
              ref={el => { sectionRefs.current[index] = el; }}
              className="min-h-screen flex flex-col items-center justify-center relative"
              style={{ 
                scrollSnapAlign: 'center'
              }}
            >
              <div style={{ maxWidth: '480px', width: '100%' }}>
                {/* Section Title */}
                <div 
                  className="mb-4"
                  style={{ 
                    padding: '0 20px'
                  }}
                >
                  <h2 className="text-white lowercase text-shadow" style={{ 
                    fontSize: '1.125rem', 
                    lineHeight: '1.5', 
                    fontWeight: 500
                  }}>
                    {section.label}
                  </h2>
                </div>
                
                {/* Content with padding */}
                <div style={{ 
                  paddingTop: '15px', 
                  paddingBottom: '15px'
                }}>
                  {getContent(activeSection)[section.id]}
                </div>
                
                {/* Location indicator */}
                {section.city && (
                  <div style={{ 
                    padding: '0 20px', 
                    marginTop: '10px'
                  }}>
                    <p className="text-white lowercase text-shadow" style={{ 
                      fontSize: '0.875rem', 
                      opacity: 0.7
                    }}>
                      {section.city}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Vignette overlay */}
        <div 
          className="fixed inset-0 pointer-events-none z-10"
          style={{
            background: `radial-gradient(ellipse at center, transparent 0%, rgba(150, 150, 150, 0.5) 50%, rgba(150, 150, 150, 1) 90%)`
          }}
        />

        {/* Timeline Footer */}
        <div 
          className="fixed bottom-0 left-0 right-0 z-20 flex items-center justify-center"
          style={{ 
            height: '120px',
          }}
        >
          <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
            {/* Timeline items container with transparent fade */}
            <div style={{ 
              width: '100%', 
              height: '100%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              maskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)'
            }}>
              <div 
                className="flex items-center"
              style={{ 
                transform: `translateX(${activeSection * 140 - (sections.length - 1) * 70}px)`,
                transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                gap: '40px'
              }}
            >
              {sections.slice().reverse().map((section, reverseIndex) => {
                const index = sections.length - 1 - reverseIndex;
                return (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(index)}
                  className={`text-white lowercase whitespace-nowrap transition-all duration-300 text-shadow`}
                  style={{ 
                    fontSize: '0.875rem',
                    opacity: activeSection === index ? 1 : 0.4,
                    transform: activeSection === index ? 'scale(1.1)' : 'scale(1)',
                    padding: '4px 12px',
                    borderRadius: '6px'
                  }}
                >
                  <span className="block">
                    {index === 0 ? 'scroll to start ↓' : (section.years || '')}
                  </span>
                </button>
              )})}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}