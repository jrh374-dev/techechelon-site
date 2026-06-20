import Link from "next/link";
import { Post } from "@/lib/posts";

interface GlanceItem {
  post: Post;
  leadIn?: string;
  followOn?: string;
}

export function WorldAtAGlance({
  items,
  title = "The Brief",
  subtitle = "Updated this morning",
}: {
  items: GlanceItem[];
  title?: string;
  subtitle?: string;
}) {
  return (
    <aside>
      <h2 className="font-display text-[28px] font-bold leading-none text-navy mb-3 tracking-[-0.02em]">
        {title}
      </h2>
      <div className="flex items-center gap-2 mb-6">
        <span className="w-2 h-2 rounded-full bg-coral" />
        <span className="text-[10.5px] tracking-[0.1em] uppercase font-bold text-sand">
          {subtitle}
        </span>
      </div>
      <ol className="space-y-5">
        {items.map((item, i) => (
          <li
            key={item.post.slug}
            className="grid grid-cols-[18px_1fr] gap-3 pb-5 border-b border-black/15 last:border-b-0 last:pb-0"
          >
            <span className="font-sans text-[15px] font-semibold text-ink leading-tight pt-px">
              {i + 1}
            </span>
            <p className="font-serif text-[14.5px] leading-[1.55] text-ink-soft">
              {item.leadIn ? <>{item.leadIn} </> : null}
              <Link
                href={`/post/${item.post.slug}`}
                className="font-semibold text-navy underline decoration-1 decoration-navy/40 underline-offset-2 hover:decoration-navy"
              >
                {item.post.title.replace(/\.$/, "")}
              </Link>
              {item.followOn ? <>{item.followOn.startsWith(",") || item.followOn.startsWith(".") ? "" : " "}{item.followOn}</> : null}
            </p>
          </li>
        ))}
      </ol>
    </aside>
  );
}
