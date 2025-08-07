"use client";

import { useState, useEffect, useRef } from "react";
import React from "react";
import dynamic from "next/dynamic";
import { AnimatedText } from "@/components/AnimatedText";
import { VerticalScrollProgress } from "@/components/VerticalScrollProgress";
import { IPadCursor } from "@/components/IPadCursor";

// Dynamic import to avoid SSR issues with Mapbox
const Map = dynamic(() => import("@/components/Map"), { ssr: false });
const HorizontalCarousel = dynamic(() => import("@/components/HorizontalCarousel"), { ssr: false });

const sections = [
  { id: "tldr", label: "TL;DR", years: "", location: [-118.5976, 34.0378] as [number, number], zoom: 12.5, city: "topanga, ca" }, // Topanga
  { id: "meta", label: "meta", years: "2025 – ???", location: [-122.1484, 37.4419] as [number, number], zoom: 12.5, city: "menlo park, ca" }, // Menlo Park
  { id: "free", label: "free ideas", years: "2021 – ???", location: [-118.4912, 34.0195] as [number, number], zoom: 12.5, city: "santa monica, ca" }, // Santa Monica
  // Full-bleed gallery section that keeps the same map position and is hidden from the timeline
  { id: "free_media", label: "", years: "", location: [-118.4912, 34.0195] as [number, number], zoom: 12.5, city: "", inTimeline: false, fullBleed: true },
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
          >x</a> and <a 
            href="https://www.threads.net/@laurentdelrey" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: '#ffffff', textDecoration: 'none' }}
            className="hover:underline"
          >threads</a>.
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
    <div style={{ maxWidth: '720px', padding: '0 20px' }}>
      <AnimatedText delay={100} sectionIndex={2} isActive={activeSection === 2}>
        <p style={{ fontSize: '1.125rem', lineHeight: '1.75' }} className="text-white lowercase text-left text-shadow">
          i started sharing free ideas organically on <a 
            href="https://twitter.com/laurentdelrey" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: '#FFC5A9', textDecoration: 'none' }}
            className="hover:underline"
          >x</a>, 
          on apr <span style={{ fontWeight: 600 }}>1</span> <span style={{ fontWeight: 600 }}>2021</span>. the first idea was an april fool and i kept going from there. 
          i use interface elements and internet brands to express my emotions and ideas.
        </p>
      </AnimatedText>
    </div>
  ),
  free_media: (
    <>
      {/* Horizontal scroll carousel; map stays at Santa Monica */}
      <HorizontalCarousel />
    </>
  ),
  snap: (
    <div style={{ maxWidth: '480px', padding: '0 20px' }}>
      <AnimatedText delay={100} sectionIndex={3} isActive={activeSection === 3}>
        <p style={{ fontSize: '1.125rem', lineHeight: '1.75' }} className="text-white lowercase text-left text-shadow">
          I've been a member of the core product design team at <a 
            href="https://www.snap.com/" 
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
            href="https://www.sequoiacap.com/#" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: '#98FCE6', textDecoration: 'none' }}
            className="hover:underline"
          >Sequoia Capital</a> and <a 
            href="https://www.kleinerperkins.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: '#98FCE6', textDecoration: 'none' }}
            className="hover:underline"
          >KPCB</a>. 
          A <a 
            href="https://www.producthunt.com/posts/tribe-2-0" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: '#98FCE6', textDecoration: 'none' }}
            className="hover:underline"
          >messaging app</a>, a <a 
            href="https://www.producthunt.com/posts/tribe-calls" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: '#98FCE6', textDecoration: 'none' }}
            className="hover:underline"
          >calling app</a> and a <a 
            href="https://www.producthunt.com/posts/tribe-games" 
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
          I've released a bunch of side projects. From an <a 
            href="https://www.instagram.com/balencyoga/" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: '#FFC5A9', textDecoration: 'none' }}
            className="hover:underline"
          >ironic fan brand</a> inspired by Balenciaga (<a 
            href="https://www.elle.vn/tin-thoi-trang/balencyoga-tan-binh-cua-con-sot-trao-phung-trong-thoi-trang?fbclid=IwAR1Y7FE8jI8WY9SrK3vR7T0K8JQMcV_zleFzdo0TaXJU1FWLvnHrEBwXlPk" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: '#FFC5A9', textDecoration: 'none' }}
            className="hover:underline"
          >1</a>,<a 
            href="https://hypebeast.kr/2017/7/balencyoga-balenciaga-parody-collection?utm_source=facebook&utm_medium=social&utm_campaign=share+buttons&fbclid=IwAR2ltqy29D_KfBiDdQFM55yZTvTKOIQfSfqFsQWNKlnnjgbS-sPWcOCz2JY" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: '#FFC5A9', textDecoration: 'none' }}
            className="hover:underline"
          >2</a>,<a 
            href="https://www.vogue.ru/fashion/news/balencyoga_gibkiy_otvet_balenciaga/?fbclid=IwAR2A0AdYsxkEiNzvpsrtW8RtNt4aQQx0e47LgdjjqloAnl6t5nweGDPmcYE" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: '#FFC5A9', textDecoration: 'none' }}
            className="hover:underline"
          >3</a>), 
          the missing <a 
            href="https://www.producthunt.com/posts/snapchatters" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: '#FFC5A9', textDecoration: 'none' }}
            className="hover:underline"
          >"Explore" section</a> of Snapchat, or <a 
            href="https://twitter.com/laurentdelrey/status/1009135685960232961" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: '#FFC5A9', textDecoration: 'none' }}
            className="hover:underline"
          >Collectible Cards</a> on the Ethereum network. 
          The one that blew up the most though was a controversial email-based app called <a 
            href="https://twitter.com/justleakit" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: '#FFC5A9', textDecoration: 'none' }}
            className="hover:underline"
          >Leak</a> (<a 
            href="https://twitter.com/MarxMedia/status/497380416501084160" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: '#FFC5A9', textDecoration: 'none' }}
            className="hover:underline"
          >1</a>,<a 
            href="https://twitter.com/justleakit/status/496255472820039680" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: '#FFC5A9', textDecoration: 'none' }}
            className="hover:underline"
          >2</a>,<a 
            href="https://www.washingtonpost.com/news/the-intersect/wp/2014/07/29/a-new-app-will-let-you-send-anonymous-e-mail-to-anyone-which-sounds-like-a-disaster-waiting-to-happen/?Post%20generic=%3Ftid%3Dsm_twitter_washingtonpost&noredirect=on&utm_term=.3b2ec28fb9a8" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: '#FFC5A9', textDecoration: 'none' }}
            className="hover:underline"
          >3</a>,<a 
            href="https://www.chicagotribune.com/business/careers/ct-biz-0825-work-advice-huppke-20140825-column.html" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: '#FFC5A9', textDecoration: 'none' }}
            className="hover:underline"
          >4</a>,<a 
            href="https://www.dailydot.com/debug/leak-anonymous-email/" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: '#FFC5A9', textDecoration: 'none' }}
            className="hover:underline"
          >5</a>,<a 
            href="https://www.businessinsider.com/send-anonymous-emails-with-leak-website-2014-7" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: '#FFC5A9', textDecoration: 'none' }}
            className="hover:underline"
          >6</a>,<a 
            href="https://www.fastcompany.com/3033705/i-lied-to-you-a-few-days-ago-the-leak-app-and-anonymous-honesty" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: '#FFC5A9', textDecoration: 'none' }}
            className="hover:underline"
          >7</a>,<a 
            href="https://thenextweb.com/socialmedia/2014/07/28/leak-lets-send-nearly-anonymous-emails-friends-family-enemies/?utm_source=t.co&utm_medium=referral&utm_content=Leak+lets+you+send+nearly+anonymous+emails+to+friends%2C+family+and+enemies&utm_campaign=Twitter+Publisher#.tnw_yD56EVxS" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: '#FFC5A9', textDecoration: 'none' }}
            className="hover:underline"
          >8</a>,<a 
            href="https://mashable.com/2014/08/04/leak-anonymous-email/#gMOq6WVLfaqM" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: '#FFC5A9', textDecoration: 'none' }}
            className="hover:underline"
          >9</a>,<a 
            href="https://www.engadget.com/2014/08/04/leak-anonymous-email/" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: '#FFC5A9', textDecoration: 'none' }}
            className="hover:underline"
          >10</a>,<a 
            href="https://www.cosmopolitan.com/lifestyle/news/a29522/leak-website-anonymous-email/?src=spr_TWITTER&spr_id=1440_76579580" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: '#FFC5A9', textDecoration: 'none' }}
            className="hover:underline"
          >11</a>,<a 
            href="https://motherboard.vice.com/en_us/article/qkvjjq/why-anonymous-messaging-services-are-full-of-bitching-and-flirting" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: '#FFC5A9', textDecoration: 'none' }}
            className="hover:underline"
          >12</a>,<a 
            href="https://pando.com/2014/08/04/anonymity-app-pulls-off-one-of-the-worst-tech-pr-stunts-ever-attempted/" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: '#FFC5A9', textDecoration: 'none' }}
            className="hover:underline"
          >13</a>,<a 
            href="https://www.konbini.com/fr/tendances-2/leak-messagerie-anonyme-flirter/" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: '#FFC5A9', textDecoration: 'none' }}
            className="hover:underline"
          >14</a>,<a 
            href="https://www.lesinrocks.com/2014/08/11/actualite/leak-lapplication-surfe-retour-lanonymat-11518963/" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: '#FFC5A9', textDecoration: 'none' }}
            className="hover:underline"
          >15</a>).
        </p>
      </AnimatedText>
    </div>
  ),
  lost: (
    <div style={{ maxWidth: '480px', padding: '0 20px' }}>
      <AnimatedText delay={100} sectionIndex={6} isActive={activeSection === 6}>
        <p style={{ fontSize: '1.125rem', lineHeight: '1.75' }} className="text-white lowercase text-left text-shadow">
          I have a Master Degree in Finance. I've never studied Design at school. 
          During my College years, I created a bunch of Tumblrs (<a 
            href="https://www.konbini.com/fr/3-0/un-tumblr-histoire-internet-picasso-jay-z" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: '#FC98C3', textDecoration: 'none' }}
            className="hover:underline"
          >1</a>,<a 
            href="https://twitter.com/search?q=jeprendslemetro.tumblr.com&src=typd" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: '#FC98C3', textDecoration: 'none' }}
            className="hover:underline"
          >2</a>) <span style={{ opacity: 0.7 }}>receiving 100,000+ visits</span>, 
          curated a newsletter of torrent links called Le Video Club (<a 
            href="https://medium.com/le-futur-de-la-distribution-de-films-en-france/vie-et-mort-dun-service-illegal-de-vod-117ac172308c" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: '#FC98C3', textDecoration: 'none' }}
            className="hover:underline"
          >RIP</a>), 
          made merch for several French Colleges (<a 
            href="https://vimeo.com/26993365?fbclid=IwAR0TudM-UkXbfXh_nPv1hD3yBvxCj9bnuX9vbZjGasusQuT-QgJbUm-oBiE" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: '#FC98C3', textDecoration: 'none' }}
            className="hover:underline"
          >1</a>), interned at Leetchi - the "<a 
            href="https://www.wired.co.uk/article/paris-3" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: '#FC98C3', textDecoration: 'none' }}
            className="hover:underline"
          >Hottest Startup #1 in Paris (Wired)</a>" 
          and also created my first social app (<a 
            href="https://www.youtube.com/watch?v=bAiHnmfvcmc" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: '#FC98C3', textDecoration: 'none' }}
            className="hover:underline"
          >1</a>,<a 
            href="https://www.youtube.com/watch?v=diPZrGIODM0&t=1s" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: '#FC98C3', textDecoration: 'none' }}
            className="hover:underline"
          >2</a>,<a 
            href="https://twitter.com/search?q=linkility&src=typd" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: '#FC98C3', textDecoration: 'none' }}
            className="hover:underline"
          >3</a>).
        </p>
      </AnimatedText>
    </div>
  ),
  kid: (
    <div style={{ maxWidth: '480px', padding: '0 20px' }}>
      <AnimatedText delay={100} sectionIndex={7} isActive={activeSection === 7}>
        <p style={{ fontSize: '1.125rem', lineHeight: '1.75' }} className="text-white lowercase text-left text-shadow">
          Born and raised in Paris, France. I started designing at 16 on a cracked version of Photoshop CS2. 
          My first gigs were terrible logos & websites for my Counter Strike friends. 
          AIM, MSN or mIRC. The early days of remote work.
        </p>
      </AnimatedText>
    </div>
  ),
  social: (
    <div style={{ maxWidth: '480px', padding: '0 20px' }}>
      <AnimatedText delay={100} sectionIndex={8} isActive={activeSection === 8}>
        <p style={{ fontSize: '1.125rem', lineHeight: '1.75' }} className="lowercase text-left text-shadow">
          <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>DMs are opened on</span> <a 
            href="https://twitter.com/laurentdelrey" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: '#ffffff', textDecoration: 'none' }}
            className="hover:underline"
          >X</a> <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>and</span> <a 
            href="https://t.me/laurentdelrey" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: '#ffffff', textDecoration: 'none' }}
            className="hover:underline"
          >Telegram</a><span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>.</span>
          <br />
          <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>I can do</span> <a 
            href="mailto:laurent.desserrey@gmail.com?subject=Hi%20there" 
            style={{ color: '#ffffff', textDecoration: 'none' }}
            className="hover:underline"
          >email</a> <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>too.</span>
          <br />
          <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Love.</span>
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
  // Map actual sections to legacy indices used by AnimatedText internals
  // Currently unused but kept for future use
  // const legacyIndexById: Record<string, number> = {
  //   tldr: 0,
  //   meta: 1,
  //   free: 2,
  //   free_media: 2,
  //   snap: 3,
  //   tribe: 4,
  //   hustle: 5,
  //   lost: 6,
  //   kid: 7,
  //   social: 8,
  // };
  // const legacyActiveSection = legacyIndexById[currentSection?.id || 'tldr'] ?? 0;

  // Timeline should ignore helper sections (like free_media)
  const timelineSections = sections.filter((s: any) => s.inTimeline !== false);
  const timelineDisplayId = currentSection?.id === 'free_media' ? 'free' : currentSection?.id;
  const timelineActiveIndex = Math.max(0, timelineSections.findIndex((s) => s.id === timelineDisplayId));

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollContainerRef.current) return;
      
      const container = scrollContainerRef.current;
      const scrollTop = container.scrollTop;
      const containerHeight = container.clientHeight;
      
      // Each section takes one viewport height of scroll
      const currentSectionIndex = Math.round(scrollTop / containerHeight);
      
      // Clamp to valid range
      const newActiveSection = Math.max(0, Math.min(sections.length - 1, currentSectionIndex));
      
      if (newActiveSection !== activeSection) {
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
    if (!scrollContainerRef.current) return;
    const targetScrollTop = index * window.innerHeight;
    scrollContainerRef.current.scrollTo({
      top: targetScrollTop,
      behavior: 'smooth'
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
        
        {/* Horizontal Sections Container */}
        <div 
          ref={scrollContainerRef}
          className="h-full overflow-y-auto scroll-smooth hide-scrollbar"
          style={{ 
            scrollSnapType: 'y mandatory'
          }}
        >
          {/* Tall container to capture scroll */}
          <div style={{ height: `${sections.length * 100}vh` }}>
            {/* Sticky container for horizontal movement */}
            <div className="sticky top-0 h-screen w-screen overflow-hidden">
              {/* Sliding sections container */}
              <div 
                className="flex h-full transition-transform duration-500 ease-out"
                style={{ 
                  transform: `translateX(-${activeSection * 100}vw)`,
                  width: `${sections.length * 100}vw`
                }}
              >
                {sections.map((section, index) => (
                  <div 
                    key={section.id}
                    ref={el => { sectionRefs.current[index] = el; }}
                    className="w-screen h-screen flex-shrink-0 flex items-center justify-center relative"
                  >
                    {/* Special treatment for free_media section */}
                    {section.id === 'free_media' ? (
                      <div className="w-full h-full flex items-center justify-center">
                        {getContent(activeSection)[section.id]}
                      </div>
                    ) : (
                      <div style={{ maxWidth: '480px', width: '100%', position: 'relative', zIndex: 1 }}>
                        {/* Section Title */}
                        {section.label && (
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
                        )}
                        
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
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
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
                transform: `translateX(${timelineActiveIndex * 140 - (timelineSections.length - 1) * 70}px)`,
                transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                gap: '40px'
              }}
            >
              {timelineSections.slice().reverse().map((section, reverseIndex) => {
                const index = timelineSections.length - 1 - reverseIndex;
                return (
                <button
                  key={section.id}
                  onClick={() => {
                    // Map timeline index back to full sections index
                    const realIndex = sections.findIndex((s) => s.id === section.id);
                    scrollToSection(realIndex);
                  }}
                  className={`text-white lowercase whitespace-nowrap transition-all duration-300 text-shadow`}
                  style={{ 
                    fontSize: '0.875rem',
                    opacity: timelineActiveIndex === index ? 1 : 0.4,
                    transform: timelineActiveIndex === index ? 'scale(1.1)' : 'scale(1)',
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