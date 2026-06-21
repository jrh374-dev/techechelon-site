// Read-only debug endpoint: reports whether the data-provider env vars are
// reaching the Vercel runtime and whether a sample fetch actually returns
// data. Returns booleans + key prefixes only — never the secret itself.

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

export async function GET() {
  const twelve =
    process.env.TWELVEDATA_API_KEY ??
    process.env.TWELVE_DATA_API_KEY ??
    process.env.TWELVEDATA_KEY ??
    "";
  const finn = process.env.FINNHUB_API_KEY ?? "";

  const twelveProbe = twelve
    ? await probeTwelveData(twelve)
    : { ok: false, error: "key missing" };
  const finnProbe = finn
    ? await probeFinnhub(finn)
    : { ok: false, error: "key missing" };

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
