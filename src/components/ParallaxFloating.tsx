"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useMemo } from "react";

export type ParallaxAsset = {
  src: string;
  /** Width of the video element in pixels */
  width: number;
  /** Height of the video element in pixels */
  height?: number;
  /** Position from left in percentage (0-100) */
  left: number;
  /** Position from top in percentage (0-100) */
  top: number;
  /** parallax strength multiplier (0.02..0.5 recommended) */
  strength: number;
  /** optional rotation in degrees */
  rotate?: number;
  /** depth 0..1: affects scale, blur, z-index */
  depth?: number;
};

function useMouseParallax() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 60, damping: 20, mass: 0.8 });
  const springY = useSpring(y, { stiffness: 60, damping: 20, mass: 0.8 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      // Normalize to -1..1 based on viewport center
      const nx = (e.clientX - vw / 2) / (vw / 2);
      const ny = (e.clientY - vh / 2) / (vh / 2);
      x.set(nx);
      y.set(ny);
    };
    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove as any);
  }, [x, y]);

  return { x: springX, y: springY };
}

type ParallaxFloatingProps = {
  assets: ParallaxAsset[];
};

export default function ParallaxFloating({ assets }: ParallaxFloatingProps) {
  const { x, y } = useMouseParallax();

  const items = useMemo(() => assets, [assets]);

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
      role="presentation"
    >
      {items.map((asset, idx) => {
        const d = typeof asset.depth === "number" ? Math.max(0, Math.min(1, asset.depth)) : 0.5;
        // Parallax movement range
        const amplitude = 50 + d * 30;
        const translateX = useTransform(x, (nx) => nx * asset.strength * amplitude);
        const translateY = useTransform(y, (ny) => ny * asset.strength * amplitude);
        const scale = 0.9 + (1 - d) * 0.2; // Depth-based scale
        const zIndex = Math.round(10 - d * 10);

        return (
          <motion.div
            key={idx}
            className="absolute"
            style={{
              left: `${asset.left}%`,
              top: `${asset.top}%`,
              width: asset.width,
              height: asset.height || 'auto',
              zIndex,
              translateX,
              translateY,
              rotate: asset.rotate ?? 0,
              scale,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            <video
              src={asset.src}
              muted
              loop
              autoPlay
              playsInline
              className="w-full h-full object-cover rounded-lg"
              style={{ 
                filter: d > 0.7 ? `blur(${(d - 0.7) * 3}px)` : 'none'
              }}
              onError={() => {
                /* swallow */
              }}
            />
          </motion.div>
        );
      })}
    </div>
  );
}
