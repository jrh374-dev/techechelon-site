import { Post } from "@/lib/posts";

const BIOS: Record<string, string> = {
  "Sara Montes de Oca":
    "Sara covers technology, markets, and the policy decisions that shape both. Previously at Bloomberg and The Information. She founded TechEchelon in 2024.",
};

export function AuthorBio({ post }: { post: Post }) {
  const initials =
    post.authorInitials ?? post.author.split(" ").map((n) => n[0]).slice(0, 2).join("");
  const bio = BIOS[post.author] ?? `${post.author} covers technology and markets for TechEchelon.`;
  return (
    <div className="bg-cream border-t border-rule">
      <div className="max-w-[660px] mx-auto px-5 md:px-7 py-7 md:py-9 grid grid-cols-[56px_1fr] md:grid-cols-[72px_1fr] gap-4 md:gap-6 items-start">
        <div className="w-[56px] h-[56px] md:w-[72px] md:h-[72px] rounded-full bg-navy text-white font-extrabold text-[18px] md:text-[22px] flex items-center justify-center tracking-tight">
          {initials}
        </div>
        <div>
          <div className="font-mono text-[10.5px] tracking-[0.16em] uppercase font-bold text-coral mb-2">
            ━ ABOUT THE REPORTER
          </div>
          <div className="font-display text-[22px] font-extrabold tracking-[-0.022em] text-navy mb-2 leading-tight">
            {post.author}
          </div>
          <p className="font-serif text-[14.5px] leading-relaxed text-ink-soft mb-3">
            {bio}
          </p>
          <a
            href={`/author/${post.author.toLowerCase().replace(/\s+/g, "-")}`}
            className="font-mono text-[10.5px] font-bold tracking-[0.1em] uppercase text-navy hover:text-coral"
          >
            More from {post.author.split(" ")[0]} →
          </a>
        </div>
      </div>
    </div>
  );
}
