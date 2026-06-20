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
        <strong><a href="/author/sara-montes-de-oca">Sara Montes de Oca</a></strong> &mdash; Editor in Chief. Sara founded TechEchelon and leads editorial across markets, AI, policy, and security.
      </p>
      <p>
        <em>Sara&apos;s full bio will be added here — share the verbatim copy from the existing site whenever convenient and we&apos;ll paste it in.</em>
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
