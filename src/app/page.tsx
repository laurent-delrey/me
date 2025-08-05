"use client";

import { useState } from "react";
import React from "react";
import dynamic from "next/dynamic";

// Dynamic import to avoid SSR issues with Mapbox
const Map = dynamic(() => import("@/components/Map"), { ssr: false });

const sections = [
  { id: "tldr", label: "TL;DR", years: "", location: [-74.006, 40.7128] as [number, number], zoom: 13 }, // NYC
  { id: "free", label: "free ideas", years: "apr '21 - Today", location: [-122.4194, 37.7749] as [number, number], zoom: 15.5 }, // San Francisco - close for buildings
  { id: "snap", label: "Snap, Inc.", years: "Sep '18 - sep '23", location: [-118.4912, 34.0195] as [number, number], zoom: 15 }, // Santa Monica/LA - close for buildings
  { id: "tribe", label: "A Quest called Tribe", years: "'15 - '18", location: [-122.4194, 37.7749] as [number, number], zoom: 14 }, // SF
  { id: "hustle", label: "Hustling for fun", years: "'12 - '14", location: [2.3522, 48.8566] as [number, number], zoom: 15.5 }, // Paris - close for buildings
  { id: "lost", label: "Lost in the game", years: "'07 - '12", location: [2.3522, 48.8566] as [number, number], zoom: 13 }, // Paris
  { id: "kid", label: "Another Internet Kid", years: "'05 - 07", location: [2.3522, 48.8566] as [number, number], zoom: 11 }, // Paris wider
  { id: "social", label: "@ Me", years: "Anytime", location: [-74.006, 40.7128] as [number, number], zoom: 16 }, // NYC very close
];

const content: Record<string, React.ReactElement> = {
  tldr: (
    <div>
      <h1 className="text-4xl font-bold mb-6 lowercase text-gray-900">laurent del rey</h1>
      <p className="text-xl text-gray-700 lowercase max-w-2xl">
        i'm a designer currently living in nyc. i've been designing different type of things for the internet,
        from tiny controversial experiments to larger-scale consumer products through conceptual art images
        i share on twitter.
      </p>
    </div>
  ),
  free: (
    <div>
      <p className="text-xl text-gray-700 lowercase max-w-2xl">
        i started sharing free ideas organically on{" "}
        <a href="https://twitter.com/laurentdelrey" target="_blank" rel="noopener noreferrer" 
           className="underline hover:no-underline">twitter</a>, 
        on apr 1 2021. the first idea was an april fool and i kept going from there. 
        i use interface elements and internet brands to express my emotions and ideas.
      </p>
    </div>
  ),
  snap: (
    <div>
      <p className="text-xl text-gray-700 lowercase max-w-2xl">
        I've been a member of the core product design team at{" "}
        <a href="https://www.snap.com/" target="_blank" rel="noopener noreferrer" 
           className="underline hover:no-underline">snapchat</a>. 
        A small pioneer group of inventors who disrupted the space. 
        I've been honored to contribute to building for chat, calling, minis and the camera.
      </p>
    </div>
  ),
  tribe: (
    <div>
      <p className="text-xl text-gray-700 lowercase max-w-2xl">
        2 continents. 3 cities. 4 houses. 15 people. 4 products. 1 family. 
        Tribe was a series of social experiments backed by Sequoia Capital and KPCB. 
        A messaging app, a calling app and a gaming app.
      </p>
    </div>
  ),
  hustle: (
    <div>
      <p className="text-xl text-gray-700 lowercase max-w-2xl">
        I've released a bunch of side projects. From an ironic fan brand inspired by Balenciaga, 
        the missing "Explore" section of Snapchat, or Collectible Cards on the Ethereum network. 
        The one that blew up the most though was a controversial email-based app called Leak.
      </p>
    </div>
  ),
  lost: (
    <div>
      <p className="text-xl text-gray-700 lowercase max-w-2xl">
        I have a Master Degree in Finance. I've never studied Design at school. 
        During my College years, I created a bunch of Tumblrs receiving 100,000+ visits, 
        curated a newsletter of torrent links called Le Video Club (RIP), 
        made merch for several French Colleges, interned at Leetchi - the "Hottest Startup #1 in Paris (Wired)" 
        and also created my first social app.
      </p>
    </div>
  ),
  kid: (
    <div>
      <p className="text-xl text-gray-700 lowercase max-w-2xl">
        Born and raised in Paris, France. I started designing at 16 on a cracked version of Photoshop CS2. 
        My first gigs were terrible logos & websites for my Counter Strike friends. 
        AIM, MSN or mIRC. The early days of remote work.
      </p>
    </div>
  ),
  social: (
    <div>
      <p className="text-xl text-gray-700 lowercase max-w-2xl">
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
  const [activeSection, setActiveSection] = useState("tldr");
  const currentSection = sections.find(s => s.id === activeSection);

  return (
    <>
      {/* Map Background */}
      <Map 
        center={currentSection?.location || [-74.006, 40.7128]} 
        zoom={currentSection?.zoom || 11}
      />
      
      <main className="min-h-screen flex relative z-10">
        {/* Left Navigation */}
        <nav className="fixed left-0 top-0 bottom-0 flex flex-col justify-center pl-[5%] pr-8 z-20">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`
              text-right py-2 my-1 text-lg font-normal lowercase
              transition-all duration-300 hover:opacity-100
              ${activeSection === section.id 
                ? "text-gray-900 opacity-100 translate-x-[-10px]" 
                : "text-gray-600 opacity-80"
              }
            `}
          >
            <span className="block">{section.label}</span>
            {section.years && (
              <span className="text-xs text-gray-500">
                {section.years}
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* Center Content */}
      <div className="flex-1 flex items-center justify-center px-8 ml-[20%]">
        <div className="text-center">
          {content[activeSection]}
        </div>
      </div>
    </main>
    </>
  );
}