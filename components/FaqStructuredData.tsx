// FAQPage JSON-LD schema for articles that carry a Q&A section.
// Emitted invisibly on the article page; Google featured snippets,
// Perplexity, and ChatGPT parse this format directly to surface Q&A
// content as structured citations. The same qa array that drives the
// visible ArticleQAndA feeds this schema, so there's a single source of
// truth for the interview content.

interface QAItem {
  question: string;
  answer: string;
}

export function FaqStructuredData({ items }: { items: QAItem[] }) {
  if (!items || items.length === 0) return null;
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
