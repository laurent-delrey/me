"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useMemo } from "react";

export type ParallaxAsset = {
  src: string;
  /** px size of the media box (width). height auto via video aspect */
  size: number;
  /** base position offset from the section center in percent (-50..50) */
  xPct: number;
  /** base position offset from the section center in percent (-50..50) */
  yPct: number;
  /** parallax strength multiplier (0.02..0.5 recommended) */
  strength: number;
  /** optional rotation in degrees */
  rotate?: number;
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

export default function ParallaxFloating({ assets }: { assets: ParallaxAsset[] }) {
  const { x, y } = useMouseParallax();

  const items = useMemo(() => assets, [assets]);

  return (
    <div
      className="pointer-events-none absolute inset-0"
      aria-hidden
      style={{ zIndex: 0 }}
    >
      {items.map((asset, idx) => {
        const translateX = useTransform(x, (nx) => nx * asset.strength * 100);
        const translateY = useTransform(y, (ny) => ny * asset.strength * 100);
        const baseLeft = `calc(50% + ${asset.xPct}%)`;
        const baseTop = `calc(50% + ${asset.yPct}%)`;

        return (
          <motion.div
            key={idx}
            style={{
              position: "absolute",
              left: baseLeft,
              top: baseTop,
              width: asset.size,
              transformOrigin: "center center",
              translateX,
              translateY,
              rotate: asset.rotate ?? 0,
              filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.35))",
            }}
          >
            {/* Try to load as video; if it fails, the element will just not render visually */}
            <video
              src={asset.src}
              muted
              loop
              autoPlay
              playsInline
              style={{ width: "100%", height: "auto", borderRadius: 12, opacity: 0.9 }}
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
