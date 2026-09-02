// Web archive for The Brief. Serves the exact HTML of a sent edition,
// fetched from Resend's broadcast store — no separate archive storage.
// The email's "Read this edition online" link points here.

const RESEND_API = "https://api.resend.com";
const SITE_URL = "https://www.techechelon.com";

interface BroadcastListItem {
  id: string;
  name?: string;
  status?: string;
  created_at?: string;
}

interface BroadcastDetail {
  id: string;
  name?: string;
  html?: string;
}

// Editions before Aug 5, 2026 used a long-form name
// ("Brief · Tuesday, August 4, 2026"); later ones use
// "Brief · YYYY-MM-DD · <slug>". Match either for a given ISO date.
function namesForDate(iso: string): { prefix: string; exact: string } {
  const longForm = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(`${iso}T12:00:00Z`));
  return { prefix: `Brief · ${iso}`, exact: `Brief · ${longForm}` };
}

function notFoundPage(date: string): Response {
  return new Response(
    `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>No edition for ${date}</title><style>body{margin:0;font-family:ui-monospace,Menlo,monospace;background:#F5F0E2;color:#15264D;display:flex;align-items:center;justify-content:center;min-height:100vh;text-align:center;padding:24px}p{color:#6B6353}a{color:#15264D}</style></head><body><div><h1>No Brief for ${date}</h1><p>The Brief goes out weekday mornings. <a href="/brief">Browse the archive →</a></p></div></body></html>`,
    { status: 404, headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "public, s-maxage=300" } },
  );
}

export async function GET(
  _req: Request,
  { params }: { params: { date: string } },
) {
  const date = params.date;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return notFoundPage("that date");

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return new Response("archive unavailable", { status: 503 });
  }

  const listRes = await fetch(`${RESEND_API}/broadcasts`, {
    headers: { Authorization: `Bearer ${apiKey}` },
    next: { revalidate: 300 },
  });
  if (!listRes.ok) return new Response("archive unavailable", { status: 502 });
  const list = (await listRes.json()) as { data?: BroadcastListItem[] };

  const { prefix, exact } = namesForDate(date);
  // Newest first in the API; take the first sent broadcast for the date so
  // a re-send supersedes the original.
  const match = (list.data ?? []).find(
    (b) =>
      b.status === "sent" &&
      typeof b.name === "string" &&
      (b.name.startsWith(prefix) || b.name === exact),
  );
  if (!match) return notFoundPage(date);

  const detailRes = await fetch(`${RESEND_API}/broadcasts/${match.id}`, {
    headers: { Authorization: `Bearer ${apiKey}` },
    next: { revalidate: 86400 },
  });
  if (!detailRes.ok) return new Response("archive unavailable", { status: 502 });
  const detail = (await detailRes.json()) as BroadcastDetail;
  if (!detail.html) return notFoundPage(date);

  let html = detail.html;
  // The unsubscribe merge tag only resolves inside Resend's send pipeline;
  // on the web it would render literally. Point it at the subscribe page.
  html = html.replaceAll("{{{RESEND_UNSUBSCRIBE_URL}}}", `${SITE_URL}/subscribe`);
  // Archive banner so web readers know where they are and can subscribe.
  html = html.replace(
    /<body([^>]*)>/i,
    `<body$1><div style="background:#0F1C3D;color:#DCE2F0;text-align:center;padding:9px 14px;font-family:'JetBrains Mono',ui-monospace,monospace;font-size:10.5px;letter-spacing:0.1em;text-transform:uppercase">The Brief · ${date} · web archive &nbsp;·&nbsp; <a href="${SITE_URL}/subscribe" style="color:#FFB892;text-decoration:underline">Get it in your inbox →</a> &nbsp;·&nbsp; <a href="${SITE_URL}/brief" style="color:#DCE2F0;text-decoration:underline">All editions</a></div>`,
  );

  return new Response(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      // Sent editions are immutable — cache aggressively at the CDN.
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
