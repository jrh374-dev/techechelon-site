import { notFound } from "next/navigation";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Newsletter } from "@/components/Newsletter";
import {
  getAllPosts,
  getPostsByAuthor,
  relativeTime,
  categoryLabel,
} from "@/lib/posts";

const PAGE_SIZE = 18;

export function generateStaticParams() {
  const authors = new Set(getAllPosts().map((p) => p.author));
  return [...authors].map((name) => ({
    slug: name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
  }));
}

const AUTHOR_NAMES: Record<string, string> = {
  "sara-montes-de-oca": "Sara Montes de Oca",
  "jay-goldberg": "Jay Goldberg",
  "techechelon-staff": "TechEchelon Staff",
  "guest-contributor": "Guest Contributor",
};

const AUTHOR_BIOS: Record<string, string> = {
  "sara-montes-de-oca":
    "Editor in Chief of TechEchelon and an accomplished journalist and correspondent known for her work focusing on business, finance, and politics. Previously, Sara worked as a correspondent and producer in Washington, D.C., contributing to fast-paced political and news programming, with experience in editing, scriptwriting, and live broadcast production.",
  "jay-goldberg":
    "Staff writer at TechEchelon covering technology, markets, and policy. Jay reports on the deals, regulations, and breaking news that move the publication's core desks.",
  "techechelon-staff":
    "Reporting filed under TechEchelon Staff is produced collectively by the newsroom for short, breaking, or wire-style coverage. Bylined longer-form work is published under the responsible reporter's name.",
  "guest-contributor":
    "Opinion pieces published in TechEchelon are written by outside contributors. Guest contributors are not employees or staff of TechEchelon, and the views expressed are their own and do not necessarily reflect those of the publication. Each contributor's full bio appears in italics at the foot of their article.",
};

function authorSlugFor(name: string): string {
  return name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

export default function AuthorPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { page?: string };
}) {
  const posts = getPostsByAuthor(params.slug);
  if (posts.length === 0) notFound();
  const displayName = AUTHOR_NAMES[params.slug] ?? posts[0]!.author;
  const initials = displayName
    .split(/\s+/)
    .filter(Boolean)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .slice(0, 2)
    .join("");

  const page = Math.max(1, Number(searchParams.page ?? 1) || 1);
  const totalPages = Math.max(1, Math.ceil(posts.length / PAGE_SIZE));
  const offset = (page - 1) * PAGE_SIZE;
  const visible = posts.slice(offset, offset + PAGE_SIZE);

  return (
    <div className="bg-cream min-h-screen">
      <SiteHeader />
      <section className="border-b border-rule">
        <div className="max-w-[860px] mx-auto px-5 md:px-7 pt-9 md:pt-12 pb-7 md:pb-9 text-center">
          <div className="w-16 h-16 md:w-20 md:h-20 mx-auto rounded-full bg-coral text-white font-extrabold text-[22px] md:text-[26px] flex items-center justify-center tracking-tight mb-4 md:mb-5">
            {initials}
          </div>
          <div className="font-mono text-[10px] md:text-[10.5px] tracking-[0.18em] uppercase font-bold text-coral mb-3">
            ━━ {params.slug === "guest-contributor" ? "CONTRIBUTORS" : "STAFF"}
          </div>
          <h1 className="font-display text-[40px] md:text-[52px] font-extrabold tracking-[-0.03em] md:tracking-[-0.035em] leading-[0.98] md:leading-[0.96] text-navy mb-4">
            {displayName}
          </h1>
          <p className="font-serif text-[15px] md:text-[17px] leading-relaxed text-ink-soft italic max-w-[560px] mx-auto">
            {AUTHOR_BIOS[params.slug] ?? "Contributor at TechEchelon."}
          </p>
          <div className="mt-5 md:mt-6 font-mono text-[10.5px] tracking-[0.08em] uppercase font-semibold text-sand">
            {posts.length.toLocaleString()} STORIES · PAGE {page} OF {totalPages}
          </div>
        </div>
      </section>

      <section className="bg-cream">
        <div className="max-w-[1320px] mx-auto px-5 md:px-7 py-8 md:py-10">
          <ol className="max-w-[820px] mx-auto space-y-6">
            {visible.map((p, i) => (
              <li
                key={p.slug}
                className="grid grid-cols-[40px_1fr] gap-4 pb-6 border-b border-rule"
              >
                <span className="font-mono text-[14px] font-bold text-coral leading-tight pt-px">
                  {(offset + i + 1).toString().padStart(2, "0")}
                </span>
                <div>
                  <div className="font-mono text-[10px] tracking-[0.14em] uppercase font-bold text-navy mb-1.5">
                    {categoryLabel(p.category)}
                  </div>
                  <Link href={`/post/${p.slug}`}>
                    <h3 className="font-display text-[19px] md:text-[22px] font-extrabold tracking-[-0.022em] leading-[1.15] text-ink hover:text-navy mb-2">
                      {p.title}
                    </h3>
                  </Link>
                  <p className="font-serif text-[13.5px] md:text-[14.5px] leading-snug text-ink-soft mb-3">
                    {p.excerpt}
                  </p>
                  <p className="font-mono text-[10.5px] tracking-[0.06em] uppercase text-sand">
                    {relativeTime(p.publishedAt).toUpperCase()}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          {totalPages > 1 && (
            <Pagination
              basePath={`/author/${params.slug}`}
              page={page}
              totalPages={totalPages}
            />
          )}
        </div>
      </section>

      <Newsletter />
      <SiteFooter />
    </div>
  );
}

function Pagination({
  basePath,
  page,
  totalPages,
}: {
  basePath: string;
  page: number;
  totalPages: number;
}) {
  const prev = page > 1 ? page - 1 : null;
  const next = page < totalPages ? page + 1 : null;
  const pages = new Set<number>([1, totalPages]);
  for (let p = Math.max(1, page - 2); p <= Math.min(totalPages, page + 2); p++) pages.add(p);
  const sorted = [...pages].sort((a, b) => a - b);
  return (
    <nav className="mt-10 md:mt-12 flex items-center justify-center gap-1.5 md:gap-2.5 flex-wrap font-mono text-[11px] md:text-[12px] tracking-[0.04em] uppercase">
      <PageLink
        href={prev ? `${basePath}${prev === 1 ? "" : `?page=${prev}`}` : null}
        label="← Prev"
      />
      {sorted.map((p, idx) => {
        const gap = idx > 0 && p - sorted[idx - 1]! > 1;
        return (
          <span key={p} className="flex items-center gap-1.5 md:gap-2.5">
            {gap && <span className="text-sand-light">…</span>}
            <PageLink
              href={p === page ? null : `${basePath}${p === 1 ? "" : `?page=${p}`}`}
              label={p.toString().padStart(2, "0")}
              active={p === page}
            />
          </span>
        );
      })}
      <PageLink
        href={next ? `${basePath}?page=${next}` : null}
        label="Next →"
      />
    </nav>
  );
}

function PageLink({
  href,
  label,
  active = false,
}: {
  href: string | null;
  label: string;
  active?: boolean;
}) {
  const cls = active
    ? "bg-navy text-white px-3 py-1.5 font-bold"
    : href
    ? "px-3 py-1.5 text-ink hover:bg-cream-deep border border-rule font-bold"
    : "px-3 py-1.5 text-sand-light cursor-not-allowed font-medium";
  if (!href) return <span className={cls}>{label}</span>;
  return (
    <Link href={href} className={cls}>
      {label}
    </Link>
  );
}
