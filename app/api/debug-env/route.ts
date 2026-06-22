// Read-only debug endpoint: reports whether the data-provider env vars are
// reaching the Vercel runtime. Live API probes burn credits on every call,
// so they're gated behind ?probe=1 — without that flag we only report key
// detection and fingerprint, no upstream traffic.

export const dynamic = "force-dynamic";

function head(s: string | undefined): string {
  if (!s) return "(empty)";
  return s.slice(0, 4) + "..." + s.slice(-2) + ` (${s.length} chars)`;
}

interface ProbeResult {
  ok: boolean;
  status?: number;
  bodyHead?: string;
  error?: string;
  skipped?: boolean;
  note?: string;
}

async function probeTwelveData(key: string): Promise<ProbeResult> {
  try {
    const r = await fetch(
      `https://api.twelvedata.com/time_series?symbol=NVDA&interval=1day&outputsize=5&apikey=${key}`,
      { cache: "no-store" },
    );
    const text = await r.text();
    return { ok: r.ok, status: r.status, bodyHead: text.slice(0, 220) };
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }
}

async function probeFinnhub(key: string): Promise<ProbeResult> {
  try {
    const r = await fetch(
      `https://finnhub.io/api/v1/quote?symbol=NVDA&token=${key}`,
      { cache: "no-store" },
    );
    const text = await r.text();
    return { ok: r.ok, status: r.status, bodyHead: text.slice(0, 220) };
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }
}

export async function GET(req: Request) {
  const wantsProbe = new URL(req.url).searchParams.get("probe") === "1";

  const twelve =
    process.env.TWELVEDATA_API_KEY ??
    process.env.TWELVE_DATA_API_KEY ??
    process.env.TWELVEDATA_KEY ??
    "";
  const finn = process.env.FINNHUB_API_KEY ?? "";

  const twelveProbe: ProbeResult = !twelve
    ? { ok: false, error: "key missing" }
    : wantsProbe
    ? await probeTwelveData(twelve)
    : { ok: true, skipped: true, note: "add ?probe=1 to live-probe (burns 1 API credit)" };

  const finnProbe: ProbeResult = !finn
    ? { ok: false, error: "key missing" }
    : wantsProbe
    ? await probeFinnhub(finn)
    : { ok: true, skipped: true, note: "add ?probe=1 to live-probe" };

  const envSeen = Object.keys(process.env)
    .filter((k) => /TWELVE|FINNHUB/i.test(k))
    .sort();

  return Response.json(
    {
      twelvedata: {
        keyDetected: twelve.length > 0,
        keyFingerprint: head(twelve),
        envVarsSeen: Object.keys(process.env).filter((k) => /TWELVE/i.test(k)).sort(),
        liveProbe: twelveProbe,
      },
      finnhub: {
        keyDetected: finn.length > 0,
        keyFingerprint: head(finn),
        envVarsSeen: Object.keys(process.env).filter((k) => /FINNHUB/i.test(k)).sort(),
        liveProbe: finnProbe,
      },
      allDataEnvVars: envSeen,
    },
    { status: 200 },
  );
}
