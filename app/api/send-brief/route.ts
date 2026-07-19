// Scheduled newsletter send. Called by Vercel Cron every weekday at
// 10:30 UTC (= 6:30 AM EDT in summer, 5:30 AM EST in winter — the copy
// on /subscribe promises 6:30 AM ET so summer is the reference point).
//
// Behavior:
//   GET  /api/send-brief          → auth required, sends the brief
//   GET  /api/send-brief?dry=1    → auth required, returns rendered HTML,
//                                    subject, and article list without
//                                    hitting Resend. Use for previews.
//
// Auth: Vercel Cron sends `Authorization: Bearer $CRON_SECRET`. Manual
// runs must include the same header.

import { getAllPosts, isOpinion, Post, categoryLabel } from "@/lib/posts";

const SITE_URL = "https://www.techechelon.com";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function todayET(): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date());
}

function editionNumber(): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const get = (t: string): string => parts.find((p) => p.type === t)?.value ?? "";
  const y = get("year");
  const m = get("month");
  const d = get("day");
  const jan1 = new Date(`${y}-01-01T00:00:00-05:00`).getTime();
  const today = new Date(`${y}-${m}-${d}T00:00:00-05:00`).getTime();
  return Math.max(1, Math.floor((today - jan1) / 86400000) + 1);
}

function selectStories(n: number): Post[] {
  return getAllPosts()
    .filter((p) => !isOpinion(p) && p.unlisted !== true)
    .slice(0, n);
}

function renderHtml(articles: Post[]): string {
  const date = todayET();
  const editionNo = `№${editionNumber().toString().padStart(3, "0")}`;

  const items = articles
    .map((a, i) => {
      const num = (i + 1).toString().padStart(2, "0");
      const cat = categoryLabel(a.category).toUpperCase();
      const url = `${SITE_URL}/post/${a.slug}`;
      const cover = a.coverImage
        ? `<a href="${url}" style="text-decoration:none"><img src="${escapeHtml(a.coverImage)}" alt="" width="540" style="display:block;width:100%;max-width:540px;height:auto;border:0;margin-bottom:14px" /></a>`
        : "";
      return `
        <tr><td style="padding:24px 0;border-bottom:1px solid rgba(10,10,10,0.12)">
          <div style="font-family:'JetBrains Mono',ui-monospace,monospace;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;font-weight:700;color:#E85A2C;margin-bottom:10px">
            №${num} · ${cat}
          </div>
          ${cover}
          <a href="${url}" style="text-decoration:none;color:#0A0A0A">
            <h2 style="font-family:'Inter Tight',Inter,Helvetica,Arial,sans-serif;font-size:23px;font-weight:800;letter-spacing:-0.025em;line-height:1.18;color:#0A0A0A;margin:0 0 10px">
              ${escapeHtml(a.title)}
            </h2>
          </a>
          <p style="font-family:'Source Serif 4',Georgia,serif;font-size:15px;line-height:1.6;color:#1A1A1A;margin:0 0 12px">
            ${escapeHtml(a.excerpt)}
          </p>
          <p style="font-family:'JetBrains Mono',ui-monospace,monospace;font-size:10.5px;letter-spacing:0.06em;text-transform:uppercase;color:#6B6353;margin:0">
            <span style="color:#15264D;font-weight:700">${escapeHtml(a.author)}</span> &nbsp; · &nbsp;
            <a href="${url}" style="color:#15264D;font-weight:700;text-decoration:underline">Read the story →</a>
          </p>
        </td></tr>`;
    })
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>The TechEchelon Brief · ${escapeHtml(date)}</title>
</head>
<body style="margin:0;padding:0;background:#F5F0E2;font-family:Inter,Helvetica,Arial,sans-serif">
  <div style="display:none;font-size:1px;color:#F5F0E2;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden">
    Five stories every morning, before the opening bell. ${escapeHtml(date)}.
  </div>
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#F5F0E2">
    <tr><td align="center" style="padding:24px 14px 0">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="max-width:600px;width:100%;background:#F5F0E2">
        <tr><td style="background:#15264D;color:#DCE2F0;padding:10px 18px;font-family:'JetBrains Mono',ui-monospace,monospace;font-size:10.5px;letter-spacing:0.06em">
          <span style="color:#fff;font-weight:700">${editionNo}</span> &nbsp;|&nbsp; ${escapeHtml(date)} &nbsp;|&nbsp; 06:30 AM ET
        </td></tr>

        <tr><td style="background:#fff;padding:32px 32px 8px;text-align:center">
          <div style="font-family:'JetBrains Mono',ui-monospace,monospace;font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:#6B6353;margin-bottom:10px;font-weight:600;font-style:italic">
            Independent reporting on tech &amp; markets
          </div>
          <a href="${SITE_URL}" style="text-decoration:none">
            <div style="font-family:'Inter Tight',Inter,Helvetica,Arial,sans-serif;font-size:42px;font-weight:900;letter-spacing:-0.03em;color:#15264D;line-height:1">
              TechEchelon
            </div>
          </a>
          <div style="margin-top:6px;font-family:'JetBrains Mono',ui-monospace,monospace;font-size:10.5px;letter-spacing:0.14em;text-transform:uppercase;color:#E85A2C;font-weight:700">
            ● The Brief
          </div>
        </td></tr>

        <tr><td style="background:#fff;padding:18px 32px 8px">
          <p style="font-family:'Source Serif 4',Georgia,serif;font-size:16px;line-height:1.6;color:#1A1A1A;margin:0;font-style:italic">
            Good morning. Five stories, before the opening bell. Written for readers who already know the basics.
          </p>
        </td></tr>

        <tr><td style="background:#fff;padding:0 32px 32px">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
            ${items}
          </table>
        </td></tr>

        <tr><td style="background:#15264D;color:#DCE2F0;padding:32px 32px;text-align:center">
          <div style="font-family:'JetBrains Mono',ui-monospace,monospace;font-size:10.5px;letter-spacing:0.18em;text-transform:uppercase;color:#E85A2C;font-weight:700;margin-bottom:14px">
            ● THE BRIEF · DAILY
          </div>
          <h3 style="font-family:'Inter Tight',Inter,Helvetica,Arial,sans-serif;font-size:24px;font-weight:900;letter-spacing:-0.025em;line-height:1.2;color:#fff;margin:0 0 10px">
            Forward this to someone who&apos;d like it.
          </h3>
          <p style="font-family:'Source Serif 4',Georgia,serif;font-size:14px;line-height:1.55;color:#AAB2C8;margin:0 0 18px;font-style:italic">
            Friends, colleagues, and that one boss who reads three newsletters before 7 AM.
          </p>
          <a href="${SITE_URL}/subscribe" style="display:inline-block;background:#E85A2C;color:#fff;padding:12px 26px;text-decoration:none;font-family:Inter,Helvetica,Arial,sans-serif;font-size:12.5px;font-weight:800;letter-spacing:0.06em;text-transform:uppercase">
            Subscribe a friend →
          </a>
        </td></tr>

        <tr><td style="background:#EFE8D2;color:#6B6353;padding:22px 32px;text-align:center;font-family:'JetBrains Mono',ui-monospace,monospace;font-size:10px;letter-spacing:0.06em">
          <div style="margin-bottom:8px">
            <a href="${SITE_URL}/about" style="color:#15264D;text-decoration:none;font-weight:700">ABOUT</a> &nbsp;·&nbsp;
            <a href="${SITE_URL}/masthead" style="color:#15264D;text-decoration:none;font-weight:700">MASTHEAD</a> &nbsp;·&nbsp;
            <a href="${SITE_URL}/ethics" style="color:#15264D;text-decoration:none;font-weight:700">ETHICS</a> &nbsp;·&nbsp;
            <a href="${SITE_URL}/contact" style="color:#15264D;text-decoration:none;font-weight:700">CONTACT</a>
          </div>
          <div style="margin-bottom:6px;text-transform:uppercase;color:#6B7390">
            © 2026 TechEchelon Media · New York · Washington · San Francisco
          </div>
          <div style="font-style:italic;letter-spacing:0.04em;color:#6B7390">
            You&apos;re receiving this because you subscribed to TechEchelon. &nbsp;
            <a href="{{{RESEND_UNSUBSCRIBE_URL}}}" style="color:#6B7390;text-decoration:underline">Unsubscribe</a>
          </div>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function unauthorized(): Response {
  return new Response("Unauthorized", { status: 401 });
}

export const dynamic = "force-dynamic";

export async function GET(req: Request): Promise<Response> {
  const authHeader = req.headers.get("authorization");
  const expected = `Bearer ${process.env.CRON_SECRET ?? ""}`;
  if (!process.env.CRON_SECRET || authHeader !== expected) {
    return unauthorized();
  }

  const url = new URL(req.url);
  const dry = url.searchParams.get("dry") === "1";

  const articles = selectStories(5);
  if (articles.length === 0) {
    return Response.json({ ok: true, skipped: "no_articles" });
  }

  const dateLabel = todayET();
  const html = renderHtml(articles);
  const subject = `The Brief · ${dateLabel} · ${articles[0]!.title.slice(0, 80)}`;

  if (dry) {
    return Response.json({
      dry: true,
      subject,
      articleCount: articles.length,
      articles: articles.map((a) => ({ title: a.title, slug: a.slug })),
      htmlLength: html.length,
    });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  const fromEmail = process.env.RESEND_FROM_EMAIL ?? "press@techechelon.com";
  const fromName = process.env.RESEND_FROM_NAME ?? "The TechEchelon Brief";
  if (!apiKey || !audienceId) {
    return Response.json({ error: "server_misconfigured" }, { status: 500 });
  }

  // ?to=email routes through Resend's single-email endpoint instead of a
  // broadcast. Use this for one-off test sends to a single inbox without
  // spamming the whole audience.
  const testTo = url.searchParams.get("to");
  if (testTo) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(testTo)) {
      return Response.json({ error: "invalid_to" }, { status: 400 });
    }
    const oneRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `${fromName} <${fromEmail}>`,
        to: [testTo],
        subject: `[TEST] ${subject}`,
        html,
        reply_to: fromEmail,
      }),
    });
    const oneText = await oneRes.text();
    if (!oneRes.ok) {
      console.error(`[send-brief] test send failed ${oneRes.status}: ${oneText.slice(0, 500)}`);
      return Response.json(
        { error: "test_send_failed", status: oneRes.status, body: oneText.slice(0, 500) },
        { status: 502 },
      );
    }
    return Response.json({ ok: true, test: true, to: testTo, subject: `[TEST] ${subject}` });
  }

  // Create the broadcast (draft state).
  const createRes = await fetch("https://api.resend.com/broadcasts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      audience_id: audienceId,
      from: `${fromName} <${fromEmail}>`,
      subject,
      html,
      name: `Brief · ${dateLabel}`,
      reply_to: fromEmail,
    }),
  });
  const createText = await createRes.text();
  if (!createRes.ok) {
    console.error(`[send-brief] create failed ${createRes.status}: ${createText.slice(0, 500)}`);
    return Response.json(
      { error: "create_broadcast_failed", status: createRes.status, body: createText.slice(0, 500) },
      { status: 502 },
    );
  }
  const broadcast = JSON.parse(createText) as { id: string };

  // Send immediately.
  const sendRes = await fetch(`https://api.resend.com/broadcasts/${broadcast.id}/send`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
  });
  const sendText = await sendRes.text();
  if (!sendRes.ok) {
    console.error(`[send-brief] send failed ${sendRes.status}: ${sendText.slice(0, 500)}`);
    return Response.json(
      { error: "send_broadcast_failed", status: sendRes.status, body: sendText.slice(0, 500) },
      { status: 502 },
    );
  }

  return Response.json({
    ok: true,
    broadcastId: broadcast.id,
    subject,
    articleCount: articles.length,
  });
}
