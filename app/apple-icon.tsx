import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const BAR_Y = [3, 7, 11, 15, 19, 23, 27, 31, 35, 39, 43];

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0B1F3A",
        }}
      >
        <svg viewBox="0 0 50 50" width={140} height={140}>
          <defs>
            <clipPath id="c">
              <circle cx="25" cy="25" r="22.5" />
            </clipPath>
          </defs>
          <g clipPath="url(#c)" fill="#F5EFE0">
            {BAR_Y.map((y) => (
              <rect key={y} x="0" y={y} width="50" height="2.4" />
            ))}
          </g>
        </svg>
      </div>
    ),
    { ...size },
  );
}
