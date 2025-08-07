"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useMemo } from "react";

export type ParallaxAsset = {
  src: string;
  /** px size of the media box (width). height auto via video aspect */
  size: number;
  /** base position offset from the section center in percent (-50..50). Ignored in grid mode */
  xPct: number;
  /** base position offset from the section center in percent (-50..50). Ignored in grid mode */
  yPct: number;
  /** parallax strength multiplier (0.02..0.5 recommended) */
  strength: number;
  /** optional rotation in degrees */
  rotate?: number;
  /** depth 0..1: affects scale, blur, z-index */
  depth?: number;
  /** grid spans (optional when using grid layout) */
  colSpan?: number;
  rowSpan?: number;
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
  columns?: number;
  gap?: number; // px
};

export default function ParallaxFloating({ assets, columns = 6, gap = 24 }: ParallaxFloatingProps) {
  const { x, y } = useMouseParallax();

  const items = useMemo(() => assets, [assets]);

  return (
    <div
      className="pointer-events-none absolute inset-0"
      aria-hidden
      style={{
        zIndex: 0,
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        gap,
        alignContent: "center",
        justifyItems: "stretch",
      }}
      role="presentation"
    >
      {items.map((asset, idx) => {
        const d = typeof asset.depth === "number" ? Math.max(0, Math.min(1, asset.depth)) : 0.5;
        // Tight, non-overlapping parallax range (px)
        const amplitude = 20 + d * 10;
        const translateX = useTransform(x, (nx) => nx * asset.strength * amplitude);
        const translateY = useTransform(y, (ny) => ny * asset.strength * amplitude);
        const colSpan = Math.max(1, Math.min(columns, asset.colSpan ?? 2));
        const rowSpan = Math.max(1, asset.rowSpan ?? 1);
        const scale = 1.0; // fixed scale to prevent overlap
        const blurPx = 0; // remove blur
        const zIndex = 1 + Math.round(d * 8);

        return (
          <div
            key={idx}
            style={{
              gridColumn: `span ${colSpan}`,
              gridRow: `span ${rowSpan}`,
              width: "100%",
              aspectRatio: "1 / 1",
              position: "relative",
              overflow: "hidden",
              zIndex,
            }}
          >
            <motion.div
              style={{
                position: "absolute",
                inset: 0,
                transformOrigin: "center center",
                translateX,
                translateY,
                rotate: asset.rotate ?? 0,
                scale,
                filter: blurPx ? `blur(${blurPx}px)` : 'none',
              }}
            >
              {/* Try to load as video; if it fails, the element will just not render visually */}
              <video
                src={asset.src}
                muted
                loop
                autoPlay
                playsInline
                style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 0, opacity: 1 }}
                onError={() => {
                  /* swallow */
                }}
              />
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
