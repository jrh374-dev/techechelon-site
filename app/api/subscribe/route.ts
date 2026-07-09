// POST /api/subscribe { email: string } → creates a contact in the
// configured Resend audience. Resend is idempotent on duplicate emails
// (returns 201 with the existing contact id), so we can safely retry
// the same address without special-casing "already subscribed."

export const runtime = "edge";

interface Body {
  email?: unknown;
}

function isValidEmail(v: unknown): v is string {
  return (
    typeof v === "string" &&
    v.length > 0 &&
    v.length <= 254 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
  );
}

export async function POST(req: Request): Promise<Response> {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return Response.json({ error: "invalid_json" }, { status: 400 });
  }

  const rawEmail = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!isValidEmail(rawEmail)) {
    return Response.json({ error: "invalid_email" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  if (!apiKey || !audienceId) {
    console.error("[subscribe] RESEND_API_KEY or RESEND_AUDIENCE_ID missing at runtime");
    return Response.json({ error: "server_misconfigured" }, { status: 500 });
  }

  const r = await fetch(
    `https://api.resend.com/audiences/${audienceId}/contacts`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: rawEmail, unsubscribed: false }),
    },
  );

  if (!r.ok) {
    const text = await r.text();
    console.error(`[subscribe] resend ${r.status}: ${text.slice(0, 200)}`);
    return Response.json({ error: "provider_error" }, { status: 502 });
  }

  return Response.json({ ok: true });
}
