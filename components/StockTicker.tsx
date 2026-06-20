import Link from "next/link";
import { MARKETS } from "@/lib/markets";

function arrow(dir: "up" | "down" | "flat"): string {
  if (dir === "up") return "▲";
  if (dir === "down") return "▼";
  return "▬";
}

function colorClass(dir: "up" | "down" | "flat"): string {
  if (dir === "up") return "text-[#5DD89E]";
  if (dir === "down") return "text-[#F5727A]";
  return "text-[#AAB2C8]";
}

export function StockTicker() {
  // Render twice so the CSS marquee loops seamlessly.
  const loop = [...MARKETS, ...MARKETS];
  return (
    <div className="bg-navy-deep border-b border-white/10 overflow-hidden">
      <div className="te-ticker-track flex items-center py-1.5">
        {loop.map((q, i) => (
          <Link
            key={`${q.slug}-${i}`}
            href={`/markets/${q.slug}`}
            className="inline-flex items-baseline gap-1.5 mr-9 whitespace-nowrap hover:opacity-80"
          >
            <span className="font-mono text-[10.5px] tracking-[0.06em] font-bold text-cream/85">
              {q.symbol}
            </span>
            <span className="font-mono text-[10.5px] tracking-[-0.005em] font-semibold text-white">
              {q.price}
            </span>
            <span className={`font-mono text-[10px] tracking-[0.02em] font-bold ${colorClass(q.direction)}`}>
              {arrow(q.direction)} {q.change}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
