import { StaticPage } from "@/components/StaticPage";

export const metadata = { title: "Terms of Use — TechEchelon" };

export default function TermsPage() {
  return (
    <StaticPage
      eyebrow="Legal"
      title="Terms of Use"
      dek="The terms that govern your use of techechelon.com and the TechEchelon services."
    >
      <p>
        By accessing or using techechelon.com (the &quot;Site&quot;), you agree to these Terms of Use. These terms apply to all visitors, subscribers, and contributors. If you do not agree, please do not use the Site.
      </p>
      <h2>Editorial content</h2>
      <p>
        TechEchelon&apos;s articles, newsletters, charts, and other editorial material are published for informational purposes. Coverage of public companies, securities, and financial topics is also governed by our <a href="/disclaimer">Disclaimer</a>. Nothing on this Site constitutes financial, investment, legal, or tax advice.
      </p>
      <h2>Acceptable use</h2>
      <p>
        You may read, share, link to, and quote brief excerpts of TechEchelon material with attribution. You may not republish full articles or systematically scrape the Site without prior written permission. Automated scraping, denial-of-service attempts, and unauthorized API access are prohibited.
      </p>
      <h2>Account and newsletter subscriptions</h2>
      <p>
        Subscribing to <em>The Brief</em> or any future paid TechEchelon product is governed by these Terms together with the disclosures presented at the time of subscription. You may unsubscribe at any time using the link in any email.
      </p>
      <h2>Intellectual property</h2>
      <p>
        All TechEchelon editorial content is © TechEchelon Media unless otherwise noted. The TechEchelon name and mark are trademarks of TechEchelon Media. Third-party logos and product names belong to their respective owners.
      </p>
      <h2>Disclaimers and limitation of liability</h2>
      <p>
        The Site is provided &quot;as is.&quot; To the maximum extent permitted by law, TechEchelon disclaims all warranties and shall not be liable for any indirect, incidental, or consequential damages arising from your use of the Site.
      </p>
      <h2>Changes</h2>
      <p>
        We may update these Terms from time to time. The current version is always posted here, with the effective date noted below.
      </p>
      <p>
        <em>Effective: June 2026.</em>
      </p>
    </StaticPage>
  );
}
