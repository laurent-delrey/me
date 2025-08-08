import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#3f2d2c",
          color: "#FFB48F",
          fontSize: 60,
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        laurent del rey — internet designer
      </div>
    ),
    { ...size }
  );
}

