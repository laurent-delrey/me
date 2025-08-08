"use client";

const videos = [
  "/videos/parallax/my-movie-12_R7gXgUyJ.mp4",
  "/videos/parallax/laurentdelrey-1559957584550907905-20220817-133725-img1_DjgiwS3m.mp4",
  "/videos/parallax/my-movie-13_YEYzC1AF-transcode.mp4",
  "/videos/parallax/laurentdelrey-1480222641814339585-20220109-115913-img1_oOFoykC0.mp4",
  "/videos/parallax/laurentdelrey-1552069267641708544-20220726-191204-img1_7qSGR6ap.mp4",
  "/videos/parallax/laurentdelrey-1568364141525749762-20220909-182204-img1_lSIvH4Wo.mp4",
];

export default function VideoStack() {
  return (
    <div className="w-full h-full flex flex-col">
      {videos.map((src, index) => (
        <div
          key={index}
          className="w-full flex items-center justify-center"
          style={{ 
            minHeight: '100vh',
            padding: '80px 0'
          }}
        >
          <div style={{ 
            width: '60vw',
            maxWidth: '800px'
          }}>
            <video
              src={src}
              muted
              loop
              autoPlay
              playsInline
              className="w-full h-auto object-cover"
              style={{ borderRadius: 0 }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}