import { StaticPage } from "@/components/StaticPage";

export const metadata = {
  title: "Masthead — TechEchelon",
};

export default function MastheadPage() {
  return (
    <StaticPage
      eyebrow="Newsroom"
      title="Masthead"
      dek="The people who report, edit, and run TechEchelon."
    >
      <h2>Editorial</h2>
      <p>
        <strong>Sara Montes de Oca</strong>, Founder &amp; Editor. Previously at Bloomberg and The Information.
      </p>
      <h2>Bureaus</h2>
      <p>
        TechEchelon reports from New York, Washington, and San Francisco.
      </p>
      <h2>Get in touch</h2>
      <p>
        For story tips, reach the newsroom at <a href="/contact">our contact page</a>. For corrections, see <a href="/corrections">Corrections</a>. For sponsorship and partnership inquiries, please use the contact form rather than reaching reporters directly.
      </p>
    </StaticPage>
  );
}
