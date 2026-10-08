import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

// remark-gfm adds GitHub-flavored markdown support to the base remark
// pipeline — most importantly, tables via | col | col | syntax. Without
// it a markdown table renders as literal pipe-delimited text. remark-html
// is configured to allow dangerous HTML through so gfm's generated
// <table> markup survives to the DOM.
export async function renderMarkdown(
  md: string,
  opts: { sponsored?: boolean } = {},
): Promise<string> {
  const result = await remark()
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .process(md);
  const html = result.toString();
  // Paid content: every outbound link is marked as sponsored so search
  // engines don't treat it as an editorial endorsement.
  return opts.sponsored
    ? html.replace(/<a\b(?![^>]*\brel=)/g, '<a rel="sponsored nofollow"')
    : html;
}

export function ArticleBody({ html }: { html: string }) {
  return (
    <div className="bg-cream py-7 md:py-12">
      <div
        className="article-prose mx-auto px-5 md:px-7"
        style={{ maxWidth: "660px" }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
