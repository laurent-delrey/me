"use client";

import { useEffect, useRef, useState } from "react";

interface MapProps {
  center: [number, number];
  zoom: number;
}

export default function Map({ center, zoom }: MapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const animationRef = useRef<any>(null);
  const timeoutRef = useRef<any>(null);
  const [mapError, setMapError] = useState<string>("");
  const [mapLoaded, setMapLoaded] = useState(false);

  // Initialize map only once
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
        setMapLoaded(true);
        
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
  }, []); // Empty dependency array - only run once

  // Animate to new location when props change or map loads
  useEffect(() => {
    if (!mapLoaded || !mapRef.current) return;

    // Clean up any existing animations
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    
    console.log('Animating to:', center, zoom);
    
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
    timeoutRef.current = setTimeout(() => {
      if (!mapRef.current) return;
      
      const startZoom = mapRef.current.getZoom();
      const startBearing = mapRef.current.getBearing();
      let startTime = Date.now();

      const drift = () => {
        if (!mapRef.current) return;
        
        const elapsed = Date.now() - startTime;
        const t = elapsed / 30000; // 30 second cycle
        
        // Subtle zoom oscillation
        const zoomDrift = startZoom + Math.sin(t * Math.PI) * 0.15;
        
        // Slow rotation
        const bearingDrift = startBearing + (t * 5) % 360;
        
        mapRef.current.easeTo({
          zoom: zoomDrift,
          bearing: bearingDrift,
          duration: 100,
          easing: (t: number) => t,
        });
        
        animationRef.current = requestAnimationFrame(drift);
      };

      // Start drifting after landing
      drift();
    }, 3600); // Start drift slightly after landing

    // Cleanup function
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [center, zoom, mapLoaded]);

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