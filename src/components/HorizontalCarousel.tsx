"use client";

const videos = [
  "/videos/parallax/my-movie-12_R7gXgUyJ.mp4",
  "/videos/parallax/laurentdelrey-1559957584550907905-20220817-133725-img1_DjgiwS3m.mp4",
  "/videos/parallax/my-movie-13_YEYzC1AF-transcode.mp4",
  "/videos/parallax/laurentdelrey-1480222641814339585-20220109-115913-img1_oOFoykC0.mp4",
  "/videos/parallax/laurentdelrey-1552069267641708544-20220726-191204-img1_7qSGR6ap.mp4",
  "/videos/parallax/laurentdelrey-1568364141525749762-20220909-182204-img1_lSIvH4Wo.mp4",
];

export default function HorizontalCarousel() {
  return (
    <div className="flex gap-8 overflow-x-auto hide-scrollbar py-8 px-8">
      {videos.map((src, index) => (
        <div
          key={index}
          className="flex-none"
          style={{ 
            width: "400px",
            height: "600px"
          }}
        >
          <video
            src={src}
            muted
            loop
            autoPlay
            playsInline
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      ))}
    </div>
  );
}