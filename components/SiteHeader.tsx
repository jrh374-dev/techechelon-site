import Link from "next/link";
import { TechEchelonMark } from "./TechEchelonMark";

const NAV = [
  { label: "Today", href: "/" },
  { label: "Markets", href: "/category/business" },
  { label: "Policy", href: "/category/politics" },
  { label: "AI", href: "/category/ai" },
  { label: "Security", href: "/category/security" },
  { label: "Opinion", href: "/category/opinion" },
];

function editionInfo() {
  const d = new Date();
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const startOfYear = new Date(d.getFullYear(), 0, 1);
  const dayOfYear = Math.floor((d.getTime() - startOfYear.getTime()) / 86400000) + 1;
  const hour = d.getHours();
  const ampm = hour >= 12 ? "PM" : "AM";
  const h12 = hour % 12 || 12;
  const min = d.getMinutes().toString().padStart(2, "0");
  return {
    edition: `№${dayOfYear.toString().padStart(3, "0")}`,
    time: `${h12.toString().padStart(2, "0")}:${min} ${ampm} ET`,
    date: `${days[d.getDay()]} · ${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`,
  };
}

export function SiteHeader() {
  const { edition, time, date } = editionInfo();
  return (
    <header className="bg-cream">
      <div className="bg-navy text-cream/85">
        <div className="max-w-[1320px] mx-auto px-7 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-5 font-mono text-[10.5px] tracking-[0.04em]">
            <span className="font-bold text-white">{edition}</span>
            <span className="text-cream/55">|</span>
            <span>{date}</span>
            <span className="text-cream/55">|</span>
            <span>{time}</span>
          </div>
          <div className="flex items-center gap-5 font-sans text-[10.5px] tracking-[0.12em] uppercase font-semibold">
            <Link href="/search" className="hover:text-coral-light inline-flex items-center gap-1.5">
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3">
                <circle cx="8.5" cy="8.5" r="5.5" />
                <path d="M16 16l-3.5-3.5" strokeLinecap="round" />
              </svg>
              <span>Search</span>
            </Link>
            <span className="text-cream/40">·</span>
            <Link href="/subscribe" className="hover:text-coral-light">Subscribe</Link>
            <span className="text-cream/40">·</span>
            <Link href="/account" className="hover:text-coral-light">Sign in</Link>
          </div>
        </div>
      </div>

      <div className="max-w-[1320px] mx-auto px-7 pt-9 pb-6">
        <div className="flex flex-col items-center gap-2.5">
          <div className="text-[10.5px] tracking-[0.22em] uppercase font-semibold text-sand">
            Independent reporting on technology, markets &amp; policy
          </div>
          <Link href="/" className="flex items-center gap-4 text-navy">
            <TechEchelonMark size={52} />
            <div className="font-display text-[60px] font-extrabold tracking-[-0.03em] leading-none text-navy">
              TechEchelon
            </div>
          </Link>
        </div>
      </div>

      <div className="border-t border-b border-rule">
        <div className="max-w-[1320px] mx-auto px-7 flex items-center justify-between">
          <div className="flex items-center gap-7">
            {NAV.map((n, i) => (
              <Link
                key={n.href}
                href={n.href}
                className={`font-display text-[13.5px] font-semibold tracking-[-0.005em] py-3.5 ${
                  i === 0 ? "text-coral" : "text-ink hover:text-coral"
                }`}
              >
                {n.label}
              </Link>
            ))}
          </div>
          <Link
            href="/subscribe"
            className="font-mono text-[10.5px] tracking-[0.08em] uppercase font-bold text-navy hover:text-coral"
          >
            The Brief Newsletter →
          </Link>
        </div>
      </div>

      <div className="bg-cream-deep border-b border-rule">
        <div className="max-w-[1320px] mx-auto px-7 py-2 flex items-center gap-3">
          <span className="font-mono text-[10px] tracking-[0.08em] uppercase font-bold text-coral">
            ● Latest
          </span>
          <span className="font-mono text-[10px] text-sand tracking-[0.04em]">{time}</span>
          <span className="text-sand-light">|</span>
          <span className="font-display text-[13px] font-semibold text-ink truncate">
            OpenAI&apos;s $110B round just rewrote the rules of the power market →
          </span>
        </div>
      </div>
    </header>
  );
}
