interface Quote {
  symbol: string;
  label?: string;
  value: string;
  change: string;
  direction: "up" | "down" | "flat";
}

// Quotes are static placeholders for now. Wiring to a live data API
// (Polygon, IEX, Finnhub) is a small follow-up — the visual shell is
// stable, only the data shape needs to be swapped.
const QUOTES: Quote[] = [
  { symbol: "S&P 500", value: "5,847.12", change: "+0.41%", direction: "up" },
  { symbol: "NASDAQ", value: "19,236.40", change: "+0.62%", direction: "up" },
  { symbol: "DOW", value: "42,118.04", change: "+0.18%", direction: "up" },
  { symbol: "R2K", label: "Russell 2000", value: "2,304.55", change: "-0.27%", direction: "down" },
  { symbol: "VIX", value: "13.42", change: "-1.84%", direction: "down" },
  { symbol: "US10Y", label: "10Y Yield", value: "4.31%", change: "+0.03", direction: "up" },
  { symbol: "DXY", label: "Dollar Index", value: "104.27", change: "-0.12%", direction: "down" },
  { symbol: "GOLD", value: "$2,684.30", change: "+0.85%", direction: "up" },
  { symbol: "WTI", label: "Crude", value: "$72.18", change: "-1.22%", direction: "down" },
  { symbol: "BTC", value: "$87,420", change: "+1.24%", direction: "up" },
  { symbol: "ETH", value: "$3,287", change: "+2.04%", direction: "up" },
  { symbol: "NVDA", value: "$134.82", change: "+1.41%", direction: "up" },
  { symbol: "AAPL", value: "$237.18", change: "-0.34%", direction: "down" },
  { symbol: "MSFT", value: "$448.20", change: "+0.62%", direction: "up" },
  { symbol: "GOOGL", value: "$181.04", change: "+0.94%", direction: "up" },
  { symbol: "TSLA", value: "$418.32", change: "-2.15%", direction: "down" },
];

function arrow(dir: Quote["direction"]): string {
  if (dir === "up") return "▲";
  if (dir === "down") return "▼";
  return "▬";
}

function colorClass(dir: Quote["direction"]): string {
  if (dir === "up") return "text-[#5DD89E]";
  if (dir === "down") return "text-[#F5727A]";
  return "text-[#AAB2C8]";
}

function Tick({ q }: { q: Quote }) {
  return (
    <span className="inline-flex items-baseline gap-1.5 mr-9 whitespace-nowrap">
      <span className="font-mono text-[10.5px] tracking-[0.06em] font-bold text-cream/85">
        {q.symbol}
      </span>
      <span className="font-mono text-[10.5px] tracking-[-0.005em] font-semibold text-white">
        {q.value}
      </span>
      <span className={`font-mono text-[10px] tracking-[0.02em] font-bold ${colorClass(q.direction)}`}>
        {arrow(q.direction)} {q.change}
      </span>
    </span>
  );
}

export function StockTicker() {
  // Render the list twice so the CSS marquee loops seamlessly.
  const loop = [...QUOTES, ...QUOTES];
  return (
    <div className="bg-navy-deep border-b border-white/10 overflow-hidden">
      <div className="te-ticker-track flex items-center py-1.5">
        {loop.map((q, i) => (
          <Tick key={`${q.symbol}-${i}`} q={q} />
        ))}
      </div>
    </div>
  );
}
