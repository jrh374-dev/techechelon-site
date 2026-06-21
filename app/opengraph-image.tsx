import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "TechEchelon — Independent reporting on tech & markets";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#F5F0E2",
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        {/* Top navy strip */}
        <div
          style={{
            background: "#15264D",
            color: "#fff",
            padding: "18px 64px",
            display: "flex",
            justifyContent: "space-between",
            fontSize: 20,
            letterSpacing: "0.04em",
            fontFamily: "monospace",
            fontWeight: 700,
            textTransform: "uppercase",
          }}
        >
          <span>TECHECHELON</span>
          <span style={{ color: "#FFB892" }}>S&P · NDX · DOW · BTC</span>
        </div>

        {/* Main brand block */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 80px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 22,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: "#6B6353",
              fontStyle: "italic",
              fontWeight: 700,
              marginBottom: 24,
            }}
          >
            Independent reporting on technology, markets & policy
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 24,
              color: "#15264D",
            }}
          >
            <svg width="120" height="120" viewBox="0 0 50 50">
              <defs>
                <clipPath id="og-clip">
                  <circle cx="25" cy="25" r="22.5" />
                </clipPath>
              </defs>
              <g clipPath="url(#og-clip)" fill="#15264D">
                {[3, 7, 11, 15, 19, 23, 27, 31, 35, 39, 43].map((y) => (
                  <rect key={y} x="0" y={y} width="50" height="2.4" />
                ))}
              </g>
            </svg>
            <div
              style={{
                fontSize: 156,
                fontWeight: 900,
                letterSpacing: "-0.04em",
                color: "#15264D",
                lineHeight: 0.9,
              }}
            >
              TechEchelon
            </div>
          </div>
        </div>

        {/* Bottom coral accent */}
        <div
          style={{
            background: "#15264D",
            color: "#FFB892",
            padding: "22px 64px",
            display: "flex",
            justifyContent: "space-between",
            fontSize: 20,
            letterSpacing: "0.08em",
            fontFamily: "monospace",
            fontWeight: 700,
            textTransform: "uppercase",
          }}
        >
          <span style={{ color: "#E85A2C" }}>● THE BRIEF · DAILY</span>
          <span style={{ color: "#fff" }}>NEW YORK · WASHINGTON · SAN FRANCISCO</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
