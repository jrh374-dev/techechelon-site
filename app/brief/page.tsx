// The Brief archive index — every sent edition, newest first, linking to
// the /brief/[date] web version served from Resend's broadcast store.

import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Newsletter } from "@/components/Newsletter";

export const revalidate = 3600;

export const metadata = {
  title: "The Brief · Archive · TechEchelon",
  description:
    "Every edition of The TechEchelon Brief: five stories each weekday morning, before the opening bell.",
};

interface BroadcastListItem {
  id: string;
  name?: string;
  status?: string;
  created_at?: string;
}

interface Edition {
  date: string; // ISO YYYY-MM-DD
  teaser?: string;
}

function parseEdition(b: BroadcastListItem): Edition | null {
  if (b.status !== "sent" || typeof b.name !== "string") return null;
  const iso = b.name.match(/^Brief · (\d{4}-\d{2}-\d{2})(?: · (.+))?$/);
  if (iso) {
    const teaser = iso[2]
      ? iso[2].replace(/-/g, " ").replace(/\s+\S*$/, "").trim()
      : undefined;
    return { date: iso[1]!, teaser };
  }
  const long = b.name.match(/^Brief · [A-Za-z]+, (.+)$/);
  if (long) {
    const t = new Date(`${long[1]} 12:00:00 UTC`);
    if (!Number.isNaN(t.getTime())) {
      return { date: t.toISOString().slice(0, 10) };
    }
  }
  return null;
}

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "UTC",
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${iso}T12:00:00Z`));
}

async function fetchEditions(): Promise<Edition[]> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return [];
  try {
    const r = await fetch("https://api.resend.com/broadcasts", {
      headers: { Authorization: `Bearer ${apiKey}` },
      next: { revalidate: 3600 },
    });
    if (!r.ok) return [];
    const body = (await r.json()) as { data?: BroadcastListItem[] };
    const seen = new Set<string>();
    const editions: Edition[] = [];
    for (const b of body.data ?? []) {
      const e = parseEdition(b);
      if (e && !seen.has(e.date)) {
        seen.add(e.date);
        editions.push(e);
      }
    }
    return editions.sort((a, b) => b.date.localeCompare(a.date));
  } catch {
    return [];
  }
}

export default async function BriefArchivePage() {
  const editions = await fetchEditions();

  return (
    <div className="bg-cream min-h-screen">
      <SiteHeader />
      <div className="bg-navy px-6 py-10 text-center">
        <div className="font-mono text-[10.5px] tracking-[0.22em] uppercase font-bold text-coral-light mb-3">
          ━ NEWSLETTER ARCHIVE
        </div>
        <h1 className="font-display text-[32px] md:text-[38px] font-extrabold tracking-[-0.025em] text-white mb-2">
          The Brief
        </h1>
        <p className="font-serif italic text-[15px] text-[#AAB2C8] max-w-[520px] mx-auto leading-relaxed">
          Five stories every weekday morning, before the opening bell. Read
          past editions on the web, exactly as they were sent.
        </p>
      </div>

      <main className="max-w-[720px] mx-auto px-5 md:px-6 py-10">
        {editions.length === 0 ? (
          <p className="font-serif italic text-sand text-center">
            The archive is warming up. Check back shortly.
          </p>
        ) : (
          <ul className="divide-y divide-rule border-t border-b border-rule">
            {editions.map((e) => (
              <li key={e.date}>
                <Link
                  href={`/brief/${e.date}`}
                  className="flex items-baseline justify-between gap-4 py-4 group"
                >
                  <span className="font-display text-[16px] md:text-[17px] font-bold text-ink group-hover:text-coral">
                    {formatDate(e.date)}
                  </span>
                  {e.teaser && (
                    <span className="font-mono text-[10px] tracking-[0.06em] uppercase text-sand truncate hidden sm:inline">
                      {e.teaser}
                    </span>
                  )}
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.08em] font-bold text-navy group-hover:text-coral whitespace-nowrap">
                    Read →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>

      <Newsletter />
      <SiteFooter />
    </div>
  );
}
