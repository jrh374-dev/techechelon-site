import { ImageResponse } from "next/og";

// LinkedIn company-page logo — 300x300 per LinkedIn's spec. Displays as
// a square that LinkedIn masks; keep the mark centered with breathing
// room so the circle survives any crop. Same cream-bars-on-navy
// treatment as the Twitter profile asset for cross-platform consistency.
export const runtime = "edge";
export const size = { width: 300, height: 300 };

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#15264D",
        }}
      >
        <svg width={210} height={210} viewBox="0 0 50 50">
          <defs>
            <clipPath id="li-logo-clip">
              <circle cx="25" cy="25" r="22.5" />
            </clipPath>
          </defs>
          <g clipPath="url(#li-logo-clip)" fill="#F5EFE0">
            {[3, 7, 11, 15, 19, 23, 27, 31, 35, 39, 43].map((y) => (
              <rect key={y} x="0" y={y} width="50" height="2.4" />
            ))}
          </g>
        </svg>
      </div>
    ),
    { width: 300, height: 300 },
  );
}
