"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const tabs = [
  { id: "tldr", label: "TL;DR", years: "" },
  { id: "free", label: "free ideas", years: "apr '21 - Today" },
  { id: "snap", label: "Snap, Inc.", years: "Sep '18 - sep '23" },
  { id: "tribe", label: "A Quest called Tribe", years: "'15 - '18" },
  { id: "hustle", label: "Hustling for fun", years: "'12 - '14" },
  { id: "lost", label: "Lost in the game", years: "'07 - '12" },
  { id: "kid", label: "Another Internet Kid", years: "'05 - 07" },
  { id: "social", label: "@ Me", years: "Anytime" },
];

export default function TimelineNav() {
  const [activeTab, setActiveTab] = useState("tldr");

  useEffect(() => {
    const handleScroll = () => {
      const sections = tabs.map(tab => document.getElementById(tab.id));
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveTab(tabs[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed left-0 top-0 bottom-0 z-50 flex flex-col justify-center pl-[5%] pr-8">
      {tabs.map((tab, index) => (
        <motion.button
          key={tab.id}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          onClick={() => scrollToSection(tab.id)}
          className={`
            text-right py-2 my-1 font-maison text-lg font-light lowercase
            transition-all duration-300 hover:opacity-100
            ${activeTab === tab.id 
              ? "text-white opacity-100 translate-x-[-10px]" 
              : "text-white/50 opacity-80"
            }
          `}
        >
          <span className="block">{tab.label}</span>
          {tab.years && (
            <span className="text-xs text-white/50 font-medium">
              {tab.years}
            </span>
          )}
        </motion.button>
      ))}
    </nav>
  );
}