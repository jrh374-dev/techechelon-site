// Internal Social Desk — LinkedIn copy for recent articles, ready to
// paste. Gated by a shared key (?key=SOCIAL_DESK_KEY) so it never
// appears publicly; also noindexed and disallowed in robots.txt.

import { getAllPosts, categoryLabel, formatPostDate } from "@/lib/posts";
import { getSocialCopy } from "@/lib/social";
import { CopyButton } from "@/components/CopyButton";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Social Desk · TechEchelon",
  robots: { index: false, follow: false },
};

const DESK_SIZE = 8;

export default async function SocialDeskPage({
  searchParams,
}: {
  searchParams: { key?: string };
}) {
  const expected = process.env.SOCIAL_DESK_KEY ?? "";
  if (!expected || searchParams.key !== expected) {
    return (
      <div className="bg-cream min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <div className="font-mono text-[10.5px] tracking-[0.22em] uppercase font-bold text-coral mb-3">
            ━ TECHECHELON INTERNAL
          </div>
          <h1 className="font-display text-[28px] font-extrabold tracking-[-0.025em] text-navy">
            Social Desk requires an access key
          </h1>
          <p className="font-serif text-[15px] text-sand italic mt-3">
            Append ?key=&lt;your key&gt; to the URL.
          </p>
        </div>
      </div>
    );
  }

  const posts = getAllPosts().slice(0, DESK_SIZE);
  const copies = await Promise.all(posts.map((p) => getSocialCopy(p)));

  return (
    <div className="bg-cream min-h-screen pb-16">
      <header className="bg-navy px-6 py-8 text-center">
        <div className="font-mono text-[10.5px] tracking-[0.22em] uppercase font-bold text-[#F27A55] mb-2">
          ━ TECHECHELON INTERNAL
        </div>
        <h1 className="font-display text-[30px] font-extrabold tracking-[-0.025em] text-white">
          Social Desk · LinkedIn
        </h1>
        <p className="font-serif text-[14.5px] italic text-[#AAB2C8] mt-2 max-w-[560px] mx-auto">
          Paste-ready copy for the TechEchelon company page, plus a suggested
          repost comment for Sara. Refresh any time; copy regenerates for new
          articles automatically.
        </p>
      </header>

      <main className="max-w-[860px] mx-auto px-5 md:px-6 mt-8 flex flex-col gap-8">
        {posts.map((post, i) => {
          const copy = copies[i]!;
          const url = `https://www.techechelon.com/post/${post.slug}`;
          return (
            <section
              key={post.slug}
              className="bg-white border border-rule"
            >
              <div className="px-5 md:px-6 py-4 border-b border-rule flex items-baseline justify-between gap-4 flex-wrap">
                <div className="min-w-0">
                  <div className="font-mono text-[9.5px] tracking-[0.14em] uppercase font-bold text-coral mb-1">
                    {categoryLabel(post.category)} ·{" "}
                    {formatPostDate(post.publishedAt)}
                  </div>
                  <h2 className="font-display text-[17px] font-extrabold tracking-[-0.015em] leading-tight text-ink">
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-navy"
                    >
                      {post.title}
                    </a>
                  </h2>
                </div>
                {!copy.generated && (
                  <span className="font-mono text-[9px] tracking-[0.1em] uppercase font-bold text-[#C9402A] whitespace-nowrap">
                    fallback copy
                  </span>
                )}
              </div>

              <div className="px-5 md:px-6 py-4 border-b border-rule-soft">
                <div className="flex items-center justify-between gap-3 mb-2.5">
                  <div className="font-mono text-[10px] tracking-[0.14em] uppercase font-bold text-navy">
                    ① Company page post
                  </div>
                  <CopyButton text={copy.companyPost} label="Copy post" />
                </div>
                <pre className="font-sans text-[14px] leading-relaxed text-ink-soft whitespace-pre-wrap bg-cream px-4 py-3 border border-rule-soft m-0">
                  {copy.companyPost}
                </pre>
              </div>

              <div className="px-5 md:px-6 py-4">
                <div className="flex items-center justify-between gap-3 mb-2.5">
                  <div className="font-mono text-[10px] tracking-[0.14em] uppercase font-bold text-navy">
                    ② Sara&apos;s repost comment
                  </div>
                  <CopyButton text={copy.saraRepost} label="Copy comment" />
                </div>
                <pre className="font-sans text-[14px] leading-relaxed text-ink-soft whitespace-pre-wrap bg-cream px-4 py-3 border border-rule-soft m-0">
                  {copy.saraRepost}
                </pre>
              </div>
            </section>
          );
        })}
      </main>

      <footer className="max-w-[860px] mx-auto px-6 mt-10">
        <p className="font-mono text-[10px] tracking-[0.06em] uppercase text-sand text-center leading-relaxed">
          Workflow: copy ① → post on the TechEchelon company page → copy ② →
          Sara reposts the company post with the comment. One or two posts per
          day keeps LinkedIn&apos;s feed algorithm happy.
        </p>
      </footer>
    </div>
  );
}
