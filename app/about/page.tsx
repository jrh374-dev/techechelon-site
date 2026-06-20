import { StaticPage } from "@/components/StaticPage";

export const metadata = {
  title: "About — TechEchelon",
  description: "Independent reporting on technology, markets, and the policy decisions that shape both.",
};

export default function AboutPage() {
  return (
    <StaticPage
      eyebrow="About"
      title="The publication"
      dek="Independent reporting on technology, markets, and the policy decisions that shape both."
    >
      <p>
        TechEchelon covers the forces shaping technology and capital markets — the funding rounds, the regulatory fights, the infrastructure decisions, and the people making them. Founded in 2024, the publication is written for readers who already know the basics: builders, operators, investors, and the policymakers whose decisions land on all three.
      </p>
      <p>
        We are independent. We are not owned by a venture firm, a hedge fund, or a portfolio company. Our work is supported by a paid newsletter, individual subscribers, and the kind of small, transparent partnerships that don&apos;t compromise editorial judgment.
      </p>
      <h2>What we cover</h2>
      <p>
        Five desks file daily: <a href="/category/business">Business &amp; Markets</a>, <a href="/category/politics">Politics &amp; Policy</a>, <a href="/category/ai">Artificial Intelligence</a>, <a href="/category/security">Cybersecurity</a>, and <a href="/category/opinion">Opinion</a>. The newsletter, <em>The Brief</em>, lands every weekday morning before the opening bell with the day&apos;s essential reads.
      </p>
      <h2>How we work</h2>
      <p>
        TechEchelon&apos;s reporting is original. We name sources where we can, grant anonymity only when warranted, and disclose conflicts. Read our <a href="/ethics">Ethics &amp; Standards</a> and <a href="/disclaimer">Disclaimer</a> pages for the full editorial picture, or <a href="/contact">contact us</a> with a tip.
      </p>
    </StaticPage>
  );
}
