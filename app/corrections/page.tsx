import { StaticPage } from "@/components/StaticPage";

export const metadata = {
  title: "Corrections — TechEchelon",
};

export default function CorrectionsPage() {
  return (
    <StaticPage
      eyebrow="Editorial Standards"
      title="Corrections"
      dek="When TechEchelon publishes a substantive error, we correct it promptly and transparently."
    >
      <p>
        When a TechEchelon article contains a factual error, we update the article and append a note describing the correction and when it was made. We do not silently edit articles after publication; substantive changes carry an explicit notice.
      </p>
      <h2>Reporting a correction</h2>
      <p>
        Email <a href="mailto:corrections@techechelon.com">corrections@techechelon.com</a> with the article URL and the issue. Please include a source or supporting documentation where possible — this helps us evaluate the request quickly.
      </p>
      <h2>Active corrections</h2>
      <p>
        No active corrections at this time. When a correction is made, it appears here.
      </p>
    </StaticPage>
  );
}
