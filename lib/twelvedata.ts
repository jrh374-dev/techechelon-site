// Twelve Data client — historical time-series for the markets [symbol] chart.
// Uses unstable_cache so successful responses are memoized for 24h while
// failed responses (rate-limit hits, transient errors) are NOT cached and
// will be retried on next request. Prior implementations used Next's
// per-fetch cache which cached the 429s themselves for 24h, locking out
// symbols for a full day after a single rate-limit blip.

import { unstable_cache } from "next/cache";

const TD = "https://api.twelvedata.com";
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
  t: number;
  c: number;
}

async function rawFetchDaily(
  symbol: string,
  outputsize: number,
): Promise<Bar[]> {
  if (!KEY) {
    throw new Error("twelvedata: no API key in env");
  }
  const url = `${TD}/time_series?symbol=${encodeURIComponent(symbol)}&interval=1day&outputsize=${outputsize}&order=ASC&apikey=${KEY}`;
  // NOT no-store: a no-store fetch inside unstable_cache throws
  // DynamicServerError when the page renders statically (ISR), which is
  // exactly how /markets/[symbol] renders since revalidate=300 replaced
  // force-dynamic. A short revalidate window keeps the inner fetch legal
  // in static contexts; the outer unstable_cache still owns the real
  // 24h memoization and still refuses to cache thrown errors. The 300s
  // inner TTL also bounds the damage if Next ever caches a non-ok
  // response body at the fetch layer: it clears in five minutes instead
  // of poisoning a full day.
  const r = await fetch(url, { next: { revalidate: 300 } });
  const text = await r.text();
  if (!r.ok) {
    throw new Error(`twelvedata: ${symbol} HTTP ${r.status}: ${text.slice(0, 120)}`);
  }
  let j: TimeSeriesResponse;
  try {
    j = JSON.parse(text) as TimeSeriesResponse;
  } catch {
    throw new Error(`twelvedata: ${symbol} non-JSON: ${text.slice(0, 120)}`);
  }
  if (j.status === "error") {
    throw new Error(`twelvedata: ${symbol} error: ${j.message ?? "unknown"}`);
  }
  if (!j.values?.length) {
    throw new Error(`twelvedata: ${symbol} returned no values`);
  }
  const bars: Bar[] = j.values
    .map((p) => ({
      t: Math.floor(new Date(p.datetime).getTime() / 1000),
      c: Number(p.close),
    }))
    .filter((b) => Number.isFinite(b.c) && b.c > 0);
  if (bars.length <= 5) {
    throw new Error(`twelvedata: ${symbol} only ${bars.length} usable bars`);
  }
  return bars;
}

// unstable_cache only caches the resolved value. If the wrapped function
// throws, the cache entry is NOT written, so a failed fetch never poisons
// the cache for 24h the way next.fetch caching did.
// Bump the cache key ("v2") when the underlying cache needs an unconditional
// reset — e.g. after a paid-tier upgrade where prior null entries from
// build-time rate-limit failures survived beyond expectations. Fresh key
// forces every symbol to fetch anew on the next build/revalidation.
const cachedFetchDaily = unstable_cache(
  rawFetchDaily,
  ["twelvedata-daily-v2"],
  { revalidate: 86400, tags: ["twelvedata"] },
);

export async function getDailySeries(
  symbol: string,
  outputsize = 130,
): Promise<Bar[] | null> {
  try {
    return await cachedFetchDaily(symbol, outputsize);
  } catch (err) {
    console.warn(`[twelvedata] ${(err as Error).message}`);
    return null;
  }
}

// On the Grow tier ($29/mo) all native index/forex/crypto symbols are
// available, but we still use ETF proxies for indices because the chart
// reads more naturally with familiar tradeable tickers (SPY vs SPX, QQQ
// vs IXIC). Free-tier safe.
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
