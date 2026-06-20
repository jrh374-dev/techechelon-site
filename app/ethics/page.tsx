import { StaticPage } from "@/components/StaticPage";

export const metadata = {
  title: "Ethics & Standards — TechEchelon",
};

export default function EthicsPage() {
  return (
    <StaticPage
      eyebrow="Editorial Standards"
      title="Ethics &amp; Standards"
      dek="How TechEchelon reports, sources, and corrects."
    >
      <h2>Sourcing</h2>
      <p>
        TechEchelon prefers named, on-the-record sources. We grant anonymity to sources only when (1) the information they are providing is in the public interest, (2) they cannot reasonably provide it on the record, and (3) we have independently verified key claims. When we cite an anonymous source, we describe their position and relationship to the story as specifically as their safety allows.
      </p>
      <h2>Conflicts of interest</h2>
      <p>
        TechEchelon reporters and editors do not hold individual positions in companies or instruments they cover. Stock holdings, where they exist, are disclosed in writer bios. We do not accept payment, equity, or other consideration in exchange for coverage. Where a reporter has any personal or professional relationship to a subject, that relationship is disclosed in the article.
      </p>
      <h2>Accuracy</h2>
      <p>
        Every TechEchelon article is checked against primary sources before publication. When we make a substantive error, we correct it promptly and label the correction transparently. See the <a href="/corrections">Corrections</a> page for active corrections.
      </p>
      <h2>Use of AI</h2>
      <p>
        TechEchelon uses automated systems to surface stories, draft initial copy, and route articles to the right desk. Every article is reviewed by an editor before publication. We disclose the use of AI assistance in research where it materially affected the reporting.
      </p>
    </StaticPage>
  );
}
