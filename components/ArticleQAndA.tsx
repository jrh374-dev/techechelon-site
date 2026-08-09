// Interview-format Q&A section rendered from a post's `qa` frontmatter.
// Kept structurally distinct from the ArticleBody so the interview reads
// as a discrete section — navy divider band, section eyebrow, coral Q
// chips, and speaker labels — instead of blending into the prose. Same
// data feeds FaqStructuredData for the invisible schema layer.

import { Post } from "@/lib/posts";

interface Props {
  post: Post;
  authorName?: string;
  intervieweeName?: string;
  intervieweeTitle?: string;
  eyebrow?: string;
  heading?: string;
  intro?: string;
}

export function ArticleQAndA({
  post,
  authorName,
  intervieweeName,
  intervieweeTitle,
  eyebrow = "━ THE CONVERSATION",
  heading,
  intro,
}: Props) {
  const qa = post.qa ?? [];
  if (qa.length === 0) return null;
  const asker = authorName ?? post.author;
  const answerer = intervieweeName ?? post.primaryEntity ?? "";
  const answererTitle = intervieweeTitle ?? "";
  const sectionHeading =
    heading ??
    (answerer ? `A conversation with ${answerer}` : "The conversation");
  const introText =
    intro ??
    `${asker} put ${qa.length === 5 ? "five" : String(qa.length)} questions to ${answerer || "the interviewee"} on the reporting behind this piece. This transcript has been lightly edited for length and clarity.`;

  return (
    <>
      <section className="bg-navy px-6 py-8 md:py-10 text-center">
        <div className="max-w-[720px] mx-auto">
          <div className="font-mono text-[10.5px] tracking-[0.22em] uppercase font-bold text-[#F27A55] mb-3">
            {eyebrow}
          </div>
          <h2 className="font-display text-[26px] md:text-[30px] font-extrabold tracking-[-0.025em] leading-[1.15] text-white mb-2.5 text-balance">
            {sectionHeading}
          </h2>
          {answererTitle && (
            <div className="font-mono text-[11px] tracking-[0.14em] uppercase font-semibold text-[#AAB2C8] mt-2">
              {answererTitle}
            </div>
          )}
        </div>
      </section>

      <section className="bg-cream px-5 md:px-6 pt-8 md:pt-10 pb-10 md:pb-12">
        <div className="max-w-[660px] mx-auto">
          <p className="font-serif italic text-[14.5px] leading-relaxed text-sand mb-6 pb-5 border-b border-dashed border-rule">
            {introText}
          </p>

          {qa.map((exchange, i) => (
            <div
              key={i}
              className="py-5 border-b border-rule last:border-b-0"
            >
              <div className="flex items-center gap-2.5 mb-2.5">
                <span className="inline-flex items-center justify-center w-[26px] h-[26px] rounded-full bg-coral text-white font-display text-[10.5px] font-extrabold tracking-tight">
                  Q
                </span>
                <span className="font-mono text-[10.5px] tracking-[0.14em] uppercase font-bold text-navy">
                  {asker}
                </span>
              </div>
              <p className="font-display text-[18px] md:text-[19px] font-bold tracking-[-0.015em] leading-[1.35] text-navy mb-5">
                {exchange.question}
              </p>
              <div className="flex items-center gap-2.5 mb-2.5">
                <span className="inline-flex items-center justify-center w-[26px] h-[26px] rounded-full bg-[#1E3A6D] text-white font-display text-[10.5px] font-extrabold tracking-tight">
                  A
                </span>
                <span className="font-mono text-[10.5px] tracking-[0.14em] uppercase font-bold text-navy">
                  {answerer}
                </span>
              </div>
              <p className="font-serif text-[16px] md:text-[16.5px] leading-[1.62] text-ink-soft m-0">
                {exchange.answer}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
