"use client";

import { useEffect, useRef, useState } from "react";

const videos = [
  "/videos/parallax/my-movie-12_R7gXgUyJ.mp4",
  "/videos/parallax/laurentdelrey-1559957584550907905-20220817-133725-img1_DjgiwS3m.mp4",
  "/videos/parallax/my-movie-13_YEYzC1AF-transcode.mp4",
  "/videos/parallax/laurentdelrey-1480222641814339585-20220109-115913-img1_oOFoykC0.mp4",
  "/videos/parallax/laurentdelrey-1552069267641708544-20220726-191204-img1_7qSGR6ap.mp4",
  "/videos/parallax/laurentdelrey-1568364141525749762-20220909-182204-img1_lSIvH4Wo.mp4",
];

export default function VideoStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      // Get the container's position relative to viewport
      const rect = containerRef.current.getBoundingClientRect();
      const containerHeight = containerRef.current.scrollHeight;
      const viewportHeight = window.innerHeight;
      
      // Calculate how much of the container has been scrolled through
      const scrolled = -rect.top;
      const totalScrollable = containerHeight - viewportHeight;
      
      // Calculate progress (0 to 1)
      const progress = Math.max(0, Math.min(1, scrolled / totalScrollable));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial calculation
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full relative">
      <div 
        className="grid grid-cols-1 gap-8 w-full"
        style={{ 
          padding: '80px 12%',
          minHeight: '100vh',
          display: 'grid',
          alignItems: 'center',
        }}
      >
        {videos.map((src, index) => (
          <div
            key={index}
            className="flex items-center justify-center"
          >
            <video
              src={src}
              muted
              loop
              autoPlay
              playsInline
              className="w-full h-auto object-cover"
              style={{ 
                borderRadius: 0,
                maxWidth: '100%'
              }}
            />
          </div>
        ))}
      </div>
      
      {/* Progress bar at bottom */}
      <div 
        className="fixed bottom-0 left-0 right-0 h-1 bg-gray-800/30 z-30"
        style={{ 
          pointerEvents: 'none'
        }}
      >
        <div 
          className="h-full bg-white transition-transform duration-150 ease-out"
          style={{ 
            width: `${scrollProgress * 100}%`
          }}
        />
      </div>
    </div>
  );
}