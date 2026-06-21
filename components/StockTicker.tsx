import Link from "next/link";
import { MARKETS, MarketSymbol } from "@/lib/markets";
import { getQuote, finnhubSymbolFor, isConfigured } from "@/lib/finnhub";

interface LiveTick {
  m: MarketSymbol;
  price: string;
  change: string;
  direction: "up" | "down" | "flat";
}

function fmtPrice(v: number, slug: string): string {
  if (slug === "btc") {
    if (v >= 1000) return `$${v.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
    return `$${v.toFixed(2)}`;
  }
  if (slug === "eth") return `$${v.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
  if (slug === "us10y" || slug === "vix") return v.toFixed(2);
  if (v >= 1000) return v.toLocaleString(undefined, { maximumFractionDigits: 2 });
  return `$${v.toFixed(2)}`;
}

function fmtChange(pct: number): string {
  const s = pct >= 0 ? "+" : "";
  return `${s}${pct.toFixed(2)}%`;
}

async function buildTicks(): Promise<LiveTick[]> {
  if (!isConfigured()) {
    return MARKETS.map((m) => ({ m, price: m.price, change: m.change, direction: m.direction }));
  }
  const results = await Promise.all(
    MARKETS.map(async (m) => {
      const sym = finnhubSymbolFor(m.slug, m.symbol);
      const q = await getQuote(sym);
      if (!q || !q.c) return { m, price: m.price, change: m.change, direction: m.direction };
      const direction: LiveTick["direction"] = q.dp > 0.02 ? "up" : q.dp < -0.02 ? "down" : "flat";
      return { m, price: fmtPrice(q.c, m.slug), change: fmtChange(q.dp ?? 0), direction };
    }),
  );
  return results;
}

function arrow(dir: LiveTick["direction"]): string {
  if (dir === "up") return "▲";
  if (dir === "down") return "▼";
  return "▬";
}

function colorClass(dir: LiveTick["direction"]): string {
  if (dir === "up") return "text-[#5DD89E]";
  if (dir === "down") return "text-[#F5727A]";
  return "text-[#AAB2C8]";
}

export async function StockTicker() {
  const ticks = await buildTicks();
  const loop = [...ticks, ...ticks];
  return (
    <div className="bg-navy-deep border-b border-white/10 overflow-hidden">
      <div className="te-ticker-track flex items-center py-1.5">
        {loop.map((t, i) => (
          <Link
            key={`${t.m.slug}-${i}`}
            href={`/markets/${t.m.slug}`}
            className="inline-flex items-baseline gap-1.5 mr-9 whitespace-nowrap hover:opacity-80"
          >
            <span className="font-mono text-[10.5px] tracking-[0.06em] font-bold text-cream/85">
              {t.m.symbol}
            </span>
            <span className="font-mono text-[10.5px] tracking-[-0.005em] font-semibold text-white">
              {t.price}
            </span>
            <span className={`font-mono text-[10px] tracking-[0.02em] font-bold ${colorClass(t.direction)}`}>
              {arrow(t.direction)} {t.change}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
