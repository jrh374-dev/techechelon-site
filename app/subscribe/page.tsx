import { StaticPage } from "@/components/StaticPage";
import { Newsletter } from "@/components/Newsletter";

export const metadata = {
  title: "Subscribe — The TechEchelon Brief",
};

export default function SubscribePage() {
  return (
    <StaticPage
      eyebrow="Newsletter"
      title="The TechEchelon Brief"
      dek="Five stories every weekday morning, before the opening bell. Written for readers who already know the basics."
    >
      <p>
        <em>The Brief</em> is the daily newsletter from TechEchelon. Each edition is five stories — the morning&apos;s essential reads across markets, AI, policy, and security — distilled to what moved and why. It lands in your inbox Monday through Friday at 6:30 AM Eastern.
      </p>
      <p>
        Free to subscribe. No spam, no recap of the news cycle. Unsubscribe in one click.
      </p>
      <h2>What you&apos;ll get</h2>
      <p>
        Five short, opinionated takes on the day&apos;s news, with a clear read on what to watch next. Written for builders, investors, and policymakers who don&apos;t have time to triage twenty newsletters before market open.
      </p>
    </StaticPage>
  );
}
