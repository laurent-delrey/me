"use client";

import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section id="tldr" className="min-h-screen flex items-center justify-center relative">
      <motion.h1 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="font-aretha text-[100px] md:text-[190px] lg:text-[310px] leading-[0.6] text-[#b4b4b4] absolute inset-0 flex items-center justify-center pt-[5%] pointer-events-none"
      >
        <span>
          laur<br/>ent del<br/>rey
        </span>
      </motion.h1>
      
      <motion.div 
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="z-10 text-center px-8 max-w-[50%]"
      >
        <p className="text-white text-lg md:text-[22px] leading-relaxed font-light lowercase">
          i'm a designer currently living in nyc. i've been designing different type of things for the internet, 
          from tiny controversial experiments to larger-scale consumer products through conceptual art images 
          i share on twitter.{" "}
          <a href="#free" className="text-white/50 border-b border-white/30 pb-2 hover:text-white hover:border-white/60 transition-all">
            Scroll down to check out my journey.
          </a>
        </p>
      </motion.div>
    </section>
  );
}