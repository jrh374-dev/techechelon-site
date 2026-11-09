import Script from "next/script";

// Google Analytics 4 for techechelon.com.
//
// This is the same property the Wix-era site reported into, so new data
// continues the existing history. The tag was lost in the June 2026 move off
// Wix (Wix injected it through its marketing integration, not page code) and
// restored here in November 2026.
//
// Measurement IDs are public by design; they appear in every page's source.
// NEXT_PUBLIC_GA_ID can override it, e.g. to point a preview at a test
// property.
//
// Client-side navigations between articles are counted by GA4's enhanced
// measurement ("page changes based on browser history events"), which is on
// by default for web streams.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "G-SLQRKHK2J6";

export function GoogleAnalytics() {
  // Only report from the live Vercel production deployment. VERCEL_ENV is
  // unset on local machines (so `next dev` and local `next build` mockups
  // never count as visits) and is "preview" on preview deployments.
  if (process.env.VERCEL_ENV !== "production" || !GA_ID) return null;
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
      </Script>
    </>
  );
}
