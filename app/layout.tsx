import type { Metadata } from "next";
import "./globals.css";

const SITE_URL = "https://techechelon.com";
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
  icons: {
    icon: "/favicon.ico",
  },
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
