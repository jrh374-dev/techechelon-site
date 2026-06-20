import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TechEchelon — Independent reporting on tech & markets",
  description:
    "Independent technology, markets, and policy reporting. Five stories before lunch.",
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
