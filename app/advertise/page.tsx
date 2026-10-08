import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { getAllPosts, isOpinion, type Category } from "@/lib/posts";

export const metadata = {
  title: "Advertise with TechEchelon",
  description:
    "Partnership options for reaching TechEchelon's readers: sponsored articles, desk sponsorships, and presenting sponsorship of The Brief.",
};

const QA_RE = /^\s*executive\s+q\s*&\s*a/i;

const DESKS: Array<{ key: Category; label: string; color: string; covers: string }> = [
  { key: "business", label: "Markets and business", color: "bg-navy", covers: "earnings, deals, and the money behind the technology industry" },
  { key: "ai", label: "Artificial intelligence", color: "bg-coral", covers: "the models, the companies building and buying them, and the infrastructure underneath" },
  { key: "politics", label: "Politics and policy", color: "bg-sage", covers: "the regulators, courts, and legislators deciding what gets built" },
  { key: "security", label: "Cybersecurity", color: "bg-sand", covers: "threats, breaches, and the defenders" },
];

// Audience figures are computed from the archive at build time, so the page
// stays accurate as the archive grows. The search-exposure figure is a dated
// Google Search Console reading and is written as prose below.
function monthKeyET(iso: string): string | null {
  const t = Date.parse(iso);
  if (!Number.isFinite(t)) return null;
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
  }).format(new Date(t));
}

function facts() {
  const all = getAllPosts();
  const news = all.filter((p) => !isOpinion(p) && p.unlisted !== true);
  const counts: Record<string, number> = {};
  for (const d of DESKS) counts[d.key] = 0;
  for (const p of news) if (p.category in counts) counts[p.category] += 1;
  const newsTotal = DESKS.reduce((a, d) => a + counts[d.key]!, 0);

  // Average output over the last three complete months.
  const thisMonth = monthKeyET(new Date().toISOString());
  const perMonth = new Map<string, number>();
  for (const p of all) {
    const k = monthKeyET(p.publishedAt);
    if (k && thisMonth && k < thisMonth) perMonth.set(k, (perMonth.get(k) ?? 0) + 1);
  }
  const recent = [...perMonth.keys()].sort().slice(-3).map((k) => perMonth.get(k) ?? 0);
  const monthly = recent.length
    ? Math.round(recent.reduce((a, b) => a + b, 0) / recent.length / 10) * 10
    : 0;

  return {
    archive: Math.floor(all.length / 50) * 50,
    monthly,
    qa: all.filter((p) => QA_RE.test(p.title)).length,
    counts,
    newsTotal,
  };
}

const RATES = [
  {
    name: "Partner article",
    price: "$900",
    unit: "",
    term: "One sponsored article",
    lede: "Your argument, your product story, or your research, published on TechEchelon and labeled as sponsored.",
    items: [
      "700 to 1,200 words. Send your draft, or we write it from your brief.",
      "A permanent address on techechelon.com.",
      "One feature in The Brief and posts on X and LinkedIn.",
      "One round of edits and your approval before it runs.",
    ],
  },
  {
    name: "Desk sponsorship",
    price: "$1,500",
    unit: "per month",
    term: "One desk, one calendar month, one sponsor",
    lede: "Your name on the desk your customers already read. A desk sponsorship attaches your brand to a whole beat for a month, not to a single article.",
    items: [
      "“Presented by” with your logo and link at the top of the desk’s front page.",
      "The same line under the headline of every article the desk files that month, typically 20 to 50 pieces depending on the desk. Each stays in the archive with your name on it.",
      "Exclusive. No second sponsor on the same desk in the same month.",
      "One week as presenting sponsor of The Brief, timed to your month.",
      "The fit: infrastructure, cloud, and model companies on Artificial Intelligence; security vendors on Cybersecurity; fintech, exchanges, and funds on Markets; law firms and government-affairs practices on Policy.",
    ],
  },
  {
    name: "The Brief, presenting sponsor",
    price: "Included",
    unit: "with desk and founding packages",
    term: "One week, five editions",
    lede: "The top position in the morning newsletter.",
    items: [
      "A “Presented by” line and a message of up to 50 words with one link, above the day’s stories.",
      "Carried on the web edition of each issue.",
    ],
  },
  {
    name: "Founding partner",
    price: "$5,000",
    unit: "per quarter",
    term: "Three months, limited to one partner per desk",
    lede: "The full program, for the first company to stand behind each desk.",
    items: [
      "Desk sponsorship for three months.",
      "Three partner articles.",
      "Presenting sponsor of The Brief one week each month.",
      "Rates held for twelve months from the first booking.",
    ],
  },
];

const STEPS: Array<[string, string]> = [
  ["Tell us what you want to say.", "A few sentences on the message, the audience you want, and your dates."],
  ["We confirm the format, the dates, and the price", "in writing."],
  ["You send your copy or brief,", "plus a logo and any images, at least five business days before the run date."],
  ["You approve the final version", "before anything is published."],
  ["It runs", "on the agreed dates."],
];

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div className={`font-mono text-[10.5px] tracking-[0.16em] uppercase font-bold mb-3 ${light ? "text-coral-light" : "text-coral"}`}>
      {children}
    </div>
  );
}

export default function AdvertisePage() {
  const f = facts();
  const fmt = (n: number) => n.toLocaleString("en-US");

  return (
    <div className="bg-cream min-h-screen">
      <SiteHeader />

      <section className="bg-navy text-cream">
        <div className="max-w-[900px] mx-auto px-5 md:px-7 pt-10 md:pt-14 pb-9 md:pb-12 flex flex-wrap items-end justify-between gap-5">
          <div className="min-w-0 flex-[1_1_420px]">
            <Eyebrow light>Advertising and partnerships</Eyebrow>
            <h1 className="font-display text-[40px] md:text-[62px] font-black tracking-[-0.035em] leading-[0.98] mb-4 text-balance">
              Advertise with TechEchelon
            </h1>
            <p className="font-serif italic text-[17px] md:text-[18px] leading-relaxed text-cream/75 max-w-[34em] m-0">
              Independent reporting on technology, markets, and the policy decisions that shape both.
            </p>
          </div>
          <div className="font-mono text-[11px] tracking-[0.1em] uppercase text-cream/70 leading-[1.9] md:text-right">
            <div className="text-cream font-bold">2026 rates</div>
            <div>Founded 2023</div>
          </div>
        </div>
      </section>

      <main className="max-w-[900px] mx-auto px-5 md:px-7 pb-16">
        <section className="py-10 border-b border-rule">
          <Eyebrow>The publication</Eyebrow>
          <h2 className="font-display text-[28px] md:text-[34px] font-extrabold tracking-[-0.025em] leading-[1.08] text-navy mb-4 text-balance">
            Who reads TechEchelon
          </h2>
          <div className="max-w-[39em] font-serif text-[17px] leading-[1.65] text-ink-soft">
            <p className="mb-3.5">
              TechEchelon covers the forces shaping technology and capital markets: the funding rounds, the regulatory fights, the infrastructure decisions, and the people making them. It is written for readers who already know the basics, and the audience is senior: founders and operators, investors, and the policymakers whose decisions reach all three.
            </p>
            <p className="m-0">
              That is also who takes part. The {f.qa} guests in our <Link href="/category/opinion" className="underline underline-offset-[3px] decoration-1 hover:text-coral">Executive Q&amp;A series</Link> are founders, chief executives, and senior leaders, and our op-ed contributors come from the same world. The desks file every day, and The Brief goes out every weekday morning before the opening bell.
            </p>
          </div>
          <dl className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-x-8 border-t border-rule">
            {[
              ["Publishing since", "2023", "Independent from the first issue. Not owned by a fund or a portfolio company."],
              ["Archive", `${fmt(f.archive)}+`, "Articles published and indexed for search."],
              ["New reporting", `${fmt(f.monthly)} a month`, "Articles across four news desks, on average."],
              ["Executive Q&A series", `${f.qa}`, "Interviews with founders and executives."],
              ["The Brief", "6:30 AM ET", "Every weekday, with a public web archive of each edition."],
              ["Unique visitors", "Nearly 4,000", "Per month, September 2026. Source: Similarweb, with Google Analytics connected."],
            ].map(([dt, dd, note]) => (
              <div key={dt} className="py-4 border-b border-rule-soft min-w-0">
                <dt className="font-mono text-[10.5px] tracking-[0.12em] uppercase font-bold text-sand mb-1">{dt}</dt>
                <dd className="m-0 font-display text-[30px] font-extrabold tracking-[-0.025em] leading-[1.1] text-navy tabular-nums">
                  {dd}
                  <span className="block mt-1.5 font-serif font-normal text-[14.5px] leading-[1.45] tracking-normal text-ink-soft">{note}</span>
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="py-10 border-b border-rule">
          <Eyebrow>The desks</Eyebrow>
          <h2 className="font-display text-[28px] md:text-[34px] font-extrabold tracking-[-0.025em] leading-[1.08] text-navy mb-4 text-balance">
            What a desk is
          </h2>
          <div className="max-w-[39em] font-serif text-[17px] leading-[1.65] text-ink-soft">
            <p className="mb-3.5">
              TechEchelon is organized the way a newsroom is: four desks, each covering one beat with its own front page on the site, its own feed, and its own daily reporting.{" "}
              {DESKS.map((d, i) => (
                <span key={d.key}>
                  <strong className="text-ink font-semibold">{d.label.replace("Markets and business", "Markets").replace("Politics and policy", "Policy")}</strong> covers {d.covers}.{i < DESKS.length - 1 ? " " : ""}
                </span>
              ))}
            </p>
            <p className="m-0">Every story in The Brief carries its desk label, so a reader always knows which beat a piece came from. The share of the archive each desk has filed:</p>
          </div>
          <div className="mt-6">
            <div className="flex h-[26px] w-full" role="img" aria-label={DESKS.map((d) => `${d.label} ${Math.round((f.counts[d.key]! / f.newsTotal) * 100)} percent`).join(", ")}>
              {DESKS.map((d) => (
                <span key={d.key} className={`block h-full ${d.color}`} style={{ width: `${(f.counts[d.key]! / f.newsTotal) * 100}%` }} />
              ))}
            </div>
            <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 list-none p-0 m-0">
              {DESKS.map((d) => (
                <li key={d.key} className="flex items-center gap-2.5 min-w-0 font-serif text-[15.5px] text-ink-soft">
                  <i className={`block w-2.5 h-2.5 shrink-0 ${d.color}`} aria-hidden="true" />
                  <b className="font-display font-extrabold text-ink tabular-nums">{Math.round((f.counts[d.key]! / f.newsTotal) * 100)}%</b>
                  <Link href={`/category/${d.key}`} className="hover:text-coral">{d.label}</Link>
                </li>
              ))}
            </ul>
            <p className="mt-3.5 font-serif italic text-[14px] text-sand m-0">Counted from {fmt(f.newsTotal)} news articles in the archive.</p>
          </div>
        </section>

        <section className="py-10 border-b border-rule">
          <Eyebrow>Distribution</Eyebrow>
          <h2 className="font-display text-[28px] md:text-[34px] font-extrabold tracking-[-0.025em] leading-[1.08] text-navy mb-2 text-balance">
            Where a partner appears
          </h2>
          <ul className="mt-5 list-none p-0 m-0 border-t border-rule">
            {[
              ["techechelon.com", "Every article has a permanent address and stays in the archive."],
              ["The Brief", "The weekday morning newsletter, opened with a short editor’s read on the day’s most important story."],
              ["The Brief on the web", "Each edition is also published as a page, so a placement keeps working after the send."],
              ["X and LinkedIn", "Articles are posted to @Tech_Echelon and the TechEchelon company page."],
              ["RSS and search", "The feed and the archive carry every piece to readers who never visit the home page."],
            ].map(([name, text]) => (
              <li key={name} className="grid grid-cols-1 sm:grid-cols-[190px_minmax(0,1fr)] gap-x-6 gap-y-1 py-3.5 border-b border-rule-soft">
                <b className="font-display font-extrabold text-[16.5px] tracking-[-0.01em] text-ink">{name}</b>
                <span className="font-serif text-[16px] text-ink-soft">{text}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="py-10">
          <Eyebrow>Rate card</Eyebrow>
          <h2 className="font-display text-[28px] md:text-[34px] font-extrabold tracking-[-0.025em] leading-[1.08] text-navy mb-4 text-balance">
            Partnership options
          </h2>
          <p className="max-w-[39em] font-serif text-[17px] leading-[1.65] text-ink-soft m-0">
            TechEchelon is opening advertising for the first time. Partners who book in this first round keep these rates for twelve months.
          </p>
          <div className="mt-6 border-t-2 border-navy">
            {RATES.map((r) => (
              <div key={r.name} className="py-6 border-b border-rule">
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1.5">
                  <h3 className="font-display text-[22px] font-extrabold tracking-[-0.02em] leading-[1.15] text-ink m-0 min-w-0">{r.name}</h3>
                  <div className="font-display text-[22px] font-extrabold tracking-[-0.02em] text-navy tabular-nums whitespace-nowrap">
                    {r.price}
                    {r.unit && <span className="ml-1.5 font-mono text-[10.5px] font-medium tracking-[0.08em] uppercase text-sand">{r.unit}</span>}
                  </div>
                </div>
                <div className="font-mono text-[10.5px] tracking-[0.12em] uppercase font-bold text-coral mt-1.5 mb-2.5">{r.term}</div>
                <p className="max-w-[40em] font-serif text-[17px] leading-[1.65] text-ink-soft m-0 mb-2.5">{r.lede}</p>
                <ul className="max-w-[40em] pl-[1.15em] m-0 font-serif text-[16px] leading-[1.6] text-ink-soft list-disc marker:text-coral">
                  {r.items.map((it) => (
                    <li key={it} className="mb-1">{it}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-navy text-cream px-6 md:px-10 py-9">
          <Eyebrow light>Editorial independence</Eyebrow>
          <h2 className="font-display text-[28px] md:text-[34px] font-extrabold tracking-[-0.025em] leading-[1.08] text-cream mb-5 text-balance">
            What is not for sale
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-11 gap-y-6">
            <div className="min-w-0">
              <h3 className="font-mono text-[11px] tracking-[0.14em] uppercase font-bold text-coral-light m-0 mb-2.5">Never sold</h3>
              <ul className="pl-[1.1em] m-0 font-serif text-[16px] leading-[1.6] list-disc marker:text-coral">
                <li className="mb-1.5">News coverage. We do not accept payment in exchange for coverage, and sponsors do not see or shape reporting.</li>
                <li className="mb-1.5">The Executive Q&amp;A series. Guests are chosen by the editors.</li>
                <li>Op-eds. <Link href="/submit" className="underline underline-offset-[3px] decoration-1 hover:text-coral-light">Submissions</Link> are judged on the argument.</li>
              </ul>
            </div>
            <div className="min-w-0">
              <h3 className="font-mono text-[11px] tracking-[0.14em] uppercase font-bold text-coral-light m-0 mb-2.5">How sponsored content is handled</h3>
              <ul className="pl-[1.1em] m-0 font-serif text-[16px] leading-[1.6] list-disc marker:text-coral">
                <li className="mb-1.5">Labeled &ldquo;Sponsored&rdquo; on the article, in every listing, and in the newsletter.</li>
                <li className="mb-1.5">Links in sponsored content are marked as sponsored for search engines.</li>
                <li className="mb-1.5">Held to our <Link href="/ethics" className="underline underline-offset-[3px] decoration-1 hover:text-coral-light">accuracy standards</Link>. We check claims and may decline a piece.</li>
                <li>Kept out of the news desks and the news feed.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="py-10 border-b border-rule">
          <Eyebrow>Process</Eyebrow>
          <h2 className="font-display text-[28px] md:text-[34px] font-extrabold tracking-[-0.025em] leading-[1.08] text-navy mb-2 text-balance">
            How a booking works
          </h2>
          <ol className="mt-5 list-none p-0 m-0 border-t border-rule">
            {STEPS.map(([lead, rest], i) => (
              <li key={lead} className="grid grid-cols-[34px_minmax(0,1fr)] gap-x-3.5 py-3.5 border-b border-rule-soft font-serif text-[17px] leading-[1.6] text-ink-soft">
                <span className="font-display font-black text-[22px] leading-[1.2] text-coral tabular-nums" aria-hidden="true">{i + 1}</span>
                <span><b className="text-ink font-semibold">{lead}</b> {rest}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="py-10">
          <Eyebrow>Contact</Eyebrow>
          <h2 className="font-display text-[28px] md:text-[34px] font-extrabold tracking-[-0.025em] leading-[1.08] text-navy mb-4 text-balance">
            Start a conversation
          </h2>
          <p className="max-w-[39em] font-serif text-[17px] leading-[1.65] text-ink-soft m-0 mb-5">
            Write to us with the subject line &ldquo;Partnership&rdquo; and tell us which option you are considering.
          </p>
          <a
            href="mailto:press@techechelon.com?subject=Partnership"
            className="inline-block font-display text-[24px] md:text-[32px] font-extrabold tracking-[-0.02em] text-navy underline underline-offset-[6px] decoration-2 hover:text-coral break-words"
          >
            press@techechelon.com
          </a>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
