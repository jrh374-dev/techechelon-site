import { ImageResponse } from "next/og";

export const runtime = "edge";
const SIZE = 400;

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#15264D",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width={280} height={280} viewBox="0 0 50 50">
          <defs>
            <clipPath id="profile-clip">
              <circle cx="25" cy="25" r="22.5" />
            </clipPath>
          </defs>
          <g clipPath="url(#profile-clip)" fill="#F5F0E2">
            {[3, 7, 11, 15, 19, 23, 27, 31, 35, 39, 43].map((y) => (
              <rect key={y} x="0" y={y} width="50" height="2.4" />
            ))}
          </g>
        </svg>
      </div>
    ),
    { width: SIZE, height: SIZE },
  );
}
