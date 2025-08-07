"use client";

import ParallaxFloating from "./ParallaxFloating";
import { parallaxAssets } from "./parallaxAssets";

export default function ParallaxLayer() {
  return <ParallaxFloating assets={parallaxAssets} />;
}
