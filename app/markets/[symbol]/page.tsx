import { notFound } from "next/navigation";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Newsletter } from "@/components/Newsletter";
import { MarketChart } from "@/components/MarketChart";
import { IntervalChart } from "@/components/IntervalChart";
import { MARKETS, getSymbol, kindLabel, MarketSymbol } from "@/lib/markets";
import {
  finnhubSymbolFor,
  getCompanyNews,
  getMetrics,
  getProfile,
  getQuote,
  isConfigured,
} from "@/lib/finnhub";
import { getDailySeries, tdSymbolFor, isConfigured as tdConfigured } from "@/lib/twelvedata";
import { getAllPosts, relativeTime, categoryLabel } from "@/lib/posts";

export function generateStaticParams() {
  return MARKETS.map((m) => ({ symbol: m.slug }));
}

// Revalidate every 5 minutes so live quotes stay fresh and the interval
// chart picks up newly-available data when it becomes so (e.g. after a
// paid-tier upgrade or after a rate-limit window resets). Without this,
// pages were baked at build time and served forever from cache — so
// even after Twelve Data recovered we kept showing 'Live chart
// unavailable' from the last successful build.
export const revalidate = 300;

function fmtMoney(n: number | undefined, dec = 2): string {
  if (n == null || !Number.isFinite(n)) return "—";
  if (Math.abs(n) >= 1e12) return `$${(n / 1e12).toFixed(2)}T`;
  if (Math.abs(n) >= 1e9) return `$${(n / 1e9).toFixed(2)}B`;
  if (Math.abs(n) >= 1e6) return `$${(n / 1e6).toFixed(2)}M`;
  if (Math.abs(n) >= 1000) return `$${n.toLocaleString(undefined, { maximumFractionDigits: dec })}`;
  return `$${n.toFixed(dec)}`;
}

function fmtNum(n: number | undefined, dec = 2): string {
  if (n == null || !Number.isFinite(n)) return "—";
  if (Math.abs(n) >= 1000) return n.toLocaleString(undefined, { maximumFractionDigits: dec });
  return n.toFixed(dec);
}

function fmtPct(n: number | undefined): string {
  if (n == null || !Number.isFinite(n)) return "—";
  return `${n >= 0 ? "+" : ""}${n.toFixed(2)}%`;
}

interface Live {
  price: string;
  change: string;
  direction: "up" | "down" | "flat";
  open?: string;
  prevClose?: string;
  dayHigh?: string;
  dayLow?: string;
  hi52?: string;
  lo52?: string;
  marketCap?: string;
  pe?: string;
  eps?: string;
  beta?: string;
  dividendYield?: string;
  volume?: string;
  industry?: string;
  description?: string;
}

async function liveFor(sym: MarketSymbol): Promise<Live | null> {
  if (!isConfigured()) return null;
  const fh = finnhubSymbolFor(sym.slug, sym.symbol);
  const [quote, profile, metrics] = await Promise.all([
    getQuote(fh),
    sym.kind === "stock" ? getProfile(fh) : Promise.resolve(null),
    sym.kind === "stock" ? getMetrics(fh) : Promise.resolve(null),
  ]);
  if (!quote || !quote.c) return null;

  const direction: Live["direction"] =
    quote.dp > 0.02 ? "up" : quote.dp < -0.02 ? "down" : "flat";
  const currencyPrefix = sym.kind === "crypto" ? "$" : sym.kind === "stock" ? "$" : "";

  return {
    price: `${currencyPrefix}${fmtNum(quote.c, 2)}`,
    change: fmtPct(quote.dp),
    direction,
    open: `${currencyPrefix}${fmtNum(quote.o, 2)}`,
    prevClose: `${currencyPrefix}${fmtNum(quote.pc, 2)}`,
    dayHigh: `${currencyPrefix}${fmtNum(quote.h, 2)}`,
    dayLow: `${currencyPrefix}${fmtNum(quote.l, 2)}`,
    hi52: metrics?.metric?.["52WeekHigh"]
      ? `${currencyPrefix}${fmtNum(metrics.metric["52WeekHigh"], 2)}`
      : undefined,
    lo52: metrics?.metric?.["52WeekLow"]
      ? `${currencyPrefix}${fmtNum(metrics.metric["52WeekLow"], 2)}`
      : undefined,
    marketCap: profile?.marketCapitalization
      ? fmtMoney(profile.marketCapitalization * 1e6)
      : undefined,
    pe: metrics?.metric?.peNormalizedAnnual
      ? fmtNum(metrics.metric.peNormalizedAnnual, 1)
      : undefined,
    eps: metrics?.metric?.epsNormalizedAnnual
      ? fmtNum(metrics.metric.epsNormalizedAnnual, 2)
      : undefined,
    beta: metrics?.metric?.beta ? fmtNum(metrics.metric.beta, 2) : undefined,
    dividendYield: metrics?.metric?.dividendYieldIndicatedAnnual
      ? `${metrics.metric.dividendYieldIndicatedAnnual.toFixed(2)}%`
      : undefined,
    industry: profile?.finnhubIndustry,
    description: profile?.name,
  };
}

async function newsFor(sym: MarketSymbol) {
  if (sym.kind !== "stock") return [];
  if (!isConfigured()) return [];
  const fh = finnhubSymbolFor(sym.slug, sym.symbol);
  const to = new Date();
  const from = new Date(Date.now() - 14 * 86400000);
  const iso = (d: Date) => d.toISOString().slice(0, 10);
  const news = await getCompanyNews(fh, iso(from), iso(to));
  return (news ?? []).slice(0, 5);
}

function Stat({ label, value }: { label: string; value: string | undefined }) {
  return (
    <div>
      <div className="font-mono text-[9.5px] tracking-[0.12em] uppercase text-sand font-semibold">
        {label}
      </div>
      <div className="font-mono text-[14px] font-bold text-ink mt-0.5">
        {value ?? "—"}
      </div>
    </div>
  );
}

export default async function MarketPage({ params }: { params: { symbol: string } }) {
  const sym = getSymbol(params.symbol);
  if (!sym) notFound();

  const [live, news, series] = await Promise.all([
    liveFor(sym),
    newsFor(sym),
    tdConfigured()
      ? getDailySeries(tdSymbolFor(sym.slug, sym.symbol), 260)
      : Promise.resolve(null),
  ]);
  const chartData = series?.map((b) => b.c);
  const chartBars = series && series.length > 5 ? series : null;

  const price = live?.price ?? sym.price;
  const change = live?.change ?? sym.change;
  const direction = live?.direction ?? sym.direction;

  const lowerTerms = sym.searchTerms.map((s) => s.toLowerCase());
  const related = getAllPosts()
    .filter((p) => {
      const hay = `${p.title} ${p.excerpt} ${p.primaryEntity ?? ""}`.toLowerCase();
      return lowerTerms.some((t) => hay.includes(t));
    })
    .slice(0, 6);

  const changeColor =
    direction === "up"
      ? "text-[#2A8C5A]"
      : direction === "down"
      ? "text-[#C9402A]"
      : "text-sand";
  const changeArrow = direction === "up" ? "▲" : direction === "down" ? "▼" : "▬";

  return (
    <div className="bg-cream min-h-screen">
      <SiteHeader />
      <div className="bg-cream">
        <div className="max-w-[1320px] mx-auto px-5 md:px-7 py-3 text-[10.5px] md:text-[11px] tracking-[0.04em] text-sand font-semibold overflow-x-auto whitespace-nowrap">
          <Link href="/" className="text-navy hover:underline">Home</Link>
          <span className="mx-2 text-sand-light">/</span>
          <span>Markets</span>
          <span className="mx-2 text-sand-light">/</span>
          <span>{sym.symbol}</span>
        </div>
      </div>

      <section className="border-b border-rule">
        <div className="max-w-[1320px] mx-auto px-5 md:px-7 pt-7 md:pt-9 pb-6 md:pb-8">
          <div className="font-mono text-[10px] md:text-[10.5px] tracking-[0.14em] uppercase font-bold text-coral mb-3">
            ━━ {kindLabel(sym.kind).toUpperCase()}
            {(live?.industry || sym.sector) && ` · ${(live?.industry ?? sym.sector ?? "").toUpperCase()}`}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-7 md:gap-12 items-start">
            <div>
              <h1 className="font-display text-[36px] md:text-[52px] font-extrabold tracking-[-0.03em] md:tracking-[-0.035em] leading-[0.98] md:leading-[0.96] text-navy">
                {sym.name}
              </h1>
              <div className="mt-2 md:mt-3 font-mono text-[10.5px] md:text-[11px] tracking-[0.1em] uppercase font-bold text-sand">
                {sym.symbol}{!isConfigured() && " · INDICATIVE"}
              </div>
              <p className="font-serif text-[15.5px] md:text-[17px] leading-relaxed text-ink-soft italic mt-4 md:mt-5 max-w-[560px]">
                {sym.description}
              </p>
            </div>
            <div className="md:border-l border-rule md:pl-10 pt-4 md:pt-0 border-t md:border-t-0">
              <div className="font-mono text-[10px] md:text-[10.5px] tracking-[0.14em] uppercase font-bold text-sand mb-2">
                LAST PRICE {isConfigured() && live ? "· LIVE" : ""}
              </div>
              <div className="flex items-baseline gap-3 md:gap-4 flex-wrap">
                <span className="font-mono text-[32px] md:text-[42px] font-bold tracking-tight text-ink leading-none">
                  {price}
                </span>
                <span className={`font-mono text-[14px] md:text-[16px] font-bold ${changeColor}`}>
                  {changeArrow} {change}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-x-6 md:gap-x-8 gap-y-3 mt-5 md:mt-7">
                <Stat label="Open" value={live?.open ?? sym.open} />
                <Stat label="Prev. close" value={live?.prevClose} />
                <Stat label="Day high" value={live?.dayHigh} />
                <Stat label="Day low" value={live?.dayLow} />
                <Stat label="52-week high" value={live?.hi52 ?? sym.high52} />
                <Stat label="52-week low" value={live?.lo52 ?? sym.low52} />
                {(live?.marketCap || sym.marketCap) && (
                  <Stat label="Market cap" value={live?.marketCap ?? sym.marketCap} />
                )}
                {(live?.pe || sym.pe) && <Stat label="P/E ratio" value={live?.pe ?? sym.pe} />}
                {live?.eps && <Stat label="EPS" value={live.eps} />}
                {live?.beta && <Stat label="Beta" value={live.beta} />}
                {live?.dividendYield && <Stat label="Dividend yield" value={live.dividendYield} />}
                {sym.yieldPct && !live?.dividendYield && (
                  <Stat label="Yield" value={sym.yieldPct} />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-rule bg-white">
        <div className="max-w-[1320px] mx-auto px-5 md:px-7 py-7 md:py-9">
          <div className="flex flex-wrap items-baseline gap-2 md:gap-4 mb-4 md:mb-5">
            <h2 className="font-display text-[18px] md:text-[22px] font-extrabold tracking-[-0.022em] text-navy leading-none">
              Price · last {chartData ? `${chartData.length} trading days` : "3 months"}
            </h2>
            <span className="font-mono text-[9.5px] md:text-[10.5px] tracking-[0.08em] uppercase font-semibold text-sand">
              {chartData ? "DAILY CLOSES · VIA TWELVE DATA" : "INDICATIVE · NOT FOR TRADING"}
            </span>
          </div>
          {chartBars ? (
            <IntervalChart slug={sym.slug} bars={chartBars} />
          ) : (
            <MarketChart slug={sym.slug} direction={direction} data={chartData} />
          )}
          <p className="font-mono text-[10px] tracking-[0.06em] uppercase text-sand mt-4">
            {chartBars
              ? "Daily closing prices via Twelve Data. Chart not intended for trading decisions."
              : tdConfigured()
              ? `Live chart unavailable for ${tdSymbolFor(sym.slug, sym.symbol)} (Twelve Data returned no usable data — symbol may be premium-only, or rate limit hit). Snapshot shown.`
              : "Twelve Data API key not detected at runtime. Snapshot shown."}
          </p>
        </div>
      </section>

      {news.length > 0 && (
        <section className="border-b border-rule">
          <div className="max-w-[1320px] mx-auto px-5 md:px-7 py-7 md:py-9">
            <div className="flex flex-wrap items-baseline gap-2 md:gap-4 mb-5 md:mb-7 pb-3 border-b border-rule">
              <span className="font-mono text-[10px] md:text-[10.5px] tracking-[0.14em] uppercase font-bold text-sage">
                ━━ NEWSWIRE
              </span>
              <h2 className="font-display text-[18px] md:text-[22px] font-extrabold tracking-[-0.022em] text-navy leading-none">
                Recent {sym.symbol} news
              </h2>
              <span className="font-mono text-[9.5px] md:text-[10.5px] tracking-[0.08em] uppercase font-semibold text-sand">
                LAST 14 DAYS · VIA FINNHUB
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5">
              {news.map((n) => (
                <a
                  key={n.id ?? n.url}
                  href={n.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block pb-4 border-b border-rule-soft last:border-b-0"
                >
                  <div className="font-mono text-[9.5px] tracking-[0.12em] uppercase font-bold text-coral mb-1.5">
                    {n.source} · {new Date(n.datetime * 1000).toLocaleDateString()}
                  </div>
                  <h3 className="font-display text-[16px] md:text-[17px] font-extrabold tracking-[-0.018em] leading-[1.18] text-ink group-hover:text-navy">
                    {n.headline}
                  </h3>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="border-b border-rule">
          <div className="max-w-[1320px] mx-auto px-5 md:px-7 py-7 md:py-9">
            <div className="flex flex-wrap items-baseline gap-2 md:gap-4 mb-5 md:mb-7 pb-3 border-b border-rule">
              <span className="font-mono text-[10px] md:text-[10.5px] tracking-[0.14em] uppercase font-bold text-sage">
                ━━ COVERAGE
              </span>
              <h2 className="font-display text-[18px] md:text-[22px] font-extrabold tracking-[-0.022em] text-navy leading-none">
                Related TechEchelon stories
              </h2>
              <span className="flex-1 hidden md:inline-block border-b border-rule mb-1.5" />
              <span className="font-mono text-[10px] md:text-[10.5px] tracking-[0.06em] uppercase font-bold text-coral">
                {related.length} STORIES
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-7 md:gap-x-10 gap-y-7 md:gap-y-8">
              {related.map((p) => (
                <article key={p.slug} className="group">
                  <div className="font-mono text-[10px] tracking-[0.14em] uppercase font-bold text-coral mb-2">
                    {categoryLabel(p.category)}
                  </div>
                  <Link href={`/post/${p.slug}`} className="block">
                    <h3 className="font-display text-[20px] font-extrabold tracking-[-0.02em] leading-[1.15] text-ink hover:text-navy mb-2">
                      {p.title}
                    </h3>
                  </Link>
                  <p className="font-serif text-[13.5px] text-ink-soft leading-snug mb-2">
                    {p.excerpt}
                  </p>
                  <p className="font-mono text-[10.5px] tracking-[0.04em] uppercase text-sand">
                    <span className="text-navy font-bold not-italic normal-case font-sans text-[12px]">
                      {p.author}
                    </span>
                    <span> · {relativeTime(p.publishedAt).toUpperCase()}</span>
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <Newsletter />
      <SiteFooter />
    </div>
  );
}
