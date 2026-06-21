import { notFound } from "next/navigation";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Newsletter } from "@/components/Newsletter";
import { MarketChart } from "@/components/MarketChart";
import { MARKETS, getSymbol, kindLabel } from "@/lib/markets";
import { getAllPosts, relativeTime, categoryLabel } from "@/lib/posts";

export function generateStaticParams() {
  return MARKETS.map((m) => ({ symbol: m.slug }));
}

export default function MarketPage({ params }: { params: { symbol: string } }) {
  const sym = getSymbol(params.symbol);
  if (!sym) notFound();

  // Surface recent TechEchelon coverage that mentions this symbol or company.
  const lowerTerms = sym.searchTerms.map((s) => s.toLowerCase());
  const related = getAllPosts()
    .filter((p) => {
      const hay = `${p.title} ${p.excerpt} ${p.primaryEntity ?? ""}`.toLowerCase();
      return lowerTerms.some((t) => hay.includes(t));
    })
    .slice(0, 6);

  const changeColor =
    sym.direction === "up"
      ? "text-[#2A8C5A]"
      : sym.direction === "down"
      ? "text-[#C9402A]"
      : "text-sand";
  const changeArrow =
    sym.direction === "up" ? "▲" : sym.direction === "down" ? "▼" : "▬";

  return (
    <div className="bg-cream min-h-screen">
      <SiteHeader />
      <div className="bg-cream">
        <div className="max-w-[1320px] mx-auto px-7 py-3 text-[11px] tracking-[0.04em] text-sand font-semibold">
          <Link href="/" className="text-navy hover:underline">Home</Link>
          <span className="mx-2 text-sand-light">/</span>
          <span>Markets</span>
          <span className="mx-2 text-sand-light">/</span>
          <span>{sym.symbol}</span>
        </div>
      </div>

      <section className="border-b border-rule">
        <div className="max-w-[1320px] mx-auto px-5 md:px-7 pt-7 md:pt-9 pb-6 md:pb-8">
          <div className="font-mono text-[10px] md:text-[10.5px] tracking-[0.14em] md:tracking-[0.16em] uppercase font-bold text-coral mb-3">
            ━━ {kindLabel(sym.kind).toUpperCase()}
            {sym.sector && ` · ${sym.sector.toUpperCase()}`}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-7 md:gap-12 items-start">
            <div>
              <h1 className="font-display text-[36px] md:text-[52px] font-extrabold tracking-[-0.03em] md:tracking-[-0.035em] leading-[0.98] md:leading-[0.96] text-navy">
                {sym.name}
              </h1>
              <div className="mt-2 md:mt-3 font-mono text-[10.5px] md:text-[11px] tracking-[0.1em] uppercase font-bold text-sand">
                {sym.symbol}
              </div>
              <p className="font-serif text-[15.5px] md:text-[17px] leading-relaxed text-ink-soft italic mt-4 md:mt-5 max-w-[560px]">
                {sym.description}
              </p>
            </div>
            <div className="md:border-l border-rule md:pl-10 pt-4 md:pt-0 border-t md:border-t-0">
              <div className="font-mono text-[10px] md:text-[10.5px] tracking-[0.14em] uppercase font-bold text-sand mb-2">
                LAST PRICE
              </div>
              <div className="flex items-baseline gap-3 md:gap-4 flex-wrap">
                <span className="font-mono text-[32px] md:text-[42px] font-bold tracking-tight text-ink leading-none">
                  {sym.price}
                </span>
                <span className={`font-mono text-[14px] md:text-[16px] font-bold ${changeColor}`}>
                  {changeArrow} {sym.change}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-x-6 md:gap-x-8 gap-y-3 mt-5 md:mt-7">
                {sym.open && <Stat label="Open" value={sym.open} />}
                {sym.high52 && <Stat label="52-week high" value={sym.high52} />}
                {sym.low52 && <Stat label="52-week low" value={sym.low52} />}
                {sym.marketCap && <Stat label="Market cap" value={sym.marketCap} />}
                {sym.pe && <Stat label="P/E ratio" value={sym.pe} />}
                {sym.yieldPct && <Stat label="Yield" value={sym.yieldPct} />}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-rule bg-white">
        <div className="max-w-[1320px] mx-auto px-5 md:px-7 py-7 md:py-9">
          <div className="flex flex-wrap items-baseline gap-2 md:gap-4 mb-4 md:mb-5">
            <h2 className="font-display text-[18px] md:text-[22px] font-extrabold tracking-[-0.022em] text-navy leading-none">
              Price · last 3 months
            </h2>
            <span className="font-mono text-[9.5px] md:text-[10.5px] tracking-[0.08em] uppercase font-semibold text-sand">
              INDICATIVE · NOT FOR TRADING
            </span>
          </div>
          <MarketChart slug={sym.slug} direction={sym.direction} />
          <p className="font-mono text-[10px] tracking-[0.06em] uppercase text-sand mt-4">
            Source: TechEchelon market data · Snapshot generated for display
          </p>
        </div>
      </section>

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

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="font-mono text-[9.5px] tracking-[0.12em] uppercase text-sand font-semibold">
        {label}
      </div>
      <div className="font-mono text-[14px] font-bold text-ink mt-0.5">{value}</div>
    </div>
  );
}
