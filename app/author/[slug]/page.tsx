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

export function generateStaticParams() {
  const authors = new Set(getAllPosts().map((p) => p.author));
  return [...authors].map((name) => ({
    slug: name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
  }));
}

const AUTHOR_NAMES: Record<string, string> = {
  "sara-montes-de-oca": "Sara Montes de Oca",
  "guest-contributor": "Guest Contributor",
};

const AUTHOR_BIOS: Record<string, string> = {
  "sara-montes-de-oca":
    "Editor in Chief of TechEchelon and an accomplished journalist and correspondent known for her work focusing on business, finance, and politics. Previously, Sara worked as a correspondent and producer in Washington, D.C., contributing to fast-paced political and news programming, with experience in editing, scriptwriting, and live broadcast production.",
  "guest-contributor":
    "Opinion pieces in TechEchelon are written by outside contributors. Each contributor's full bio appears at the foot of their article.",
};

export default function AuthorPage({ params }: { params: { slug: string } }) {
  const posts = getPostsByAuthor(params.slug);
  if (posts.length === 0) notFound();
  const displayName = AUTHOR_NAMES[params.slug] ?? posts[0]!.author;
  const initials = displayName
    .split(/\s+/)
    .filter(Boolean)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .slice(0, 2)
    .join("");

  return (
    <div className="bg-cream min-h-screen">
      <SiteHeader />
      <section className="border-b border-rule">
        <div className="max-w-[860px] mx-auto px-7 pt-12 pb-9 text-center">
          <div className="w-20 h-20 mx-auto rounded-full bg-coral text-white font-extrabold text-[26px] flex items-center justify-center tracking-tight mb-5">
            {initials}
          </div>
          <div className="font-mono text-[10.5px] tracking-[0.18em] uppercase font-bold text-coral mb-3">
            ━━ STAFF
          </div>
          <h1 className="font-display text-[52px] font-extrabold tracking-[-0.035em] leading-[0.96] text-navy mb-4">
            {displayName}
          </h1>
          <p className="font-serif text-[17px] leading-relaxed text-ink-soft italic max-w-[560px] mx-auto">
            {AUTHOR_BIOS[params.slug] ?? "Contributor at TechEchelon."}
          </p>
        </div>
      </section>

      <section className="bg-cream">
        <div className="max-w-[1320px] mx-auto px-7 py-10">
          <div className="flex items-baseline gap-4 mb-7 pb-3 border-b border-rule">
            <h2 className="font-display text-[24px] font-extrabold tracking-[-0.025em] text-navy leading-none">
              Stories by {displayName.split(" ")[0]}
            </h2>
            <span className="font-mono text-[10.5px] tracking-[0.08em] uppercase font-semibold text-sand">
              {posts.length.toLocaleString()} ARTICLES
            </span>
          </div>
          <ol className="max-w-[820px] mx-auto space-y-6">
            {posts.slice(0, 100).map((p, i) => (
              <li
                key={p.slug}
                className="grid grid-cols-[40px_1fr] gap-4 pb-6 border-b border-rule"
              >
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
                    {relativeTime(p.publishedAt).toUpperCase()}
                  </p>
                </div>
              </li>
            ))}
          </ol>
          {posts.length > 100 && (
            <p className="text-center mt-8 font-mono text-[11px] tracking-[0.08em] uppercase text-sand">
              Showing first 100 of {posts.length} stories.
            </p>
          )}
        </div>
      </section>

      <Newsletter />
      <SiteFooter />
    </div>
  );
}
