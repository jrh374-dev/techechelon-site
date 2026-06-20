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
