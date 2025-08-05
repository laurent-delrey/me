"use client";

import { useEffect, useRef, useState } from "react";

export default function Map() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [mapError, setMapError] = useState<string>("");

  useEffect(() => {
    // Dynamically import mapbox-gl to avoid SSR issues
    import("mapbox-gl").then((mapboxgl) => {
      if (!mapContainer.current) return;

      // Import CSS
      import("mapbox-gl/dist/mapbox-gl.css");

      mapboxgl.default.accessToken = "pk.eyJ1IjoibGF1cmVudGRlbHJleSIsImEiOiJjbHc5eGJ2a3QwOG9uMmxsYnpkNXp1c25zIn0.itJVP3vptE7Xn36Qi6-Iuw";

      console.log("Container dimensions:", mapContainer.current.offsetWidth, mapContainer.current.offsetHeight);

      const map = new mapboxgl.default.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/light-v11",
        center: [-74.006, 40.7128], // NYC
        zoom: 11,
        interactive: false,
        attributionControl: false,
      });
      
      // Log when map loads successfully
      map.on('load', () => {
        console.log('Mapbox loaded successfully');
        console.log('Map bounds:', map.getBounds());
        console.log('Map zoom:', map.getZoom());
        
        // Force a resize in case container dimensions were wrong
        setTimeout(() => {
          map.resize();
          console.log('Map resized');
        }, 100);
      });
      
      map.on('error', (e) => {
        console.error('Mapbox error:', e);
        setMapError(e.error?.message || "Map error");
      });

      // Check if tiles are loading
      map.on('data', (e) => {
        if (e.sourceDataType === 'visibility') {
          console.log('Map data event:', e.sourceDataType);
        }
      });

      // Clean up on unmount
      return () => map.remove();
    }).catch((error) => {
      console.error("Failed to load Mapbox:", error);
      setMapError("Failed to load Mapbox");
    });
  }, []);

  return (
    <>
      <div 
        ref={mapContainer} 
        style={{ 
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: '#f0f0f0',
          opacity: 0.4,
          zIndex: 1
        }}
      />
      {mapError && (
        <div style={{ position: 'fixed', top: 10, right: 10, background: 'red', color: 'white', padding: 10, zIndex: 1000 }}>
          Map Error: {mapError}
        </div>
      )}
    </>
  );
}