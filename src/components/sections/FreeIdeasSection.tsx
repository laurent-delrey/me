"use client";

import { motion } from "framer-motion";

export default function FreeIdeasSection() {
  return (
    <section id="free" className="min-h-screen flex flex-col items-center justify-center py-20">
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-[50%] text-center mb-16"
      >
        <p className="text-white text-lg md:text-[22px] leading-relaxed font-light lowercase">
          i started sharing free ideas organically on{" "}
          <a 
            href="https://twitter.com/laurentdelrey" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[#3ea8ff] border-b border-white/30 pb-2 hover:border-white/60 transition-all"
          >
            twitter
          </a>
          , on apr 1 2021. the first idea was an april fool and i kept going from there. 
          i use interface elements and internet brands to express my emotions and ideas.
        </p>
      </motion.div>

      <div className="w-full max-w-7xl px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="aspect-square bg-white/10 rounded-lg backdrop-blur-sm"
            >
              <div className="w-full h-full flex items-center justify-center text-white/30">
                Video/Image {item}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}