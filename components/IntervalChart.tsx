"use client";

import { useState, useMemo } from "react";
import { MarketChart } from "./MarketChart";

interface Bar {
  t: number; // unix seconds
  c: number; // close price
}

type Interval = "1M" | "3M" | "6M" | "1Y" | "MAX";

const INTERVALS: { key: Interval; label: string; days: number }[] = [
  { key: "1M", label: "1M", days: 22 },
  { key: "3M", label: "3M", days: 65 },
  { key: "6M", label: "6M", days: 130 },
  { key: "1Y", label: "1Y", days: 260 },
  { key: "MAX", label: "MAX", days: 9999 },
];

function fmtDate(t: number): string {
  const d = new Date(t * 1000);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "2-digit",
  }).format(d);
}

function fmtPrice(v: number): string {
  if (v >= 10000) return `$${v.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
  if (v >= 100) return `$${v.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
  return `$${v.toFixed(2)}`;
}

export function IntervalChart({
  slug,
  bars,
}: {
  slug: string;
  bars: Bar[];
}) {
  // Default to 6M when the underlying series has enough data, otherwise the
  // largest interval that fits.
  const widest =
    INTERVALS.find((iv) => bars.length >= iv.days) ?? INTERVALS[0]!;
  const initial = bars.length >= 130 ? "6M" : widest.key;
  const [active, setActive] = useState<Interval>(initial as Interval);

  const sliced = useMemo(() => {
    const iv = INTERVALS.find((i) => i.key === active)!;
    if (iv.days >= bars.length) return bars;
    return bars.slice(bars.length - iv.days);
  }, [active, bars]);

  const values = sliced.map((b) => b.c);
  const first = sliced[0]?.c ?? 0;
  const last = sliced[sliced.length - 1]?.c ?? 0;
  const pct = first > 0 ? ((last - first) / first) * 100 : 0;
  const dir = pct > 0.05 ? "up" : pct < -0.05 ? "down" : "flat";

  return (
    <div>
      <div className="flex items-baseline justify-between flex-wrap gap-3 mb-4">
        <div className="flex items-center gap-1.5">
          {INTERVALS.map((iv) => {
            const disabled = iv.days < bars.length || iv.key === "MAX" ? false : iv.days > bars.length;
            const isActive = active === iv.key;
            return (
              <button
                key={iv.key}
                type="button"
                disabled={disabled}
                onClick={() => !disabled && setActive(iv.key)}
                className={`font-mono text-[10.5px] tracking-[0.06em] uppercase font-bold px-2.5 py-1.5 border ${
                  isActive
                    ? "bg-navy text-white border-navy"
                    : disabled
                    ? "text-sand-light border-rule-soft cursor-not-allowed"
                    : "text-ink border-rule hover:bg-cream-deep"
                }`}
              >
                {iv.label}
              </button>
            );
          })}
        </div>
        <div className="font-mono text-[10.5px] tracking-[0.06em] uppercase font-semibold text-sand">
          <span>{fmtDate(sliced[0]!.t)}</span>
          <span className="mx-2 text-sand-light">→</span>
          <span>{fmtDate(sliced[sliced.length - 1]!.t)}</span>
          <span className="mx-3 text-sand-light">·</span>
          <span
            className={
              dir === "up"
                ? "text-[#2A8C5A]"
                : dir === "down"
                ? "text-[#C9402A]"
                : ""
            }
          >
            {pct >= 0 ? "+" : ""}{pct.toFixed(2)}%
          </span>
        </div>
      </div>
      <MarketChart slug={slug} direction={dir} data={values} />
      <div className="mt-3 flex justify-between items-baseline font-mono text-[10px] tracking-[0.06em] uppercase text-sand font-semibold">
        <span>Range · low {fmtPrice(Math.min(...values))} / high {fmtPrice(Math.max(...values))}</span>
        <span>{sliced.length} closes</span>
      </div>
    </div>
  );
}
