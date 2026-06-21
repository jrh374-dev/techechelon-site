import { Post } from "@/lib/posts";

const BIOS: Record<string, string> = {
  "Sara Montes de Oca":
    "Sara Montes de Oca is the Editor in Chief of TechEchelon. Previously a correspondent and producer in Washington, D.C., covering business, finance, and politics.",
  "Jay Goldberg":
    "Jay Goldberg is a staff writer at TechEchelon covering technology, markets, and policy. He files the breaking news and deal coverage that move the publication's core desks.",
  "TechEchelon Staff":
    "TechEchelon Staff bylines are produced collectively by the newsroom for short, breaking, and wire-style coverage. Longer-form reporting is published under the responsible reporter's name.",
  "Guest Contributor":
    "This piece was written by an outside contributor. Guest contributors are not employees or staff of TechEchelon, and their views do not necessarily reflect those of the publication. The contributor's full bio appears in italics at the foot of the article.",
};

function eyebrowFor(author: string): string {
  if (author === "Guest Contributor") return "━ ABOUT THE CONTRIBUTOR";
  if (author === "TechEchelon Staff") return "━ ABOUT THE BYLINE";
  return "━ ABOUT THE REPORTER";
}

function moreFromLabel(author: string): string {
  if (author === "TechEchelon Staff") return "the Staff";
  if (author === "Guest Contributor") return "guest contributors";
  return author.split(" ")[0]!;
}

export function AuthorBio({ post }: { post: Post }) {
  const initials =
    post.authorInitials ?? post.author.split(" ").map((n) => n[0]).slice(0, 2).join("");
  const bio =
    BIOS[post.author] ??
    `Reporting at TechEchelon by ${post.author}.`;
  return (
    <div className="bg-cream border-t border-rule">
      <div className="max-w-[660px] mx-auto px-5 md:px-7 py-7 md:py-9 grid grid-cols-[56px_1fr] md:grid-cols-[72px_1fr] gap-4 md:gap-6 items-start">
        <div className="w-[56px] h-[56px] md:w-[72px] md:h-[72px] rounded-full bg-navy text-white font-extrabold text-[18px] md:text-[22px] flex items-center justify-center tracking-tight">
          {initials}
        </div>
        <div>
          <div className="font-mono text-[10.5px] tracking-[0.16em] uppercase font-bold text-coral mb-2">
            {eyebrowFor(post.author)}
          </div>
          <div className="font-display text-[22px] font-extrabold tracking-[-0.022em] text-navy mb-2 leading-tight">
            {post.author}
          </div>
          <p className="font-serif text-[14.5px] leading-relaxed text-ink-soft mb-3">
            {bio}
          </p>
          <a
            href={`/author/${post.author.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")}`}
            className="font-mono text-[10.5px] font-bold tracking-[0.1em] uppercase text-navy hover:text-coral"
          >
            More from {moreFromLabel(post.author)} →
          </a>
        </div>
      </div>
    </div>
  );
}
