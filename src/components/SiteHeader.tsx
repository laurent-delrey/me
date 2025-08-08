"use client";

import { motion } from "framer-motion";

type SiteHeaderProps = {
  animated?: boolean;
  toTop?: boolean; // whether header should be at the top (true once map is ready)
  visible?: boolean;
  startY?: number; // starting offset from top when centered
  topPaddingPx?: number;
};

export default function SiteHeader({
  animated = false,
  toTop = true,
  visible = true,
  startY = 240,
  topPaddingPx = 16,
}: SiteHeaderProps) {
  const Container: any = animated ? motion.div : "div";

  return (
    <Container
      className="fixed left-0 right-0 z-20 flex items-center justify-center header-bar"
      style={{ top: 0, pointerEvents: "none", paddingTop: topPaddingPx }}
      {...(animated
        ? {
            initial: { y: startY, opacity: 0 },
            animate: { y: toTop ? 0 : startY, opacity: visible ? 1 : 0 },
            transition: { type: "spring", stiffness: 140, damping: 32, mass: 1 },
          }
        : {})}
    >
      <h1
        className="lowercase"
        style={{ fontSize: "1.125rem", lineHeight: "1.5", fontWeight: 400, color: "#6B5654", margin: 0 }}
      >
        laurent del rey
      </h1>
    </Container>
  );
}

