"use client";

import { motion } from "framer-motion";

type SiteHeaderProps = {
  animated?: boolean;
  toTop?: boolean; // whether header should be at the top (true once map is ready)
  visible?: boolean;
  startY?: number; // starting offset from top when centered
  topPaddingPx?: number;
  onClick?: () => void; // optional click handler
};

export default function SiteHeader({
  animated = false,
  toTop = true,
  visible = true,
  startY = 240,
  topPaddingPx = 16,
  onClick,
}: SiteHeaderProps) {
  const Container: any = animated ? motion.div : "div";

  return (
    <Container
      className="fixed left-0 right-0 z-20 flex items-center justify-center header-bar"
      style={{ top: 0, pointerEvents: onClick ? "auto" : "none", paddingTop: topPaddingPx }}
      {...(animated
        ? {
            initial: { y: startY, opacity: 0 },
            animate: { 
              y: toTop ? 0 : startY, 
              opacity: visible ? 1 : 0 
            },
            transition: {
              y: toTop ? { type: "spring", stiffness: 140, damping: 32, mass: 1 } : { duration: 0 },
              opacity: { duration: 0.5, ease: "easeOut" }
            },
          }
        : {})}
    >
      <h1
        className={`lowercase header-title ${onClick ? "cursor-pointer" : ""}`}
        style={{ fontSize: "1rem", lineHeight: "1.5", fontWeight: 400, color: "#6B5654", margin: 0 }}
        onClick={onClick}
        role={onClick ? "button" : undefined}
        aria-label={onClick ? "Scroll to start" : undefined}
      >
        laurent del rey
      </h1>
    </Container>
  );
}

