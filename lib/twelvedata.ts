// Twelve Data client — historical time-series for the markets [symbol] chart.
// Finnhub locks /stock/candle to paid tiers; Twelve Data's free tier (800
// req/day) covers stocks, ETFs, indices, FX, crypto, and commodities.

const TD = "https://api.twelvedata.com";
// Accept multiple env var name variants — TWELVEDATA_API_KEY is the canonical
// form, but TWELVE_DATA_API_KEY and TWELVEDATA_KEY are easy to type by mistake.
const KEY =
  process.env.TWELVEDATA_API_KEY ??
  process.env.TWELVE_DATA_API_KEY ??
  process.env.TWELVEDATA_KEY ??
  "";

export function isConfigured(): boolean {
  return KEY.length > 0;
}

interface TimeSeriesPoint {
  datetime: string;
  open?: string;
  high?: string;
  low?: string;
  close: string;
  volume?: string;
}

interface TimeSeriesResponse {
  status?: string;
  message?: string;
  meta?: { symbol: string; interval: string; currency?: string };
  values?: TimeSeriesPoint[];
}

export interface Bar {
  t: number; // unix seconds
  c: number; // close
}

export async function getDailySeries(
  symbol: string,
  outputsize = 130,
): Promise<Bar[] | null> {
  if (!KEY) {
    console.warn(`[twelvedata] no API key in env (checked TWELVEDATA_API_KEY, TWELVE_DATA_API_KEY, TWELVEDATA_KEY)`);
    return null;
  }
  try {
    // The `v=` param doesn't affect the Twelve Data response — it busts
    // Next.js's per-URL data cache so stale-null entries from earlier
    // rate-limit failures get refreshed. Bump when retries needed.
    const url = `${TD}/time_series?symbol=${encodeURIComponent(symbol)}&interval=1day&outputsize=${outputsize}&order=ASC&apikey=${KEY}&v=2`;
    // Daily closes only change once a trading day at most — cache for 24h to
    // keep us well under Twelve Data's 800-call/day free-tier limit. With
    // 16 ticker symbols this works out to ~16 calls/day total.
    const r = await fetch(url, { next: { revalidate: 86400 } });
    const text = await r.text();
    if (!r.ok) {
      console.warn(`[twelvedata] ${symbol} HTTP ${r.status}: ${text.slice(0, 200)}`);
      return null;
    }
    let j: TimeSeriesResponse;
    try {
      j = JSON.parse(text) as TimeSeriesResponse;
    } catch {
      console.warn(`[twelvedata] ${symbol} non-JSON: ${text.slice(0, 200)}`);
      return null;
    }
    if (j.status === "error") {
      console.warn(`[twelvedata] ${symbol} error: ${j.message ?? "(no message)"}`);
      return null;
    }
    if (!j.values?.length) {
      console.warn(`[twelvedata] ${symbol} returned no values`);
      return null;
    }
    const bars: Bar[] = j.values
      .map((p) => ({
        t: Math.floor(new Date(p.datetime).getTime() / 1000),
        c: Number(p.close),
      }))
      .filter((b) => Number.isFinite(b.c) && b.c > 0);
    return bars.length > 5 ? bars : null;
  } catch (err) {
    console.warn(`[twelvedata] ${symbol} threw: ${(err as Error).message}`);
    return null;
  }
}

// Twelve Data's free tier covers stocks, ETFs, and crypto pairs — but
// indices (SPX, IXIC), forex (XAU/USD), and many commodities require a
// paid plan. Map indices/commodities to liquid ETF proxies (same approach
// the Finnhub client uses) so the chart renders on the free tier.
export function tdSymbolFor(slug: string, fallback: string): string {
  const map: Record<string, string> = {
    spx: "SPY",
    ndx: "QQQ",
    dji: "DIA",
    rut: "IWM",
    vix: "VIXY",
    us10y: "TLT",
    dxy: "UUP",
    gold: "GLD",
    wti: "USO",
    btc: "BTC/USD",
    eth: "ETH/USD",
  };
  return map[slug] ?? fallback.toUpperCase();
}
