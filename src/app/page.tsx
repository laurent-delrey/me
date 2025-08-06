"use client";

import { useState, useEffect, useRef } from "react";
import React from "react";
import dynamic from "next/dynamic";

// Dynamic import to avoid SSR issues with Mapbox
const Map = dynamic(() => import("@/components/Map"), { ssr: false });

const sections = [
  { id: "tldr", label: "TL;DR", years: "", location: [-118.5976, 34.0378] as [number, number], zoom: 12.5 }, // Topanga
  { id: "free", label: "free ideas", years: "apr '21 - Today", location: [-74.006, 40.7128] as [number, number], zoom: 12 }, // NYC
  { id: "snap", label: "Snap, Inc.", years: "Sep '18 - sep '23", location: [-118.4912, 34.0195] as [number, number], zoom: 12.5 }, // Santa Monica
  { id: "tribe", label: "A Quest called Tribe", years: "'15 - '18", location: [-122.4194, 37.7749] as [number, number], zoom: 12 }, // SF
  { id: "hustle", label: "Hustling for fun", years: "'12 - '14", location: [2.3522, 48.8566] as [number, number], zoom: 12.5 }, // Paris
  { id: "lost", label: "Lost in the game", years: "'07 - '12", location: [2.3522, 48.8566] as [number, number], zoom: 11.5 }, // Paris
  { id: "kid", label: "Another Internet Kid", years: "'05 - 07", location: [2.3522, 48.8566] as [number, number], zoom: 10.5 }, // Paris wider
  { id: "social", label: "@ Me", years: "Anytime", location: [-118.5976, 34.0378] as [number, number], zoom: 12.5 }, // Topanga
];

const content: Record<string, React.ReactElement> = {
  tldr: (
    <div style={{ maxWidth: '600px', padding: '0 20px' }}>
      <p style={{ fontSize: '1.125rem', lineHeight: '1.6' }} className="text-white lowercase text-center">
        i'm a designer currently living in nyc. i've been designing different type of things for the internet,
        from tiny controversial experiments to larger-scale consumer products through conceptual art images
        i share on twitter.
      </p>
    </div>
  ),
  free: (
    <div style={{ maxWidth: '600px', padding: '0 20px' }}>
      <p style={{ fontSize: '1.125rem', lineHeight: '1.6' }} className="text-white lowercase text-center">
        i started sharing free ideas organically on{" "}
        <a href="https://twitter.com/laurentdelrey" target="_blank" rel="noopener noreferrer" 
           className="underline hover:no-underline">twitter</a>, 
        on apr 1 2021. the first idea was an april fool and i kept going from there. 
        i use interface elements and internet brands to express my emotions and ideas.
      </p>
    </div>
  ),
  snap: (
    <div style={{ maxWidth: '600px', padding: '0 20px' }}>
      <p style={{ fontSize: '1.125rem', lineHeight: '1.6' }} className="text-white lowercase text-center">
        I've been a member of the core product design team at{" "}
        <a href="https://www.snap.com/" target="_blank" rel="noopener noreferrer" 
           className="underline hover:no-underline">snapchat</a>. 
        A small pioneer group of inventors who disrupted the space. 
        I've been honored to contribute to building for chat, calling, minis and the camera.
      </p>
    </div>
  ),
  tribe: (
    <div style={{ maxWidth: '600px', padding: '0 20px' }}>
      <p style={{ fontSize: '1.125rem', lineHeight: '1.6' }} className="text-white lowercase text-center">
        2 continents. 3 cities. 4 houses. 15 people. 4 products. 1 family. 
        Tribe was a series of social experiments backed by Sequoia Capital and KPCB. 
        A messaging app, a calling app and a gaming app.
      </p>
    </div>
  ),
  hustle: (
    <div style={{ maxWidth: '600px', padding: '0 20px' }}>
      <p style={{ fontSize: '1.125rem', lineHeight: '1.6' }} className="text-white lowercase text-center">
        I've released a bunch of side projects. From an ironic fan brand inspired by Balenciaga, 
        the missing "Explore" section of Snapchat, or Collectible Cards on the Ethereum network. 
        The one that blew up the most though was a controversial email-based app called Leak.
      </p>
    </div>
  ),
  lost: (
    <div style={{ maxWidth: '600px', padding: '0 20px' }}>
      <p style={{ fontSize: '1.125rem', lineHeight: '1.6' }} className="text-white lowercase text-center">
        I have a Master Degree in Finance. I've never studied Design at school. 
        During my College years, I created a bunch of Tumblrs receiving 100,000+ visits, 
        curated a newsletter of torrent links called Le Video Club (RIP), 
        made merch for several French Colleges, interned at Leetchi - the "Hottest Startup #1 in Paris (Wired)" 
        and also created my first social app.
      </p>
    </div>
  ),
  kid: (
    <div style={{ maxWidth: '600px', padding: '0 20px' }}>
      <p style={{ fontSize: '1.125rem', lineHeight: '1.6' }} className="text-white lowercase text-center">
        Born and raised in Paris, France. I started designing at 16 on a cracked version of Photoshop CS2. 
        My first gigs were terrible logos & websites for my Counter Strike friends. 
        AIM, MSN or mIRC. The early days of remote work.
      </p>
    </div>
  ),
  social: (
    <div style={{ maxWidth: '600px', padding: '0 20px' }}>
      <p style={{ fontSize: '1.125rem', lineHeight: '1.6' }} className="text-white lowercase text-center">
        DMs are opened on{" "}
        <a href="https://twitter.com/laurentdelrey" target="_blank" rel="noopener noreferrer" 
           className="underline hover:no-underline">Twitter</a> and{" "}
        <a href="https://t.me/laurentdelrey" target="_blank" rel="noopener noreferrer" 
           className="underline hover:no-underline">Telegram</a>. 
        I can do{" "}
        <a href="mailto:laurent.desserrey@gmail.com" className="underline hover:no-underline">email</a> too. 
        Love.
      </p>
    </div>
  ),
};

export default function Home() {
  const [activeSection, setActiveSection] = useState(0);
  const [mounted, setMounted] = useState(false);
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
      // Call it once to set initial state
      handleScroll();
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
      {/* Map Background */}
      <Map 
        center={currentSection?.location || [-74.006, 40.7128]} 
        zoom={currentSection?.zoom || 11}
      />
      
      <main className="h-screen relative z-10 overflow-hidden">
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
              {/* Section Title */}
              <div 
                className={`mb-8 ${mounted ? 'animate-fadeIn animation-delay-400' : 'opacity-0'}`}
                style={{ position: 'absolute', top: '30vh' }}
              >
                <h2 className="text-white lowercase" style={{ fontSize: '1.125rem', lineHeight: '1.5', opacity: 0.8 }}>
                  {section.label}
                </h2>
              </div>
              
              {/* Content */}
              <div className={mounted ? 'animate-fadeInUp animation-delay-600' : 'opacity-0'}>
                {content[section.id]}
              </div>
              
              {/* Scroll indicator for first section */}
              {index === 0 && (
                <div 
                  className={`absolute bottom-20 text-white lowercase ${mounted ? 'animate-fadeIn animation-delay-800' : 'opacity-0'}`}
                  style={{ fontSize: '0.875rem', opacity: 0.5 }}
                >
                  scroll to start →
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Timeline Footer */}
        <div 
          className={`fixed bottom-0 left-0 right-0 z-20 flex items-center justify-center ${mounted ? 'animate-fadeInUp animation-delay-200' : 'opacity-0'}`}
          style={{ 
            height: '80px',
            background: 'linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 100%)'
          }}
        >
          <div 
            className="flex items-center"
            style={{ 
              transform: `translateX(${-(activeSection * 200)}px)`,
              transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            {sections.map((section, index) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(index)}
                className={`px-8 text-white lowercase whitespace-nowrap transition-all duration-300`}
                style={{ 
                  fontSize: '0.875rem',
                  opacity: activeSection === index ? 1 : 0.3,
                  transform: activeSection === index ? 'scale(1.2)' : 'scale(1)',
                  minWidth: '200px'
                }}
              >
                <span className="block">{section.years || '—'}</span>
              </button>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}