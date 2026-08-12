import { ImageResponse } from "next/og";

// LinkedIn company-page cover — 1128x191 per LinkedIn's spec. Much
// shorter and wider than the Twitter header, so the layout is a single
// horizontal band: mark + wordmark on the left, tagline right, thin
// coral rule at the base. IMPORTANT: LinkedIn overlays the round company
// logo on the LEFT side of the cover on desktop, so all critical content
// stays center-right of x≈300.
export const runtime = "edge";

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
            background: "#0F1C3D",
            color: "#fff",
            padding: "8px 40px 8px 320px",
            display: "flex",
            justifyContent: "space-between",
            fontSize: 13,
            letterSpacing: "0.08em",
            fontFamily: "monospace",
            fontWeight: 700,
            textTransform: "uppercase",
          }}
        >
          <span style={{ color: "#AAB2C8" }}>INDEPENDENT REPORTING</span>
          <span style={{ color: "#FFB892" }}>MARKETS · AI · POLICY · SECURITY</span>
        </div>

        {/* Main band — wordmark + tagline, offset right of the avatar zone */}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            padding: "0 48px 0 320px",
            gap: 28,
          }}
        >
          <svg width={74} height={74} viewBox="0 0 50 50">
            <defs>
              <clipPath id="li-banner-clip">
                <circle cx="25" cy="25" r="22.5" />
              </clipPath>
            </defs>
            <g clipPath="url(#li-banner-clip)" fill="#15264D">
              {[3, 7, 11, 15, 19, 23, 27, 31, 35, 39, 43].map((y) => (
                <rect key={y} x="0" y={y} width="50" height="2.4" />
              ))}
            </g>
          </svg>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontSize: 52,
                fontWeight: 900,
                letterSpacing: "-0.03em",
                color: "#15264D",
                lineHeight: 1,
              }}
            >
              TechEchelon
            </div>
            <div
              style={{
                fontSize: 15,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#6B6353",
                fontFamily: "monospace",
                fontWeight: 600,
                marginTop: 8,
              }}
            >
              TECHNOLOGY · MARKETS · POLICY
            </div>
          </div>
          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: 6,
            }}
          >
            <div
              style={{
                fontSize: 16,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#E85A2C",
              }}
            >
              ● THE BRIEF · WEEKDAYS 6:30 AM ET
            </div>
            <div
              style={{
                fontSize: 14,
                fontFamily: "monospace",
                fontWeight: 600,
                letterSpacing: "0.08em",
                color: "#6B6353",
              }}
            >
              techechelon.com
            </div>
          </div>
        </div>

        {/* Coral base rule */}
        <div style={{ height: 6, background: "#E85A2C", display: "flex" }} />
      </div>
    ),
    { width: 1128, height: 191 },
  );
}
