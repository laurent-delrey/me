"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const videos = [
  "/videos/parallax/my-movie-12_R7gXgUyJ.mp4",
  "/videos/parallax/laurentdelrey-1559957584550907905-20220817-133725-img1_DjgiwS3m.mp4",
  "/videos/parallax/my-movie-13_YEYzC1AF-transcode.mp4",
  "/videos/parallax/laurentdelrey-1480222641814339585-20220109-115913-img1_oOFoykC0.mp4",
  "/videos/parallax/laurentdelrey-1552069267641708544-20220726-191204-img1_7qSGR6ap.mp4",
  "/videos/parallax/laurentdelrey-1568364141525749762-20220909-182204-img1_lSIvH4Wo.mp4",
];

export default function HorizontalCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Transform vertical scroll to horizontal movement
  // Each video takes 60vw width, so total width needed for 6 videos
  const totalWidth = videos.length * 60; // 360vw
  const x = useTransform(scrollYProgress, [0, 1], ["0vw", `-${totalWidth - 100}vw`]);

  return (
    <div 
      ref={containerRef}
      className="relative"
      style={{ height: "400vh" }} // Tall container for scroll hijacking
    >
      {/* Sticky camera */}
      <div className="sticky top-0 w-screen h-screen overflow-hidden">
        {/* Moving frame */}
        <motion.div 
          className="flex items-center h-full"
          style={{ x }}
        >
          {videos.map((src, index) => (
            <div
              key={index}
              className="flex-none flex justify-center items-center"
              style={{ 
                width: "60vw",
                marginLeft: index === 0 ? "20vw" : "0"
              }}
            >
              <video
                src={src}
                muted
                loop
                autoPlay
                playsInline
                className="w-full h-auto max-h-[80vh] object-cover rounded-lg"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}