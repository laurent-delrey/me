"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = "pk.eyJ1IjoibGF1cmVudGRlbHJleSIsImEiOiJjbHc5eGJ2a3QwOG9uMmxsYnpkNXp1c25zIn0.itJVP3vptE7Xn36Qi6-Iuw";

export default function Map() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v11", // Light preset
      center: [-74.006, 40.7128], // NYC coordinates
      zoom: 12,
      interactive: false, // Disable interaction for background
      attributionControl: false
    });

    // Optional: Add subtle animation
    map.current.on("load", () => {
      // Slowly rotate the map
      let rotation = 0;
      function rotateCamera() {
        rotation += 0.1;
        map.current?.rotateTo(rotation % 360, { duration: 0 });
        requestAnimationFrame(rotateCamera);
      }
      // Uncomment to enable rotation
      // rotateCamera();
    });

    return () => {
      map.current?.remove();
    };
  }, []);

  return (
    <div 
      ref={mapContainer} 
      className="fixed inset-0 w-full h-full opacity-30"
      style={{ zIndex: -1 }}
    />
  );
}