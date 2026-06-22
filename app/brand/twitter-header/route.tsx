import { ImageResponse } from "next/og";

export const runtime = "edge";
const WIDTH = 1500;
const HEIGHT = 500;

export async function GET() {
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
        {/* Top navy ticker band */}
        <div
          style={{
            background: "#15264D",
            color: "#fff",
            padding: "12px 56px",
            display: "flex",
            justifyContent: "space-between",
            fontSize: 16,
            letterSpacing: "0.06em",
            fontFamily: "monospace",
            fontWeight: 700,
            textTransform: "uppercase",
          }}
        >
          <span style={{ color: "#fff" }}>TECHECHELON · INDEPENDENT TECH &amp; MARKETS</span>
          <span style={{ color: "#FFB892" }}>S&amp;P · NDX · BTC · NVDA · AAPL · MSFT</span>
        </div>

        {/* Main brand block — circle mark + wordmark + tagline */}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 80px",
            gap: 32,
          }}
        >
          <svg width={180} height={180} viewBox="0 0 50 50">
            <defs>
              <clipPath id="header-clip">
                <circle cx="25" cy="25" r="22.5" />
              </clipPath>
            </defs>
            <g clipPath="url(#header-clip)" fill="#15264D">
              {[3, 7, 11, 15, 19, 23, 27, 31, 35, 39, 43].map((y) => (
                <rect key={y} x="0" y={y} width="50" height="2.4" />
              ))}
            </g>
          </svg>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div
              style={{
                fontSize: 18,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#6B6353",
                fontStyle: "italic",
                fontWeight: 700,
              }}
            >
              Independent reporting since 2024
            </div>
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

        {/* Bottom coral accent stripe */}
        <div
          style={{
            background: "#15264D",
            color: "#FFB892",
            padding: "14px 56px",
            display: "flex",
            justifyContent: "space-between",
            fontSize: 15,
            letterSpacing: "0.1em",
            fontFamily: "monospace",
            fontWeight: 700,
            textTransform: "uppercase",
          }}
        >
          <span style={{ color: "#E85A2C" }}>● THE BRIEF · DAILY NEWSLETTER · techechelon.com</span>
          <span style={{ color: "#fff" }}>NEW YORK · WASHINGTON · SAN FRANCISCO</span>
        </div>
      </div>
    ),
    { width: WIDTH, height: HEIGHT },
  );
}
