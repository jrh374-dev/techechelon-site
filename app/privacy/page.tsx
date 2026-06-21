import { StaticPage } from "@/components/StaticPage";

export const metadata = { title: "Privacy Policy — TechEchelon" };

export default function PrivacyPage() {
  return (
    <StaticPage
      eyebrow="Legal"
      title="Privacy Policy"
      dek="How TechEchelon handles the limited information it collects from readers and subscribers."
    >
      <p>
        TechEchelon respects your privacy. This policy explains what information we collect, why, and how we protect it.
      </p>
      <h2>What we collect</h2>
      <p>
        <strong>Newsletter signups.</strong> If you subscribe to <em>The Brief</em>, we collect your email address and basic engagement data (open and click events) through our newsletter provider. We use these to send the newsletter you signed up for and to improve our editorial product.
      </p>
      <p>
        <strong>Site analytics.</strong> We collect anonymous, aggregated analytics about which articles are read, where readers arrive from, and what devices they use. We do not build advertising profiles or sell this data.
      </p>
      <p>
        <strong>Contact submissions.</strong> If you email us or use a form on the Site, we keep that correspondence to respond and follow up.
      </p>
      <h2>What we do not do</h2>
      <p>
        We do not sell your personal information. We do not run third-party ad tracking. We do not build advertiser profiles based on your reading.
      </p>
      <h2>Cookies</h2>
      <p>
        The Site uses a small number of cookies and similar technologies for essential functions (logged-in state, preferences) and aggregated analytics. You can disable cookies in your browser; some features may then be limited.
      </p>
      <h2>Your choices</h2>
      <p>
        You can unsubscribe from <em>The Brief</em> at any time using the link in any email, or by contacting <a href="mailto:press@techechelon.com">press@techechelon.com</a>. To request a copy of the information we hold about you, or to ask us to delete it, write to that same address.
      </p>
      <h2>Children</h2>
      <p>
        The Site is intended for general audiences. We do not knowingly collect information from children under 13.
      </p>
      <h2>Changes</h2>
      <p>
        We may update this policy from time to time. The current version is always posted here.
      </p>
      <p>
        <em>Effective: June 2026.</em>
      </p>
    </StaticPage>
  );
}
