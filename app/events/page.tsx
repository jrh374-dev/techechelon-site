import { StaticPage } from "@/components/StaticPage";

export const metadata = {
  title: "Events — TechEchelon",
};

export default function EventsPage() {
  return (
    <StaticPage
      eyebrow="Newsroom"
      title="Events"
      dek="TechEchelon will host events bringing together reporters, operators, and policymakers. More information will be published here as it is available."
    >
      <p>
        TechEchelon is planning a series of editorial events in 2026 — small-format conversations and briefings around the desks we cover. Details, dates, and registration will be announced here.
      </p>
      <h2>Stay informed</h2>
      <p>
        The first place we&apos;ll announce upcoming events is in <em>The Brief</em>, our daily newsletter. <a href="/subscribe">Subscribe</a> to make sure you hear about them first.
      </p>
      <h2>Interested in partnering?</h2>
      <p>
        If you&apos;re considering partnering with TechEchelon on an event, please reach out at <a href="mailto:press@techechelon.com">press@techechelon.com</a>.
      </p>
    </StaticPage>
  );
}
