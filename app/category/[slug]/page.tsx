import { notFound } from "next/navigation";
import Link from "next/link";
import { getDeskSponsor, type DeskSponsor } from "@/lib/sponsors";
import { CoverFallback } from "@/components/CoverFallback";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Newsletter } from "@/components/Newsletter";
import {
  Category,
  Post,
  categoryLabel,
  categoryShortLabel,
  getPostsByCategory,
} from "@/lib/posts";
import { coverAlt, imageKey, sizedImage } from "@/lib/images";
import {
  Chip,
  CoveredTopic,
  Developing,
  Week,
  apDate,
  apRange,
  chipForKey,
  deskChips,
  deskWeek,
  developingStory,
  entityNames,
  etYear,
  mostCovered,
  storyKicker,
  storyMatchesTopic,
} from "@/lib/sections";

const VALID: Category[] = ["business", "politics", "ai", "security", "opinion"];

const DESCRIPTIONS: Record<Category, string> = {
  ai: "Coverage of model development, deployment policy, infrastructure economics, and the regulatory fights that will decide who profits and who pays.",
  business: "Markets, earnings, deals, and the macro shifts that move them. Reported for readers who already know the basics.",
  politics: "Technology meets policy. The regulators, courts, and committees deciding what gets built and what gets blocked.",
  security: "Threats, breaches, defenders. Reported by people who can actually read the post-mortems.",
  opinion: "Argument and analysis from TechEchelon contributors and outside voices, plus the Executive Q&A interview series.",
};

const PAGE_SIZE = 18;

export function generateStaticParams() {
  return VALID.map((c) => ({ slug: c }));
}

// /category/<desk>[?topic=<chip>][&page=<n>] — page 1 carries no page param.
function deskHref(cat: Category, topic?: string, page = 1): string {
  const q = new URLSearchParams();
  if (topic) q.set("topic", topic);
  if (page > 1) q.set("page", String(page));
  const s = q.toString();
  return s ? `/category/${cat}?${s}` : `/category/${cat}`;
}

export default function CategoryPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { page?: string; topic?: string };
}) {
  const cat = params.slug as Category;
  if (!VALID.includes(cat)) notFound();
  const deskPosts = getPostsByCategory(cat);
  const names = entityNames(deskPosts);
  const chips = deskChips(cat, deskPosts);
  const topicParam = typeof searchParams.topic === "string" ? searchParams.topic : undefined;
  const activeChip = topicParam ? chips.find((c) => c.slug === topicParam) : undefined;
  if (topicParam && !activeChip) notFound();

  const allPosts = activeChip ? deskPosts.filter((p) => storyMatchesTopic(p, cat, activeChip)) : deskPosts;
  const deskSponsor = cat === "opinion" ? null : getDeskSponsor(cat);
  const page = Math.max(1, Number(searchParams.page ?? 1) || 1);
  const totalPages = Math.max(1, Math.ceil(allPosts.length / PAGE_SIZE));
  const offset = (page - 1) * PAGE_SIZE;
  const posts = allPosts.slice(offset, offset + PAGE_SIZE);

  // Page 1 opens with a lead and three secondary stories; later pages are
  // a plain chronological list.
  const isFirstPage = page === 1;
  const lead = isFirstPage ? posts[0] : undefined;
  const secondary = isFirstPage ? posts.slice(1, 4) : [];
  const rest = isFirstPage ? posts.slice(4) : posts;

  // Each photo appears once per page: a later story whose cover already ran
  // above renders text-only.
  const seen = new Set<string>();
  const photos = new Map<string, string>();
  for (const p of [...(lead ? [lead] : []), ...secondary, ...rest]) {
    if (!p.coverImage) continue;
    const key = imageKey(p.coverImage);
    if (seen.has(key)) continue;
    seen.add(key);
    photos.set(p.slug, p.coverImage);
  }

  const week = deskWeek(deskPosts);
  const developing = isFirstPage && !activeChip ? developingStory(cat, deskPosts, week, names) : null;
  const covered = mostCovered(cat, deskPosts, week, chips, names);
  const refYear = deskPosts[0] ? etYear(deskPosts[0].publishedAt) : undefined;
  const kicker = (p: Post) => storyKicker(p, cat, names);
  const short = categoryShortLabel(cat);

  return (
    <div className="bg-cream min-h-screen">
      <SiteHeader />
      <main className="max-w-[1320px] mx-auto px-5 md:px-7 pb-14 md:pb-16">
        <section aria-labelledby="desk-title" className="pt-7 md:pt-9 pb-5 md:pb-6 border-b border-rule">
          <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
            <div className="min-w-0 max-w-[760px]">
              <h1
                id="desk-title"
                className="font-display text-[40px] sm:text-[48px] md:text-[56px] leading-none font-extrabold tracking-[-0.035em] text-navy"
              >
                {categoryLabel(cat)}
              </h1>
              <p className="mt-3 max-w-[700px] font-serif italic text-[16px] md:text-[18px] leading-[1.5] text-ink-soft">
                {DESCRIPTIONS[cat]}
              </p>
              {cat === "opinion" && (
                <p className="mt-3 font-mono text-[10.5px] tracking-[0.08em] uppercase font-semibold">
                  <Link href="/submit" className="text-navy hover:text-coral">
                    Have an argument to make? Read our op-ed guidelines →
                  </Link>
                </p>
              )}
            </div>
            {deskSponsor && <SponsorBadge sponsor={deskSponsor} />}
          </div>
          {chips.length > 0 && (
            <nav aria-label={`${short} topics`} className="mt-4 md:mt-5">
              <ul className="flex flex-wrap gap-2 text-[13px] font-semibold">
                <li>
                  <TopicChip href={deskHref(cat)} label="All" active={!activeChip} />
                </li>
                {chips.map((c) => (
                  <li key={c.slug}>
                    <TopicChip href={deskHref(cat, c.slug)} label={c.label} active={activeChip?.slug === c.slug} />
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </section>

        {lead && (
          <section
            aria-label="Top stories"
            className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-8 lg:gap-10 py-7 md:py-8"
          >
            <LeadStory post={lead} photo={photos.get(lead.slug)} kicker={kicker(lead)} />
            {secondary.length > 0 && (
              <div className="flex flex-col min-w-0">
                {secondary.map((p) => (
                  <SecondaryStory
                    key={p.slug}
                    post={p}
                    photo={photos.get(p.slug)}
                    kicker={kicker(p)}
                    refYear={refYear}
                  />
                ))}
              </div>
            )}
          </section>
        )}

        {developing && (
          <DevelopingBand
            developing={developing}
            chip={developing.keys.map((k) => chipForKey(k, chips)).find(Boolean)}
            cat={cat}
            refYear={refYear}
          />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-10 pt-8 md:pt-9">
          <section
            aria-labelledby={rest.length > 0 ? "latest-title" : undefined}
            aria-label={rest.length > 0 ? undefined : "More stories"}
            className="min-w-0"
          >
            {rest.length > 0 && (
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 pb-2 border-b-2 border-navy">
                <h2
                  id="latest-title"
                  className="font-display text-[22px] md:text-[24px] font-extrabold tracking-[-0.02em] text-navy leading-tight"
                >
                  {activeChip ? `Latest in ${activeChip.label}` : "Latest"}
                </h2>
                {!isFirstPage && (
                  <span className="font-mono text-[11px] tracking-[0.06em] text-sand">
                    PAGE {page} OF {totalPages}
                  </span>
                )}
              </div>
            )}
            {rest.length === 0 && !isFirstPage ? (
              <p className="py-6 text-sand font-mono text-[12px] uppercase tracking-wider">
                No more stories on this page.
              </p>
            ) : (
              rest.map((p) => (
                <ListStory key={p.slug} post={p} photo={photos.get(p.slug)} kicker={kicker(p)} refYear={refYear} />
              ))
            )}
            <Pager
              cat={cat}
              topic={activeChip?.slug}
              page={page}
              totalPages={totalPages}
              moreLabel={`More ${activeChip?.label ?? short} stories`}
            />
          </section>

          <aside aria-label={`More from ${short}`} className="flex flex-col gap-7 min-w-0">
            {week && covered.length > 0 && (
              <MostCovered week={week} covered={covered} cat={cat} short={short} />
            )}
            <Newsletter variant="rail" />
          </aside>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

function SponsorBadge({ sponsor }: { sponsor: DeskSponsor }) {
  return (
    <div className="inline-flex items-center gap-3 border border-rule px-4 py-2.5">
      <span className="font-mono text-[10px] tracking-[0.14em] uppercase font-bold text-sand">Presented by</span>
      {sponsor.logo && (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img src={sponsor.logo} alt={sponsor.name} className="h-6 w-auto" />
      )}
      {sponsor.url ? (
        <a
          href={sponsor.url}
          rel="sponsored noopener"
          target="_blank"
          className="font-display text-[15px] font-extrabold text-navy hover:text-coral"
        >
          {sponsor.name}
        </a>
      ) : (
        <span className="font-display text-[15px] font-extrabold text-navy">{sponsor.name}</span>
      )}
    </div>
  );
}

function TopicChip({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`inline-block rounded-full px-3.5 py-[7px] leading-tight border ${
        active ? "bg-navy border-navy text-cream" : "border-sand-light text-ink hover:border-navy hover:text-navy"
      }`}
    >
      {label}
    </Link>
  );
}

function Kicker({ text, lead = false }: { text: string | null; lead?: boolean }) {
  if (!text) return null;
  return (
    <p
      className={`font-mono font-bold uppercase tracking-[0.11em] text-navy ${
        lead ? "text-[11px] mb-2" : "text-[10.5px] mb-1.5"
      }`}
    >
      {lead && (
        <span aria-hidden="true" className="text-coral">
          ■{" "}
        </span>
      )}
      {text}
    </p>
  );
}

// The headline is the story's one link; its ::after stretches over the
// whole card so the photo and dek are clickable too.
function StoryLink({ post }: { post: Post }) {
  return (
    <Link
      href={`/post/${post.slug}`}
      className="after:absolute after:inset-0 group-hover:text-navy group-hover:underline decoration-1 underline-offset-[3px]"
    >
      {post.title}
    </Link>
  );
}

function CoverImg({
  post,
  src,
  width,
  w,
  h,
  className,
  lazy = true,
}: {
  post: Post;
  src: string;
  width: number;
  w: number;
  h: number;
  className: string;
  lazy?: boolean;
}) {
  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={sizedImage(src, width)}
      alt={coverAlt(src, post.coverCaption)}
      width={w}
      height={h}
      loading={lazy ? "lazy" : undefined}
      decoding="async"
      className={`${className} bg-cream-deep ${post.coverFit === "contain" ? "object-contain" : "object-cover"}`}
    />
  );
}

function LeadStory({ post, photo, kicker }: { post: Post; photo?: string; kicker: string | null }) {
  return (
    <article className="group relative min-w-0">
      {photo ? (
        <CoverImg post={post} src={photo} width={1280} w={1280} h={720} lazy={false} className="block w-full aspect-video" />
      ) : (
        <div className="relative aspect-video">
          <CoverFallback label={categoryLabel(post.category)} />
        </div>
      )}
      <div className="mt-4">
        <Kicker text={kicker} lead />
        <h2 className="font-display text-[28px] sm:text-[32px] md:text-[38px] leading-[1.08] font-extrabold tracking-[-0.025em] text-ink">
          <StoryLink post={post} />
        </h2>
        <p className="mt-3 font-serif text-[17px] md:text-[19px] leading-[1.5] text-ink-soft">{post.excerpt}</p>
        <p className="mt-3 text-[13px] text-sand">
          <span className="font-semibold text-ink">{post.author}</span> ·{" "}
          <time dateTime={post.publishedAt}>{apDate(post.publishedAt, { withYear: true })}</time>
        </p>
      </div>
    </article>
  );
}

function SecondaryStory({
  post,
  photo,
  kicker,
  refYear,
}: {
  post: Post;
  photo?: string;
  kicker: string | null;
  refYear?: number;
}) {
  return (
    <article className="group relative flex gap-3.5 py-[18px] first:pt-0 last:pb-0 border-b border-rule last:border-b-0">
      <div className="flex-1 min-w-0">
        <Kicker text={kicker} />
        <h3 className="font-display text-[18px] md:text-[19px] leading-[1.2] font-bold tracking-[-0.01em] text-ink">
          <StoryLink post={post} />
        </h3>
        <p className="mt-1.5 text-[12px] text-sand">
          <time dateTime={post.publishedAt}>{apDate(post.publishedAt, { refYear })}</time>
        </p>
      </div>
      {photo && <CoverImg post={post} src={photo} width={330} w={96} h={96} className="shrink-0 w-24 h-24" />}
    </article>
  );
}

function ListStory({
  post,
  photo,
  kicker,
  refYear,
}: {
  post: Post;
  photo?: string;
  kicker: string | null;
  refYear?: number;
}) {
  return (
    <article className="group relative flex gap-4 sm:gap-5 py-5 border-b border-rule">
      <div className="flex-1 min-w-0">
        <Kicker text={kicker} />
        <h3 className="font-display text-[18px] sm:text-[22px] leading-[1.18] font-bold tracking-[-0.015em] text-ink">
          <StoryLink post={post} />
        </h3>
        {post.excerpt && (
          <p className="mt-2 font-serif text-[15px] sm:text-[16px] leading-[1.5] text-ink-soft line-clamp-2">
            {post.excerpt}
          </p>
        )}
        <p className="mt-2 text-[12px] text-sand">
          {post.author} · <time dateTime={post.publishedAt}>{apDate(post.publishedAt, { refYear })}</time>
        </p>
      </div>
      {photo && (
        <CoverImg
          post={post}
          src={photo}
          width={500}
          w={180}
          h={120}
          className="shrink-0 w-[104px] h-[70px] sm:w-[180px] sm:h-[120px]"
        />
      )}
    </article>
  );
}

function DevelopingBand({
  developing,
  chip,
  cat,
  refYear,
}: {
  developing: Developing;
  chip?: Chip;
  cat: Category;
  refYear?: number;
}) {
  const last = developing.posts.length - 1;
  return (
    <section aria-labelledby="developing-title" className="bg-navy text-cream px-5 py-5 md:px-6 md:py-6">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <h2
          id="developing-title"
          className="font-display text-[20px] md:text-[22px] font-extrabold tracking-[-0.02em] leading-tight"
        >
          <span aria-hidden="true" className="text-coral">
            ●
          </span>{" "}
          Developing: {developing.label}
        </h2>
        {chip && (
          <Link
            href={deskHref(cat, chip.slug)}
            className="font-mono text-[11px] font-bold tracking-[0.08em] uppercase text-coral-light hover:text-cream"
          >
            All {chip.label} stories →
          </Link>
        )}
      </div>
      <ol className="mt-4 grid gap-4 grid-cols-[repeat(auto-fit,minmax(160px,1fr))]">
        {developing.posts.map((p, i) => (
          <li key={p.slug} className={`border-t-2 pt-2.5 ${i === last ? "border-coral" : "border-cream/25"}`}>
            <p
              className={`font-mono text-[11px] tracking-[0.06em] uppercase ${
                i === last ? "font-bold text-coral-light" : "text-cream/75"
              }`}
            >
              <time dateTime={p.publishedAt}>{apDate(p.publishedAt, { refYear })}</time>
              {i === last && " · Latest"}
            </p>
            <p className="mt-1.5 text-[14px] leading-[1.35] font-semibold line-clamp-3">
              <Link href={`/post/${p.slug}`} className="text-cream hover:underline underline-offset-2">
                {p.title}
              </Link>
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function MostCovered({
  week,
  covered,
  cat,
  short,
}: {
  week: Week;
  covered: CoveredTopic[];
  cat: Category;
  short: string;
}) {
  return (
    <section aria-labelledby="covered-title">
      <h2
        id="covered-title"
        className="font-mono text-[11px] font-bold tracking-[0.14em] uppercase text-navy pb-2 border-b-2 border-navy"
      >
        Most covered this week
      </h2>
      <p className="mt-2 text-[12px] text-sand">
        Topics across {week.posts.length} {short} {week.posts.length === 1 ? "story" : "stories"},{" "}
        {apRange(week.start, week.end)}
      </p>
      <ul className="mt-2 text-[14px]">
        {covered.map((t) => (
          <li key={t.key} className="flex items-baseline justify-between gap-3 py-2.5 border-b border-rule">
            {t.chip ? (
              <Link href={deskHref(cat, t.chip.slug)} className="font-semibold text-ink hover:text-navy hover:underline">
                {t.label}
              </Link>
            ) : (
              <span className="font-semibold text-ink">{t.label}</span>
            )}
            <span className="font-mono text-[12px] text-sand whitespace-nowrap">{t.count} stories</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Pager({
  cat,
  topic,
  page,
  totalPages,
  moreLabel,
}: {
  cat: Category;
  topic?: string;
  page: number;
  totalPages: number;
  moreLabel: string;
}) {
  const newer = page > 1 ? deskHref(cat, topic, Math.min(page - 1, totalPages)) : null;
  const older = page < totalPages ? deskHref(cat, topic, page + 1) : null;
  return (
    <nav aria-label="Pages" className="flex flex-wrap items-center justify-between gap-3 pt-6">
      <div className="flex flex-wrap gap-3">
        {newer && (
          <Link
            href={newer}
            rel="prev"
            className="text-[14px] font-semibold px-5 py-3 border-[1.5px] border-rule text-ink hover:border-navy hover:text-navy"
          >
            ← Newer stories
          </Link>
        )}
        {older && (
          <Link
            href={older}
            rel="next"
            className="text-[14px] font-semibold px-5 py-3 border-[1.5px] border-navy text-navy hover:bg-navy hover:text-cream"
          >
            {moreLabel}
          </Link>
        )}
      </div>
      <span className="font-mono text-[12px] tracking-[0.06em] text-sand">
        PAGE {page} OF {totalPages}
      </span>
    </nav>
  );
}
