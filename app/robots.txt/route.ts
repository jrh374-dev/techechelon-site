function siteUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "https://techechelon.com")
  );
}

export function GET() {
  const base = siteUrl();
  const body = `User-agent: *
Allow: /
Disallow: /api/

Sitemap: ${base}/sitemap.xml
Sitemap: ${base}/news-sitemap.xml
`;
  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, s-maxage=86400",
    },
  });
}
