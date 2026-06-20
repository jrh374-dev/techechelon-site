import { remark } from "remark";
import remarkHtml from "remark-html";

export async function renderMarkdown(md: string): Promise<string> {
  const result = await remark().use(remarkHtml).process(md);
  return result.toString();
}

export function ArticleBody({ html }: { html: string }) {
  return (
    <div className="bg-cream py-12">
      <div
        className="article-prose mx-auto px-7"
        style={{ maxWidth: "660px" }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
