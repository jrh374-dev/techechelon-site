"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

interface SearchEntry {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  publishedAt: string;
}

function fmtDate(iso: string): string {
  const d = new Date(iso);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

function categoryLabel(c: string): string {
  switch (c) {
    case "ai":
      return "Artificial Intelligence";
    case "business":
      return "Business & Finance";
    case "politics":
      return "Politics";
    case "security":
      return "Cybersecurity";
    case "opinion":
      return "Opinion";
    default:
      return c;
  }
}

export function SearchClient({ posts }: { posts: SearchEntry[] }) {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<string>("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2 && cat === "all") return posts.slice(0, 50);
    const tokens = q.split(/\s+/).filter(Boolean);
    return posts.filter((p) => {
      if (cat !== "all" && p.category !== cat) return false;
      if (tokens.length === 0) return true;
      const hay = `${p.title} ${p.excerpt} ${p.author}`.toLowerCase();
      return tokens.every((t) => hay.includes(t));
    });
  }, [query, cat, posts]);

  return (
    <main className="max-w-[1320px] mx-auto px-7 py-12">
      <div className="text-center mb-10">
        <div className="font-mono text-[10.5px] tracking-[0.18em] uppercase font-bold text-coral mb-4">
          ━━ SEARCH
        </div>
        <h1 className="font-display text-[56px] font-extrabold tracking-[-0.035em] leading-[0.96] text-navy mb-3">
          Search the archive.
        </h1>
        <p className="font-serif text-[16.5px] leading-relaxed text-ink-soft italic max-w-[560px] mx-auto">
          {posts.length.toLocaleString()} articles across markets, AI, policy, and security.
        </p>
      </div>

      <div className="max-w-[820px] mx-auto mb-8">
        <input
          type="search"
          autoFocus
          placeholder="Search by headline, story, or author…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-5 py-4 text-[18px] font-display font-medium bg-white border border-rule focus:border-navy focus:outline-none placeholder:text-sand-light"
        />
        <div className="flex flex-wrap gap-2 mt-3">
          {[
            { value: "all", label: "All" },
            { value: "business", label: "Markets" },
            { value: "politics", label: "Politics" },
            { value: "ai", label: "AI" },
            { value: "security", label: "Security" },
            { value: "opinion", label: "Opinion" },
          ].map((c) => (
            <button
              key={c.value}
              type="button"
              onClick={() => setCat(c.value)}
              className={`px-3 py-1.5 font-mono text-[10.5px] tracking-[0.08em] uppercase font-bold border ${
                cat === c.value
                  ? "border-navy bg-navy text-white"
                  : "border-rule text-sand hover:text-navy hover:border-navy"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
        <div className="mt-4 font-mono text-[11px] tracking-[0.08em] uppercase font-semibold text-sand">
          {filtered.length} {filtered.length === 1 ? "result" : "results"}
          {query.trim() && ` for “${query.trim()}”`}
        </div>
      </div>

      <ol className="max-w-[820px] mx-auto space-y-6">
        {filtered.map((p, i) => (
          <li key={p.slug} className="grid grid-cols-[40px_1fr] gap-4 pb-6 border-b border-rule">
            <span className="font-mono text-[14px] font-bold text-coral leading-tight pt-px">
              {(i + 1).toString().padStart(2, "0")}
            </span>
            <div>
              <div className="font-mono text-[10px] tracking-[0.14em] uppercase font-bold text-navy mb-1.5">
                {categoryLabel(p.category)}
              </div>
              <Link href={`/post/${p.slug}`}>
                <h3 className="font-display text-[22px] font-extrabold tracking-[-0.022em] leading-[1.15] text-ink hover:text-navy mb-2">
                  {p.title}
                </h3>
              </Link>
              <p className="font-serif text-[14.5px] leading-snug text-ink-soft mb-3">
                {p.excerpt}
              </p>
              <p className="font-mono text-[10.5px] tracking-[0.06em] uppercase text-sand">
                <span className="text-navy font-bold not-italic normal-case font-sans text-[12px]">
                  {p.author}
                </span>
                <span> · {fmtDate(p.publishedAt)}</span>
              </p>
            </div>
          </li>
        ))}
        {filtered.length === 0 && (
          <li className="text-center py-12">
            <p className="font-serif italic text-sand-light">
              No matches. Try a different query or change the category filter.
            </p>
          </li>
        )}
      </ol>
    </main>
  );
}
