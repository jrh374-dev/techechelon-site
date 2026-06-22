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
      <h2>Editor in Chief</h2>
      <p>
        <strong><a href="/author/sara-montes-de-oca">Sara Montes de Oca</a></strong>
      </p>
      <p>
        Sara Montes de Oca is the Editor in Chief of TechEchelon and an accomplished journalist and correspondent known for her work focusing on business, finance, and politics. Previously, Sara worked as a correspondent and producer in Washington, D.C., contributing to fast-paced political and news programming, with experience in editing, scriptwriting, and live broadcast production.
      </p>
      <h2>Staff Writers</h2>
      <p>
        <strong><a href="/author/jay-goldberg">Jay Goldberg</a></strong> — covers technology, markets, and policy. Reports on the deals, regulations, and breaking news that move the publication&apos;s core desks.
      </p>
      <p>
        <strong><a href="/author/marc-sabatini">Marc Sabatini</a></strong> — covers enterprise software, cybersecurity, and the regulatory beats that shape both. Focuses on the deal flow and policy decisions that move markets, and on how the largest software vendors are responding to AI-era competition.
      </p>
      <h2>Newsroom</h2>
      <p>
        Short, breaking, and wire-style coverage runs under the <a href="/author/techechelon-staff"><strong>TechEchelon Staff</strong></a> byline. Longer-form work is published under the responsible reporter&apos;s name.
      </p>
      <h2>Bureaus</h2>
      <p>
        TechEchelon reports from New York, Washington, and San Francisco.
      </p>
      <h2>Get in touch</h2>
      <p>
        For story tips, press, partnerships, and corrections, see the <a href="/contact">Contact</a> page.
      </p>
    </StaticPage>
  );
}
