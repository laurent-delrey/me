import type { ParallaxAsset } from "./ParallaxFloating";

// Videos positioned absolutely around the viewport
// Adjust left/top percentages and sizes to create a nice scattered layout
export const parallaxAssets: ParallaxAsset[] = [
  // Top left area
  { src: "/videos/parallax/laurentdelrey-1480222641814339585-20220109-115913-img1_oOFoykC0.mp4", width: 200, height: 280, left: 8, top: 10, strength: 0.1, rotate: -2, depth: 0.6 },
  
  // Top center-left
  { src: "/videos/parallax/laurentdelrey-1552069267641708544-20220726-191204-img1_7qSGR6ap-transcode.mp4", width: 240, height: 240, left: 28, top: 5, strength: 0.14, rotate: 4, depth: 0.8 },
  
  // Top right
  { src: "/videos/parallax/laurentdelrey-1552069267641708544-20220726-191204-img1_7qSGR6ap.mp4", width: 280, height: 200, left: 70, top: 8, strength: 0.12, rotate: -2, depth: 0.5 },
  
  // Middle left
  { src: "/videos/parallax/laurentdelrey-1559957584550907905-20220817-133725-img1_DjgiwS3m.mp4", width: 220, height: 300, left: 5, top: 45, strength: 0.1, rotate: 3, depth: 0.7 },
  
  // Center
  { src: "/videos/parallax/laurentdelrey-1568364141525749762-20220909-182204-img1_lSIvH4Wo-transcode.mp4", width: 320, height: 240, left: 35, top: 35, strength: 0.16, rotate: -6, depth: 0.3 },
  
  // Middle right
  { src: "/videos/parallax/laurentdelrey-1568364141525749762-20220909-182204-img1_lSIvH4Wo.mp4", width: 260, height: 260, left: 68, top: 40, strength: 0.12, rotate: 2, depth: 0.4 },
  
  // Bottom left
  { src: "/videos/parallax/my-movie-12_R7gXgUyJ.mp4", width: 300, height: 220, left: 12, top: 70, strength: 0.12, rotate: 2, depth: 0.55 },
  
  // Bottom right
  { src: "/videos/parallax/my-movie-13_YEYzC1AF-transcode.mp4", width: 240, height: 320, left: 75, top: 65, strength: 0.18, rotate: -4, depth: 0.8 },
];
