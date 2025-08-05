"use client";

import { useEffect, useRef, useState } from "react";

interface MapProps {
  center: [number, number];
  zoom: number;
}

export default function Map({ center, zoom }: MapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const [mapError, setMapError] = useState<string>("");

  useEffect(() => {
    // Add mapbox CSS to document head
    const link = document.createElement('link');
    link.href = 'https://api.mapbox.com/mapbox-gl-js/v3.1.0/mapbox-gl.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // Dynamically import mapbox-gl to avoid SSR issues
    import("mapbox-gl").then((mapboxgl) => {
      if (!mapContainer.current) return;

      mapboxgl.default.accessToken = "pk.eyJ1IjoibGF1cmVudGRlbHJleSIsImEiOiJjbHc5eGJ2a3QwOG9uMmxsYnpkNXp1c25zIn0.itJVP3vptE7Xn36Qi6-Iuw";

      console.log("Container dimensions:", mapContainer.current.offsetWidth, mapContainer.current.offsetHeight);

      const map = new mapboxgl.default.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/light-v11",
        center: center,
        zoom: zoom,
        pitch: 30, // Initial tilt
        bearing: 0, // Initial rotation
        interactive: false,
        attributionControl: false,
      });

      mapRef.current = map;
      
      // Log when map loads successfully
      map.on('load', () => {
        console.log('Mapbox loaded successfully');
        console.log('Map bounds:', map.getBounds());
        console.log('Map zoom:', map.getZoom());
        
        // Start initial drift animation
        const startZoom = map.getZoom();
        let animationId: any;
        let startTime = Date.now();

        const drift = () => {
          const elapsed = Date.now() - startTime;
          const t = elapsed / 30000; // 30 second cycle
          
          // Subtle zoom oscillation
          const zoomDrift = startZoom + Math.sin(t * Math.PI) * 0.15;
          
          // Slow rotation
          const bearingDrift = (t * 5) % 360;
          
          if (mapRef.current) {
            mapRef.current.easeTo({
              zoom: zoomDrift,
              bearing: bearingDrift,
              duration: 100,
              easing: (t: number) => t,
            });
            
            animationId = requestAnimationFrame(drift);
          }
        };

        drift();
        
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
      map.on('data', (e: any) => {
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

  // Animate to new location when props change
  useEffect(() => {
    if (mapRef.current && mapRef.current.loaded()) {
      // Random slight rotation for each transition
      const bearing = Math.random() * 30 - 15; // -15 to 15 degrees
      const pitch = 20 + Math.random() * 25; // 20 to 45 degrees
      
      mapRef.current.flyTo({
        center: center,
        zoom: zoom,
        duration: 3500, // Slower animation
        curve: 1.1, // Gentler arc
        speed: 0.6, // Slower speed
        easing: (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t, // Smooth ease-in-out
        pitch: pitch,
        bearing: bearing,
        essential: true,
      });

      // After landing, start a subtle continuous drift
      setTimeout(() => {
        if (mapRef.current) {
          const startZoom = mapRef.current.getZoom();
          const startBearing = mapRef.current.getBearing();
          let animationId: any;
          let startTime = Date.now();

          const drift = () => {
            const elapsed = Date.now() - startTime;
            const t = elapsed / 30000; // 30 second cycle
            
            // Subtle zoom oscillation
            const zoomDrift = startZoom + Math.sin(t * Math.PI) * 0.15;
            
            // Slow rotation
            const bearingDrift = startBearing + (t * 5) % 360;
            
            if (mapRef.current) {
              mapRef.current.easeTo({
                zoom: zoomDrift,
                bearing: bearingDrift,
                duration: 100,
                easing: (t: number) => t,
              });
              
              animationId = requestAnimationFrame(drift);
            }
          };

          // Start drifting after landing
          drift();

          // Clean up drift animation on next transition
          return () => {
            if (animationId) cancelAnimationFrame(animationId);
          };
        }
      }, 3600); // Start drift slightly after landing
    }
  }, [center, zoom]);

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
          zIndex: 0
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