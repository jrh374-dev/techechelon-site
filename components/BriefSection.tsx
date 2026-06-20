import Link from "next/link";
import { Post, categoryLabel } from "@/lib/posts";

interface BriefItem {
  post: Post;
  whyLabel?: string;
  whyText?: string;
}

export function BriefSection({ items }: { items: BriefItem[] }) {
  return (
    <section className="px-5 py-6">
      <div className="flex items-baseline gap-3 mb-4">
        <h3 className="font-display text-[18px] font-black tracking-tighter text-navy">
          The Brief.
        </h3>
        <span className="text-[11px] tracking-[0.1em] uppercase text-sand font-bold italic">
          Five stories before lunch
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2.5">
        {items.map((item, i) => (
          <BriefCard key={item.post.slug} n={i + 1} item={item} />
        ))}
      </div>
    </section>
  );
}

function BriefCard({ n, item }: { n: number; item: BriefItem }) {
  const { post, whyLabel = "Why it matters", whyText } = item;
  return (
    <Link
      href={`/post/${post.slug}`}
      className="block bg-white border-[1.5px] border-navy px-3.5 py-3.5"
    >
      <div className="grid grid-cols-[28px_1fr] gap-3 items-start">
        <div className="font-display font-black text-[22px] text-coral leading-none tracking-tightest">
          {n.toString().padStart(2, "0")}
        </div>
        <div>
          <div className="text-[9.5px] tracking-[0.14em] uppercase font-extrabold text-navy mb-1">
            {categoryLabel(post.category).split(" ")[0]}
          </div>
          <h4 className="font-display text-[13.5px] font-extrabold tracking-tighter leading-tight text-ink">
            {post.title}
          </h4>
          {whyText && (
            <p className="text-[11.5px] text-sand mt-1.5 leading-snug">
              <b className="text-navy font-bold">{whyLabel}:</b> {whyText}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
