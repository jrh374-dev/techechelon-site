// FAQPage JSON-LD schema for articles that carry an inline Q&A section.
// Emitted invisibly on the article page; Google featured snippets,
// Perplexity, and ChatGPT parse this format directly to surface Q&A
// content as structured citations.

interface FaqItem {
  question: string;
  answer: string;
}

export function FaqStructuredData({ faq }: { faq: FaqItem[] }) {
  if (!faq || faq.length === 0) return null;
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((q) => ({
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
