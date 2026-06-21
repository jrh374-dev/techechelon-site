// Finnhub client — server-side fetch wrappers with Vercel ISR caching.
// All requests use Next.js fetch with revalidate windows tuned to how
// often the underlying data realistically changes.

const FINNHUB = "https://finnhub.io/api/v1";
const KEY = process.env.FINNHUB_API_KEY ?? "";

function url(path: string, params: Record<string, string | number> = {}): string {
  const q = new URLSearchParams({ ...params, token: KEY } as Record<string, string>);
  return `${FINNHUB}${path}?${q.toString()}`;
}

async function safeJson<T>(u: string, revalidate: number): Promise<T | null> {
  if (!KEY) return null;
  try {
    const r = await fetch(u, { next: { revalidate } });
    if (!r.ok) return null;
    return (await r.json()) as T;
  } catch {
    return null;
  }
}

export interface FinnhubQuote {
  c: number; // current price
  d: number; // change
  dp: number; // change percent
  h: number; // day high
  l: number; // day low
  o: number; // open
  pc: number; // previous close
  t: number; // timestamp
}

export interface FinnhubProfile {
  name?: string;
  ticker?: string;
  country?: string;
  currency?: string;
  exchange?: string;
  ipo?: string;
  marketCapitalization?: number;
  shareOutstanding?: number;
  logo?: string;
  weburl?: string;
  finnhubIndustry?: string;
}

export interface FinnhubMetric {
  metric?: {
    "10DayAverageTradingVolume"?: number;
    "52WeekHigh"?: number;
    "52WeekLow"?: number;
    beta?: number;
    peNormalizedAnnual?: number;
    epsNormalizedAnnual?: number;
    dividendYieldIndicatedAnnual?: number;
    revenuePerShareTTM?: number;
    grossMarginAnnual?: number;
    profitMarginAnnual?: number;
  };
}

export interface FinnhubCandle {
  c?: number[]; // close prices
  h?: number[];
  l?: number[];
  o?: number[];
  t?: number[]; // timestamps
  v?: number[]; // volume
  s: "ok" | "no_data";
}

export interface FinnhubNewsItem {
  category?: string;
  datetime: number;
  headline: string;
  id?: number;
  image?: string;
  related?: string;
  source: string;
  summary?: string;
  url: string;
}

export async function getQuote(symbol: string): Promise<FinnhubQuote | null> {
  return safeJson<FinnhubQuote>(url("/quote", { symbol }), 60);
}

export async function getProfile(symbol: string): Promise<FinnhubProfile | null> {
  return safeJson<FinnhubProfile>(url("/stock/profile2", { symbol }), 86400);
}

export async function getMetrics(symbol: string): Promise<FinnhubMetric | null> {
  return safeJson<FinnhubMetric>(
    url("/stock/metric", { symbol, metric: "all" }),
    3600,
  );
}

export async function getCandles(
  symbol: string,
  resolution: "D" | "W" | "M" | "60" | "30" | "15" | "5",
  fromUnix: number,
  toUnix: number,
): Promise<FinnhubCandle | null> {
  return safeJson<FinnhubCandle>(
    url("/stock/candle", { symbol, resolution, from: fromUnix, to: toUnix }),
    resolution === "D" || resolution === "W" || resolution === "M" ? 900 : 60,
  );
}

export async function getCompanyNews(
  symbol: string,
  fromIso: string,
  toIso: string,
): Promise<FinnhubNewsItem[] | null> {
  return safeJson<FinnhubNewsItem[]>(
    url("/company-news", { symbol, from: fromIso, to: toIso }),
    1800,
  );
}

export function isConfigured(): boolean {
  return KEY.length > 0;
}

// Symbol resolution: many indices/commodities/crypto are not directly
// quote-able on Finnhub's free tier. We map them to liquid ETF proxies or
// crypto pairs that Finnhub can quote.
export function finnhubSymbolFor(slug: string, fallback: string): string {
  const map: Record<string, string> = {
    spx: "SPY",
    ndx: "QQQ",
    dji: "DIA",
    rut: "IWM",
    vix: "VIXY",
    dxy: "UUP",
    gold: "GLD",
    wti: "USO",
    btc: "BINANCE:BTCUSDT",
    eth: "BINANCE:ETHUSDT",
    us10y: "TLT",
  };
  return map[slug] ?? fallback.toUpperCase();
}
