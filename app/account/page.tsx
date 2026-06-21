import { StaticPage } from "@/components/StaticPage";

export const metadata = { title: "Sign in — TechEchelon" };

export default function AccountPage() {
  return (
    <StaticPage
      eyebrow="Account"
      title="Sign in"
      dek="Reader accounts and paid subscriber features are on the way."
    >
      <p>
        TechEchelon will soon offer paid subscriber features — early access to deep-dive reporting, full archive search, exclusive briefings, and ad-light reading. Reader accounts and the sign-in experience are being built now.
      </p>
      <p>
        In the meantime, the best way to follow TechEchelon is the daily newsletter. <em>The Brief</em> is free, runs weekday mornings, and lands in your inbox before the opening bell.
      </p>
      <p>
        <a href="/subscribe">Subscribe to The Brief →</a>
      </p>
      <h2>Already a subscriber?</h2>
      <p>
        If you previously subscribed to TechEchelon, your address has been carried over to the new newsletter system. You don&apos;t need to do anything — the next edition of <em>The Brief</em> will arrive at the same email address.
      </p>
      <h2>Questions</h2>
      <p>
        Email <a href="mailto:press@techechelon.com">press@techechelon.com</a> and we&apos;ll follow up.
      </p>
    </StaticPage>
  );
}
