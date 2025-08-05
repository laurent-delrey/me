"use client";

import { useEffect, useRef } from "react";

export default function Map() {
  const mapContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Dynamically import mapbox-gl to avoid SSR issues
    import("mapbox-gl").then((mapboxgl) => {
      if (!mapContainer.current) return;

      mapboxgl.default.accessToken = "pk.eyJ1IjoibGF1cmVudGRlbHJleSIsImEiOiJjbHc5eGJ2a3QwOG9uMmxsYnpkNXp1c25zIn0.itJVP3vptE7Xn36Qi6-Iuw";

      const map = new mapboxgl.default.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/light-v11",
        center: [-74.006, 40.7128], // NYC
        zoom: 11,
        interactive: false,
        attributionControl: false,
      });

      // Clean up on unmount
      return () => map.remove();
    }).catch((error) => {
      console.error("Failed to load Mapbox:", error);
    });
  }, []);

  return (
    <>
      <style jsx global>{`
        .mapboxgl-canvas {
          position: absolute;
          top: 0;
          left: 0;
        }
        .mapboxgl-control-container {
          display: none;
        }
      `}</style>
      <div 
        ref={mapContainer} 
        className="fixed inset-0 w-full h-full opacity-20 -z-10"
      />
    </>
  );
}