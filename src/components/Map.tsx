"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = "pk.eyJ1IjoibGF1cmVudGRlbHJleSIsImEiOiJjbHc5eGJ2a3QwOG9uMmxsYnpkNXp1c25zIn0.itJVP3vptE7Xn36Qi6-Iuw";

export default function Map() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/light-v11",
        center: [-74.006, 40.7128], // NYC
        zoom: 11,
        interactive: false,
        attributionControl: false,
        fadeDuration: 0
      });

      map.current.on("load", () => {
        setMapLoaded(true);
        console.log("Mapbox loaded successfully");
      });

      map.current.on("error", (e) => {
        console.error("Mapbox error:", e);
      });

    } catch (error) {
      console.error("Failed to initialize map:", error);
    }

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

  return (
    <div 
      ref={mapContainer} 
      className="fixed inset-0 w-full h-full"
      style={{ 
        zIndex: 0,
        opacity: mapLoaded ? 0.3 : 0,
        transition: "opacity 1s ease-in-out"
      }}
    />
  );
}