"use client";

import { useEffect, useRef } from "react";

export default function Map() {
  const mapContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Dynamically import mapbox-gl to avoid SSR issues
    import("mapbox-gl").then((mapboxgl) => {
      if (!mapContainer.current) return;

      mapboxgl.default.accessToken = "pk.eyJ1IjoibGF1cmVudGRlbHJleSIsImEiOiJjbHc5eGJ2a3QwOG9uMmxsYnpkNXp1c25zIn0.itJVP3vptE7Xn36Qi6-Iuw";

      // Try using the style URL directly
      const map = new mapboxgl.default.Map({
        container: mapContainer.current,
        style: {
          version: 8,
          sources: {
            'mapbox-streets': {
              type: 'raster',
              tiles: [
                `https://api.mapbox.com/styles/v1/mapbox/light-v11/tiles/{z}/{x}/{y}?access_token=${mapboxgl.default.accessToken}`
              ],
              tileSize: 256
            }
          },
          layers: [{
            id: 'mapbox-streets',
            type: 'raster',
            source: 'mapbox-streets',
            minzoom: 0,
            maxzoom: 22
          }]
        },
        center: [-74.006, 40.7128], // NYC
        zoom: 11,
        interactive: false,
        attributionControl: false,
        trackResize: false,
        collectResourceTiming: false,
      });
      
      // Log when map loads successfully
      map.on('load', () => {
        console.log('Mapbox loaded successfully');
      });
      
      map.on('error', (e) => {
        console.error('Mapbox error:', e);
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
        className="fixed inset-0 w-full h-full opacity-40"
        style={{ 
          backgroundColor: '#f0f0f0',
          zIndex: 1
        }}
      />
    </>
  );
}