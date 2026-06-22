import type { Metadata } from "next";
import "./globals.css";

// Prefer an explicit env var (NEXT_PUBLIC_SITE_URL) so we can point it at
// techechelon-site.vercel.app pre-cutover and at techechelon.com after.
// Falls back to the Vercel-provided production URL or the brand domain.
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://techechelon.com");
const SITE_NAME = "TechEchelon";
const DEFAULT_DESCRIPTION =
  "Independent reporting on technology, markets, and the policy decisions that shape both.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "TechEchelon — Independent reporting on tech & markets",
    template: "%s · TechEchelon",
  },
  description: DEFAULT_DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: "TechEchelon — Independent reporting on tech & markets",
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "TechEchelon — Independent reporting on tech & markets",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@Tech_Echelon",
    creator: "@Tech_Echelon",
    title: "TechEchelon — Independent reporting on tech & markets",
    description: DEFAULT_DESCRIPTION,
    images: ["/opengraph-image"],
  },
  // Icons are auto-discovered from app/icon.tsx and app/apple-icon.tsx.
  // Don't set icons.icon here — it would override the auto-injected link
  // and point at /favicon.ico, which doesn't exist in this repo.
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
